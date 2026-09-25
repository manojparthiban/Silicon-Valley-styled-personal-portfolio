import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import TiltCard from "@/components/common/TiltCard";
import { Label, SectionHeader, reveal } from "@/components/common/SectionBits";

/* ── data ─────────────────────────────────────── */

const SI2_START = new Date(2025, 3, 1); // Apr 2025

interface Client {
  id: string;
  branch: string;
  name: string;
  group?: string;
  status: string;
  current?: boolean;
  industry: string;
  system?: string;
  points: string[];
  stack: string[];
}

// Client engagements delivered through Si2 Technologies (both chemical manufacturers)
const si2Clients: Client[] = [
  {
    id: "deepak-nitrite",
    branch: "client/deepak-nitrite",
    name: "Deepak Nitrite Ltd",
    group: "Deepak Group",
    status: "current",
    current: true,
    industry: "Chemical manufacturing",
    system: "SAP S/4HANA Private Cloud",
    points: [
      "Working as an ABAP developer on SAP S/4HANA Private Cloud, the latest private cloud edition",
      "Building SAP Fiori apps and RAP (RESTful ABAP Programming Model) applications",
      "Developing side-by-side extensions on SAP BTP",
      "Designing SAP workflows and Adobe Forms for business processes",
      "Integrating SAP with external systems through OData V4 APIs",
      "Automating business workflows end to end with n8n",
    ],
    stack: ["S/4HANA Private Cloud", "Fiori", "RAP", "SAP BTP", "Workflow", "Adobe Forms", "OData V4", "n8n"],
  },
  {
    id: "gulbrandsen",
    branch: "client/gulbrandsen",
    name: "Gulbrandsen Technologies Pvt Ltd",
    status: "first client",
    industry: "Chemical manufacturing",
    system: "SAP S/4HANA 2022 On-Premise",
    points: [
      "Developed a wide range of custom ABAP reports, Smartforms, Adobe Forms and ALV reports",
      "Integrated SAP with third-party applications, including React-based web apps, using OData V4 APIs as middleware",
      "Built data monitoring controls that give the backend and SAP support teams full visibility of data moving between systems, for logging and error handling",
      "Optimized existing applications by converting custom Z reports into CDS views for faster database processing",
      "Worked in cross-functional roles across SAP SD, MM, PM and FICO",
      "Integrated open-source APIs into SAP, including Google authentication and a vehicle tracking system for trucks leaving the manufacturing plant",
    ],
    stack: ["ABAP", "ALV", "Smartforms", "Adobe Forms", "OData V4", "CDS Views", "SD · MM · PM · FICO"],
  },
];

const experiences: Array<{
  slug: string;
  date: string;
  title: string;
  company: string;
  location: string;
  current: boolean;
  points: string[];
  clients?: Client[];
}> = [
  {
    slug: "si2-technologies",
    date: "Apr 2025 – Present",
    title: "SAP ABAP Developer",
    company: "Si2 Technologies Pvt Ltd",
    location: "Vadodara, Gujarat",
    current: true,
    points: [
      "Developed & maintained SAP ABAP & WRICEF objects including Smartforms, Adobe Forms, and ALV Grid Reports",
      "Integrated SAP systems with 3rd party software using OData and REST APIs, and CSV file generation for internal & external systems",
      "Created custom reports aggregating SAP usage and analytics data across the organization",
      "Assisted with SAP Fiori application design using RAP (RESTful ABAP Programming Model) and SAP UI5",
      "Spearheaded a POC for automating Sales Order creation via SAP BPA on the SAP BTP platform",
      "Exploring SAP AI Core and BTP services to develop cloud-ready applications within the SAP ecosystem",
    ],
    clients: si2Clients,
  },
  {
    slug: "bosch",
    date: "Feb 2024 – July 2024",
    title: "Software Development Intern",
    company: "Bosch Global Software Technologies",
    location: "Bengaluru",
    current: false,
    points: [
      "Developed Python-based radio diagnostic data transmission system",
      "Implemented cloud integration for RF transceiver analytics",
      "Designed mesh networking protocol for Sub-GHz devices",
      "Gained experience in agile development methodologies",
    ],
  },
];

const certifications = [
  {
    name: "SAP ABAP Back-End Development (HANA Cloud)",
    issuer: "Eviden (Atos)",
    validity: "Valid till Dec 2025",
    link: "https://www.credly.com/badges/a13889c1-5cfb-4edd-a28f-cd3c5877a3ef",
  },
  {
    name: "SAP Fiori Application Developer",
    issuer: "SAP",
    validity: "Valid till Aug 2026",
    link: "https://www.credly.com/badges/9f91c4bd-694c-4d7d-9644-f0d2acdc7a60",
  },
];

const stack = ["ABAP", "RAP", "OData", "Fiori / UI5", "SAP BTP", "Python", "SQL", "IoT"];
const exploring = ["SAP AI Core", "BTP services", "SAP BPA"];

