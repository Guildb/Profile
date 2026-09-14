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
      <Reveal as="p" className="text-lg mt-2 max-w-3xl mx-auto text-left text-muted">
        I'm a Portuguese software engineer based in Southampton, working as a
        Web Support Engineer at ICAAL, a web agency. After graduating with a
        first-class honours degree in Software Engineering, I now spend my
        days building and supporting client websites, with a growing share of
        SEO work. I'm passionate about coding and always keen to take on new
        challenges.
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
        <GlassPanel className="p-8 text-lg text-pretty max-w-4xl mx-auto text-left text-ink space-y-4">
          <p>
            At ICAAL I work across the whole stack on client websites. Day to
            day that means WordPress and Laravel, with PHP and MySQL behind the
            scenes and Tailwind on the front end: fixing issues on live sites,
            building new features, and making sure sites stay fast, secure and
            current. A growing part of my work is SEO, helping the sites we
            build get found and perform well in search.
          </p>
          <p>
            My degree gave me a broad foundation beyond that stack: React and
            Vue.js on the front end, Node.js and Python on the back end, and
            database design across several systems. I put it to work on
            projects like an automated project-allocation system for my final
            year, and a carbon-footprint measuring tool I built with DataMango.
          </p>
          <p>
            I've worked in Agile teams using DevOps practices, and I enjoy
            building that way: small steps, regular feedback, and software that
            holds up in real use.
          </p>
        </GlassPanel>
      </Reveal>
    </div>
  );
};

export default Bio;
