import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-canvas text-ink">
      <div className="h-1 w-full bg-gradient-to-r from-aurora1 to-aurora2" />
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="font-display text-2xl font-bold mb-1">
            Renato <span className="gradient-text">Cardoso</span>
          </h2>
          <p className="text-sm text-muted">
            Web Support Engineer at ICAAL · Software Engineer
          </p>
        </div>
        <div className="flex space-x-3">
          <a
            href="https://github.com/Guildb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface transition-all duration-300 hover:-translate-y-1 hover:text-accent"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/renato-cardoso-1b94ba152/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface transition-all duration-300 hover:-translate-y-1 hover:text-accent"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href="mailto:renatoscardoso@outlook.com"
            aria-label="Email"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface transition-all duration-300 hover:-translate-y-1 hover:text-accent"
          >
            <FaEnvelope className="text-xl" />
          </a>
        </div>
      </div>
      <div className="pb-6 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Renato Cardoso. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
