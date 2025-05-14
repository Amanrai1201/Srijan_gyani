'use client'
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
// import { useCategory } from '@/app/context/CategoryContext';

const characterSubCategories = [
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Popular cartoon characters and animations',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/cartoon_image.jpg'
  },
  {
    id: 'movies',
    name: 'Movies',
    description: 'Famous characters from movies and cinema',
    color: 'bg-blue-50 hover:bg-blue-100',
    image: '/movies_image.jpg'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Notable athletes and sports personalities',
    color: 'bg-green-50 hover:bg-green-100',
    image: '/sports_image.jpg'
  },
  {
    id: 'politics',
    name: 'Politics',
    description: 'Political figures and leaders',
    color: 'bg-yellow-50 hover:bg-yellow-100',
    image: '/politics_image.jpg'
  },
  {
    id: 'historical_figures',
    name: 'Historical Figures',
    description: 'famous historical Figures',
    color: 'bg-yellow-50 hover:bg-yellow-100',
    image: '/historical_figures_image.jpg'
  },
  // {
  //   id: 'others',
  //   name: 'Others',
  //   description: 'Other interesting characters and personalities',
  //   color: 'bg-red-50 hover:bg-red-100',
  //   image: '/politics_image.jpg'
  // }
];

export default function CharacterSubCategories() {
  // const { selectionPath, setSelectionPath } = useCategory();
  return (
    <main className="min-h-screen bg-[#dfd7f5] flex items-center justify-center py-16">
      <div className="w-[75%] bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
        <div className="w-full mx-auto p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Choose a Character Category
            </h1>
            <p className="text-xl text-gray-600">
              Select a category to explore different types of Indian characters!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {characterSubCategories.map((category, idx) => (
              <div 
                key={category.id}
                onClick={() => {
                  // const newPath = [...selectionPath.slice(0, 5), 'characters', category.id];
                  // setSelectionPath(newPath);
                  // console.log('Selection Path:', newPath);
                }}
                className={
                  `
                  ${category.color}
                  p-6 rounded-2xl
                  transition-all duration-300
                  transform hover:scale-105
                  cursor-pointer
                  border-2 border-transparent hover:border-gray-200
                `
                }
              >
                <Link href={`characters_sub-categories/${category.id}_sub-categories`}>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
