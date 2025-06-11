import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { MealData } from '../../types/meal';

interface MenuMuzeContextType {
  mealData: MealData | null;
  setMealData: (data: MealData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const MenuMuzeContext = createContext<MenuMuzeContextType | undefined>(undefined);

export const MenuMuzeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mealData, setMealData] = useState<MealData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <MenuMuzeContext.Provider
      value={{
        mealData,
        setMealData,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </MenuMuzeContext.Provider>
  );
};

export const useMenuMuze = () => {
  const context = useContext(MenuMuzeContext);
  if (context === undefined) {
    throw new Error('useMenuMuze must be used within a MenuMuzeProvider');
  }
  return context;
}; 