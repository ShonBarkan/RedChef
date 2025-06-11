import React from 'react';
import { useNavigate } from 'react-router-dom';

interface StuffCardProps {
  imgSrc: string;
  title: string;
  catchyPhrase: string;
  description: string;
  navigateTo: string;
}

const StuffCard: React.FC<StuffCardProps> = ({
  imgSrc,
  title,
  catchyPhrase,
  description,
  navigateTo,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 h-40 sm:h-36 cursor-pointer">
      {/* Large screen: flip effect */}
      <div className="hidden sm:block group perspective w-full h-full">
        <div className="relative w-full h-full duration-700 transform-style preserve-3d group-hover:rotate-y-180">
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-md flex items-center gap-4 p-4">
            <img src={imgSrc} className="w-20 h-20 object-contain rounded-lg" />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-[#E94B3C]">{title}</h3>
              <p className="text-sm text-gray-600">{catchyPhrase}</p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-[#E94B3C] text-white rounded-xl shadow-md p-6 rotate-y-180 flex flex-col justify-between">
            <p className="text-sm leading-relaxed">{description}</p>
            <button
              onClick={() => navigate(navigateTo)}
              className="mt-4 self-start bg-white text-[#E94B3C] font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
            >
              Go to {title} Area
            </button>
          </div>
        </div>
      </div>

      {/* Small screen: simple layout */}
      <div className="sm:hidden bg-white rounded-xl shadow-md flex flex-col items-center justify-between p-4 h-full">
        <img src={imgSrc} className="w-16 h-16 object-contain rounded-lg" />
        <button
          onClick={() => navigate(navigateTo)}
          className="ml-2 bg-[#E94B3C] text-white font-semibold px-3 py-1.5 rounded-lg shadow-md text-sm"
        >
          Go to {title} Area
        </button>
      </div>
    </div>
  );
};

export default StuffCard;
