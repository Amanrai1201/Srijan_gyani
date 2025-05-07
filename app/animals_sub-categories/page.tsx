'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/app/context/CategoryContext';

const animalSubCategories = [
  {
    id: 'wild',
    name: 'Wild Animals',
    description: 'Indian wildlife and jungle animals',
    color: 'bg-emerald-50 hover:bg-emerald-100',
    image: '/wild_animals_image.jpg'
  },
  {
    id: 'domestic',
    name: 'Domestic Animals',
    description: 'Common household and farm animals',
    color: 'bg-blue-50 hover:bg-blue-100',
    image: '/domestic_animals_image.jpg'
  },
  {
    id: 'birds',
    name: 'Birds',
    description: 'Native and migratory birds of India',
    color: 'bg-yellow-50 hover:bg-yellow-100',
    image: '/birds_image.jpg'
  },
  {
    id: 'reptiles',
    name: 'Reptiles',
    description: 'Snakes, lizards and other reptiles',
    color: 'bg-green-50 hover:bg-green-100',
    image: '/reptiles_images.jpg'
  },
  {
    id: 'aquatic',
    name: 'Aquatic Animals',
    description: 'Fish and water-dwelling creatures',
    color: 'bg-cyan-50 hover:bg-cyan-100',
    image: '/aquatic_animals_image.jpg'
  },
  {
    id: 'others',
    name: 'Others',
    description: 'Add your own animal category',
    color: 'bg-gray-50 hover:bg-gray-100',
    image: '/birds_image.jpg'
  }
];

export default function AnimalSubCategories() {
  const router = useRouter();
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Animal Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a specific animal category or create your own!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {animalSubCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              const newPath = [...selectionPath.slice(0, 1), category.id];
              setSelectionPath(newPath);
              console.log('Selection Path:', newPath);
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