'use client';
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import {generateFunFact} from "@/config/fun_fact_gemini";
import { parseFallbackField } from "next/dist/lib/fallback";
import Link from 'next/link';


interface FunFact {
  fact: string;
  factType: 'fun' | 'educational' | 'interesting';
}

export default function Result() {
  const [funFact, setFunFact] = useState<FunFact | null>(null);
  const [isLoadingFact, setIsLoadingFact] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const passdata = searchParams.get('passdata');
  // Parse the passdata to extract only the guessed value
  const parsedPrediction = React.useMemo(() => {
    if (!passdata) return "No data received";
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(passdata);
      let prediction = parsed.response || parsed.guess || parsed;
      // Clean up common phrases
      prediction = prediction.replace(/i am learning |i think of the |do you want to play again/gi, '');
      return prediction.trim();
    } catch (e) {
      // If not JSON, clean up the raw string
      let cleanedText = passdata;
      cleanedText = cleanedText.replace(/i am learning |i think of the |do you want to play again/gi, '');
      return cleanedText.trim();
    }
  }, [passdata]);

  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        setIsLoadingFact(true);
        const fact = await generateFunFact(parsedPrediction);
        setFunFact(fact);
      } catch (error) {
        console.error('Error fetching fun fact:', error);
      } finally {
        setIsLoadingFact(false);
      }
    };

    if (parsedPrediction) {
      fetchFunFact();
    }
  }, [parsedPrediction]);
  const handleIncorrect = () => {
    setShowFeedback(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#dfd7f5] p-4 md:p-6">
      {/* Prediction Section */}
      <div className="w-full md:w-[60%] bg-blue-50 rounded-2xl shadow-md p-4 md:p-8 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Gyani's Prediction</h2>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Gyani's Prediction</h2>
        <div className="text-xl md:text-2xl font-semibold text-blue-600 py-4 md:py-6">{parsedPrediction}</div>
        <div className="mt-4 rounded-xl overflow-hidden shadow-lg aspect-[16/9] w-full">
          <img 
            src={`https://image.pollinations.ai/prompt/${encodeURIComponent(parsedPrediction)}`}
            alt={parsedPrediction}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Fun Fact Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-inner border-2 border-purple-100">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4">Fun Fact</h3>
          {isLoadingFact ? (
            <div className="text-gray-600 animate-pulse">Loading interesting fact...</div>
          ) : funFact ? (
            <div className="text-lg text-gray-700 leading-relaxed">
              {funFact.fact}
            </div>
          ) : (
            <div className="text-gray-600">No fun fact available at the moment</div>
          )}
        </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8 md:mb-12">
          <Link 
            href="/Start_game"
            className="px-8 py-4 bg-blue-50 text-black border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-lg"
          >
            Yes, Play Again!
          </Link>
          <button
            onClick={handleIncorrect}
            className="px-8 py-4 bg-red-50 text-black border-2 border-red-200 rounded-xl hover:bg-red-100 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-lg"
          >
            No, I was thinking of...
          </button>
        </div>

        {showFeedback && (
          <div className="mt-8 md:mt-12 animate-fadeIn space-y-4 md:space-y-8 w-full px-4 md:px-0">
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="What was the correct answer?"
              className="w-full max-w-md px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg transition-all duration-300 hover:border-gray-400 shadow-sm"
            />
            <button
              onClick={() => {
                console.log('Correct answer was:', correctAnswer);
                window.location.href = '/Start_game';
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-lg"
            >
              Submit & Play Again
            </button>
          </div>
        )}
      </div>
  );
}
