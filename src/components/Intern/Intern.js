"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "../SectionTitle";

const internData = [
  {
    id: 1,
    period: "03/2026 - 05/2026",
    role: "Information System Intern",
    company: "Direktorat Penelitian Universitas Gadjah Mada",
    tech: [
      "Data Processing",
      "System Testing",
      "Database Management",
      "Documentation",
    ],
    points: [
      "Collected, processed, and analyzed data required for the development of information systems.",
      "Implemented system modules based on predefined system design and analysis specifications.",
      "Conducted application testing to ensure functionality and operational readiness.",
      "Prepared system documentation and user manuals to support application usage.",
      "Performed system maintenance including data updates, monitoring, and periodic improvements.",
      "Managed and maintained information system databases.",
      "Updated and maintained data records within the information system environment.",
      "Provided technical support and assistance to stakeholders related to system usage.",
      "Managed and archived digital documentation related to system operations.",
      "Reported progress and results of assigned tasks to supervisors.",
    ],
  },
  {
    id: 2,
    period: "01/2026 - 02/2026",
    role: "Backend / Security Developer Intern",
    company: "PT Indonesia Satu Tujuh",
    tech: ["Go", "Docker", "REST API", "Google OAuth"],
    points: [
      "Developed NapScan, a vulnerability scanning system for websites and applications to identify potential security risks.",
      "Implemented backend services using Golang to process scan requests and generate vulnerability reports.",
      "Integrated Google OAuth authentication for secure user login and access management.",
      "Containerized the application using Docker to ensure consistent development and deployment environments.",
      "Managed deployment and system configuration to maintain stable operation of the scanning service.",
      "Designed REST API endpoints for submitting scans and retrieving results.",
    ],
  },
];

export default function Intern() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowCards(true), 1100);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-10">
      <div className="w-full max-w-6xl mx-auto">
        <SectionTitle title="INTERN" isVisible={isVisible} />

        <div className="grid gap-6 md:gap-8 mt-10">
          {internData.map((item, index) => (
            <article
              key={item.id}
              className={`rounded-xl border border-cyan-500/20 bg-zinc-900/70 p-5 md:p-7 shadow-lg shadow-cyan-900/10 transition-all duration-700 ease-out ${
                showCards
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 140}ms` }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-cyan-300 font-semibold text-lg md:text-xl">
                    {item.role}
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base">
                    {item.company}
                  </p>
                </div>
                <span className="inline-flex items-center w-fit text-xs md:text-sm px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">
                  {item.period}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md border border-slate-600 bg-slate-800/60 text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="text-slate-300 text-sm md:text-base leading-relaxed">
                    - {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
