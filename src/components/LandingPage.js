import React, { useRef } from "react";
import * as motionReact from "motion/react";
import Header from "./Header";
import AuroraBackground from "./ui/AuroraBackground";
import Spotlight, { useSpotlightTracking } from "./ui/Spotlight";
import GlassPanel from "./ui/GlassPanel";
import { springs, revealStagger, revealUp } from "../lib/motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { FaChevronDown, FaPaperPlane } from "react-icons/fa";
import { profile, socials } from "../data/profile";

const { motion, useMotionValue, useScroll, useTransform } = motionReact;

const nameWords = profile.name.split(" ");

const LandingPage = () => {
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const handlePointerMove = useSpotlightTracking(rawX, rawY);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const panelBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(8px)"]
  );
  const panelStyle = prefersReduced
    ? undefined
    : { y: panelY, opacity: panelOpacity, filter: panelBlur };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={prefersReduced ? undefined : handlePointerMove}
      className="relative min-h-screen overflow-hidden bg-canvas"
    >
      {/* z-1 layer: a textured photo sitting beneath the aurora, not a
          full-bleed wash. Kept at low opacity so the aurora reads as the
          dominant surface. This is the LCP candidate: eager, high priority,
          never lazy-loaded. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <picture>
          <source
            srcSet={`${process.env.PUBLIC_URL}/dark-background.webp`}
            type="image/webp"
            media="(prefers-color-scheme: dark)"
          />
          <source
            srcSet={`${process.env.PUBLIC_URL}/light-background.webp`}
            type="image/webp"
          />
          <img
            src={`${process.env.PUBLIC_URL}/dark-background.jpg`}
            alt=""
            fetchpriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover opacity-20"
          />
        </picture>
      </div>

      {/* z0: the animated aurora mesh, above the photo. */}
      <AuroraBackground className="z-[1]" />

      {/* z1: the pointer-tracked dot grid aperture. */}
      <Spotlight className="z-[2]" rawX={rawX} rawY={rawY} />

      <Header />

      {/* z2: content, in a glass panel with a gradient hairline border. */}
      <div className="relative z-[3] flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center text-ink">
        <GlassPanel
          as={motion.div}
          style={panelStyle}
          className="w-full max-w-3xl p-8 sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Welcome to my portfolio
          </p>

          <h1 className="font-display mt-4 text-hero font-extrabold">
            {prefersReduced ? (
              profile.name
            ) : (
              <>
                <motion.span
                  aria-hidden="true"
                  className="inline-flex flex-wrap items-baseline justify-center gap-x-4"
                  variants={revealStagger}
                  initial="hidden"
                  animate="visible"
                >
                  {nameWords.map((word) => (
                    <motion.span
                      key={word}
                      variants={revealUp}
                      transition={springs.snappy}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
                <span className="sr-only">{profile.name}</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-lg font-semibold sm:text-xl">
            {profile.role} · {profile.discipline}
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
        </GlassPanel>

        <a
          href="#about"
          aria-label="Scroll to About"
          className="absolute bottom-6 hidden cursor-pointer sm:block"
        >
          <FaChevronDown className="h-6 w-6 animate-bounce text-ink/80" />
        </a>
      </div>
    </section>
  );
};

export default LandingPage;
