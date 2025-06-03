import React from "react";
import {
  FaBirthdayCake,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaCity,
} from "react-icons/fa";
import ProfilePicture from "./ProfilePicture";

const Bio = () => {
  return (
    <div className="text-center mb-4 px-4">
      <h2
        className="text-2xl font-bold"
        data-aos="zoom-in-up"
        data-aos-easing="ease-in-sine"
      >
        About Me
      </h2>
      <p
        className="text-lg mt-2"
        data-aos="zoom-in-up"
        data-aos-easing="ease-in-sine"
      >
        I'm a Portuguese software engineer and I’ve just finished my degree in
        software engineering in the UK. I’m super excited to use everything I’ve
        learned to create robust and state of the art solutions. I’m passionate
        about coding and eager to take on new challenges and projects.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center my-8 w-full">
        <div
          className="flex justify-center w-full md:w-1/2 md:mr-8 mb-4 md:mb-0"
          data-aos="zoom-in-left"
          data-aos-easing="ease-in-sine"
        >
          <ProfilePicture />
        </div>
        <div
          className="w-full md:w-1/2 flex justify-center md:justify-start"
          data-aos="zoom-in-right"
          data-aos-easing="ease-in-sine"
        >
          <ul className="list-none text-left">
            <li className="flex items-center my-2">
              <FaBirthdayCake className="mr-2 text-blue-500" />
              Birthday: 09/11/1996
            </li>
            <li className="flex items-center my-2">
              <FaGraduationCap className="mr-2 text-blue-500" />
              Degree: Bachelor of Science with Honours First-Class
            </li>
            <li className="flex items-center my-2">
              <FaPhone className="mr-2 text-blue-500" />
              Phone: +44 7576623476
            </li>
            <li className="flex items-center my-2">
              <FaEnvelope className="mr-2 text-blue-500" />
              Email: renatoscardoso@outlook.com
            </li>
            <li className="flex items-center my-2">
              <FaCity className="mr-2 text-blue-500" />
              City: Southampton, UK
            </li>
          </ul>
        </div>
      </div>
      <div
        className="text-lg mt-2 text-justify"
        data-aos="zoom-in-down"
        data-aos-easing="ease-in-sine"
      >
        <p>
          I have vast experience with full-stack development and a solid
          skill-set in both front and back-end development, that empowers me to
          build and maintain complex web applications. My academic background
          and academic projects have given me a deep understanding
          of diverse frameworks and technologies. In addition, My
          understanding of database management systems, allows me to rapidly
          design, deploy, and maintain data storage solutions. My software
          knowledge goes beyond web development and I am
          skilled in a range of programming languages used to build robust
          software solutions. 
          Lastly, I also possess hands-on experience in industry standards
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
