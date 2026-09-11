import React from "react";
import * as motionReact from "motion/react";
import ProfilePicture from "./ProfilePicture";
import SectionHeading from "./SectionHeading";
import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";
import { revealUp } from "../lib/motion";
import { facts } from "../data/profile";

const { motion } = motionReact;

const Bio = () => {
  return (
    <div className="text-center py-12 px-4">
      <SectionHeading id="about-heading" eyebrow="Who I am" title="About Me" />
      <Reveal as="p" className="text-lg mt-2 max-w-3xl mx-auto text-muted">
        I'm a Portuguese software engineer based in the UK, currently working
        as a Web Support Engineer at ICAAL. After graduating with a
        first-class honours degree in Software Engineering, I now spend my
        days building and supporting modern, robust websites. I'm passionate
        about coding and always eager to take on new challenges and projects.
      </Reveal>
      <div className="flex flex-col md:flex-row items-center justify-center my-12 w-full gap-8">
        <Reveal className="flex justify-center w-full md:w-1/2">
          <ProfilePicture />
        </Reveal>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Reveal as="ul" stagger className="list-none text-left space-y-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <motion.li key={label} variants={revealUp} className="flex items-center">
                <span className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon />
                </span>
                <span className="text-ink">
                  <span className="font-semibold">{label}: </span>
                  {value}
                </span>
              </motion.li>
            ))}
          </Reveal>
        </div>
      </div>
      <Reveal>
        <GlassPanel className="p-8 text-lg text-pretty max-w-4xl mx-auto text-ink">
          <p>
            I have vast experience with full-stack development and a solid
            skill-set in both front and back-end development, that empowers me to
            build and maintain complex web applications. My academic background
            and professional experience supporting live client websites have
            given me a deep understanding of diverse frameworks and technologies.
            In addition, my understanding of database management systems allows
            me to rapidly design, deploy, and maintain data storage solutions. My
            software knowledge goes beyond web development and I am skilled in a
            range of programming languages used to build robust software
            solutions. Lastly, I also possess hands-on experience in industry
            standard methodologies such as Agile and DevOps which enables me to
            collaborate well in teams and create high-quality software products.
            This complete understanding of software engineering principles,
            combined with my hands-on experience, enables me to tackle complex
            issues and provide unique solutions across many domains.
          </p>
        </GlassPanel>
      </Reveal>
    </div>
  );
};

export default Bio;
