'use client';
import React, { useEffect, useState } from 'react';
import { useCategory } from '@/app/context/CategoryContext';
import { chatSession } from "@/config/gemini";
import { useRouter } from 'next/navigation';
import Result from '../result/page';

export default function QuestionPage(passdata: {prediction: any}) {
  const router = useRouter(); 
  const { selectionPath = [] } = useCategory();

  const [prediction, setPrediction] = useState<string | null>(null);
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const options = [
    { text: 'Yes', subtext: 'I agree', color: 'bg-blue-50 hover:bg-blue-100' },
    { text: 'No', subtext: 'I disagree', color: 'bg-red-50 hover:bg-red-100' },
    { text: 'Maybe', subtext: 'I\'m unsure', color: 'bg-yellow-50 hover:bg-yellow-100' },
    { text: 'I don\'t know', subtext: 'No opinion', color: 'bg-gray-50 hover:bg-gray-100' }
  ];

  // Extract categories from selectionPath
  const mainCategory = selectionPath[0] || '';
  const subCategory = selectionPath[1] || '';
  const profession = selectionPath[2] || '';
  const specificGroup = selectionPath[3] || '';

  // Prepare prompt template
  let promptTemplate = process.env.NEXT_PUBLIC_GYANI_PROMPT || " ";
  if (!promptTemplate || promptTemplate.trim() === "") {
    console.warn("Missing or empty prompt template in env variable.");
  }

  const finalPrompt = promptTemplate
    .replace('{mainCategory}', mainCategory)
    .replace('{subCategory}', subCategory)
    .replace('{profession}', profession)
    .replace('{specificGroup}', specificGroup);

  const gemini = async (answer?: string) => {
    setLoading(true);
    try {
      let promptToSend = finalPrompt;
      let updatedHistory = [...conversationHistory];
      let updatedAnswers = [...userAnswers];

      if (geminiResponse && answer) {
        updatedHistory.push(geminiResponse);
        updatedAnswers.push(answer);
        setConversationHistory(updatedHistory);
        setUserAnswers(updatedAnswers);
      }

      const historyString = updatedHistory
        .map((q, idx) => `Q: ${q} A: ${updatedAnswers[idx] || ''}`)
        .join("\n");

      if (historyString) {
        promptToSend += "\n" + historyString;
      }

      const result = await chatSession.sendMessage(promptToSend);

      let responseText = '';
      if (result?.response?.text) {
        responseText = await result.response.text();
      } else if (typeof result?.response === "string") {
        responseText = result.response;
      } else {
        console.warn("Unexpected Gemini response:", result);
        responseText = JSON.stringify(result);
      }

      try {
        const parsed = JSON.parse(responseText);

        if (parsed.question) {
          setGeminiResponse(parsed.question);
        } else {
          setGeminiResponse("No question found in response.");
        }

        if (parsed.response || parsed.guess) {
          const resultText = parsed.response || parsed.guess;
          setPrediction(resultText);
          console.log('Prediction:', resultText);
          router.push(`/game/result?passdata=${encodeURIComponent(resultText)}`);
        }
        
      } catch (err) {
        console.warn("Failed to parse JSON from Gemini:", err);
        setGeminiResponse(responseText); // fallback raw
      }
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setGeminiResponse("Error fetching Gemini response.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-start first question
  useEffect(() => {
    if (!geminiResponse) {
      gemini(); // no answer for first question
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-[65vw] bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {loading ? 'Loading Gemini response...' : (geminiResponse ?? 'Are you Ready to Start..')}
          </h1>
          <p className="text-gray-600 text-lg">
            Please select one of the options below
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((option) => (
            <button
              key={option.text}
              className={`
                ${option.color}
                p-8 rounded-xl
                transition-all duration-200
                transform hover:scale-105
                flex flex-col items-center justify-center
                border-2 border-transparent hover:border-gray-200
                min-h-[150px]
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => gemini(option.text)}
              disabled={loading}
            >
              <span className="text-2xl font-semibold mb-3">
                {option.text}
              </span>
              <span className="text-lg text-gray-500">
                {option.subtext}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

