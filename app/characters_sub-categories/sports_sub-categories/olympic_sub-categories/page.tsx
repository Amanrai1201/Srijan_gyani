'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/app/context/CategoryContext';

const olympicSubCategories = [
  {
    id: 'athletics',
    name: 'Athletics',
    description: 'Track and field events, marathons',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'swimming',
    name: 'Swimming',
    description: 'All swimming and diving events',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'gymnastics',
    name: 'Gymnastics',
    description: 'Artistic and rhythmic gymnastics',
    color: 'bg-rose-50 hover:bg-rose-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'wrestling',
    name: 'Wrestling',
    description: 'Freestyle and Greco-Roman wrestling',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'boxing',
    name: 'Boxing',
    description: 'Olympic boxing weight categories',
    color: 'bg-indigo-50 hover:bg-indigo-100',
    image: '/things_gemini.jpg'
  },
  // {
  //   id: 'others',
  //   name: 'Others',
  //   description: 'Other Olympic sports and events',
  //   color: 'bg-gray-50 hover:bg-gray-100',
  //   image: '/things_gemini.jpg'
  // }
];

export default function OlympicSubCategories() {
  const router = useRouter();
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Olympic Sports Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a specific Olympic sport or create your own!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {olympicSubCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              const newPath = ["character","sports","olympic_player",category.id];
              selectionPath.splice(0, 4, ...newPath);
              setSelectionPath(selectionPath);
              console.log('Selection Path:', selectionPath);
              router.push('/game/question');
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
                width={400}
                height={300}
                style={{ width: '100%', height: '100%' }}
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