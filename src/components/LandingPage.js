import React from "react";
import Header from "./Header";
import { useTheme } from "../contexts/ThemeContext";

const LandingPage = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`relative h-screen bg-cover bg-center ${
        darkMode ? "bg-dark-landing" : "bg-light-landing"
      }`}
      style={{
        backgroundImage: `url(${
          darkMode ? "/dark-background.jpg" : "/light-background.jpg"
        })`,
      }}
    >
      <Header />
      <div
        className={`flex flex-col items-center justify-center h-full ${
          darkMode
            ? "bg-black bg-opacity-50 text-white"
            : "bg-white bg-opacity-50 text-slate"
        }`}
      >
        <h1 className="text-4xl mt-4">Welcome </h1>
        <h1 className="text-4xl mt-4">I'm Renato Cardoso</h1>
        <p className="text-lg mt-2 text-center">
          Take a look around my page to see what I’ve been working on and learn
          a bit more about me. If you want to connect or chat about potential
          collaborations, don’t hesitate to reach out. I’d love to hear from
          you!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
