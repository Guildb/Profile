import React from 'react';

const ProfilePicture = () => {
  return (
    <div className="flex justify-center">
      <div className="relative animate-float">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 opacity-70 blur-md" />
        <img
          className="relative w-60 rounded-full border-4 border-white object-cover object-top shadow-xl dark:border-slate-800"
          src={`${process.env.PUBLIC_URL}/profile-web.jpg`}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
