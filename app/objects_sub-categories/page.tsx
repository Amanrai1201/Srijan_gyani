'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/app/context/CategoryContext';

const objectSubCategories = [
  {
    id: 'Electronics gadgets',
    name: 'Electronics gadgets',
    description: 'daily use electronics gadgets',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/electronic_image.jpg'
  },
  {
    id: 'Kitchen utensils',
    name: 'Kitchen utensils',
    description: 'Popular kitchen utensils and appliances',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/kitchen_image.jpg'
  },
  {
    id: 'Stationary Products',
    name: 'Stationary Products',
    description: 'Office and school stationary items',
    color: 'bg-rose-50 hover:bg-rose-100',
    image: '/stationary_image.jpg'
  },
  {
    id: 'clothing',
    name: 'Traditional Clothing',
    description: 'Indian traditional attire and accessories',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/cloths_image.jpg'
  },
  {
    id: 'Tools  and Instruments',
    name: 'Tools and Instruments',
    description: 'Industrial and domestic tools and instruments',
    color: 'bg-indigo-50 hover:bg-indigo-100',
    image: '/tools_image.jpg'
  },
  // {
  //   id: 'others',
  //   name: 'Others',
  //   description: 'Add your own object category',
  //   color: 'bg-gray-50 hover:bg-gray-100',
  //   image: '/things_gemini.jpg'
  // }
];

export default function ObjectSubCategories() {
  const router = useRouter();
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Object Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a specific object category or create your own!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {objectSubCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              const newPath = ["object", category.id];
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