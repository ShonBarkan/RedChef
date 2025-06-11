import React, { useState } from 'react';
import MenuMuzeHero from './MenuMuzeHero/MenuMuzeHero';
import BuildMealForm from './BuildMealForm/BuildMealForm';
import Menu from './Menu/Menu';
import { MenuMuzeProvider } from './MenuMuzeContext';

const MenuMuzeContent: React.FC = () => {
  const [showPage, setShowPage] = useState<boolean>(false);

  return (
    <>
      <MenuMuzeHero setShowPage={setShowPage} showPage={showPage} />
      <div className="container mx-auto px-4 py-8">
        {showPage ? <BuildMealForm /> : <Menu />}
      </div>
    </>
  );
};

const MenuMuze: React.FC = () => {
  return (
    <MenuMuzeProvider>
      <MenuMuzeContent />
    </MenuMuzeProvider>
  );
};

export default MenuMuze;
