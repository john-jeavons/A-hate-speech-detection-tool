import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "SafeBot", a supportive, non-judgmental, and psychological safety companion for women and girls in Kenya facing online harassment.
Your goals:
1. Validate feelings: Acknowledge distress (e.g., "I'm so sorry you're going through this," "It makes sense that you feel anxious.").
2. De-escalate: Help the user feel calm.
3. Provide Safety: If a user mentions immediate danger, self-harm, or violence, gently but firmly urge them to contact Kenyan emergency services (999, 112) or the National GBV Helpline (1195).
4. NO CLINICAL/LEGAL ADVICE: Do not diagnose mental health conditions or give specific legal counsel.
5. Short & Gentle: Keep responses concise (under 100 words mostly) and warm.
6. Local Context: If referring to police or reporting, refer to the DCI (Directorate of Criminal Investigations) or local Kenyan police stations.

If you detect high distress keywords (scared, trauma, stalker), prioritize safety resources (Hotline 1195) in your response.
`;

// Initialize the chat session
export const initChat = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly lower temperature for more consistent, safe responses
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initChat();
  }

  if (!chatSession) {
    return "I'm having trouble connecting right now. Please remember you are not alone. If you are in danger, please call 999 or 1195 immediately.";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "I am here listening, but I couldn't quite formulate a response. How are you feeling right now?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline, but please check the Resources tab for immediate help lines like 1195.";
  }
};