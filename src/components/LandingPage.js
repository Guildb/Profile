import React from "react";
import Header from "./Header";
import { Link } from "react-scroll";
import {
  FaLinkedin,
  FaGithub,
  FaChevronDown,
  FaPaperPlane,
} from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import { useTheme } from "../contexts/ThemeContext";

const socials = [
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

const LandingPage = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/${
          darkMode ? "dark-background.jpg" : "light-background.jpg"
        })`,
      }}
    >
      <Header />
      <div
        className={`flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center ${
          darkMode
            ? "bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90 text-white"
            : "bg-gradient-to-b from-white/60 via-white/30 to-slate-100/90 text-slate-900"
        }`}
      >
        <div
          className={`w-full max-w-3xl rounded-3xl border p-8 shadow-2xl backdrop-blur-md sm:p-10 ${
            darkMode
              ? "border-white/10 bg-slate-900/50"
              : "border-white/60 bg-white/50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
            Welcome to my portfolio
          </p>
          <h1 className="font-display mt-4 text-4xl font-extrabold sm:text-6xl">
            Hi, I'm <span className="gradient-text">Renato Cardoso</span>
          </h1>
          <p className="mt-4 text-lg font-semibold sm:text-xl">
            Web Support Engineer at ICAAL · Software Engineer
          </p>
          <p
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Take a look around my page to see what I've been working on and
            learn a bit more about me. If you want to connect or chat about
            potential collaborations, don't hesitate to reach out. I'd love to
            hear from you!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="contact-info"
              smooth={true}
              duration={1000}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <FaPaperPlane className="h-4 w-4" />
              Get in touch
            </Link>
            <Link
              to="projects"
              smooth={true}
              duration={1000}
              offset={-80}
              className={`cursor-pointer rounded-full border px-6 py-3 font-semibold transition-transform duration-300 hover:scale-105 ${
                darkMode
                  ? "border-white/30 hover:bg-white/10"
                  : "border-slate-400/60 hover:bg-white/70"
              }`}
            >
              View my work
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            {socials.map(({ href, icon: Icon, label, download }) => (
              <a
                key={label}
                href={href}
                download={download ? true : undefined}
                target={download ? undefined : "_blank"}
                rel={download ? undefined : "noopener noreferrer"}
                aria-label={label}
                title={label}
                className={`flex h-12 w-12 items-center justify-center rounded-full border shadow-md transition-all duration-300 hover:-translate-y-1 hover:text-blue-500 ${
                  darkMode
                    ? "border-white/10 bg-slate-800/70"
                    : "border-white/60 bg-white/70"
                }`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <Link
          to="about"
          smooth={true}
          duration={1000}
          offset={-80}
          aria-label="Scroll to About"
          className="absolute bottom-6 hidden cursor-pointer sm:block"
        >
          <FaChevronDown
            className={`h-6 w-6 animate-bounce ${
              darkMode ? "text-white/80" : "text-slate-700/80"
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
