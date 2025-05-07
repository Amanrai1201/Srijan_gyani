'use client';
import React from 'react';
import { useCategory } from '@/app/context/CategoryContext';

export default function QuestionPage() {
  const { selectionPath } = useCategory();
  const options = [
    { text: 'Yes', subtext: 'I agree', color: 'bg-blue-50 hover:bg-blue-100' },
    { text: 'No', subtext: 'I disagree', color: 'bg-red-50 hover:bg-red-100' },
    { text: 'Maybe', subtext: 'I\'m unsure', color: 'bg-yellow-50 hover:bg-yellow-100' },
    { text: 'I don\'t know', subtext: 'No opinion', color: 'bg-gray-50 hover:bg-gray-100' }
  ];

  // Example prompt template with placeholders
  const promptTemplate = `act as an intelligent 20-questions game bot for kids.\nThe user wants you to guess a character by asking simple yes/no/maybe/i don't know questions.\nUser has selected:\nMain category: {mainCategory}\nSubcategory: {subCategory}\nProfession: {profession}\nSpecific group: {specificGroup}\nAsk your next question to help narrow down who the person might be.\nUse simple language. One question at a time. your dataset for guessing should be indian oriented and a group of famous personalities from the world.\nafter the 10th question guess who the person is based on the answers and ask if the answer is not correct then ask to continue the same series of question. after 20 questions if you are not able to continue end the session and ask the user to submit the answer to learn from it.\nAll response should be in json format`;

  // Map selectionPath to prompt fields (robust extraction)
  let mainCategory = '';
  let subCategory = '';
  let profession = '';
  let specificGroup = '';

  if (selectionPath.length > 0) mainCategory = selectionPath[0] || '';
  if (selectionPath.length > 1) subCategory = selectionPath[1] || '';
  if (selectionPath.length > 2) profession = selectionPath[2] || '';
  if (selectionPath.length > 3) specificGroup = selectionPath[3] || '';

  // Replace placeholders with actual values
  const finalPrompt = promptTemplate
    .replace('{mainCategory}', mainCategory)
    .replace('{subCategory}', subCategory)
    .replace('{profession}', profession)
    .replace('{specificGroup}', specificGroup);

  console.log('Gemini Final Prompt:', finalPrompt);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-[65vw] bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Gemini response fetch here...
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
              `}
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