'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCategory } from '@/app/context/CategoryContext';

const politicsSubCategories = [
  {
    id: 'prime_ministers',
    name: 'Prime Ministers',
    description: 'Leaders who served as Prime Ministers of India',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/prime_minister_image.jpg'
  },
  {
    id: 'chief_ministers',
    name: 'Chief Ministers',
    description: 'State leaders and Chief Ministers',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/chief_minister_image.jpg'
  },
  {
    id: 'party_leaders',
    name: 'Party Leaders',
    description: 'Notable political party leaders',
    color: 'bg-green-50 hover:bg-green-100',
    image: '/party_leader_image.jpg'
  },
  {
    id: 'international_leaders',
    name: 'International Leaders',
    description: 'Notable international political figures',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/international_image.jpg'
  },
];

export default function PoliticsSubCategories() {
  const { selectionPath, setSelectionPath } = useCategory();
  const router = useRouter();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Political Figure Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a category to explore political figures!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {politicsSubCategories.map((category) => (
          <Link
            href={`/game/question`}
            key={category.id}
            onClick={() => {
              const newPath = [
                ...selectionPath.slice(0, 5),
                category.id
              ];
              setSelectionPath(newPath);
              console.log('Selection Path:', newPath);
              // router.push(`game/question`);
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
          </Link>
        ))}
      </div>
    </div>
  );
}