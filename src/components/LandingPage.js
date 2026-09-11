import React from "react";
import Header from "./Header";
import {
  FaLinkedin,
  FaGithub,
  FaChevronDown,
  FaPaperPlane,
} from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";

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
  return (
    <div
      className="bg-theme-image relative min-h-screen bg-cover bg-center"
      style={{
        "--bg-image-light": `url(${process.env.PUBLIC_URL}/light-background.jpg)`,
        "--bg-image-dark": `url(${process.env.PUBLIC_URL}/dark-background.jpg)`,
      }}
    >
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white/60 via-white/30 to-canvas/90 px-4 py-24 text-center text-ink dark:from-black/60 dark:via-black/40">
        <div className="w-full max-w-3xl rounded-3xl border border-hairline bg-surface p-8 shadow-2xl backdrop-blur-md sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Welcome to my portfolio
          </p>
          <h1 className="font-display mt-4 text-4xl font-extrabold sm:text-6xl">
            Hi, I'm <span className="gradient-text">Renato Cardoso</span>
          </h1>
          <p className="mt-4 text-lg font-semibold sm:text-xl">
            Web Support Engineer at ICAAL · Software Engineer
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
            Take a look around my page to see what I've been working on and
            learn a bit more about me. If you want to connect or chat about
            potential collaborations, don't hesitate to reach out. I'd love to
            hear from you!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact-info"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-aurora1 to-aurora2 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <FaPaperPlane className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href="#projects"
              className="cursor-pointer rounded-full border border-hairline px-6 py-3 font-semibold transition-transform duration-300 hover:scale-105 hover:bg-white/70 dark:hover:bg-white/10"
            >
              View my work
            </a>
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-surface shadow-md transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <a
          href="#about"
          aria-label="Scroll to About"
          className="absolute bottom-6 hidden cursor-pointer sm:block"
        >
          <FaChevronDown className="h-6 w-6 animate-bounce text-ink/80" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
