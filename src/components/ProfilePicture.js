import React from 'react';

const ProfilePicture = ({ src }) => {
  return (
    <div className="flex justify-center">
      <img className="w-60 rounded-full" 
            src={process.env.PUBLIC_URL + src} alt="Profile" />
    </div>
  );
};

export default ProfilePicture;
