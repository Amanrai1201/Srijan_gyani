'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/app/context/CategoryContext';

const historicalFiguresSubCategories = [
  {
    id: 'freedom_fighters',
    name: 'Freedom Fighters',
    description: 'Heroes who fought for India\'s independence',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/freedom_image.jpg'
  },
  {
    id: 'ancient_rulers',
    name: 'Ancient Rulers',
    description: 'Kings, Queens and Emperors of ancient India',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/ancient_ruler_image.jpg'
  },
  {
    id: 'scientists',
    name: 'Scientists',
    description: 'Notable Indian scientists and inventors',
    color: 'bg-green-50 hover:bg-green-100',
    image: '/science_image.jpg'
  },
  {
    id: 'social_reformers',
    name: 'Social Reformers',
    description: 'Leaders who brought social change',
    color: 'bg-blue-50 hover:bg-blue-100',
    image: '/social_reforms_image.jpg'
  },
  {
    id: 'military_leaders',
    name: 'Military Leaders',
    description: 'Brave military commanders and warriors',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/army_image.jpg'
  },
  // {
  //   id: 'others',
  //   name: 'Others',
  //   description: 'Other significant historical figures',
  //   color: 'bg-gray-50 hover:bg-gray-100',
  //   image: '/character_gemini.jpg'
  // }
];

export default function HistoricalFiguresSubCategories() {
  const router = useRouter();
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Historical Figure Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a category to explore historical figures!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {historicalFiguresSubCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              const newPath = ["historical_figures", category.id];
              selectionPath.splice(0, 2, ...newPath);
              setSelectionPath(selectionPath);
              console.log('Selection Path:', selectionPath);
              router.push(`game/question`);
            }}
            className={`
              ${category.color}
              p-6 rounded-2xl
              transition-all duration-300
              transform hover:scale-105
              cursor-pointer
              border-2 border-transparent hover:border-gray-200
              flex flex-col items-center
              text-center
              h-full
              overflow-hidden
            `}
          >
            <div className="relative w-full h-52 mb-4 rounded-xl overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                priority
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {category.name}
            </h2>
            <p className="text-gray-600">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}