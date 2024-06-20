import React from "react";
import ProfilePicture from "./ProfilePicture";

const Bio = () => {
  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-bold">About Me</h2>
      <p className="text-lg mt-2 text-center">
        I'm a portuguese software engineer. I’ve just finished my degree in
        software engineering in the UK, and I’m super excited to start using
        what I’ve learned to create amazing solutions. I’m passionate about
        coding and always eager to take on new challenges and projects.
      </p>
      <div className="flex flex-col md:flex-row items-center my-4 text-center md:text-left w-full">
        <ProfilePicture src="profile.png" className="w-32 h-32 md:mr-8" />
        <div>
          <ul>
            <li>Birthday: 09/11/1996</li>
            <li>Degree: Bachelor of Science with Honours 1st</li>
            <li>Phone: +44 7576623476</li>
            <li>Email: renatoscardoso@outlook.com</li>
            <li>City: Southampton, UK</li>
          </ul>
        </div>
      </div>
      <div className="text-center my-4">
        <p>
          I have vast experience with full stack development and a solid skill
          set in both front-end and back-end development, allowing me to build
          and maintain complex web applications. My academic background and
          practical experience have given me a comprehensive understanding of
          diverse frameworks and technologies. In addition, I have a strong
          understanding of database management systems, allowing me to rapidly
          design, deploy, and maintain data storage solutions. My software
          development knowledge extends beyond web development, since I am
          skilled at using a range of programming languages to produce robust
          software solutions. My experience with software development
          methodologies such as Agile and DevOps enables me to collaborate well
          in teams and create high-quality software products. This complete
          understanding of software engineering principles, combined with my
          hands-on experience, enables me to tackle complex issues and provide
          unique solutions across many domains.
        </p>
      </div>
    </div>
  );
};

export default Bio;
