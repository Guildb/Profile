import React from 'react';

const EducationExperience = ({ education, experience }) => {
  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-bold">Education</h2>
      <ul>
        {education.map((edu, index) => (
          <li key={index} className="my-2">
            <h3 className="text-xl">{edu.degree}</h3>
            <p>{edu.institution}</p>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold">Experience</h2>
      <ul>
        {experience.map((exp, index) => (
          <li key={index} className="my-2">
            <h3 className="text-xl">{exp.jobTitle}</h3>
            <p>{exp.company}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationExperience;
