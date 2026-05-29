import { useState, useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}
import jeremyImg from './assets/professional photo.png';
import resumePdf from './assets/Jeremy_Villa_Resume.pdf';

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    n: "01",
    name: "Event RSVP",
    blurb: "Event Management & RSVP tracking App with guest lists, invites, and live attendance counts.",
    stack: ["ASP.NET Core", "React", "PostgreSQL", "AWS"],
    url: "rsvp.villa-dev.com",
  },
  {
    n: "02",
    name: "Calorie Tracker",
    blurb: "Personal Macro & Nutrition PWA for logging meals, tracking daily targets, and review trends offline.",
    stack: ["Java 21 · Spring Boot", "React · Vite", "PostgreSQL", "AWS"],
    url: "calorietracker.villa-dev.com",
  },
  {
    n: "03",
    name: "Table Mimic",
    blurb: "A D&D tabletop RPG companion for managing characters with future plans for a session mode",
    stack: ["Java · Spring Boot", "Angular 14", "AWS"],
    url: "table-mimic.villa-dev.com",
  },
];

const SKILLS = [
  "Java", "Spring Boot", "React", "Angular", "TypeScript",
  "PostgreSQL", "AWS", "Terraform", "Docker",
];

const ACCENTS = {
  Emerald: "52 211 153",
  "Electric Blue": "59 130 246",
  Violet: "139 122 246",
  Amber: "245 178 66",
};

