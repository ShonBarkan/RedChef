import React from "react";
import { useNavigate } from "react-router-dom";

const MenuMuzeHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[rgba(255,248,249,0.9)] rounded-xl shadow-md px-6 py-12 text-center max-w-6xl mx-auto my-6">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
              <img
              src="/assets/jump.png"
              alt="MenuMuze Character"
              className="w-44 sm:w-56 lg:w-64 object-contain mb-4"
              style={{ maxHeight: "30vh" }}
              />
        {/* Text Content */}
        <div className="flex-1">
          <h1 className="text-[#E94B3C] text-4xl sm:text-5xl font-extrabold font-poppins mb-4 drop-shadow-sm">
            Welcome to MenuMuze
          </h1>
          <p className="text-gray-700 text-base sm:text-lg font-lato max-w-xl mx-auto">
            Your creative kitchen companion for crafting personalized meal plans and daily menus.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/MenuMuze/menu-builder")}
              className="bg-[#E94B3C] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#d23e2e] transition-all"
            >
              Let’s Build a Meal
            </button>
            <button
              onClick={() => navigate("/MenuMuze/menu")}
              className="bg-white text-[#E94B3C] font-semibold px-6 py-3 rounded-lg shadow-md border border-[#E94B3C] hover:bg-gray-100 transition-all"
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
