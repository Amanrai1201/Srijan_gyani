
// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
  
//   const apiKey = process.env.NEXT_PUBLIC_FUN_FACT_API;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//   });
  
//   const generationConfig = {
//     responseMimeType: "application/json",
//   };
  
//     export const chatSession = model.startChat({
//       generationConfig,
//       history : [
//         {
//           role: 'user',
//           parts: [
//           {
//             text: `generate  an educational or fascinating fact about the  {lion} . return the response in JSON format.`,
//           },
//         ],
//       },
//       {
//         role: 'model',
//         parts: [
//           {
//             text: `\`\`\`json
//   {
//     "fact": "Lionesses, not male lions, are the primary hunters in a pride.  They work cooperatively, employing strategies like coordinated stalking and chasing to bring down prey much larger than themselves. This collaborative hunting is crucial for the pride's survival.",
//     "category": "Hunting Behavior",
//     "source": "National Geographic, various scientific publications on lion behavior"
//   }
//   \`\`\`
//   `,
//           },
//         ],
//       },
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `INSERT_INPUT_HERE`,
//           },
//         ],
//       },
//     ]
//   });
 
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_FUN_FACT_API!);

interface FunFactResponse {
  fact: string;
  factType: 'fun' | 'educational' | 'interesting';
}

export async function generateFunFact(value: string): Promise<FunFactResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `Generate a fun fact about ${value}. Return the response in JSON format .`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    try {
      // Parse the JSON response and extract only the fact value
      const jsonResponse = JSON.parse(text);
      return {
        fact: jsonResponse.value || text,
        factType: jsonResponse.factType || 'interesting'
      };
    } catch (jsonError) {
      // If JSON parsing fails, use the raw text as the fact
      return {
        fact: text,
        factType: 'interesting'
      };
    }
  } catch (error) {
    console.error('Error generating fun fact:', error);
    return {
      fact: 'Unable to generate a fun fact at the moment',
      factType: 'interesting'
    };
  }
}