// Journey path: each stop is the end point of one curve segment, so it sits exactly on the line
const JOURNEY_PATH = "M28 168 C70 168 78 126 118 120 C160 114 166 80 204 72 C240 64 258 40 292 34";
const stops = [
  { x: 28, y: 168, city: "Tiruchirappalli", note: "roots" },
  { x: 118, y: 120, city: "Coimbatore", note: "B.Tech, Amrita" },
  { x: 204, y: 72, city: "Bengaluru", note: "Bosch, 2024" },
  { x: 292, y: 34, city: "Vadodara", note: "Si2, now" },
];

/* ── small pieces ─────────────────────────────── */

const CountUp = ({ to, pad = 2 }: { to: number; pad?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, to]);

  return <span ref={ref}>{String(value).padStart(pad, "0")}</span>;
};


/* ── git-style diff list ──────────────────────── */

const Diff = ({ points }: { points: string[] }) => (
  <ul className="xp__diff">
    {points.map((point) => (
      <li key={point}>
        <span className="xp__plus" aria-hidden="true">+</span>
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

/* ── client engagements, switched like git branches ── */

const clientPanel = {
  initial: { opacity: 0, rotateX: -55, y: -12 },
  animate: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", stiffness: 170, damping: 22 } },
  exit: { opacity: 0, rotateX: 45, y: 10, transition: { duration: 0.18, ease: "easeIn" } },
} as const;

const ClientTabs = ({ clients, overview }: { clients: Client[]; overview: string[] }) => {
  const tabs = [
    ...clients.map((c) => ({ id: c.id, branch: c.branch })),
    { id: "main", branch: "main" },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const client = clients.find((c) => c.id === active);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = tabs.findIndex((t) => t.id === active);
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div className="clients">
      <div className="clients__head">
        <p className="sec-label">
          <span aria-hidden="true">//</span> client engagements
        </p>
        <span className="clients__count">{clients.length} clients · chemical manufacturing</span>
      </div>

      <div className="clients__tabs" role="tablist" aria-label="Client engagements" onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[t.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => setActive(t.id)}
            className={`clients__tab ${active === t.id ? "is-active" : ""}`}
          >
            <span aria-hidden="true">⎇</span> {t.branch}
          </button>
        ))}
      </div>

      <div className="clients__stage">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className="clients__panel"
            {...clientPanel}
          >
            {client ? (
              <>
                <div className="client__top">
                  <div>
                    <h4 className="client__name">{client.name}</h4>
                    <p className="client__sub">
                      {client.group ? `${client.group} · ` : ""}
                      {client.industry}
                    </p>
                  </div>
                  <span className={client.current ? "about-live" : "xp__done"}>{client.status}</span>
                </div>
                {client.system && (
                  <p className="client__system">
                    <span aria-hidden="true">system:</span> {client.system}
                  </p>
                )}
                <Diff points={client.points} />
                <ul className="client__stack" aria-label="Stack">
                  {client.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="client__top">
                  <div>
                    <h4 className="client__name">Across Si2 Technologies</h4>
                    <p className="client__sub">Role-wide work and initiatives</p>
                  </div>
                </div>
                <Diff points={overview} />
              </>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── timeline ─────────────────────────────────── */

const Timeline = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 55%"] });
  const spine = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={listRef} className="xp">
      <span className="xp__rail" aria-hidden="true">
        <m.span className="xp__fill" style={{ scaleY: spine }} />
      </span>

      {experiences.map((exp) => (
        <m.li key={exp.slug} className="xp__item" {...reveal}>
          <span className={`xp__node ${exp.current ? "xp__node--live" : ""}`} aria-hidden="true" />
          <TiltCard className="bento-card xp__card" max={4}>
            <div className="xp__bar">
              <span className="xp__path">~/work/{exp.slug}</span>
              {exp.current ? <span className="about-live">current</span> : <span className="xp__done">merged</span>}
            </div>
            <div className="xp__body">
              <p className="xp__date">{exp.date}</p>
              <h3 className="xp__title">{exp.title}</h3>
              <p className="xp__meta">
                {exp.company}
                <span aria-hidden="true"> · </span>
                <MapPin className="inline w-3.5 h-3.5 -mt-0.5" aria-hidden="true" /> {exp.location}
              </p>
              {exp.clients ? <ClientTabs clients={exp.clients} overview={exp.points} /> : <Diff points={exp.points} />}
            </div>
          </TiltCard>
        </m.li>
      ))}
    </ol>
  );
};

/* ── journey map ──────────────────────────────── */

const Journey = () => {
  const reduceMotion = useReducedMotion();

  return (
    <TiltCard className="bento-card about-journey" max={6}>
      <Label>journey</Label>
      <div className="about-journey__map">
        <div className="about-journey__canvas">
        <svg viewBox="0 0 320 200" className="w-full h-auto overflow-visible" aria-hidden="true">
          <path d={JOURNEY_PATH} className="about-journey__ghost" />
          <m.path
            d={JOURNEY_PATH}
            className="about-journey__line"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          />
          {stops.map((s, i) => (
            <g key={s.city}>
              <circle cx={s.x} cy={s.y} r={i === stops.length - 1 ? 7 : 5} className="about-journey__halo" />
              <circle cx={s.x} cy={s.y} r={i === stops.length - 1 ? 3.6 : 2.8} className="about-journey__stop" />
            </g>
          ))}
          {!reduceMotion && (
            <circle r="3" className="about-journey__traveller">
              <animateMotion dur="5s" repeatCount="indefinite" path={JOURNEY_PATH} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
            </circle>
          )}
        </svg>
        {stops.map((s, i) => (
          <span
            key={s.city}
            className={`about-journey__tag ${i === stops.length - 1 ? "about-journey__tag--above" : "about-journey__tag--below"}`}
            style={{ left: `${(s.x / 320) * 100}%`, top: `${(s.y / 200) * 100}%` }}
          >
            <strong>{s.city}</strong>
            <small>{s.note}</small>
          </span>
        ))}
        </div>
      </div>
    </TiltCard>
  );
};

/* ── section ──────────────────────────────────── */

const AboutSection = React.memo(() => {
  const now = new Date();
  const monthsAtSi2 = Math.max(
    1,
    (now.getFullYear() - SI2_START.getFullYear()) * 12 + now.getMonth() - SI2_START.getMonth(),
  );

  return (
    <section className="about relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pt-14 md:pt-20 pb-2 md:pb-4">
      <div className="sec-backdrop" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <SectionHeader
          index="02"
          name="about"
          title={
            <>
              Background <span className="text-primary">&amp;</span> experience<span className="text-primary">.</span>
            </>
          }
          sub="From a Computer and Communication Engineering degree to building SAP back-ends at Si2 Technologies."
        />

        <div className="about-grid">
          {/* ── Bio ── */}
          <m.div {...reveal} className="about-cell about-cell--bio">
            <TiltCard className="bento-card about-bio">
              <Label>whoami</Label>
              <p className="about-bio__text">
                Computer science engineer from <mark>Tiruchirappalli, Tamil Nadu</mark>, and a graduate of{" "}
                <mark>Amrita School of Engineering, Coimbatore</mark>. I'm SAP certified in ABAP back-end
                development and Fiori, and I spend my days in ABAP, OData and RAP.
              </p>
              <p className="about-bio__text about-bio__text--soft">
                Outside SAP I build with Python, SQL, IoT, ML and AI, with hands-on projects to show for it. I care
                about software that is safe, efficient and easy to maintain, and I'm always looking for the next
                thing to learn.
              </p>
              <ul className="about-stack" aria-label="Core stack">
                {stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </TiltCard>
          </m.div>

          {/* ── Stats ── */}
          <m.div {...reveal} className="about-cell about-cell--stats">
            <TiltCard className="bento-card about-stats">
              <Label>by the numbers</Label>
              <dl className="about-stats__grid">
                <div>
                  <dt>SAP certifications</dt>
                  <dd><CountUp to={certifications.length} /></dd>
                </div>
                <div>
                  <dt>IEEE publication</dt>
                  <dd><CountUp to={1} /></dd>
                </div>
                <div>
                  <dt>months building SAP at Si2</dt>
                  <dd><CountUp to={monthsAtSi2} /></dd>
                </div>
              </dl>
              <div className="about-stats__explore">
                <Label>now exploring</Label>
                <ul className="about-stack about-stack--tight">
                  {exploring.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <p className="about-stats__now">
                <span className="about-pulse" aria-hidden="true" />
                Currently at Si2 Technologies, Vadodara
              </p>
            </TiltCard>
          </m.div>

          {/* ── Experience ── */}
          <div className="about-cell about-cell--xp">
            <m.div {...reveal}>
              <Label>experience</Label>
            </m.div>
            <Timeline />
          </div>

          {/* ── Side column ── */}
          <div className="about-cell about-cell--side">
            <m.div {...reveal}>
              <Journey />
            </m.div>

            <m.div {...reveal}>
              <TiltCard className="bento-card about-edu">
                <Label>education</Label>
                <div className="about-edu__row">
                  <span className="about-edu__icon" aria-hidden="true">
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="about-edu__degree">Bachelor's in Computer and Communication Engineering</h3>
                    <p className="about-edu__school">Amrita Vishwa Vidyapeetham, Coimbatore</p>
                  </div>
                </div>
              </TiltCard>
            </m.div>

            <div className="about-creds">
              {certifications.map((cert) => (
                <m.div key={cert.link} {...reveal}>
                  <TiltCard
                    className="bento-card about-cred"
                    href={cert.link}
                    max={9}
                    aria-label={`View credential: ${cert.name}`}
                  >
                    <div className="about-cred__top">
                      <img src="/images/logos/sap.webp" alt="" width={40} height={40} loading="lazy" decoding="async" className="about-cred__logo" />
                      <span className="about-cred__kind">SAP Certified Associate</span>
                    </div>
                    <h3 className="about-cred__name">{cert.name}</h3>
                    <div className="about-cred__foot">
                      <span>
                        {cert.issuer} · {cert.validity}
                      </span>
                      <span className="about-cred__verify">
                        verify <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </TiltCard>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