function SectionLabel({ n, children }) {
  return (
    <div className="flex items-center gap-3 mb-8 sm:mb-12">
      <span className="font-mono text-accent text-sm">{n}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
        {children}
      </span>
      <span className="h-px flex-1 bg-hair" />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-40 transition-colors duration-300 " +
        (scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-hair"
          : "bg-transparent border-b border-transparent")
      }
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm">
          <span className="text-accent">{"</>"}</span>
          <span className="font-semibold tracking-tight text-neutral-100">villa-dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={"#" + item.id}
              className="font-mono text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              <span className="text-accent/70">#</span>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-mono text-sm px-4 py-1.5 rounded-md border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
          >
            Let's talk
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <span className={"h-px w-6 bg-neutral-300 transition-transform " + (open ? "translate-y-[7px] rotate-45" : "")} />
          <span className={"h-px w-6 bg-neutral-300 transition-opacity " + (open ? "opacity-0" : "")} />
          <span className={"h-px w-6 bg-neutral-300 transition-transform " + (open ? "-translate-y-[7px] -rotate-45" : "")} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-ink/95 backdrop-blur-md border-b border-hair px-6 py-4 flex flex-col gap-4">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={"#" + item.id}
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-neutral-300"
            >
              <span className="text-accent/70">#</span>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden grid-texture">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[760px] rounded-full blur-[120px]"
        style={{ background: "rgb(var(--accent-rgb) / 0.16)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />

      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-28 sm:pt-48 sm:pb-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-mono text-sm text-accent mb-6 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Available for new projects
            </p>

            <h1 className="font-sans font-bold tracking-tight text-neutral-50 text-5xl sm:text-7xl lg:text-[5rem] leading-[0.95]">
              Jeremy Villa
            </h1>

            <p className="mt-5 font-mono text-lg sm:text-xl text-neutral-400">
              Full Stack Developer
            </p>

            <p className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-neutral-300 text-pretty">
              I build Full Stack applications for Enterprise Solutions. Almost a decade of designing resilient
              backends, robust frontends, and the AWS infrastructure that ties them together.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={resumePdf}
                download="Jeremy_Villa_Resume.pdf"
                className="shake-periodic group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-ink hover:brightness-110 transition"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-hair px-6 py-3 font-mono text-sm text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md border border-hair px-6 py-3 font-mono text-sm text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition"
              >
                View Projects
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-full border border-hair bg-panel"
                style={{ boxShadow: "0 0 0 6px #0c0c0d, 0 0 0 7px rgb(var(--accent-rgb) / 0.35), 0 30px 80px -30px rgb(var(--accent-rgb) / 0.4)" }}
              >
                <img
                  src={jeremyImg}
                  alt="Jeremy Villa"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "38% 0%", transform: "scale(1.18)", transformOrigin: "center top" }}
                />
              </div>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 rounded-md border border-hair bg-ink px-3 py-1.5 font-mono text-xs text-neutral-400 whitespace-nowrap">
                <span className="text-accent">●</span> villa-dev.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useReveal();
  return (
    <section id="about" className="scroll-target mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div ref={ref} className="reveal">
      <SectionLabel n="01">About</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <p className="text-2xl sm:text-3xl leading-snug text-neutral-200 text-pretty font-sans">
          I specialize in shipping{" "}
          <span className="text-accent">production-grade full stack applications</span>{" "}
          on AWS, with <span className="text-neutral-50">Java</span> on the backend and{" "}
          <span className="text-neutral-50">React</span> on the front. From schema to deploy
          pipeline, I care about systems that stay fast, observable, and easy to maintain
          long after launch.
        </p>
        <div className="font-mono text-sm space-y-4 self-end">
          <div className="flex justify-between border-b border-hair pb-3">
            <span className="text-neutral-500">Focus</span>
            <span className="text-neutral-200">Full Stack · Cloud</span>
          </div>
          <div className="flex justify-between border-b border-hair pb-3">
            <span className="text-neutral-500">Backend</span>
            <span className="text-neutral-200">Java · Spring Boot</span>
          </div>
          <div className="flex justify-between border-b border-hair pb-3">
            <span className="text-neutral-500">Frontend</span>
            <span className="text-neutral-200">React · Angular</span>
          </div>
          <div className="flex justify-between border-b border-hair pb-3">
            <span className="text-neutral-500">Infra</span>
            <span className="text-neutral-200">AWS · Terraform</span>
          </div>
        </div>
      </div>
      </div>{/* end reveal */}
    </section>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ProjectCard({ p }) {
  return (
    <a
      href={"https://" + p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl border border-hair bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_60px_-20px_rgb(var(--accent-rgb)/0.35)]"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-sm text-neutral-600">{p.n}</span>
        <span className="text-neutral-600 transition-colors group-hover:text-accent">
          <ArrowUpRight />
        </span>
      </div>

      <h3 className="mt-6 font-sans text-2xl font-semibold text-neutral-50">{p.name}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-neutral-400 text-pretty">{p.blurb}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-hair bg-ink/60 px-2.5 py-1 font-mono text-[11px] text-neutral-400"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-hair pt-4">
        <span className="font-mono text-xs text-neutral-500">{p.url}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-sm text-accent">
          Visit
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </a>
  );
}

function Projects() {
  const labelRef = useReveal();
  const cardRefs = [useReveal(), useReveal(), useReveal()];
  return (
    <section id="projects" className="scroll-target mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div ref={labelRef} className="reveal">
        <SectionLabel n="02">Selected Projects</SectionLabel>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <div key={p.name} ref={cardRefs[i]} className={`reveal reveal-delay-${i + 1}`}>
            <ProjectCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const ref = useReveal();
  return (
    <section id="skills" className="scroll-target mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div ref={ref} className="reveal">
      <SectionLabel n="03">Skills & Tooling</SectionLabel>
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((s) => (
          <div
            key={s}
            className="group flex items-center gap-2.5 rounded-lg border border-hair bg-panel px-4 py-3 transition-colors hover:border-accent/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60 transition-colors group-hover:bg-accent" />
            <span className="font-mono text-sm text-neutral-300 group-hover:text-neutral-50">{s}</span>
          </div>
        ))}
      </div>
      </div>{/* end reveal */}
    </section>
  );
}

function Contact() {
  const ref = useReveal();
  return (
    <section id="contact" className="scroll-target relative overflow-hidden border-t border-hair grid-texture">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full blur-[130px]"
        style={{ background: "rgb(var(--accent-rgb) / 0.12)" }}
      />
      <div ref={ref} className="reveal relative mx-auto max-w-6xl px-6 py-28 sm:py-36 text-center">
        <p className="font-mono text-sm text-accent">04 / Contact</p>
        <h2 className="mt-6 font-sans text-4xl sm:text-6xl font-bold tracking-tight text-neutral-50 text-pretty">
          Let's build something solid.
        </h2>
        <p className="mt-6 mx-auto max-w-md text-lg text-neutral-400">
          Have a project in mind or just want to talk shop? My inbox is open.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:villajeremy1991@gmail.com"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-ink hover:brightness-110 transition"
          >
            villajeremy1991@gmail.com
          </a>
          <a
            href="tel:+12484167369"
            className="inline-flex items-center gap-2 rounded-md border border-hair px-6 py-3 font-mono text-sm text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
            </svg>
            248-416-7369 · call or text
          </a>
          <a
            href="https://github.com/jvilla1991"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-hair px-6 py-3 font-mono text-sm text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jvilla1991/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-hair px-6 py-3 font-mono text-sm text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667H9.358V9h3.413v1.561h.047c.476-.9 1.637-1.85 3.368-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={resumePdf}
            download="Jeremy_Villa_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-hair px-6 py-3 font-mono text-sm text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
      </div>

      <footer className="relative border-t border-hair">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-xs text-neutral-600">© 2026 Jeremy Villa</span>
          <span className="font-mono text-xs text-neutral-600">Built with React + Tailwind</span>
        </div>
      </footer>
    </section>
  );
}

export default function Portfolio() {
  const [accent, setAccent] = useState("52 211 153");

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-rgb", accent);
  }, [accent]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Optional accent color switcher — remove for production */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        {Object.entries(ACCENTS).map(([name, rgb]) => (
          <button
            key={name}
            title={name}
            onClick={() => setAccent(rgb)}
            className="h-5 w-5 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              background: `rgb(${rgb.split(" ").join(", ")})`,
              borderColor: accent === rgb ? "white" : "transparent",
            }}
          />
        ))}
      </div>
    </>
  );
}
