'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/app/context/CategoryContext';

const japaneseSubCategories = [
  {
    id: 'anime',
    name: 'Anime',
    description: 'Popular Japanese animation series',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'manga',
    name: 'Manga',
    description: 'Japanese comic series and adaptations',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'chibi',
    name: 'Chibi',
    description: 'Cute and miniature style characters',
    color: 'bg-pink-50 hover:bg-pink-100',
    image: '/things_gemini.jpg'
  },
  // {
  //   id: 'others',
  //   name: 'Others',
  //   description: 'Other Japanese cartoon styles',
  //   color: 'bg-gray-50 hover:bg-gray-100',
  //   image: '/things_gemini.jpg'
  // }
];

export default function JapaneseSubCategories() {
  const router = useRouter();
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Japanese Cartoon Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a specific Japanese cartoon category or create your own!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {japaneseSubCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              const newPath = ["cartoon","japanese_cartoon" ,category.id];
              selectionPath.splice(0, 4, ...newPath);
              setSelectionPath(selectionPath);
              console.log('Selection Path:', selectionPath);
              router.push('/game/question');
            }}
            className={
              `
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
            `
            }
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