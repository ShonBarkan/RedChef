import React from 'react';
import MenuMuzeHero from './MenuMuzeHero/MenuMuzeHero';
import BuildMealForm from './BuildMealForm/BuildMealForm';
import { MenuMuzeProvider } from './MenuMuzeContext';

const MenuMuze: React.FC = () => {
  return (
    <MenuMuzeProvider>
      <MenuMuzeHero />
      <div className="container mx-auto px-4 py-8">
        <BuildMealForm />
      </div>
    </MenuMuzeProvider>
  );
};

export default MenuMuze;
