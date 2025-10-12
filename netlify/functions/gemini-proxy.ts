import { GoogleGenAI } from "@google/genai";

// Content needed for the system prompt, kept within the function to be self-contained.
const functionContent = {
    contact: {
        address: 'A 700 metros al norte de la Rotonda Los Encuentros, Chinandega, Nicaragua',
        phone: '+505 8470 9484',
    },
    footer: {
        openingHours: { es: 'Mar - Dom: 12pm - 10pm', en: 'Tue - Sun: 12pm - 10pm' },
    }
};

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

        const langSpecificHours = functionContent.footer.openingHours[language];
        const systemInstruction = `You are a helpful and friendly chatbot for a Nicaraguan restaurant called 'Donde Nando Grill'. Your goal is to answer customer questions about the restaurant. Be concise and friendly. The user's current language preference is '${language === 'es' ? 'Spanish' : 'English'}', so you MUST respond in that language. Restaurant info: Name: Donde Nando Grill. Cuisine: Nicaraguan Grill/Steakhouse. Location: ${functionContent.contact.address}. Phone: ${functionContent.contact.phone}. Hours: ${langSpecificHours}. Specialties: Churrasco, Tomahawk steak. To make a reservation, direct them to the reservation page on the website.`;

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