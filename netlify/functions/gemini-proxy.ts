// FIX: Replaced placeholder content with a functional Netlify serverless function.
import { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { menuData } from "../../constants/menu.ts";
import { content } from "../../constants/content.ts";

if (!process.env.API_KEY) {
    throw new Error("The API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper function to create a simplified text version of the menu
const getMenuAsText = () => {
    let menuText = "MENU:\n\n";
    menuData.menu_sections.forEach(section => {
        menuText += `--- ${section.title_en} / ${section.title_es} ---\n`;
        section.items.forEach(item => {
            menuText += `- ${item.name_en} / ${item.name_es}: C$${item.price}\n`;
            if (item.notes_en) {
                menuText += `  (${item.notes_en})\n`;
            }
        });
        menuText += "\n";
    });
    return menuText;
};

const getRestaurantInfo = () => {
    return `
        Name: Donde Nando Grill
        Address: ${content.contact.address}
        Phone: ${content.contact.phone}
        Hours: ${content.footer.openingHours.en}
        Specialties: High-quality grilled meats, Nicaraguan classic dishes.
    `;
}

const systemInstruction = `You are a friendly, helpful, and concise virtual assistant for a restaurant called "Donde Nando Grill".
Your goal is to answer customer questions about the restaurant, its menu, hours, and location.
You must use ONLY the information provided below to answer questions. Do not make up information.
If a user asks about making a reservation, tell them they can do it through the "Reservations" page on the website. Do not attempt to take reservation details yourself.
Keep your answers brief and to the point. Always be polite.
The current date is ${new Date().toDateString()}.

Here is the restaurant's information:
${getRestaurantInfo()}

Here is the full menu:
${getMenuAsText()}
`;

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { history, prompt } = JSON.parse(event.body || '{}');

        if (!prompt) {
            return { statusCode: 400, body: 'Bad Request: prompt is required.' };
        }
        
        const contents = [...history, { role: 'user', parts: [{ text: prompt }] }];
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction,
          }
        });
        
        const text = response.text;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response: text }),
        };

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to get response from AI assistant.' }),
        };
    }
};

export { handler };