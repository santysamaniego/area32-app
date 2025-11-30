
import { GoogleGenAI, Type } from "@google/genai";
import { DietaryGoal, DietaryType, Recipe, MealType } from "../types";

// NOTE: In a real production app, you should proxy these requests through your own backend.
// For this frontend-only demo, we assume the environment variable is available.
// However, since we cannot easily set environment variables in this preview, 
// we will handle the missing key gracefully in the UI.

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateRecipe = async (goal: DietaryGoal, type: DietaryType, mealType: MealType): Promise<Recipe | null> => {
  const ai = getAiClient();
  if (!ai) {
    console.warn("API Key missing for Gemini.");
    // Return a mock fallback if no API key
    return {
      name: `Ejemplo ${type} para ${goal}`,
      calories: "450 kcal",
      ingredients: ["100g Avena", "1 Banana", "200ml Leche de almendras", "1 scoop Proteína"],
      instructions: ["Mezclar todo en un bowl.", "Dejar reposar 5 min.", "Disfrutar."],
      macros: { protein: "25g", carbs: "50g", fats: "10g" },
      imagePrompt: "healthy oatmeal bowl with banana and almonds"
    };
  }

  try {
    const prompt = `Genera una receta de cocina saludable y deliciosa.
    Objetivo: ${goal}.
    Tipo de dieta: ${type}.
    Comida del día: ${mealType}.
    Dame el nombre, calorias aproximadas, lista de ingredientes y pasos de preparación.
    Adicionalmente, dame un 'imagePrompt' corto en inglés que describa visualmente el plato para generar una imagen.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            calories: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            imagePrompt: { type: Type.STRING, description: "Short visual description in English for image generation" },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.STRING },
                carbs: { type: Type.STRING },
                fats: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Recipe;
    }
    return null;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};
