import React from 'react';

const ProfilePicture = ({ src }) => {
  return (
    <div className="flex justify-center my-4">
      <img className="rounded-full w-32 h-32" src={process.env.PUBLIC_URL + src} alt="Profile" />
    </div>
  );
};

export default ProfilePicture;
