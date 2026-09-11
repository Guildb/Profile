import React from 'react';
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
import SectionHeading from './SectionHeading';

const interestGroups = [
  {
    title: 'Hobbies',
    aos: 'flip-left',
    items: [
      { icon: FaGamepad, label: 'Gaming' },
      { icon: FaTv, label: 'Netflix/Anime' },
      { icon: FaPrint, label: 'Play with my 3D Printer' },
      { icon: FaHammer, label: 'Get Handy (wood work)' },
    ],
  },
  {
    title: 'Likes',
    aos: 'flip-right',
    items: [
      { icon: FaCampground, label: 'Love the Outdoor (Camping or go for a walk)' },
      { icon: FaFire, label: 'A good pit fire with friends' },
      { icon: FaUmbrellaBeach, label: 'Beach day heads on that big waves' },
      { icon: FaCoffee, label: 'Coffee Lover' },
      { icon: FaLaptopCode, label: 'Techie' },
    ],
  },
];

const Interests = () => {
  return (
    <div className="text-center py-12 px-4">
      <SectionHeading
        eyebrow="A little bit more about myself"
        title="Interests"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {interestGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-hairline bg-surface p-6 text-left text-ink shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <h3 className="font-display text-2xl font-semibold mb-4">
              {group.title}
            </h3>
            <ul className="list-none space-y-3">
              {group.items.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center">
                  <span className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interests;
