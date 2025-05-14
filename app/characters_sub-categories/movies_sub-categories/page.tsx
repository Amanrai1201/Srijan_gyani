'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/app/context/CategoryContext';

const movieSubCategories = [
  {
    id: 'bollywood',
    name: 'Bollywood',
    description: 'Famous characters from Hindi cinema',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/bollywood_image.jpg'
  },
  {
    id: 'hollywood',
    name: 'Hollywood',
    description: 'Iconic characters from international cinema',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/hollywood_image.jpg'
  },
  {
    id: 'web_series',
    name: 'Web Series',
    description: 'Characters from popular web series',
    color: 'bg-blue-50 hover:bg-blue-100',
    image: '/web_series_image.jpg'
  },
  {
    id: 'documentary',
    name: 'Documentary',
    description: 'Real characters from documentaries',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/documentry_image.jpg'
  },
];

export default function MovieSubCategories() {
  const router = useRouter();
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Movie Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a specific movie category to explore characters!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {movieSubCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              const newPath = ["movies", category.id];
              selectionPath.splice(0, 2, ...newPath);
              setSelectionPath(selectionPath);
              console.log('Selection Path:', selectionPath);
              router.push(`/game/question`);
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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