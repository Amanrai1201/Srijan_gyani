'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/app/context/CategoryContext';

const kabaddiSubCategories = [
  {
    id: 'pro_kabaddi',
    name: 'Pro Kabaddi',
    description: 'Professional Kabaddi League matches',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'national_kabaddi',
    name: 'National Kabaddi',
    description: 'National level tournaments and championships',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'beach_kabaddi',
    name: 'Beach Kabaddi',
    description: 'Kabaddi played on sandy beaches',
    color: 'bg-rose-50 hover:bg-rose-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'circle_kabaddi',
    name: 'Circle Kabaddi',
    description: 'Traditional circular format of Kabaddi',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'indoor_kabaddi',
    name: 'Indoor Kabaddi',
    description: 'Indoor mat-based Kabaddi format',
    color: 'bg-indigo-50 hover:bg-indigo-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'others',
    name: 'Others',
    description: 'Other Kabaddi formats and variations',
    color: 'bg-gray-50 hover:bg-gray-100',
    image: '/things_gemini.jpg'
  }
];

export default function KabaddiSubCategories() {
  const { selectionPath, setSelectionPath } = useCategory();
  const router = useRouter();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Kabaddi Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a specific Kabaddi format or create your own!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {kabaddiSubCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              const newPath = [...selectionPath.slice(0, 1), category.id];
              setSelectionPath(newPath);
              console.log('Selection Path:', newPath);
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