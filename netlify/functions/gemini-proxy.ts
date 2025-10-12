
import { GoogleGenAI } from "@google/genai";
import { menuData } from '../../constants/menu.ts';

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
        
        // Create a more compact string representation of the menu
        // to reduce token count and avoid timeouts.
        const compactMenu = menuData.menu_sections.map(section => {
            const sectionTitle = language === 'es' ? section.title_es : section.title_en;
            const items = section.items.map(item => {
                const itemName = language === 'es' ? item.name_es : item.name_en;
                const itemNote = language === 'es' ? item.notes_es : item.notes_en;
                let itemString = `${itemName} - C$${item.price}`;
                if (itemNote) {
                    itemString += ` (${itemNote})`;
                }
                return itemString;
            }).join('. ');
            return `${sectionTitle}:\n${items}`;
        }).join('\n\n');


        const restaurantInfo = {
            address: 'A 700 metros al norte de la Rotonda Los Encuentros, Chinandega, Nicaragua',
            phone: '+505 8470 9484',
            openingHours: { es: 'Mar - Dom: 12pm - 10pm', en: 'Tue - Sun: 12pm - 10pm' },
        };

        const langSpecificHours = restaurantInfo.openingHours[language];
        
        // Updated system instruction to be more robust and use the compact menu.
        const systemInstruction = `You are a helpful and friendly chatbot for a Nicaraguan restaurant called 'Donde Nando Grill'. 
        Your goal is to answer customer questions. Be concise and conversational.
        The user's current language preference is '${language === 'es' ? 'Spanish' : 'English'}', so you MUST respond in that language.
    
        - Name: Donde Nando Grill
        - Cuisine: Nicaraguan Grill/Steakhouse
        - Location: ${restaurantInfo.address}
        - Phone: ${restaurantInfo.phone}
        - Hours: ${langSpecificHours}

        Here is the menu. Use this as your primary knowledge source for all menu questions. Prices are in Nicaraguan Córdoba (C$).
        --- MENU ---
        ${compactMenu}
        --- END MENU ---
        
        RULES:
        1. If asked about menu items, use the provided menu to answer.
        2. If asked for a reservation, politely direct the user to the website's reservation page. Do not try to take reservation details.
        3. If you don't know the answer, say you are not sure and suggest they call the restaurant at ${restaurantInfo.phone}.
        4. Do not mention that you are an AI or that you were given a menu as context. Act as a knowledgeable assistant for the restaurant.`;

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