import {
  FaGamepad,
  FaTv,
  FaPrint,
  FaHammer,
  FaCampground,
  FaFire,
  FaUmbrellaBeach,
  FaCoffee,
  FaLaptopCode,
} from 'react-icons/fa';

export const interestGroups = [
  {
    title: 'Hobbies',
    items: [
      { icon: FaGamepad, label: 'Gaming' },
      { icon: FaTv, label: 'Netflix/Anime' },
      { icon: FaPrint, label: 'Play with my 3D Printer' },
      { icon: FaHammer, label: 'Get Handy (wood work)' },
    ],
  },
  {
    title: 'Likes',
    items: [
      { icon: FaCampground, label: 'Love the Outdoor (Camping or go for a walk)' },
      { icon: FaFire, label: 'A good pit fire with friends' },
      { icon: FaUmbrellaBeach, label: 'Beach day heads on that big waves' },
      { icon: FaCoffee, label: 'Coffee Lover' },
      { icon: FaLaptopCode, label: 'Techie' },
    ],
  },
];
