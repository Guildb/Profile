import {
  FaPython,
  FaVuejs,
  FaDocker,
  FaNodeJs,
  FaBootstrap,
  FaDatabase,
  FaFlask,
  FaJs,
} from "react-icons/fa";

export const projects = [
  {
    title: "Matching Project Allocation System",
    repo: "Guildb/AI_Based_Project_Allocation",
    demo: null,
    description:
      "This was my final year project, where I developed an application to automate a manual process at my university. The web application allowed students to add their idea for the final year project and automatically be assigned a tutor, and the tutor could suggest projects for students.",
    tech: [
      { icon: FaPython, label: "Python", color: "text-yellow-500" },
      { icon: FaVuejs, label: "Vue.js", color: "text-emerald-500" },
      { icon: FaJs, label: "JavaScript", color: "text-yellow-400" },
      { icon: FaDocker, label: "Docker", color: "text-sky-500" },
      { icon: FaFlask, label: "Flask", color: "text-slate-400" },
      { icon: FaDatabase, label: "PostgreSQL", color: "text-sky-600" },
    ],
  },
  {
    title: "3DPrinting",
    repo: "Guildb/COM519_3dprintings",
    demo: null,
    description:
      "Managing 3D printing orders as part of a university project that gives you access to each order and the file that needs to be printed.",
    tech: [
      { icon: FaNodeJs, label: "Node.js", color: "text-green-500" },
      { icon: FaBootstrap, label: "Bootstrap", color: "text-purple-500" },
      { icon: FaJs, label: "JavaScript", color: "text-yellow-400" },
      { icon: FaDatabase, label: "MongoDB", color: "text-green-500" },
    ],
  },
];
