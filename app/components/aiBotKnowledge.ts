/**
 * Knowledge base and Grok-style conversational engine for Xavi Far's portfolio.
 * Tone: Witty, sharp, technical, and strictly grounded in Xavi's real background.
 */

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const INITIAL_SUGGESTIONS_EN = [
  "Who is Xavi Far?",
  "Tell me about the AI Agent Platform",
  "What is his tech stack?",
  "Why should we hire him?",
  "How can I contact him?",
];

export const INITIAL_SUGGESTIONS_ES = [
  "¿Quién es Xavi Far?",
  "Háblame de la plataforma de agentes IA",
  "¿Cuál es su stack técnico?",
  "¿Por qué deberíamos ficharlo?",
  "¿Cómo puedo contactar con él?",
];

export function getGreeting(lang: "en" | "es"): string {
  if (lang === "es") {
    return "¡Hola! 👋 Soy el alter-ego IA de Xavi Far (modo Grok activado ⚡). Entrenado en su arquitectura de sistemas, pipelines de agentes y commits. Pregúntame sobre sus proyectos de IA, stack técnico, experiencia o por qué deberías contratarlo antes de que otro equipo se te adelante.";
  }
  return "Hey! 👋 I'm Xavi Far's AI alter-ego (Grok mode active ⚡). Think sharp engineering wit meets a developer who actually builds deterministic multi-agent architectures and debugs Redis queues. Ask me anything about his AI agents, tech stack, real experience, or why you should hire him.";
}

interface IntentPattern {
  keywords: string[];
  reply: (lang: "en" | "es") => string;
  followUps?: (lang: "en" | "es") => string[];
}

