import React from 'react';

const Interests = ({ items }) => {
  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-bold">Interests</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="my-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Interests;
