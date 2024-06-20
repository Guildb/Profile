import React from 'react';
import { FaGamepad, FaTv, FaPrint, FaHammer, FaCampground, FaFire, FaUmbrellaBeach, FaCoffee, FaLaptopCode } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Interests = () => {
  const { darkMode } = useTheme();

  const cardClass = darkMode
    ? 'bg-slate-700 text-white shadow-lg rounded-lg p-6'
    : 'bg-white text-black shadow-lg rounded-lg p-6';

  const iconClass = darkMode ? 'text-blue-400' : 'text-blue-500';

  return (
    <div className={`text-center my-8 px-4 `}>
      <h2 className="text-3xl font-bold mb-8">Interests</h2>
      <h2 className="text-2xl font-semibold mb-4">A little bit more about myself</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className={cardClass} data-aos="flip-left" data-aos-delay="300">
          <h3 className="text-2xl font-semibold mb-4">Hobbies</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <FaGamepad className={`mr-2 ${iconClass}`} />
              Gaming
            </li>
            <li className="flex items-center">
              <FaTv className={`mr-2 ${iconClass}`} />
              Netflix/Anime
            </li>
            <li className="flex items-center">
              <FaPrint className={`mr-2 ${iconClass}`} />
              Play with my 3D Printer
            </li>
            <li className="flex items-center">
              <FaHammer className={`mr-2 ${iconClass}`} />
              Get Handy (wood work)
            </li>
          </ul>
        </div>
        <div className={cardClass} data-aos="flip-right" data-aos-delay="300">
          <h3 className="text-2xl font-semibold mb-4">Likes</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <FaCampground className={`mr-2 ${iconClass}`} />
              Love the Outdoor (Camping or go for a walk)
            </li>
            <li className="flex items-center">
              <FaFire className={`mr-2 ${iconClass}`} />
              A good pit fire with friends
            </li>
            <li className="flex items-center">
              <FaUmbrellaBeach className={`mr-2 ${iconClass}`} />
              Beach day heads on that big waves
            </li>
            <li className="flex items-center">
              <FaCoffee className={`mr-2 ${iconClass}`} />
              Coffee Lover
            </li>
            <li className="flex items-center">
              <FaLaptopCode className={`mr-2 ${iconClass}`} />
              Techie
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Interests;