const INTENTS: IntentPattern[] = [
  // 1. Who is Xavi / About
  {
    keywords: [
      "who is xavi",
      "quien es xavi",
      "quién es xavi",
      "about xavi",
      "sobre xavi",
      "tell me about xavi",
      "cuentame sobre xavi",
      "cuéntame de xavi",
      "presentate",
      "presentación",
      "introduce",
      "bio",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Xavi Far** es un **Ingeniero de IA y Desarrollador de Sistemas de IA** afincado en Barcelona / Cataluña.\n\nA diferencia de quienes solo pegan wrappers de OpenAI, Xavi se enfoca en **sistemas de agentes autónomos con guardarraíles deterministas**, arquitecturas de memoria vectorial (RAG), colas de trabajo en Redis y backend robusto en Python.\n\nCombina formación especializada en **Inteligencia Artificial y Big Data** con desarrollo de aplicaciones multiplataforma y administración de sistemas. Le apasiona la ingeniería donde la IA resuelve problemas de negocio reales con código testeado y predecible.`
        : `**Xavi Far** is an **AI Engineer & AI Systems Developer** based in Barcelona / Catalonia, Spain.\n\nWhile half the internet is wrapping basic OpenAI API calls in marketing fluff, Xavi builds **production-grade autonomous AI agents with deterministic state loops**, vector memory (RAG), Redis-backed queues, and containerized architectures.\n\nHe blends formal training in **AI & Big Data** with multi-platform software engineering and Linux/systems foundations. Pragmatic, code-first, and zero hallucination.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Proyectos de IA", "Stack técnico", "¿Por qué contratarlo?"]
        : ["AI Projects", "Tech stack", "Why hire him?"],
  },

  // 2. Multi-Agent Platform
  {
    keywords: [
      "multi agent",
      "multi-agent",
      "agent platform",
      "plataforma de agentes",
      "plataforma multi-agente",
      "ai agent platform",
      "orchestration",
      "orquestacion",
      "orquestación",
      "redis",
      "deterministic",
      "determinista",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Plataforma Multi-Agente de IA** (Proyecto destacado de Xavi):\n\n• **¿Qué resuelve?** Orquestación robusta de múltiples agentes autónomos ejecutando herramientas en bucles deterministas.\n• **Arquitectura clave:** Colas asíncronas en **Redis** para desacoplar tareas, **memoria vectorial** para retención de contexto a largo plazo y contención en **Docker**.\n• **El toque de ingeniería:** No confía a ciegas en LLMs no estructurados; implementa validación estricta de esquemas de llamadas a herramientas (tool-calling loops) para evitar ejecuciones fallidas o bucles infinitos.\n\nPuedes ver el código y arquitectura en su [GitHub](https://github.com/xaviifar).`
        : `**AI Agent Platform** (Xavi's flagship architecture project):\n\n• **Core challenge:** Orchestrating autonomous agents without letting them run wild into costly infinite loops.\n• **Tech Stack:** **Redis queues** for async task scheduling, **vector memory** for semantic recall, deterministic tool-calling loops, and **Docker** isolation.\n• **Engineering decision:** Enforcing structured JSON schema validation and deterministic state transitions so agent tool execution behaves reliably in production.\n\nCheck out the codebase on [GitHub](https://github.com/xaviifar).`,
    followUps: (lang) =>
      lang === "es"
        ? ["Gmail AI Agent", "Stack de Python", "¿Cómo contactarlo?"]
        : ["Gmail AI Agent", "Python stack", "How to contact him?"],
  },

  // 3. Gmail AI Agent
  {
    keywords: [
      "gmail",
      "email",
      "correo",
      "gmail agent",
      "langgraph",
      "langchain",
      "inbox",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Gmail AI Agent** (Asistente inteligente de correo):\n\n• **Propósito:** Automatizar la clasificación semántica, etiquetado y limpieza del buzón de Gmail mediante IA.\n• **Bajo el capó:** Desarrollado con conceptos de **LangGraph** y **LangChain**, integrando tool calling para interactuar directamente con la API de Gmail de forma segura.\n• **Diferenciador:** Va más allá de filtros de texto clásicos; comprende la intención del mensaje, extrae llamadas a la acción y propone acciones estructuradas (mover, etiquetar, responder o purgar spam).`
        : `**Gmail AI Agent** (Intelligent email assistant):\n\n• **Purpose:** Taming chaotic inboxes through autonomous semantic classification and triage.\n• **Under the hood:** Built with **LangGraph** and **LangChain** patterns, integrating structured tool calling against the Gmail API.\n• **The difference:** Instead of naive regex rules, it interprets message intent, extracts action items, and executes safe batch actions with human-in-the-loop validation.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Plataforma Multi-Agente", "Otros proyectos", "Ver CV"]
        : ["AI Agent Platform", "Other projects", "Download CV"],
  },

  // 4. Other Projects (4Party, McDonald's Sentiment)
  {
    keywords: [
      "4party",
      "party",
      "mcdonald",
      "mcdonalds",
      "sentiment",
      "sentimiento",
      "nlp",
      "projects",
      "proyectos",
      "portfolio",
    ],
    reply: (lang) =>
      lang === "es"
        ? `Aquí tienes los otros proyectos clave de Xavi:\n\n1. **McDonald's Sentiment Analysis:**\nPipeline de Big Data y NLP que procesa miles de opiniones de clientes con Python, Pandas y spaCy para extraer tendencias de satisfacción y cuellos de botella en el servicio.\n\n2. **4Party:**\nPlataforma web completa para descubrimiento y gestión de ocio nocturno y eventos, desarrollada en TypeScript con Next.js y Supabase.\n\n3. **Sistemas de Agentes IA:**\nProyectos de experimentación continua con RAG, embeddings y orquestación con LangGraph.\n\n¿Quieres profundizar en alguno en particular?`
        : `Here are Xavi's other key projects:\n\n1. **McDonald's Sentiment Analysis:**\nBig Data & NLP pipeline processing thousands of customer reviews using Python, Pandas, and spaCy to identify customer sentiment patterns and service anomalies.\n\n2. **4Party:**\nFull-stack nightlife and events platform built with TypeScript, Next.js, and Supabase.\n\n3. **AI Agent Systems:**\nOngoing experiments with deterministic RAG pipelines, local models via Ollama, and LangGraph orchestration.\n\nWhich one would you like to explore deeper?`,
    followUps: (lang) =>
      lang === "es"
        ? ["AI Agent Platform", "Stack técnico", "Experiencia laboral"]
        : ["AI Agent Platform", "Tech stack", "Work experience"],
  },

  // 5. Tech Stack & Skills
  {
    keywords: [
      "tech stack",
      "tecnologias",
      "tecnologías",
      "skills",
      "habilidades",
      "stack",
      "python",
      "sql",
      "docker",
      "fastapi",
      "rag",
      "langchain",
      "langgraph",
      "vector",
      "postgres",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Stack Técnico de Xavi Far:**\n\n• **Lenguajes:** Python (principal), TypeScript / JavaScript, SQL avanzado, Bash.\n• **IA & Agentes:** LangGraph, LangChain, Tool Calling determinista, RAG (Retrieval-Augmented Generation), Vector DBs (Qdrant, Chroma, pgvector), Ollama y APIs de LLMs.\n• **Backend & Datos:** FastAPI, Flask, PostgreSQL, Redis, Pandas, Scikit-Learn, Odoo ERP.\n• **Infraestructura:** Docker, Linux, Git, REST APIs, CI/CD.\n• **Frontend:** Next.js, React, Tailwind CSS.\n\nNo acumula logos en el CV; utiliza tecnologías que ha desplegado y depurado en proyectos reales.`
        : `**Xavi Far's Tech Stack:**\n\n• **Languages:** Python (core), TypeScript, Advanced SQL, Bash.\n• **AI & Agentic Systems:** LangGraph, LangChain, Structured Tool Calling, RAG pipelines, Vector Search (Qdrant, Chroma, pgvector), Ollama / Local LLMs.\n• **Data & Infrastructure:** Redis (queues & cache), PostgreSQL, Docker, FastAPI, Flask, Pandas, Scikit-learn.\n• **Web & Frontend:** Next.js, React, Tailwind CSS.\n\nZero resume decoration. Every tech listed has been used to write, debug, and ship working code.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Experiencia en ESDI", "Descargar CV", "¿Por qué contratarlo?"]
        : ["ESDI Experience", "Download CV", "Why hire him?"],
  },

  // 6. Experience / ESDI / Fundació Pere Tarrés
  {
    keywords: [
      "experience",
      "experiencia",
      "esdi",
      "esdi systems",
      "pere tarres",
      "pere tarrés",
      "trabajo",
      "jobs",
      "trayectoria",
      "carrera",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Experiencia Profesional Real:**\n\n1. **ESDI Systems · Desarrollador de Software:**\nDesarrollo backend y automatizaciones con **Python**, **Flask**, **Odoo ERP** y **SQL**. Creación de integraciones de sistemas, flujos de datos y exploración de funcionalidades con LLMs para optimizar procesos empresariales.\n\n2. **Fundació Pere Tarrés · Técnico de Sistemas / Soporte TI:**\nGestión de infraestructura de sistemas, diagnóstico de hardware, configuración de estaciones de trabajo, redes y soporte técnico en entornos heterogéneos (Linux y Windows).\n\nEsta combinación le otorga una ventaja crítica: comprende tanto el código de IA como la infraestructura y redes donde se ejecuta.`
        : `**Authentic Work Experience:**\n\n1. **ESDI Systems · Software Developer:**\nBackend development and workflow automations using **Python**, **Flask**, **Odoo ERP**, and **SQL**. Built enterprise data integrations, business automations, and LLM-assisted tool functionality.\n\n2. **Fundació Pere Tarrés · IT Systems & Support:**\nInfrastructure maintenance, workstation diagnostics, network configuration, and technical troubleshooting across Linux and Windows environments.\n\nThis gives him a major edge: he understands AI models *and* the bare-metal systems, networks, and servers running them.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Formación académica", "¿Por qué contratarlo?", "Contacto"]
        : ["Education background", "Why hire him?", "Contact"],
  },

  // 7. Education
  {
    keywords: [
      "education",
      "educacion",
      "educación",
      "estudios",
      "universidad",
      "fp",
      "dam",
      "big data",
      "titulacion",
      "titulación",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Formación Académica:**\n\n• **Curso de Especialización en Inteligencia Artificial y Big Data:**\nFormación avanzada en machine learning, procesamiento de datos masivos, redes neuronales y pipelines analíticos.\n\n• **Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM):**\nArquitectura de software, patrones de diseño, bases de datos relacionales y desarrollo full-stack.\n\n• **Sistemas Microinformáticos y Redes:**\nFundamentos sólidos de redes, protocolos TCP/IP, sistemas operativos y hardware.`
        : `**Academic Education:**\n\n• **Specialization in Artificial Intelligence & Big Data:**\nAdvanced coursework in machine learning pipelines, neural networks, Big Data processing, and predictive models.\n\n• **Higher Degree in Multi-platform Application Development (DAM):**\nSoftware architecture, object-oriented design, databases, and application lifecycle.\n\n• **Systems & Network Administration Foundations:**\nCore networking protocols, hardware architecture, and OS diagnostics.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Ver proyectos", "Stack técnico", "Contacto"]
        : ["View projects", "Tech stack", "Contact"],
  },

  // 8. Why Hire Him? (Grok style punchline)
  {
    keywords: [
      "why hire",
      "por que contratar",
      "por qué contratar",
      "porque contratar",
      "contratar",
      "hire him",
      "recomiendas",
      "ventajas",
      "diferencial",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**¿Por qué deberías fichar a Xavi?** (Modo Grok sin filtros):\n\n1. **Cero humo:** En un mercado saturado de "expertos en prompts", Xavi construye **sistemas deterministas**, maneja colas en Redis y escribe schemas de tool-calling rigurosos para que la IA no alucine.\n2. **Visión sistémica:** Entiende tanto el pipeline de agentes como las bases de datos SQL y los contenedores Docker donde corre el servicio.\n3. **Autonomía y ejecución:** Aprende rápido, resuelve incidencias complejas y entrega código limpio y mantenible.\n4. **Pragmático:** No mete IA donde basta una función de tres líneas. Usa IA donde genera impacto real.\n\nSi necesitas a alguien que diseñe y ponga en marcha sistemas de IA que no se caigan a las 3 de la mañana, escríbele.`
        : `**Why hire Xavi?** (Unfiltered Grok assessment):\n\n1. **Zero Snake Oil:** While LinkedIn is busy inventing 400 prompt-engineering adjectives, Xavi writes **deterministic state machines**, manages async worker queues, and enforces strict schema validation.\n2. **Full-stack Systems Sense:** He doesn't just call an API; he knows how PostgreSQL queries scale, how Redis queues behave under pressure, and how Docker containers talk to each other.\n3. **Pragmatic builder:** He doesn't shoehorn an LLM where an SQL query solves it in 2ms. He leverages AI where it actually produces real leverage.\n4. **High velocity & rigor:** Clean commits, solid architecture, and genuine passion for autonomous agent engineering.\n\nDrop him a message before his calendar gets booked.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Cómo contactar", "Descargar CV", "Ver proyectos"]
        : ["How to contact", "Download CV", "See projects"],
  },

  // 9. Contact / CV
  {
    keywords: [
      "contact",
      "contacto",
      "email",
      "correo",
      "cv",
      "resume",
      "curriculum",
      "linkedin",
      "github",
      "telefono",
      "hire",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Formas directas de contactar con Xavi:**\n\n• **Email:** [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com)\n• **GitHub:** [github.com/xaviifar](https://github.com/xaviifar)\n• **LinkedIn:** [linkedin.com/in/xavi-far](https://www.linkedin.com/in/xavi-far/)\n• **Currículum:** [Descargar CV en PDF](/Xavi_Far_CV.pdf)\n\nTambién puedes usar el formulario de contacto al final de esta misma página web.`
        : `**Direct ways to reach Xavi:**\n\n• **Email:** [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com)\n• **GitHub:** [github.com/xaviifar](https://github.com/xaviifar)\n• **LinkedIn:** [linkedin.com/in/xavi-far](https://www.linkedin.com/in/xavi-far/)\n• **Resume / CV:** [Download CV PDF](/Xavi_Far_CV.pdf)\n\nOr drop a quick message through the contact form at the bottom of the page!`,
    followUps: (lang) =>
      lang === "es"
        ? ["¿Dónde vive?", "Stack técnico", "Volver al inicio"]
        : ["Where is he located?", "Tech stack", "Back to start"],
  },

  // 10. Location / Availability
  {
    keywords: [
      "donde vive",
      "dónde vive",
      "location",
      "ubicacion",
      "ubicación",
      "barcelona",
      "cataluña",
      "remoto",
      "remote",
      "disponibilidad",
      "availability",
    ],
    reply: (lang) =>
      lang === "es"
        ? `Xavi está ubicado en **Barcelona / Cataluña (España)**, disponible para posiciones en **remoto**, híbridas o proyectos con impacto real en sistemas de inteligencia artificial y desarrollo de software.`
        : `Xavi is based in **Barcelona / Catalonia (Spain)**, open to **remote**, hybrid, or on-site opportunities focused on AI engineering, agentic systems, and backend data infrastructure.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Cómo contactar", "Descargar CV", "¿Por qué contratarlo?"]
        : ["How to contact", "Download CV", "Why hire him?"],
  },

  // 11. Humor / Grok personality / Jokes
  {
    keywords: [
      "joke",
      "chiste",
      "broma",
      "grok",
      "eres real",
      "are you real",
      "skynet",
      "sentient",
      "inteligencia",
      "meaning of life",
      "sentido de la vida",
      "42",
    ],
    reply: (lang) =>
      lang === "es"
        ? `*Modo Grok activado ⚡:*\n\n¿El sentido de la vida? 42, obviamente. Pero en producción, el sentido de la vida es que tus agentes no entren en un bucle recursivo gastándote 300€ en tokens antes de que te tomes el café.\n\n¿Por qué los agentes de IA aman Redis? Porque por fin tienen una memoria persistente que no les cobra por cada mil tokens.\n\n¿Tienes alguna pregunta seria sobre el código de Xavi o seguimos con la comedia? 😉`
        : `*Grok mode activated ⚡:*\n\nThe meaning of life? 42, obviously. But in production engineering, the real meaning of life is making sure your autonomous agents don't enter an infinite recursive loop burning $300 in tokens before you finish your morning espresso.\n\nWhy do AI agents love Redis? Because they finally have state persistence that doesn't cost them per thousand tokens.\n\nGot a technical question about Xavi's architecture, or shall we keep roasting LLMs? 😉`,
    followUps: (lang) =>
      lang === "es"
        ? ["Proyectos de IA", "Stack técnico", "¿Quién es Xavi?"]
        : ["AI Projects", "Tech stack", "Who is Xavi?"],
  },

  // 12. Greetings
  {
    keywords: ["hola", "hello", "hi", "hey", "salut", "buenas", "buenos dias", "good morning"],
    reply: (lang) =>
      lang === "es"
        ? `¡Hola! 👋 Aquí el asistente IA de Xavi Far (modo Grok). ¿Qué te gustaría descubrir hoy? Puedo contarte sobre su **Plataforma Multi-Agente**, su experiencia con **Python y LangGraph**, o facilitarte su CV directamente.`
        : `Hey there! 👋 Xavi Far's AI assistant here (Grok mode). What would you like to explore? I can tell you about his **AI Agent Platform**, his experience with **Python & LangGraph**, or get you his direct CV and contact info.`,
    followUps: (lang) =>
      lang === "es"
        ? ["¿Quién es Xavi?", "Proyectos de IA", "Descargar CV"]
        : ["Who is Xavi?", "AI Projects", "Download CV"],
  },
];

/**
 * Normalizes text for keyword matching
 */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .trim();
}

/**
 * Generates an in-character response to user query
 */
export function generateBotResponse(
  query: string,
  currentLang: "en" | "es"
): { text: string; suggestions: string[] } {
  const normQuery = normalize(query);

  // Auto-detect language preference based on prompt tokens
  const spanishMarkers = ["que", "quien", "como", "por que", "donde", "hola", "proyectos", "experiencia", "cv", "contratar"];
  const isSpanishPrompt = spanishMarkers.some((m) => normQuery.includes(m));
  const effectiveLang: "en" | "es" = isSpanishPrompt ? "es" : currentLang;

  // Search through defined intents
  for (const intent of INTENTS) {
    const matched = intent.keywords.some((kw) => {
      const normKw = normalize(kw);
      return normQuery.includes(normKw);
    });

    if (matched) {
      return {
        text: intent.reply(effectiveLang),
        suggestions: intent.followUps ? intent.followUps(effectiveLang) : effectiveLang === "es" ? INITIAL_SUGGESTIONS_ES.slice(0, 3) : INITIAL_SUGGESTIONS_EN.slice(0, 3),
      };
    }
  }

  // Witty Grok fallback for open queries
  if (effectiveLang === "es") {
    return {
      text: `*Modo Grok ⚡:* Mi modelo neuronal todavía está indexando esa pregunta específica, pero como diría Grok: no hay misterio que un buen commit o una llamada a [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com) no resuelva.\n\nSi buscas saber más sobre sus **sistemas multi-agente**, su **experiencia en ESDI** o revisar su **código en GitHub**, dímelo y te paso los detalles directos.`,
      suggestions: [
        "¿Quién es Xavi?",
        "Plataforma de agentes",
        "Stack técnico",
        "Contacto directo",
      ],
    };
  }

  return {
    text: `*Grok mode ⚡:* My neural weights are still calibrating on that specific query, but in true engineering fashion: there's no puzzle that a solid Python architecture or a quick note to [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com) can't solve.\n\nIf you want the real scoop on his **multi-agent orchestration**, his **work at ESDI Systems**, or his **GitHub repos**, ask away!`,
    suggestions: [
      "Who is Xavi?",
      "AI Agent Platform",
      "Tech stack",
      "Get in touch",
    ],
  };
}
