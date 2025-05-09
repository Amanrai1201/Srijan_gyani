'use client';
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const passdata = searchParams.get('passdata');
  console.log(passdata);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#dfd7f5] p-6">
      {/* Prediction Section */}
      <div className="w-full max-w-xl bg-blue-50 rounded-2xl shadow-md p-8 mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Gyani's Prediction</h2>
        <div className="text-2xl font-semibold text-blue-600 py-6">{passdata || "No data received"}</div>
      </div>
      {/* Fun Fact Section */}
      <div className="w-full max-w-xl bg-purple-50 rounded-2xl shadow-md p-8 mb-8 text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Fun Fact fetched here</h1>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-6 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all text-lg"
          onClick={() => router.push("/Start_game")}
        >
          Yes, it is correct!
        </button>
        <button
          className="bg-white border-2 border-blue-400 text-blue-500 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl shadow-md transition-all text-lg"
          onClick={() => router.push("/game")}
        >
          No, continue
        </button>
      </div>
    </div>
  );
}
