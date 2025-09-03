
import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImageResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<EditedImageResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const result: EditedImageResult = { imageBase64: null, text: null };

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          result.text = part.text;
        } else if (part.inlineData) {
          result.imageBase64 = part.inlineData.data;
        }
      }
    }

    if (!result.imageBase64) {
      throw new Error("AI did not return an edited image. It might have refused the request.");
    }
    
    return result;

  } catch (error) {
    console.error("Error editing image with Gemini API:", error);
    throw new Error("Failed to process the image with the AI. Please try again.");
  }
};

export const generateImage = async (prompt: string): Promise<EditedImageResult> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
          parts: [
            {
              text: `Generate an image based on this description: ${prompt}`,
            },
          ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });
  
      const result: EditedImageResult = { imageBase64: null, text: null };
  
      if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            result.text = part.text;
          } else if (part.inlineData) {
            result.imageBase64 = part.inlineData.data;
          }
        }
      }
  
      if (!result.imageBase64) {
        throw new Error("AI did not return an image. It might have refused the request or needs an input image.");
      }
      
      return result;
  
    } catch (error) {
      console.error("Error generating image with Gemini API:", error);
      throw new Error("Failed to generate the image with the AI. Please try again.");
    }
  };
