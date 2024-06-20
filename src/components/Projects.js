import React from 'react';

const Projects = ({ projects }) => {
  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index} className="my-2">
            <h3 className="text-xl">{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
