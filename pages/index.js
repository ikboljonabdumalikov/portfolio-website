import Head from "next/head";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import profilePicture from "../public/profile.jpg";
import code from "../public/code.png";
import design from "../public/design.png";
import consulting from "../public/consulting.png";
import Image from "next/image";
import myteam from "../public/my-team.jpg";
import bookmark from "../public/bookmark-cover.jpg";
import scoot from "../public/scoot.jpg";
import digitalbank from "../public/digitalbank.jpg";

import { useEffect, useRef, useMemo } from "react";
import restCountries from "../public/restCountries.webp";
import Typed from "typed.js";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  // Filter state for portfolio projects
  const [activeFilter, setActiveFilter] = useState("all"); // all | html/css | js | react

  const typedElement = useRef(null);

  // Download handler for local resume PDF (placed in /public)
  const handleResumeDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = "/my-resume.pdf"; // ensure file exists in /public
      link.download = "my-resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      window.open("/my-resume.pdf", "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "a Frontend Developer.",
        "a Photographer.",
        "an Amateur Gamer.",
      ],
      typeSpeed: 90,
      backSpeed: 90,
      startDelay: 300,
      backDelay: 90,
      smartBackspace: true,
      showCursor: false,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  // Labels for filters and tags
  const TAG_LABELS = {
    all: "All",
    "html/css": "HTML/CSS",
    responsive: "Responsive",
    js: "JavaScript",
    react: "React",
  };

  // Base (relevance) projects; keep stable with useMemo
  const projects = useMemo(
    () => [
      {
        id: "bookmark",
        title: "Bookmark",
        category: "Landing Page",
        image: bookmark,
        alt: "Bookmark landing page preview",
        repoUrl: "https://github.com/ikboljonabdumalikov/bookmark",
        demoUrl: "https://demo-bookmark.netlify.app/",
        tags: ["html/css", "js", "responsive"],
      },
      {
        id: "myteam",
        title: "My Team",
        category: "Landing Page",
        image: myteam,
        alt: "My Team project preview",
        repoUrl: "https://github.com/ikboljonabdumalikov/my-team",
        demoUrl: "https://my-team-demo.netlify.app/",
        tags: ["html/css", "js", "responsive"],
      },
      {
        id: "digitalbank",
        title: "Digital Bank",
        category: "Landing Page",
        image: digitalbank,
        alt: "Digital bank landing page preview",
        repoUrl: "https://github.com/ikboljonabdumalikov/easybank-landing-page",
        demoUrl: "http://easybank-landing-page-black.vercel.app",
        tags: ["html/css", "js", "responsive"],
      },
      {
        id: "restcountries",
        title: "REST Countries",
        category: "Web App",
        image: restCountries,
        alt: "REST Countries app preview",
        repoUrl: "https://github.com/ikboljonabdumalikov/rest-countries",
        demoUrl: "https://rest-countries-delta-bay.vercel.app/",
        tags: ["react", "js", "responsive"],
      },
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.tags.includes(activeFilter));
  }, [projects, activeFilter]);

  // Project Card with entrance animation and improved hover
  const ProjectCard = ({ p, index }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setVisible(true), 40 * (index + 1));
      return () => clearTimeout(t);
      // Re-run on filter change or project change
    }, [index, activeFilter, p?.id]);

    return (
      <div
        className={
          `group overflow-hidden rounded-xl bg-white shadow transition ` +
          `hover:shadow-lg dark:bg-gray-800 ` +
          `transform duration-500 ` +
          (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")
        }
      >
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={p.image}
            alt={p.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority={p.id === "bookmark"}
          />
        </div>
        <div className="p-5">
          <h4 className="font-ubuntu text-lg font-bold text-gray-900 dark:text-white">{p.title}</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors dark:bg-gray-700 dark:text-gray-200"
              >
                {TAG_LABELS[t]}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={`${p.title} live demo`}
            >
              <FaEye className="h-4 w-4" /> Live
            </a>
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              aria-label={`${p.title} repository`}
            >
              <AiFillGithub className="h-4 w-4" /> Code
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Ikboljon Abdumalikov — Frontend Developer</title>
        <meta
          name="description"
          content="Frontend developer portfolio of Ikboljon Abdumalikov: React, Next.js, Tailwind, and UI engineering projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Ikboljon Abdumalikov — Frontend Developer" />
        <meta property="og:description" content="Portfolio, projects, and contact links." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/dev-ed-wave.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white px-10 dark:bg-gray-900 md:px-20 lg:px-40">
        <section className="container mx-auto">
          <section className="min-h-screen">
            <nav className="py-10 mb-12 flex justify-between dark:text-white">
              <h1 className="font-burtons text-2xl">Happinessjon</h1>
              <ul className="flex items-center">
                <li>
                  <BsFillMoonStarsFill
                    onClick={() => setDarkMode(!darkMode)}
                    className=" cursor-pointer text-2xl"
                  />
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleResumeDownload}
                    className="bg-gradient-to-r cursor-pointer from-cyan-500 to-teal-500 text-white px-4 py-2 border-none rounded-md ml-8"
                    aria-label="Download Resume PDF"
                    title="Download Resume"
                  >
                    Resume
                  </button>
                </li>
              </ul>
            </nav>
            <div className="text-center p-10 py-10">
              <h2 className="text-5xl py-2 font-burtons text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
                Abdumalikov Ikboljon
              </h2>
              <h3 className="font-ubuntu font-bold text-2xl inline-block py-2 dark:text-white md:text-3xl">
                I am{" "}
                <span
                  className="text-teal-600 dark:text-teal-400"
                  ref={typedElement}
                ></span>
              </h3>
              <p className="text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
                Entry-level Software Engineer. <br />
                1+ year of experience in{" "}
                <span className="text-teal-500"> Web Development </span>, 4+
                months real world experience as a Frontend Developer
              </p>
              <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
                <Link href="https://twitter.com/happinessjon" legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <AiFillTwitterCircle className="cursor-pointer" />
                  </a>
                </Link>
                <Link href="https://www.linkedin.com/inabdumalikov/" legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <AiFillLinkedin className="cursor-pointer" />
                  </a>
                </Link>
                <Link href="https://github.com/ikboljonabdumalikov" legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <AiFillGithub className="cursor-pointer" />
                  </a>
                </Link>
              </div>
              <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden mt-20 md:h-96 md:w-96">
                <Image src={profilePicture} alt="Developer portrait" fill priority sizes="(min-width: 768px) 384px, 320px" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </section>
          <section>
            <div className=" text-center">
              <h3 className="font-ubuntu font-bold text-3xl py-1 dark:text-white ">
                Services I offer
              </h3>
              <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                Since the beginning of my journey as a
                developer, I've done remote work for
                <span className="text-teal-500"> agencies </span>
                consulted for <span className="text-teal-500">startups </span>
                and collaborated with talanted people to create digital products
                for both business and consumer use.
              </p>
              <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                I offer from a wide range of services, including
                programming.
              </p>
            </div>
            <div className="lg:flex gap-10">
              <div className="text-center shadow-lg p-10 rounded-xl my-10  dark:bg-white flex-1">
                <Image className="inline-block" src={design} width={100} height={100} alt="Design icon" />
                <h3 className="font-ubuntu font-bold text-lg pt-8 pb-2  ">
                  Beautiful Layouts
                </h3>
                <p className="py-2">
                  Creating elegant Layouts suited for your needs following core
                  HTML/CSS theory.
                </p>
                <h4 className="font-ubuntu font-bold py-4 text-teal-600">
                  Technologies I Use
                </h4>
                <p className="text-gray-800 py-1">HTML5</p>
                <p className="text-gray-800 py-1">CSS3</p>
                <p className="text-gray-800 py-1">Figma</p>
                <p className="text-gray-800 py-1">JavaScript</p>
              </div>
              <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
                <Image className="inline-block" src={code} width={100} height={100} alt="Code icon" />
                <h3 className="font-ubuntu font-bold text-lg pt-8 pb-2 ">
                  Code your dream project
                </h3>
                <p className="py-2">
                  Do you have an idea for your next great website? Let's make it
                  a reality.
                </p>
                <h4 className="font-ubuntu font-bold py-4 text-teal-600">
                  Technologies I Use
                </h4>
                <p className="text-gray-800 py-1">React - Vue.js</p>
                <p className="text-gray-800 py-1">Next.js - Nuxt.js</p>
                <p className="text-gray-800 py-1">Figma</p>
                <p className="text-gray-800 py-1">JavaScript</p>
                <p className="text-gray-800 py-1">Tailwind - Windi CSS</p>
              </div>
              <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
                <Image className="inline-block" src={consulting} width={100} height={100} alt="Consulting icon" />
                <h3 className="font-ubuntu font-bold text-lg pt-8 pb-2 ">
                  Consulting
                </h3>
                <p className="py-2">
                  Are you interested in feedback for your current project? I can
                  give you tips and tricks to level it up.
                </p>
                <h4 className="font-ubuntu font-bold py-4 text-teal-600">
                  Tools I Use
                </h4>
                <p className="text-gray-800 py-1">GitHub</p>
                <p className="text-gray-800 py-1">Debugging</p>
                <p className="text-gray-800 py-1">Figma</p>
                <p className="text-gray-800 py-1">Code Review</p>
              </div>
            </div>
          </section>
          <section className="py-10">
            <div className="text-center">
              <h3 className="font-ubuntu font-bold text-3xl py-1 dark:text-white ">
                Portfolio
              </h3>
              <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                Since the beginning of my journey as a
                developer, I've done remote work for
                <span className="text-teal-500"> agencies </span>
                consulted for <span className="text-teal-500">startups </span>
                and collaborated with talanted people to create digital products
                for both business and consumer use.
              </p>
              <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                I offer from a wide range of services,
                programming and teaching.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
              {["all", "html/css", "js", "react"].map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ` +
                    (activeFilter === key
                      ? "bg-teal-600 text-white shadow"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700")
                  }
                  aria-pressed={activeFilter === key}
                >
                  {TAG_LABELS[key]}
                </button>
              ))}
            </div>

            {/* Projects Grid - redesigned cards with entrance animations */}
            <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.id} p={p} index={i} />
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
