import {
  FaBirthdayCake,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaCity,
  FaBriefcase,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";

export const profile = {
  name: "Renato Cardoso",
  role: "Web Support Engineer at ICAAL",
  discipline: "Software Engineer",
  location: "Southampton, UK",
  email: "renatoscardoso@outlook.com",
  phone: "+44 7576623476",
  github: "https://github.com/Guildb",
  linkedin: "https://www.linkedin.com/in/renato-cardoso-1b94ba152/",
};

export const facts = [
  {
    icon: FaBriefcase,
    label: "Work",
    value: "Web Support Engineer at ICAAL",
  },
  {
    icon: FaGraduationCap,
    label: "Degree",
    value: "BSc (Hons) First-Class, Software Engineering",
  },
  {
    icon: FaBirthdayCake,
    label: "Birthday",
    value: "09/11/1996",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+44 7576623476",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "renatoscardoso@outlook.com",
  },
  {
    icon: FaCity,
    label: "City",
    value: "Southampton, UK",
  },
];

export const socials = [
  {
    href: "https://www.linkedin.com/in/renato-cardoso-1b94ba152/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/Guildb",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: `${process.env.PUBLIC_URL}/CV.pdf`,
    icon: TbFileCv,
    label: "Download CV",
    download: true,
  },
];
