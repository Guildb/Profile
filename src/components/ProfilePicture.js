import React from 'react';

// Portrait frame for a tall source photo (640x1336). The frame is 4:5
// (256x320) so it shows hair through beard rather than a tight square.
//
// Crop maths: object-cover scales the photo to 256px wide, i.e. 534px tall,
// leaving 214px of vertical overflow. Anchoring at 34% puts source y~180 at
// the top edge, giving ~70px of headroom above the hair and running down to
// the neckline. `object-top` would instead show ~250px of empty sky and cut
// the beard off.
//
// Height is set explicitly (h-80) rather than via aspect-ratio: the img's
// intrinsic width/height attributes are presentational hints, and without a
// CSS height the 1336px hint would win.
const ProfilePicture = () => (
  <div className="relative h-80 w-64 shrink-0">
    <div
      aria-hidden="true"
      className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-aurora1 via-aurora2 to-accent opacity-60 blur-2xl"
    />
    <picture>
      <source srcSet={`${process.env.PUBLIC_URL}/profile-web.webp`} type="image/webp" />
      <img
        className="relative block h-80 w-64 rounded-3xl border-4 border-hairline object-cover object-[50%_34%] shadow-2xl"
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
