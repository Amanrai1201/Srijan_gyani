'use client';
import React, { createContext, useContext, useState } from 'react';

type CategoryContextType = {
  selectionPath: string[];
  setSelectionPath: (path: string[]) => void;
};

const CategoryContext = createContext<CategoryContextType>({
  selectionPath: [],
  setSelectionPath: () => {},
});

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [selectionPath, setSelectionPath] = useState<string[]>([]);
  return (
    <CategoryContext.Provider
      value={{
        selectionPath,
        setSelectionPath,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}