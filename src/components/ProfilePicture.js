import React from 'react';

const ProfilePicture = () => (
  <div className="relative">
    <div
      aria-hidden="true"
      className="absolute -inset-3 rounded-full bg-gradient-to-tr from-aurora1 via-aurora2 to-accent opacity-60 blur-2xl"
    />
    <picture>
      <source srcSet={`${process.env.PUBLIC_URL}/profile-web.webp`} type="image/webp" />
      <img
        className="relative w-60 rounded-full border-4 border-hairline object-cover object-top shadow-2xl"
        src={`${process.env.PUBLIC_URL}/profile-web.jpg`}
        alt="Renato Cardoso"
        width="640"
        height="1336"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>
);

export default ProfilePicture;
