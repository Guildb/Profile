import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import Reveal from "./ui/Reveal";
import GlassPanel from "./ui/GlassPanel";
import TiltCard from "./ui/TiltCard";
import useGitHubRepos from "../hooks/useGitHubRepos";
import { projects } from "../data/projects";

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const formatRecency = (updatedAt) => {
  const then = new Date(updatedAt).getTime();
  if (Number.isNaN(then)) return null;
  const days = Math.round((then - Date.now()) / MS_PER_DAY);
  if (Math.abs(days) < 30) return relativeTimeFormatter.format(days, "day");
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return relativeTimeFormatter.format(months, "month");
  const years = Math.round(days / 365);
  return relativeTimeFormatter.format(years, "year");
};

// Alternating accent/aurora tokens at descending opacity so segments stay
// distinguishable even for repos with several languages.
const LANGUAGE_SEGMENT_CLASSES = [
  "bg-accent",
  "bg-aurora2",
  "bg-aurora1",
  "bg-accent/60",
  "bg-aurora2/60",
];

const LanguageBar = ({ languages }) => {
  if (!languages || languages.length === 0) return null;
  const summary = languages.map((lang) => `${lang.name} ${lang.percent}%`).join(", ");

  return (
    <div className="mt-5">
      <div
        className="flex h-1.5 w-full overflow-hidden rounded-full bg-canvas"
        role="img"
        aria-label={summary}
      >
        {languages.map((lang, index) => (
          <span
            key={lang.name}
            aria-hidden="true"
            className={LANGUAGE_SEGMENT_CLASSES[index % LANGUAGE_SEGMENT_CLASSES.length]}
            style={{ width: `${lang.percent}%` }}
          />
        ))}
      </div>
      <p className="sr-only">{summary}</p>
    </div>
  );
};

const ProjectCard = ({ project, meta, status }) => {
  const enriched = status === "ready" ? meta : undefined;
  const recency = enriched?.updatedAt ? formatRecency(enriched.updatedAt) : null;

  return (
    <TiltCard maxTilt={9} className="w-full rounded-3xl">
      <GlassPanel className="overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-aurora1 to-aurora2" />
        <div className="p-6 text-left sm:p-8">
          <h3 className="font-display text-2xl font-semibold text-ink">
            {project.title}
          </h3>
          <p className="mt-4 text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-sm font-medium text-ink"
              >
                <Icon className={`text-lg ${color}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {enriched && <LanguageBar languages={enriched.languages} />}
          {enriched && recency && (
            <p className="mt-2 text-xs text-muted">Updated {recency}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <FaGithub className="text-base" aria-hidden="true" />
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
              >
                <FaExternalLinkAlt className="text-sm" aria-hidden="true" />
                Live demo
              </a>
            )}
          </div>
        </div>
      </GlassPanel>
    </TiltCard>
  );
};

const Projects = () => {
  const repoSlugs = React.useMemo(() => projects.map((project) => project.repo), []);
  const { data, status } = useGitHubRepos(repoSlugs);

  return (
    <div className="text-center py-12 px-4">
      <SectionHeading id="projects-heading" eyebrow="What I've built" title="My Projects" />
      <div className="flex flex-col items-center space-y-10">
        {projects.map((project) => (
          <Reveal key={project.title} className="w-full flex justify-center lg:w-2/3">
            <ProjectCard project={project} meta={data[project.repo]} status={status} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Projects;
