'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCategory } from '@/app/context/CategoryContext';
import { useRouter } from 'next/navigation';

const cartoonSubCategories = [
  {
    id: 'indian',
    name: 'indian',
    description: 'Indian famous cartoons',
    color: 'bg-orange-50 hover:bg-orange-100',
    image: '/things_gemini.jpg'
  },
  {
    id: 'japanese',
    name: 'japanese',
    description: 'Some popular japanese cartoons or ',
    color: 'bg-amber-50 hover:bg-amber-100',
    image: '/things_gemini.jpg'
  },
  // {
  //   id: 'others',
  //   name: 'Others',
  //   description: 'Other sports and games',
  //   color: 'bg-gray-50 hover:bg-gray-100',
  //   image: '/things_gemini.jpg'
  // }
];

export default function cartoonsubCategories() {
  const router = useRouter();
  const { selectionPath, setSelectionPath } = useCategory();
  return (
    <div className="w-full mx-auto p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Sports Category
        </h1>
        <p className="text-xl text-gray-600">
          Select a specific sports category or create your own!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cartoonSubCategories.map((category, idx) => (
          <Link
            href={`cartoon_sub-categories/${category.id}_sub-categories`}
            key={category.id}
            // onClick={() => {
            //   const newPath = ["cartoon","indian_cartoon",category.id];
            //   selectionPath.splice(0, 4, ...newPath);
            //   setSelectionPath(selectionPath);
            //   console.log('Selection Path:', selectionPath);
            //   router.push(`game/question`);
            // }}
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
          </Link>
        ))}
      </div>
    </div>
  );
}