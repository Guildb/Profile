import React from 'react';

const ProfilePicture = ({ src }) => {
  return (
    <div className="flex justify-center">
      <img className="w-60 rounded-full" 
            src="profile.png" alt="Profile" />
    </div>
  );
};

export default ProfilePicture;
