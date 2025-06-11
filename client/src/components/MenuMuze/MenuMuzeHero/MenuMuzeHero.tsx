import React from "react";

interface MenuMuzeHeroProps {
  setShowPage: (value: boolean) => void;
  showPage: boolean;
}

const MenuMuzeHero: React.FC<MenuMuzeHeroProps> = ({ setShowPage, showPage }) => {
  return (
    <section className="w-full max-w-6xl bg-[rgba(255,248,249,0.9)] rounded-xl shadow-md px-4 sm:px-6 py-8 sm:py-12 text-center mx-auto my-4 sm:my-6">
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <img
          src="/assets/menumuze.png"
          alt="MenuMuze Character"
          className="w-32 sm:w-44 md:w-56 lg:w-64 object-contain"
          style={{ maxHeight: "30vh" }}
        />
        {/* Text Content */}
        <div className="flex-1">
          <h1 className="text-[#E94B3C] text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins mb-3 sm:mb-4 drop-shadow-sm">
            Welcome to MenuMuze
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-lato max-w-xl mx-auto">
            Your creative kitchen companion for crafting personalized meal plans and daily menus.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowPage(true)}
              className={`font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition-all text-sm sm:text-base ${
                showPage
                  ? 'bg-[#E94B3C] text-white hover:bg-[#d23e2e]'
                  : 'bg-white text-[#E94B3C] border border-[#E94B3C] hover:bg-gray-100'
              }`}
            >
              Let's Build a Meal
            </button>
            <button
              onClick={() => setShowPage(false)}
              className={`font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition-all text-sm sm:text-base ${
                !showPage
                  ? 'bg-[#E94B3C] text-white hover:bg-[#d23e2e]'
                  : 'bg-white text-[#E94B3C] border border-[#E94B3C] hover:bg-gray-100'
              }`}
            >
              Open Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuMuzeHero;
