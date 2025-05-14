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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
        setCurrentQuestionIndex(prev => prev + 1);
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
        console.warn("Unexpected response:", result);
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
        console.warn("Failed to parse JSON :", err);
        setGeminiResponse(responseText); // fallback raw
      }
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setGeminiResponse("Error fetchingresponse.");
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
      <div className="w-full md:w-[65vw] bg-white rounded-3xl shadow-xl p-4 md:p-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
            {loading ? 'Thinking...' : (geminiResponse ?? 'Are you Ready to Start..')}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Please select one of the options below
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className={`
              bg-gray-100 hover:bg-gray-200
              px-6 py-3 rounded-xl
              transition-all duration-200
              transform hover:scale-105
              flex items-center justify-center
              border-2 border-transparent hover:border-gray-300
              ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => {
              if (currentQuestionIndex > 0) {
                const newIndex = currentQuestionIndex - 1;
                setCurrentQuestionIndex(newIndex);
                setConversationHistory(prev => prev.slice(0, newIndex));
                setUserAnswers(prev => prev.slice(0, newIndex));
                setGeminiResponse(conversationHistory[newIndex - 1] || null);
              }
            }}
            disabled={currentQuestionIndex === 0}
          >
            <span className="text-lg font-semibold text-gray-700">← Previous Question</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
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

