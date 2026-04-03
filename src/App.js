import { useState, useEffect, useRef } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Fira+Code:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
`;

const CSS = `
  :root {
    --bg: #04060d;
    --bg2: #080c18;
    --surface: rgba(255,255,255,0.03);
    --surface2: rgba(255,255,255,0.06);
    --border: rgba(255,255,255,0.07);
    --border-accent: rgba(224, 184, 80, 0.3);
    --gold: #e0b850;
    --gold-dim: rgba(224, 184, 80, 0.15);
    --text: #e8eaf0;
    --text-dim: #6b7280;
    --text-mid: #9ca3af;
    --cyan: #38bdf8;
    --font-display: 'Unbounded', sans-serif;
    --font-mono: 'Fira Code', monospace;
    --font-body: 'DM Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(224,184,80,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(224,184,80,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    transition: all 0.4s;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
  }
  .nav.scrolled {
    background: rgba(4,6,13,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 60px;
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 18px; font-weight: 900;
    color: var(--gold);
    letter-spacing: -0.02em;
  }
  .nav-links { display: flex; gap: 2.5rem; }
  .nav-link {
    background: none; border: none; cursor: pointer;
    color: var(--text-dim); text-transform: uppercase;
    transition: color 0.2s; font-family: var(--font-mono);
    font-size: 11px; letter-spacing: 0.12em;
  }
  .nav-link:hover, .nav-link.active { color: var(--gold); }

  /* SECTIONS */
  section { position: relative; z-index: 1; }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 80px 2rem 2rem;
  }
  .hero-inner {
    max-width: 1280px; margin: 0 auto; width: 100%;
  }
  .hero-tag {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--gold); letter-spacing: 0.2em;
    text-transform: uppercase; margin-bottom: 2rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .hero-tag::before {
    content: ''; display: block; width: 32px; height: 1px;
    background: var(--gold);
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 9vw, 9rem);
    font-weight: 900; line-height: 0.9;
    letter-spacing: -0.03em;
    color: var(--text);
  }
  .hero-name span { color: var(--gold); display: block; }
  .hero-subtitle {
    font-family: var(--font-mono); font-size: clamp(0.85rem, 1.5vw, 1.1rem);
    color: var(--text-mid); margin-top: 2.5rem;
    max-width: 600px; line-height: 1.8;
    border-left: 2px solid var(--gold);
    padding-left: 1.25rem;
  }
  .hero-ctas {
    display: flex; gap: 1rem; margin-top: 3rem; flex-wrap: wrap;
  }
  .btn-primary {
    background: var(--gold); color: var(--bg);
    border: none; cursor: pointer; padding: 0.875rem 2.5rem;
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.15em; text-transform: uppercase;
    font-weight: 500; transition: all 0.2s;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .btn-primary:hover { background: #f0cc70; transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: var(--text-mid);
    border: 1px solid var(--border); cursor: pointer;
    padding: 0.875rem 2.5rem;
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.15em; text-transform: uppercase;
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
  .hero-stats {
    display: grid; grid-template-columns: repeat(3, auto);
    gap: 3rem; margin-top: 5rem;
    border-top: 1px solid var(--border); padding-top: 3rem;
    width: fit-content;
  }
  .stat-num {
    font-family: var(--font-display);
    font-size: 3.5rem; font-weight: 900;
    color: var(--gold); line-height: 1;
  }
  .stat-label {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-dim); text-transform: uppercase;
    letter-spacing: 0.15em; margin-top: 0.4rem;
  }

  /* SECTION HEADER */
  .section-header {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: baseline; gap: 1.5rem;
    margin-bottom: 4rem;
  }
  .section-num {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--gold); letter-spacing: 0.1em;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 900; letter-spacing: -0.02em;
  }
  .section-line {
    flex: 1; height: 1px; background: var(--border);
  }

  /* EXPERIENCE */
  .exp-section { padding: 8rem 2rem; }
  .exp-list { max-width: 1280px; margin: 0 auto; }
  .exp-item {
    display: grid; grid-template-columns: 220px 1fr;
    gap: 3rem; padding: 2.5rem 0;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .exp-item::before {
    content: ''; position: absolute;
    left: -2rem; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, transparent, var(--gold-dim), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .exp-item:hover::before { opacity: 1; }
  .exp-meta {}
  .exp-period {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--gold); letter-spacing: 0.1em; margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .exp-company {
    font-family: var(--font-display); font-size: 1.35rem;
    font-weight: 700; color: var(--text); margin-bottom: 0.25rem;
    letter-spacing: -0.01em;
  }
  .exp-role {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-dim); text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .exp-projects { display: flex; flex-direction: column; gap: 1.5rem; }
  .exp-project {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.5rem;
    transition: border-color 0.2s, background 0.2s;
  }
  .exp-project:hover {
    border-color: var(--border-accent);
    background: var(--gold-dim);
  }
  .project-name {
    font-family: var(--font-display); font-size: 0.9rem;
    font-weight: 700; color: var(--gold); margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
  }
  .project-desc {
    font-size: 0.875rem; color: var(--text-mid); line-height: 1.7;
    margin-bottom: 0.75rem;
  }
  .project-bullets {
    display: flex; flex-wrap: wrap; gap: 0.4rem;
  }
  .bullet {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-dim); background: var(--surface2);
    border: 1px solid var(--border); padding: 0.2rem 0.6rem;
    letter-spacing: 0.05em;
  }
  .exp-tech {
    margin-top: 1rem; padding-top: 1rem;
    border-top: 1px solid var(--border);
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-dim); line-height: 1.8;
  }
  .exp-tech strong { color: var(--text-mid); }

  /* SKILLS */
  .skills-section { padding: 8rem 2rem; background: var(--bg2); }
  .skills-grid {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1px;
    border: 1px solid var(--border);
    background: var(--border);
  }
  .skill-card {
    background: var(--bg2); padding: 1.75rem;
    transition: background 0.2s;
  }
  .skill-card:hover { background: var(--gold-dim); }
  .skill-category {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--gold); text-transform: uppercase;
    letter-spacing: 0.15em; margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .skill-category::after {
    content: ''; flex: 1; height: 1px; background: var(--border-accent);
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .skill-tag {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-mid); background: var(--surface);
    border: 1px solid var(--border); padding: 0.25rem 0.65rem;
    letter-spacing: 0.04em; transition: all 0.15s;
    cursor: default;
  }
  .skill-tag:hover { color: var(--gold); border-color: var(--border-accent); }

  /* EDUCATION */
  .edu-section { padding: 8rem 2rem; }
  .edu-list { max-width: 1280px; margin: 0 auto; }
  .edu-item {
    display: flex; gap: 3rem; align-items: center;
    padding: 2rem 0; border-bottom: 1px solid var(--border);
  }
  .edu-year {
    font-family: var(--font-display); font-size: 2.5rem;
    font-weight: 900; color: var(--gold-dim);
    min-width: 100px;
    transition: color 0.2s;
  }
  .edu-item:hover .edu-year { color: var(--gold); }
  .edu-degree {
    font-family: var(--font-display); font-size: 1.1rem;
    font-weight: 700; color: var(--text); margin-bottom: 0.25rem;
  }
  .edu-school {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.1em;
  }
  .lang-row {
    max-width: 1280px; margin: 4rem auto 0;
    display: flex; gap: 1rem; flex-wrap: wrap;
  }
  .lang-pill {
    font-family: var(--font-mono); font-size: 11px;
    border: 1px solid var(--border-accent); padding: 0.5rem 1.25rem;
    color: var(--text-mid); letter-spacing: 0.1em;
    background: var(--gold-dim);
  }

  /* CONTACT */
  .contact-section {
    padding: 8rem 2rem;
    background: var(--bg2);
  }
  .contact-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem;
    align-items: start;
  }
  .contact-desc {
    font-size: 1.1rem; color: var(--text-mid); line-height: 1.8;
    margin-bottom: 2.5rem;
  }
  .contact-links { display: flex; flex-direction: column; gap: 1rem; }
  .contact-link {
    display: flex; align-items: center; gap: 1.25rem;
    padding: 1.25rem 1.5rem;
    border: 1px solid var(--border);
    background: var(--surface);
    text-decoration: none;
    transition: all 0.2s;
    color: var(--text-mid);
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.05em;
  }
  .contact-link:hover {
    border-color: var(--border-accent);
    background: var(--gold-dim);
    color: var(--gold);
  }
  .contact-link-icon {
    width: 36px; height: 36px; background: var(--gold-dim);
    border: 1px solid var(--border-accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }
  .social-row { display: flex; gap: 1rem; margin-top: 1.5rem; }
  .social-link {
    width: 44px; height: 44px; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; color: var(--text-dim); font-size: 16px;
    transition: all 0.2s; background: var(--surface);
  }
  .social-link:hover { border-color: var(--border-accent); color: var(--gold); background: var(--gold-dim); }

  /* FOOTER */
  .footer {
    padding: 2rem; border-top: 1px solid var(--border);
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-dim); text-align: center; letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* SCROLL REVEAL */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    .exp-item { grid-template-columns: 1fr; gap: 1rem; }
    .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
    .hero-stats { grid-template-columns: repeat(3, auto); gap: 1.5rem; }
    .nav-links { display: none; }
  }
