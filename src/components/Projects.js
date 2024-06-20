import React from "react";

const Projects = () => {
  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-bold">My Projects</h2>
      <ul>
        <h3 className="font-bold">Matching Project Allocation System</h3>
        <li>
          This was my final year project, where I developed a landing project
          allocation application to automate a manual process at my university.
          Students could add their final year project and automatically be
          assigned a tutor, and the tutor could suggest projects for students if
          they had no idea.
        </li>
        <li>Python Vue.js Tailwind JavaScript Docker Flask PostgresSQL</li>
      </ul>

      <ul>
        <h3 className="font-bold">3DPrinting</h3>
        <li>
          Managing 3D printing orders as part of a university project that gives
          you access to each order and the file that needs to be made
        </li>
        <li>Express Node.js Bootstrap  JavaScript  MongoDB</li>
      </ul>
    </div>
  );
};

export default Projects;
