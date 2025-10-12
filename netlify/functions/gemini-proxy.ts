import { GoogleGenAI } from "@google/genai";
import menuData from '../../menu_data.json';

interface RequestBody {
    message: string;
    language: 'es' | 'en';
}

// Using a simple handler signature compatible with Netlify Functions.
export const handler = async (event: { httpMethod: string; body: string }) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { message, language } = JSON.parse(event.body) as RequestBody;

        if (!message || !language) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Bad Request: message and language are required.' }) };
        }
        
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("API_KEY environment variable not set.");
            return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error.' }) };
        }

        const ai = new GoogleGenAI({ apiKey });
        
        // This complete menu_data.json is the primary knowledge base for the Gemini API. Use its structure (item names, categories, and prices) to answer all customer menu-related queries conversationally, enabling the high-value AI-Powered Solutions phase.
        const menuJsonString = JSON.stringify(menuData);

        const restaurantInfo = {
            address: 'A 700 metros al norte de la Rotonda Los Encuentros, Chinandega, Nicaragua',
            phone: '+505 8470 9484',
            openingHours: { es: 'Mar - Dom: 12pm - 10pm', en: 'Tue - Sun: 12pm - 10pm' },
        };

        const langSpecificHours = restaurantInfo.openingHours[language];
        const systemInstruction = `You are a helpful and friendly chatbot for a Nicaraguan restaurant called 'Donde Nando Grill'. Your goal is to answer customer questions about the restaurant. Be concise and friendly. The user's current language preference is '${language === 'es' ? 'Spanish' : 'English'}', so you MUST respond in that language.
    
        Here is the restaurant's information:
        - Name: Donde Nando Grill
        - Cuisine: Nicaraguan Grill/Steakhouse
        - Location: ${restaurantInfo.address}
        - Phone: ${restaurantInfo.phone}
        - Hours: ${langSpecificHours}

        Here is the complete menu in JSON format: ${menuJsonString}. 
        
        Use this JSON data as your primary knowledge source to answer all menu-related questions. When asked about the menu, you can summarize categories or provide specific item details like price (prices are in Nicaraguan Córdoba, symbol C$) and descriptions. Do not just output the raw JSON. For reservations, direct the user to the website's reservation page.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: { systemInstruction },
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: response.text }),
        };

    } catch (error) {
        console.error("Error in gemini-proxy function:", error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};