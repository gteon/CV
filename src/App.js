import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Github, Linkedin, ChevronDown, Code, Briefcase, Award, GraduationCap } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'skills', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const experiences = [
    {
      company: "AI Watch & Projects",
      role: "Full-Stack Software Engineer",
      period: "Avril 2025 - Présent",
      projects: [
        {
          name: "9Auth Project",
          description: "Service d'authentification universel avec support multi-provider (Local, Google, Facebook, Apple, GitHub). Implémentation de fonctionnalités avancées incluant le Single Sign-On (SSO), le mode invité, et le rate limiting pour une sécurité optimale.",
          highlights: ["Architecture microservices", "Intégration IA & YOLO", "CI/CD Azure DevOps"]
        },
        {
          name: "IDetect Project",
          description: "Solution de reconnaissance d'images basée sur l'intelligence artificielle utilisant YOLO pour l'analyse et la détection d'objets en temps réel avec des performances optimisées.",
          highlights: ["Deep Learning", "Computer Vision", "Real-time Processing"]
        }
      ],
      tech: "Python, Angular 20, Azure Cloud, .NET 8, C#, PostgreSQL, Redis, Entity Framework"
    },
    {
      company: "LexisNexis",
      role: "Full-Stack Software Engineer",
      period: "Octobre 2024 - Mars 2025",
      projects: [
        {
          name: "Lexis Poly",
          description: "CRM sophistiqué pour la gestion de documents administratifs et juridiques. Configuration et optimisation de modèles LLM pour l'entreprise, incluant l'ajustement de température et la réduction des biais pour des résultats précis et fiables.",
          highlights: ["Configuration LLM avancée", "Solutions SOAP .NET 9", "Architecture microservices"]
        }
      ],
      tech: "Azure, Angular 17, .NET Framework, .NET 8, C#, SQL Server, SonarQube, WCF, AI LLM"
    },
    {
      company: "Quantalys",
      role: "Full-Stack Software Engineer",
      period: "Juin 2023 - Septembre 2024",
      projects: [
        {
          name: "Platform Wealth",
          description: "Application complète de gestion de portefeuille client pour la souscription et consultation de contrats d'assurance vie. Développement d'interfaces dynamiques avec .NET Razor et création de solutions robustes pour la gestion financière.",
          highlights: ["Leadership daily meetings", "UI/UX Design avancé", "Gestion base de données SQL complexe"]
        }
      ],
      tech: "Azure, Angular 16, .NET Framework, .NET 8, C#, SQL Server, Razor, Entity Framework"
    },
    {
      company: "Groupe Sterne",
      role: "Full-Stack Software Engineer",
      period: "Avril 2022 - Janvier 2023",
      projects: [
        {
          name: "Espace Client & Public Tracking",
          description: "Développement from scratch d'une plateforme complète d'administration et de tracking de colis. Conception d'APIs CRUD .NET de bout en bout et création d'interfaces utilisateur dynamiques pour une expérience optimale.",
          highlights: ["Architecture from scratch", "Exports Excel personnalisés", "CI/CD pipelines"]
        }
      ],
      tech: "Azure, .NET 6, C#, PostgreSQL, Angular 14, RxJS, Entity Framework"
    },
    {
      company: "GazelEnergie",
      role: "Full-Stack Software Engineer",
      period: "Avril 2021 - Mars 2022",
      projects: [
        {
          name: "Optimisation",
          description: "Application de gestion des coûts d'optimisation électrique avec pilotage projet direct sans chef de projet. Conception complète de l'architecture Front-end et Back-end from scratch avec exports Excel via EPLUS.",
          highlights: ["Pilotage projet autonome", "Architecture complète", "Contact métier direct"]
        },
        {
          name: "GTM",
          description: "CRM principal web et desktop pour la gestion complète des opérations. Analyse approfondie de l'existant et développement d'interfaces UI dynamiques avec Asp.net pour répondre aux besoins métier évolutifs.",
          highlights: ["Analyse besoins utilisateurs", "Asp.net & ReactJS", "Maintenance applicative"]
        }
      ],
      tech: "Azure, .NET 5, Asp.net, C#, SQL, Angular 12, ReactJS, Entity Framework"
    },
    {
      company: "Schlumberger",
      role: "Full-Stack Software Engineer",
      period: "Décembre 2020 - Avril 2021",
      projects: [
        {
          name: "Prodcom",
          description: "Application de monitoring avancé des puits pétroliers et gestion des risques. Implémentation de microservices ZeroMQ pour une architecture distribuée performante, avec création d'exports Excel via Syncfusion et tests unitaires rigoureux (BDD).",
          highlights: ["Microservices ZeroMQ", "Angular Material", "Tests BDD Jasmine/Karma"]
        }
      ],
      tech: "Azure, .NET Core, C#, SQL, Angular, Node.js, ZeroMQ, Express, Entity Framework"
    },
    {
      company: "Criteo",
      role: "Full-Stack Software Engineer",
      period: "Janvier 2020 - Décembre 2020",
      projects: [
        {
          name: "CSI Publisher",
          description: "Application de gestion et d'historisation des coûts des publishers avec analyse approfondie des besoins fonctionnels pour une réponse technique optimale.",
          highlights: ["Procédures stockées SQL", "Mise en production", "Clean code"]
        },
        {
          name: "Homeland",
          description: "Solution complète de gestion de droits et management des groupes d'utilisateurs. Interface d'administration CRUD sophistiquée avec refonte graphique complète de l'existant et création d'APIs REST performantes.",
          highlights: ["Administration CRUD", "Refonte graphique", "Tests Mocha BDD"]
        }
      ],
      tech: "Azure, .NET, C#, SQL, ReactJS, Node.js, Entity Framework"
    },
    {
      company: "SAUR",
      role: "Full-Stack Software Engineer",
      period: "Mars 2019 - Décembre 2019",
      projects: [
        {
          name: "ICR",
          description: "Application web de consultation d'historique des contrôles de maintenance sur sites avec module de recherche dynamique avancé. Conception et réalisation complète de la solution avec peer-programming et clean code.",
          highlights: ["Recherche dynamique", "Peer-programming", "Jasmine BDD"]
        },
        {
          name: "Code de Conduite",
          description: "Application mobile de consultation du règlement interne SAUR. Développement d'un algorithme intelligent de génération automatique des pages à partir de données JSON pour une flexibilité maximale.",
          highlights: ["ReactNative", "Algorithme génération pages", "EXPO"]
        }
      ],
      tech: "Azure, .NET Core 2.2, C#, SQL, Vue.js, ReactNative, Node.js, Kibana"
    },
    {
      company: "BNP CIB",
      role: "Full-Stack Software Engineer",
      period: "Septembre 2017 - Décembre 2018",
      projects: [
        {
          name: "QFXT",
          description: "Application web de génération de comptes rendus pour utilisateurs front office de la salle des marchés. Proposition d'une solution web innovante avec interface d'administration complète (CRUD), statistiques d'utilisation détaillées et authentification SSO.",
          highlights: ["Trading floor", "SSO Authentication", "UI/UX Design"]
        },
        {
          name: "T-KYC",
          description: "Application web d'audit des contreparties financières (KYC) pour front office. Création d'un POC en Vue.js pour optimisation du temps de développement, puis migration vers Angular et .NET 4.6 avec interface de consultation du statut des contreparties et recherches avancées multi-critères.",
          highlights: ["POC Vue.js", "Migration .NET Core 2.0", "Recherches avancées"]
        }
      ],
      tech: ".NET MVC, Razor, C#, SQL, Angular, Vue.js, Node.js, WCF, Entity Framework"
    },
    {
      company: "AUSY",
      role: "Full-Stack Software Engineer",
      period: "Septembre 2015 - Août 2017",
      projects: [
        {
          name: "SIER",
          description: "Application de gestion de budgets avec refactorisation complète du code existant. Développement de nouvelles fonctionnalités incluant la création d'algorithmes .NET, procédures stockées SQL, APIs REST et tests unitaires Jasmine avec recettage applicatif complet.",
          highlights: ["Refactorisation code", "Algorithmes .NET", "Tests Jest TDD"]
        }
      ],
      tech: ".NET, C#, Ext.JS, HTML, CSS, JavaScript, Entity Framework"
    }
  ];

  const skills = {
    "Langages": ["C#", "TypeScript", "JavaScript ES6", "Python", "VB.Net", "Shell", "Java"],
    "Web": [".NET Core Web API", "REST API", "State Management", "UI/UX Design", "HTML5", "CSS3", "RxJS", "NGRX"],
    "Frameworks": [".NET 9", "Angular 20", "React", "Vue.js", "React Native", "Bootstrap", "Material Design", "Jasmine", "Jest", "Express", "TensorFlow", "Kibana", "Elastic", "Flask", "NUXT"],
    "Outils": ["Visual Studio 2022", "Visual Code", "NotePad++", "GitHub Copilot", "Cursor"],
    "Bases de données": ["MySQL", "SQL Server 2022", "MongoDB", "Cassandra", "Redis", "Cosmos DB"],
    "Systèmes": ["Docker", "macOS", "Windows", "Linux", "Android", "iOS"],
    "Craftmanship": ["S.O.L.I.D", "TDD", "BDD", "Tests Unitaires", "Clean Code", "Peer Programming"],
    "DevOps": ["Azure DevOps", "Kubernetes", "CI/CD Pipelines"],
    "IA & ML": ["PyTorch", "Hugging Face", "TensorFlow", "YOLO Training", "Mistral AI", "Llama", "LLM Prompting", "Développement LLM from scratch"],
    "Finance": ["EGC (Épargne en Gestion Collective)", "Gestion de portefeuille", "Assurance vie", "KYC (Know Your Customer)", "Outils financiers trading"],
    "Méthodologie": ["Agile Scrum", "UML", "Kanban"]
  };

  const education = [
    { year: "2018", degree: "Master 2 IT Manager", school: "École IPSSI" },
    { year: "2017", degree: "Master 1 Expert Web & Mobile", school: "École IPSSI" },
    { year: "2015", degree: "BTS SIO", school: "Paris" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BK
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'skills', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item === 'home' ? 'Accueil' : item === 'about' ? 'À propos' : item === 'experience' ? 'Expérience' : item === 'skills' ? 'Compétences' : item === 'education' ? 'Formation' : 'Contact'}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'experience', 'skills', 'education', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize text-gray-300 hover:text-white hover:bg-slate-800 rounded"
                >
                  {item === 'home' ? 'Accueil' : item === 'about' ? 'À propos' : item === 'experience' ? 'Expérience' : item === 'skills' ? 'Compétences' : item === 'education' ? 'Formation' : 'Contact'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Bilal KHALAK
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl text-gray-300 mb-4">
              Freelance Software Engineer
            </h2>
            <p className="text-xl md:text-2xl text-blue-400 mb-8">
              C# .NET 10 / Azure / Angular - Intelligence Artificielle
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              10 ans d'expérience dans le développement de solutions innovantes et performantes
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Me contacter
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="border-2 border-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-full font-semibold transition-all"
              >
                Voir mon parcours
              </button>
            </div>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown className="mx-auto text-blue-400" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              À propos
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Ingénieur Full-Stack passionné avec <strong>10 ans d'expérience</strong> dans la conception et le développement de solutions logicielles robustes et innovantes. Spécialisé dans l'écosystème <strong>.NET/C#</strong>, <strong>Azure Cloud</strong>, et les frameworks modernes comme <strong>Angular</strong> et <strong>React</strong>.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Expert en <strong>Intelligence Artificielle</strong> avec une expertise approfondie dans le développement de LLM from scratch, le training de modèles YOLO, et l'intégration d'IA (Mistral AI, Llama). Passionné par les architectures microservices, le clean code et les méthodologies Agile.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Fort d'une expérience dans des secteurs variés (finance, énergie, logistique, technologie), j'apporte une vision stratégique et une capacité d'adaptation aux enjeux métier les plus complexes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-lg border border-blue-500/30">
                <Code className="text-blue-400 mb-3" size={32} />
                <h3 className="text-2xl font-bold mb-2">10+</h3>
                <p className="text-gray-400">Années d'expérience</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
                <Briefcase className="text-purple-400 mb-3" size={32} />
                <h3 className="text-2xl font-bold mb-2">25+</h3>
                <p className="text-gray-400">Projets réalisés</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500/20 to-blue-500/20 p-6 rounded-lg border border-pink-500/30">
                <Award className="text-pink-400 mb-3" size={32} />
                <h3 className="text-2xl font-bold mb-2">9</h3>
                <p className="text-gray-400">Entreprises prestigieuses</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-lg border border-blue-500/30">
                <GraduationCap className="text-blue-400 mb-3" size={32} />
                <h3 className="text-2xl font-bold mb-2">Master 2</h3>
                <p className="text-gray-400">IT Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Expérience Professionnelle
            </span>
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400">{exp.company}</h3>
                    <p className="text-lg text-gray-300">{exp.role}</p>
                  </div>
                  <p className="text-gray-400 mt-2 md:mt-0">{exp.period}</p>
                </div>
                <div className="space-y-4">
                  {exp.projects.map((project, pIdx) => (
                    <div key={pIdx} className="ml-4 border-l-2 border-purple-500 pl-4">
                      <h4 className="text-xl font-semibold text-purple-400 mb-2">{project.name}</h4>
                      <p className="text-gray-300 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight, hIdx) => (
                          <span key={hIdx} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-sm text-gray-400">
                    <strong>Environnement technique:</strong> {exp.tech}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Compétences Techniques
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-purple-500/50 transition-all">
                <h3 className="text-xl font-bold mb-4 text-purple-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, idx) => (
                    <span key={idx} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-300 px-3 py-1 rounded text-sm border border-blue-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Formation
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all flex items-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3 mr-4">
                  <GraduationCap size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{edu.degree}</h3>
                      <p className="text-gray-300">{edu.school}</p>
                    </div>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                      {edu.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
              <p className="text-lg text-gray-300 mb-2">
                <strong>Langues:</strong>
              </p>
              <div className="flex gap-4 justify-center">
                <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30">
                  🇫🇷 Français - Natif
                </span>
                <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30">
                  🇬🇧 Anglais - Courant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <p className="text-lg text-gray-300 mb-8 text-center">
                N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:bilal@khalak.fr"
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-4 rounded-lg transition-all transform hover:scale-105"
                >
                  <Mail size={24} />
                  <span className="text-lg font-semibold">bilal@khalak.fr</span>
                </a>
                <a
                  href="tel:+33644112435"
                  className="flex items-center justify-center space-x-3 bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition-all"
                >
                  <Phone size={24} />
                  <span className="text-lg">+33 6 44 11 24 35</span>
                </a>
              </div>
              <div className="mt-8 flex justify-center space-x-6">
                <a
                  href="https://github.com/gteon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={32} />
                </a>
                <a
                  href="https://www.linkedin.com/in/bilal-khalak-267318ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={32} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">© 2025 Bilal KHALAK - Tous droits réservés</p>
            <p className="text-sm">Développé avec React & Tailwind CSS</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}