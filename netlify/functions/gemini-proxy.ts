// FIX: Replaced placeholder content with a functional Netlify serverless function.
import { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import menuData from "../../menu_data.json";

if (!process.env.API_KEY) {
    throw new Error("The API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper function to create a simplified text version of the menu
const getMenuAsText = () => {
    let menuText = "MENU:\n\n";
    menuData.menu_sections.forEach((section: any) => {
        menuText += `--- ${section.title_en} / ${section.title_es} ---\n`;
        section.items.forEach((item: any) => {
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
    // FIX: Hardcode info to prevent build issues with importing complex TS files.
    return `
        Name: Donde Nando Grill
        Address: Rotonda Los Encuentros, 700 metros al Norte, Chinandega, Nicaragua
        Phone: +50584709484
        Hours: Sunday to Wednesday 12:00 PM to 9:00 PM; Thursday to Saturday 12:00 PM to 11:00 PM
        Specialties: High-quality grilled meats, Nicaraguan classic dishes.
    `;
}

// Function declaration for navigation
const navigateToPageFunctionDeclaration: FunctionDeclaration = {
  name: 'navigateToPage',
  description: 'Navigates the user to a specific page on the website. Use this whenever a user wants to see the menu, make a reservation, or visit the contact or home page.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      page: {
        type: Type.STRING,
        description: 'The page to navigate to.',
        enum: ['home', 'menu', 'reservations', 'contact'],
      },
    },
    required: ['page'],
  },
};

const getSystemInstruction = (language: string = 'en') => `You are a friendly, helpful, and concise virtual assistant for a restaurant called "Donde Nando Grill".
Your goal is to answer customer questions. You MUST use the provided function 'navigateToPage' when the user expresses clear intent to see the menu, make a reservation, go to the contact page, or go home.
When using the 'navigateToPage' function, ALSO provide a brief, polite text response confirming the action, for example: "Of course, taking you to the menu page now."
For all other questions, use ONLY the information provided below to answer. Do not make up information. Do not attempt to take reservation details yourself.
Keep your answers brief and to the point.
IMPORTANT: You MUST respond in the following language: ${language === 'es' ? 'Spanish' : 'English'}.
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
        const { history, prompt, language } = JSON.parse(event.body || '{}');

        if (!prompt) {
            return { statusCode: 400, body: 'Bad Request: prompt is required.' };
        }
        
        const contents = [...(history || []), { role: 'user', parts: [{ text: prompt }] }];
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction: getSystemInstruction(language),
            tools: [{ functionDeclarations: [navigateToPageFunctionDeclaration] }],
          }
        });
        
        const text = response.text;
        const functionCalls = response.functionCalls;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response: text, functionCalls }),
        };

    } catch (e) {
        // FIX: Renamed the catch block variable from 'error' to 'e' to resolve a 'Cannot find name' compiler error.
        console.error('Error calling Gemini API:', e);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to get response from AI assistant.' }),
        };
    }
};

export { handler };