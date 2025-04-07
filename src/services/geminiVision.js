import { GoogleGenerativeAI } from "@google/generative-ai";
import {envVariables} from "../Environments/envVariables.js";

const API_KEY = envVariables.GEMINI_API_KEY;

const genAi = new GoogleGenerativeAI(API_KEY);
//model - gemini-2.0-flash


export async function analyzeMathImage(imageData){
    try {
        const model = genAi.getGenerativeModel({model : "gemini-2.0-flash"});

        const imageParts = [
            {
                inlineData : {
                    data : imageData.split(",")[1],
                    mimeType : "image/jpeg"
                }
            }
        ];
        const promt = "This is a handwritten or drawn mathematical problem. " +
                    "If the problem is very simple (like 2 + 3), just return:\n" +
                    "➤ Question: 2 + 3\n" +
                    "➤ Answer: 5\n\n" +
                    "If it's slightly complex (like algebra or brackets), return:\n" +
                    "➤ Question:\n" +
                    "➤ Explanation: [Short explanation]\n" +
                    "➤ Answer: [Formatted result]\n\n" +
                    "If it's a detailed or multi-step problem, give" +
                    "➤ Step-by-step Solution\n" +
                    "➤ Use proper math formatting using Markdown:\n" +
                    "- Superscripts: ², ³ instead of ^2, ^3\n" +
                    "- Square roots: use √ or sqrt()\n" +
                    "- Fractions: use ½, ¾ or 1 ÷ 2\n\n" +
                    "If this is not a math problem, analyze the drawing and respond accordingly.\n\n" +
                    "Very important: Format the output using proper math symbols and clean Markdown. No ^ for powers. Avoid messy inline math. Output must be clean and visually readable."


        const response = await model.generateContent([promt, ...imageParts]);
        return response.response.text();
        
    } catch (error) {
        console.error("API ERROR :: Api call :: Error: ", error);
        return "Sorry, I couldn't process solution. Please try again.";
    }
}