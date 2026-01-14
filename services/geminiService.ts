import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const editImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    // Extract mime type from data URL if present
    const mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
    
    // Remove header if present to get pure base64 data
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `Edit this image: ${prompt}`,
          },
        ],
      },
    });

    // Iterate to find the image part
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};