`;

const experiences = [
  {
    company: "IA & Projets Perso",
    role: "Ingénieur Full-Stack",
    period: "Avr 2025 — Présent",
    projects: [
      {
        name: "9Auth",
        desc: "Service d'authentification multi-provider SSO : Local, Google, Facebook, Apple, GitHub. Architecture microservices avec rate limiting, mode invité et pipeline CI/CD Azure DevOps.",
        bullets: ["Multi-provider SSO", "Architecture microservices", "CI/CD Azure DevOps"],
      },
      {
        name: "IDetect",
        desc: "Solution de vision par ordinateur et détection d'objets en temps réel. Entraînement de modèles YOLO, pipelines RAG sur corpus privés (chunking, vectorisation, embeddings sémantiques via LangChain).",
        bullets: ["YOLO Training", "RAG LangChain", "NLP / NER spaCy"],
      },
    ],
    tech: "Python · LangChain · spaCy · N8N · MistralAI · LLaMA · .NET 9 · React · TypeScript · Azure",
  },
  {
    company: "Quantalys",
    role: "Ingénieur Full-Stack",
    period: "Jan 2023 — Mar 2025",
    projects: [
      {
        name: "Platform Wealth",
        desc: "Application de gestion de portefeuille client — souscription et consultation de contrats d'assurance vie. Animation des daily meetings, développement React à fort volume transactionnel, APIs REST .NET 9, assistance IA (configuration modèles LLM, température, biais).",
        bullets: ["React + .NET 9", "SonarQube", "CI/CD Azure DevOps"],
      },
    ],
    tech: "Azure PaaS · .NET Framework · .NET 8/9 · C# · SQL Server · React · TypeScript · RxJS · Entity Framework · WCF · SonarQube · Python",
  },
  {
    company: "GazelEnergie",
    role: "Ingénieur Full-Stack",
    period: "Déc 2020 — Déc 2022",
    projects: [
      {
        name: "Optimisation",
        desc: "Pilotage sans chef de projet : conception complète architecture Front + Back from scratch, gestion des coûts d'optimisation électrique. Exports Excel via EPLUS et Syncfusion.",
        bullets: ["Pilotage autonome", "Angular 12→14", "Architecture from scratch"],
      },
      {
        name: "GTM",
        desc: "CRM web + desktop complet pour la gestion des opérations. Maintenance, évolutions, gestion de droits, administration utilisateurs avec Asp.NET + Angular.",
        bullets: ["CRM Asp.NET", "Microservices ZeroMQ", "BDD Jasmine/Karma"],
      },
    ],
    tech: "Azure · .NET 5/6/Core · C# · SQL · PostgreSQL · Angular 12/14 · TypeScript · RxJS · Entity Framework · ZeroMQ · Node.js · Git",
  },
  {
    company: "BNP Paribas CIB",
    role: "Ingénieur Full-Stack",
    period: "Sep 2017 — Déc 2020",
    projects: [
      {
        name: "QFXT",
        desc: "Application web de génération de comptes rendus pour le front office de la salle des marchés. CRUD administration utilisateurs, statistiques d'utilisation, refonte graphique, authentification SSO.",
        bullets: ["Trading Floor", "SSO Auth", "UI/UX Refonte"],
      },
      {
        name: "T-KYC",
        desc: "Audit des contreparties financières KYC. POC Vue.js, puis migration vers Angular + .NET 4.6 avec consultation des statuts, recherches avancées multi-critères et migration REST .NET Core 2.0.",
        bullets: ["KYC Finance", "POC Vue.js → Angular", "Migration .NET Core 2.0"],
      },
    ],
    tech: ".NET MVC · Razor · C# · SQL · Angular · Vue.js · Node.js · WCF · Entity Framework · Git",
  },
];

const skills = [
  { cat: "Langages", items: ["C#", "TypeScript", "JavaScript ES6", "Python", "VB.Net", "Shell", "Java"] },
  { cat: "Web & API", items: [".NET Core Web API", "REST", "State Management", "HTML5", "CSS3", "RxJS", "NGRX", "UI/UX Design"] },
  { cat: "Frameworks", items: [".NET 9", "Angular 20", "React", "Vue.js", "ReactNative", "Bootstrap", "Material Design", "Flask", "NUXT", "Express"] },
  { cat: "IA & ML", items: ["PyTorch", "Hugging Face", "TensorFlow", "YOLO Training", "MistralAI", "LLaMA", "LangChain", "spaCy", "N8N", "LLM Prompting"] },
  { cat: "Bases de données", items: ["SQL Server 2022", "MySQL", "PostgreSQL", "MongoDB", "Cassandra", "Redis", "Cosmos DB"] },
  { cat: "DevOps & Cloud", items: ["Azure DevOps", "Azure PaaS", "Kubernetes", "Docker", "CI/CD Pipelines", "SonarQube"] },
  { cat: "Craftmanship", items: ["S.O.L.I.D", "TDD", "BDD", "Tests Unitaires", "Clean Code", "Peer-programming"] },
  { cat: "Outils", items: ["Visual Studio 2022", "VS Code", "GitHub Copilot", "Cursor"] },
  { cat: "Méthodologie", items: ["Agile Scrum", "Kanban", "UML"] },
];

const education = [
  { year: "2018", degree: "Master 2 IT Manager", school: "École IPSSI — Paris" },
  { year: "2017", degree: "Master 1 Expert Web & Mobile", school: "École IPSSI — Paris" },
  { year: "2015", degree: "BTS SIO", school: "Paris" },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", style = {} }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>;
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["home", "experience", "skills", "education", "contact"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const NAV_ITEMS = [
    { id: "home", label: "Accueil" },
    { id: "experience", label: "Expérience" },
    { id: "skills", label: "Compétences" },
    { id: "education", label: "Formation" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="grain" />
      <div className="grid-bg" />

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo">BK</div>
          <div className="nav-links">
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} className={`nav-link${active === id ? " active" : ""}`} onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <div className="hero-tag">Développeur Full-Stack .NET / AI — Paris</div>
          <h1 className="hero-name">
            Bilal<span>Khalak</span>
          </h1>
          <div className="hero-subtitle">
            C# · .NET 10 · Angular 20+ · React · Azure Cloud · Intelligence Artificielle<br />
            10 ans d'expérience · Finance · Assurance · Énergie · Tech
          </div>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => go("contact")}>Me contacter</button>
            <button className="btn-outline" onClick={() => go("experience")}>Voir le parcours</button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">10+</div>
              <div className="stat-label">Ans d'exp.</div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="exp-section">
        <RevealDiv>
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">Expérience</h2>
            <div className="section-line" />
          </div>
        </RevealDiv>
        <div className="exp-list">
          {experiences.map((exp, i) => (
            <RevealDiv key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="exp-item">
                <div className="exp-meta">
                  <div className="exp-period">{exp.period}</div>
                  <div className="exp-company">{exp.company}</div>
                  <div className="exp-role">{exp.role}</div>
                </div>
                <div>
                  <div className="exp-projects">
                    {exp.projects.map((p, j) => (
                      <div className="exp-project" key={j}>
                        <div className="project-name">— {p.name}</div>
                        <div className="project-desc">{p.desc}</div>
                        <div className="project-bullets">
                          {p.bullets.map((b, k) => <span className="bullet" key={k}>{b}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="exp-tech"><strong>Stack :</strong> {exp.tech}</div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <RevealDiv>
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">Compétences</h2>
            <div className="section-line" />
          </div>
        </RevealDiv>
        <RevealDiv>
          <div className="skills-grid">
            {skills.map(({ cat, items }) => (
              <div className="skill-card" key={cat}>
                <div className="skill-category">{cat}</div>
                <div className="skill-tags">
                  {items.map((s) => <span className="skill-tag" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </section>

      {/* EDUCATION */}
      <section id="education" className="edu-section">
        <RevealDiv>
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">Formation</h2>
            <div className="section-line" />
          </div>
        </RevealDiv>
        <div className="edu-list">
          {education.map((e, i) => (
            <RevealDiv key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="edu-item">
                <div className="edu-year">{e.year}</div>
                <div>
                  <div className="edu-degree">{e.degree}</div>
                  <div className="edu-school">{e.school}</div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
        <RevealDiv>
          <div className="lang-row">
            <div className="lang-pill">🇫🇷 Français — Natif</div>
            <div className="lang-pill">🇬🇧 Anglais — Courant</div>
            <div className="lang-pill">✈️ Passion : Voyages & Découverte</div>
          </div>
        </RevealDiv>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <RevealDiv>
          <div className="section-header">
            <span className="section-num">04</span>
            <h2 className="section-title">Contact</h2>
            <div className="section-line" />
          </div>
        </RevealDiv>
        <RevealDiv>
          <div className="contact-inner">
            <div>
              <p className="contact-desc">
                Disponible pour des missions freelance, collaborations ou opportunités. 
                N'hésitez pas à me contacter pour discuter de vos projets.
              </p>
              <div className="contact-links">
                <a href="mailto:bilal@khalak.fr" className="contact-link">
                  <span className="contact-link-icon">✉</span>
                  bilal@khalak.fr
                </a>
                <a href="tel:+33644112435" className="contact-link">
                  <span className="contact-link-icon">✆</span>
                  +33 6 44 11 24 35
                </a>
              </div>
              <div className="social-row">
                <a href="https://github.com/gteon/" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/bilal-khalak-267318ba/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Stack Principal", val: "C# · .NET 9 · Angular 20 · Azure" },
                { label: "Spécialité IA", val: "RAG · LLM · YOLO · spaCy · LangChain" },
                { label: "DevOps", val: "Azure DevOps · Docker · Kubernetes · CI/CD" },
                { label: "Localisation", val: "Paris, France — Remote OK" },
              ].map(({ label, val }) => (
                <div key={label} style={{
                  padding: "1rem 1.25rem", border: "1px solid var(--border)",
                  background: "var(--surface)", display: "flex", flexDirection: "column", gap: "0.3rem"
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-mid)" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>
      </section>

      <footer className="footer">
        © 2025 Bilal Khalak — Tous droits réservés
      </footer>
    </>
  );
}
