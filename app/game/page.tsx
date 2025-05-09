// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { chatSession } from "@/config/gemini";
// import { useCategory } from "../context/CategoryContext";
// import Question from "../game/question/page";
// // import Result from './components/Result';

// export default function GamePage() {
//   const searchParams = useSearchParams();
//   const category = searchParams.get("category");
//   const { selectionPath } = useCategory();
//   const [questionData, setQuestionData] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [prediction, setPrediction] = useState<string | null>(null);
//   const [userResponses, setUserResponses] = useState<{ question: string; answer: string }[]>([]);
//   const [questionHistory, setQuestionHistory] = useState<string[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   useEffect(() => {
//     if (!category) {
//       window.location.href = '/Start_game';
//       return;
//     }
//     fetchQuestion(null);
//   }, [category]);

//   const validateAnswer = (answer: string | null): boolean => {
//     const validAnswers = ['Yes', 'No', 'Maybe', 'I don\'t know'];
//     return answer === null || validAnswers.includes(answer);
//   };

//   // Map selectionPath to prompt fields (robust extraction)
//   let mainCategory = '';
//   let subCategory = '';
//   let profession = '';
//   let specificGroup = '';

//   if (selectionPath.length > 0) mainCategory = selectionPath[0] || '';
//   if (selectionPath.length > 1) subCategory = selectionPath[1] || '';
//   if (selectionPath.length > 2) profession = selectionPath[2] || '';
//   if (selectionPath.length > 3) specificGroup = selectionPath[3] || '';

//   let promptTemplate = process.env.NEXT_PUBLIC_GYANI_PROMPT || " ";
//   console.log(promptTemplate);

//   console.log(selectionPath);

//   // Replace placeholders with actual values
//   const finalPrompt = promptTemplate
//     .replace('{mainCategory}', mainCategory)
//     .replace('{subCategory}', subCategory)
//     .replace('{profession}', profession)
//     .replace('{specificGroup}', specificGroup);

//   console.log('Gemini Final Prompt:', finalPrompt);

//   const fetchQuestion = async (answer: string | null) => {
//     if (!validateAnswer(answer)) {
//       setQuestionData("Please provide a valid answer: Yes, No, Maybe, or I don't know");
//       return;
//     }

//     setLoading(true);
//     try {
//       let conversationHistory = `Category: ${category}\n`;
//       conversationHistory += userResponses.map(entry => `Q: ${entry.question} A: ${entry.answer}`).join("\n");

//       if (answer && questionData) {
//         conversationHistory += `\nQ: ${questionData} A: ${answer}`;
//         setUserResponses(prev => [...prev, { question: questionData, answer }]);
//       }

//       const result = await chatSession.sendMessage(conversationHistory ? conversationHistory : 'start');
//       const response = await result.response.text();

//       try {
//         const jsonResponse = JSON.parse(response);
//         if (jsonResponse.status === "guessing" && jsonResponse.guess_text) {
//           setPrediction(jsonResponse.guess_text);
//           return;
//         }
//         // Always try to extract question_text from the response
//         if (jsonResponse.question_text) {
//           const newQuestion = jsonResponse.question_text;
//           if (newQuestion !== questionData && !questionHistory.includes(newQuestion)) {
//             setQuestionData(newQuestion);
//             setQuestionHistory(prev => [...prev, newQuestion]);
//             setCurrentQuestionIndex(prev => prev + 1);
//           }
//           return;
//         }
//       } catch (e) {
//         console.error('Failed to parse JSON response:', e);
//       }

//       if (response.toLowerCase().includes("my prediction") || response.toLowerCase().includes("i think it's") || response.toLowerCase().includes("final answer")) {
//         setPrediction(response);
//       } else {
//         // Extract just the question text from the response
//         let questionText = response;
//         // Remove any prefixes like "Question:" or "Q:"
//         questionText = questionText.replace(/^(Question:|Q:)\s*/i, '').trim();
//         // Remove any suffixes like "Please answer with Yes/No"
//         questionText = questionText.replace(/\s*(Please answer|Answer with|Respond with).*$/i, '').trim();

//         if (questionText !== questionData && !questionHistory.includes(questionText)) {
//           setQuestionData(questionText);
//           setQuestionHistory(prev => [...prev, questionText]);
//           setCurrentQuestionIndex(prev => prev + 1);
//         }
//       }
//     } catch (error) {
//       console.error("Game Error:", error);
//       setQuestionData("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//       setQuestionData(questionHistory[currentQuestionIndex - 1]);
//       setUserResponses(prev => prev.slice(0, -1));
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#dfd7f5] p-6">
//       {loading ? (
//         <div className="text-center">
//           <video
//             src="/thinking_video.mp4"
//             autoPlay
//             loop
//             muted
//             className="w-[60%] aspect-video mx-auto rounded-2xl shadow-lg border-4 border-purple-300 transition-all duration-300 ease-in-out"
//           />
//         </div>
//       ) : prediction ? (
//         <Result prediction={prediction} />
//       ) : (
//         <Question
//           question={questionData || ''}
//           onAnswer={(answer) => fetchQuestion(answer)}
//           onPrevious={handlePreviousQuestion}
//           canGoPrevious={currentQuestionIndex > 0}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// }