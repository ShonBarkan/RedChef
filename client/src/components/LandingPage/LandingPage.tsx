import React from 'react';
import StuffCard from './StuffCard/StuffCard';

const stuffList = [
  {
    imgSrc: "/assets/me (2).png",
    title: "CalPal",
    catchyPhrase: "Let me help you track those calories and hit your goals!",
    description: "Your nutrition buddy, tracking calories, protein, and more to keep you on point.",
    navigateTo: "/CalPal",
  },
  {
    imgSrc: "/assets/jump.png",
    title: "MenuMuze",
    catchyPhrase: "Ready to craft delicious menus? I’m your creative partner!",
    description: "Your creative muse for writing menus and building delicious meal plans.",
    navigateTo: "/MenuMuze",
  },
];


const LandingPage: React.FC = () => {
  return (
    <section
      className="
        min-h-[calc(100vh-1.5rem)]
        flex flex-col justify-center items-center text-center
        px-4 py-4
        my-3
        max-w-6xl mx-auto
        bg-[rgba(255,248,249,0.85)] rounded-xl
        shadow-lg shadow-[rgba(169,117,154,0.25)]
        overflow-hidden
      "
    >
      <h1
        className="
          mb-4
          text-[2.5rem] font-extrabold
          text-[#E94B3C]
          drop-shadow-md
          font-poppins
          sm:text-3xl
          md:text-4xl
          lg:text-5xl
          xl:text-6xl
          max-w-full
          truncate
        "
        title="RedChef"
      >
        RedChef
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 w-full max-w-4xl text-left px-2 sm:px-4">
        <img
          src="/assets/chef.png"
          alt="Red Chef"
          className="
            w-32 h-32
            sm:w-36 sm:h-36
            md:w-44 md:h-44
            lg:w-52 lg:h-52
            xl:w-56 xl:h-56
            object-contain
            mx-auto md:mx-0
            flex-shrink-0
          "
          style={{ maxHeight: '30vh', maxWidth: '30vh' }}
        />
        <p className="text-[#333333] font-lato text-sm sm:text-base md:text-lg leading-snug max-w-xl">
          <span className="text-[#E94B3C] font-semibold">Hi, I am the Red Chef</span>
          , I’m here to inspire your culinary journey and help you cook with passion and precision. Together, we’ll track your meals, know your nutrition, and create menus that are truly yours. Meet my stuff below!
        </p>
      </div>

      <div
        className="
          flex flex-wrap
          gap-6
          justify-center
          w-full max-w-5xl
          px-2 sm:px-0
        "
      >
      {stuffList.map(({ imgSrc, title, catchyPhrase, description, navigateTo }, index) => (
        <StuffCard
          key={index}
          imgSrc={imgSrc}
          title={title}
          catchyPhrase={catchyPhrase}
          description={description}
          navigateTo={navigateTo}
        />
      ))}
      </div>
    </section>
  );
};

export default LandingPage;
