import React from 'react';

const SocialMediaLinks = ({ links }) => {
  return (
    <div className="text-center my-4">
      {Object.entries(links).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-blue-500"
        >
          {platform}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
