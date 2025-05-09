'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCategory } from '../../context/CategoryContext';

const categories = [
  {
    id: "animals", // Changed from number to descriptive string
    name: 'Animal',
    description: 'Guess Indian wildlife and domestic animals',
    color: 'bg-emerald-50 hover:bg-emerald-100',
    image: '/animals_image.jpg'
  },
  {
    id: "characters",
    name: 'Character',
    description: 'Mythological, Historical & Fictional Indian figures',
    color: 'bg-purple-50 hover:bg-purple-100',
    image: '/characters_image.jpg'
  },
  {
    id: "objects",
    name: 'Object',
    description: 'Traditional Indian items and artifacts',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/things_image.jpg'
  }
];

export default function Category() {
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Gyani
        </h1>
        <p className="text-xl text-gray-600">
          Choose a category and I'll try to guess what you're thinking of!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            href={`${category.id}_sub-categories`} 
            key={category.id}
            onClick={() => {
              // const newPath = [...selectionPath.slice(0, 5), category.id];
              // setSelectionPath(newPath);
              // console.log('Selection Path:', newPath);
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
            `}>
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