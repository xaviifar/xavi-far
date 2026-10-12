/**
 * Knowledge base and local fallback engine for Xavi Far's personal portfolio.
 * Tone: Minimalist, technical, pragmatic, and directly grounded in Xavi's real background.
 */

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  suggestions?: string[];
  source?: "openrouter" | "local";
}

export const INITIAL_SUGGESTIONS_EN = [
  "Who are you and what do you build?",
  "Tell me about your AI Agent Platform",
  "What is your core tech stack?",
  "Why should we hire you?",
  "How can I contact or collaborate with you?",
];

export const INITIAL_SUGGESTIONS_ES = [
  "¿Quién eres y a qué te dedicas?",
  "Háblame de tu plataforma de agentes IA",
  "¿Cuál es tu stack técnico principal?",
  "¿Por qué deberíamos ficharte?",
  "¿Cómo puedo contactar o colaborar contigo?",
];

export function getGreeting(lang: "en" | "es"): string {
  if (lang === "es") {
    return "¡Hola! Soy Xavi Far (a través de mi agente de IA). Estoy aquí para responderte directamente sobre mis proyectos de agentes autónomos, arquitectura de sistemas, stack técnico o experiencia. ¿Qué te gustaría saber?";
  }
  return "Hey! I'm Xavi Far (via my portfolio AI agent). I'm here to answer directly about my autonomous agent systems, architecture, tech stack, experience, or projects. What would you like to know?";
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
      "who are you",
      "quien es xavi",
      "quién es xavi",
      "quien eres",
      "quién eres",
      "a que te dedicas",
      "a qué te dedicas",
      "about xavi",
      "sobre xavi",
      "tell me about xavi",
      "cuentame sobre ti",
      "cuéntame sobre ti",
      "cuentame sobre xavi",
      "cuéntame de xavi",
      "presentate",
      "presentación",
      "introduce",
      "bio",
    ],
    reply: (lang) =>
      lang === "es"
        ? `Soy **Xavi Far**, **Desarrollador e Ingeniero de Sistemas de IA** afincado en Barcelona / Cataluña.\n\nMe especializo en **sistemas de agentes autónomos con bucles deterministas**, arquitecturas de memoria vectorial (RAG), colas asíncronas en Redis y desarrollo backend robusto en Python.\n\nCombino formación técnica en **Inteligencia Artificial y Big Data**, Desarrollo de Aplicaciones Multiplataforma y Administración de Sistemas. Mi enfoque es pragmático: resolver problemas de ingeniería reales con código mantenible, trazable y testeado.`
        : `I am **Xavi Far**, an **AI Systems Developer & Engineer** based in Barcelona / Catalonia, Spain.\n\nI focus on **production-grade autonomous AI agents with deterministic state loops**, vector memory architectures (RAG), Redis-backed queues, and containerized backend systems.\n\nI blend specialized training in **AI & Big Data** with multi-platform software development and Linux systems administration. Pragmatic, code-first, and zero hallucination.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Plataforma Multi-Agente", "Stack técnico", "¿Por qué contratarme?"]
        : ["AI Agent Platform", "Tech stack", "Why hire me?"],
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
        ? `**Plataforma Multi-Agente de IA** (mi proyecto destacado):\n\n• **Propósito:** Orquestación robusta de múltiples agentes autónomos ejecutando herramientas en bucles de estado deterministas.\n• **Arquitectura:** Colas de tareas en **Redis 7.2** para desacoplar procesos, **memoria vectorial Qdrant** para retención de contexto a largo plazo y contención en **Docker**.\n• **Mi enfoque de ingeniería:** Validación estricta de esquemas de llamadas a herramientas (tool-calling loops) para evitar ejecuciones fallidas o bucles infinitos.\n\nPuedes consultar el código en mi [GitHub](https://github.com/xaviifar).`
        : `**AI Agent Platform** (my flagship project):\n\n• **Core challenge:** Reliable orchestration of autonomous agents executing deterministic tool-calling loops.\n• **Tech Stack:** **Redis 7.2 queues** for async task scheduling, **Qdrant vector memory** for semantic recall, and **Docker** isolation.\n• **Engineering approach:** Strict JSON schema validation and deterministic state transitions so agent tool execution behaves predictably.\n\nCheck out the codebase on my [GitHub](https://github.com/xaviifar).`,
    followUps: (lang) =>
      lang === "es"
        ? ["Gmail AI Agent", "Stack de Python", "¿Cómo contactarme?"]
        : ["Gmail AI Agent", "Python stack", "How to contact me?"],
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
        ? `**Gmail AI Agent** (mi asistente inteligente de correo):\n\n• **Propósito:** Automatizar la clasificación semántica, etiquetado y limpieza de mi buzón de Gmail mediante IA.\n• **Bajo el capó:** Desarrollado con **LangGraph StateGraphs** y **LangChain**, integrando tool calling para interactuar directamente con la API de Gmail de forma segura.\n• **Capacidades:** Comprensión de intención, extracción de llamadas a la acción, triaje por lotes y síntesis de voz con ElevenLabs TTS.`
        : `**Gmail AI Agent** (my intelligent email assistant):\n\n• **Purpose:** Autonomous semantic classification, batch triage, and inbox organization.\n• **Under the hood:** Built with **LangGraph StateGraphs** and **LangChain**, integrating structured tool calling against the Gmail API.\n• **Capabilities:** Interprets message intent, extracts action items, executes safe batch actions, and synthesizes audio summaries via ElevenLabs TTS.`,
    followUps: (lang) =>
      lang === "es"
        ? ["BOE RAG", "Otros proyectos", "Ver CV"]
        : ["BOE RAG", "Other projects", "Download CV"],
  },

  // 4. BOE RAG Retrieval System
  {
    keywords: [
      "boe",
      "rag",
      "retrieval",
      "qdrant",
      "legal",
      "leyes",
      "vector",
      "airflow",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**BOE RAG Retrieval System** (mi buscador semántico jurídico):\n\n• **Propósito:** Pipeline de búsqueda semántica y recuperación documental sobre el Boletín Oficial del Estado.\n• **Arquitectura:** Chunking por ventana deslizante de 512 tokens, base vectorial **Qdrant**, y reordenamiento híbrido con **BM25**.\n• **Ingesta:** Sincronización programada con **Apache Airflow** y endpoints servidos mediante **FastAPI** en contenedores Docker.`
        : `**BOE RAG Retrieval System** (legal document intelligence):\n\n• **Purpose:** Semantic search and knowledge retrieval over the Spanish Official State Gazette records.\n• **Architecture:** 512-token sliding-window chunking, **Qdrant** vector database, and hybrid reranking via **BM25**.\n• **Ingestion:** Automated scheduling with **Apache Airflow** and served via **FastAPI** Docker containers.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Plataforma Multi-Agente", "Stack técnico", "Contacto directo"]
        : ["AI Agent Platform", "Tech stack", "Direct contact"],
  },

  // 5. McDonald's Sentiment & PARTY
  {
    keywords: [
      "mcdonald",
      "mcdonalds",
      "sentiment",
      "sentimiento",
      "nlp",
      "party",
      "odoo",
      "projects",
      "proyectos",
    ],
    reply: (lang) =>
      lang === "es"
        ? `Otros proyectos que he desarrollado:\n\n1. **McDonald's Sentiment Analysis:**\nPipeline de NLP sobre reseñas de clientes en Barcelona, comparando regresión logística frente a redes neuronales TF-IDF con evaluación ROC (AUC 0.941).\n\n2. **Party:**\nMarketplace y plataforma móvil para Android en Kotlin con catálogo interactivo, carrito y sincronización con MySQL.\n\n3. **Enterprise Odoo Automation (ESDI Systems):**\nSuite de automatización empresarial con módulos Odoo ERP, scraping en Selenium, conciliación SQL y análisis con LLMs.`
        : `Other projects I have built:\n\n1. **McDonald's Sentiment Analysis:**\nNLP customer review pipeline on Barcelona reviews, comparing logistic regression against TF-IDF Neural Networks (ROC AUC 0.941).\n\n2. **Party:**\nEvent coordination Android mobile app written in native Kotlin with real-time MySQL synchronization.\n\n3. **Enterprise Odoo Automation (ESDI Systems):**\nProduction business automation integrating custom Odoo ERP models, Selenium bots, SQL reconciliation, and LLM parsing.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Plataforma Multi-Agente", "Stack técnico", "Experiencia laboral"]
        : ["AI Agent Platform", "Tech stack", "Work experience"],
  },

  // 6. Tech Stack & Skills
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
      "langchain",
      "langgraph",
      "postgres",
      "redis",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Mi Stack Técnico Principal:**\n\n• **Lenguajes:** Python (mi lenguaje principal para IA y backend), SQL, TypeScript, Bash, Kotlin.\n• **Frameworks & IA:** LangGraph, LangChain, FastAPI, Flask, Scikit-learn, TensorFlow, Qdrant, Pandas.\n• **Infraestructura & Datos:** PostgreSQL, Redis, MySQL, Docker, Apache Airflow, Linux (Ubuntu/Debian), Git.\n• **Especialidad:** Agentes deterministas, pipelines RAG, colas asíncronas de trabajo y automatización empresarial.`
        : `**My Core Tech Stack:**\n\n• **Languages:** Python (Advanced - my primary language for AI & backend), SQL, TypeScript, Bash, Kotlin.\n• **Frameworks & AI:** LangGraph, LangChain, FastAPI, Flask, Scikit-learn, TensorFlow, Qdrant, Pandas.\n• **Data & Infrastructure:** PostgreSQL, Redis, MySQL, Docker, Apache Airflow, Linux (Ubuntu/Debian), Git.\n• **Focus:** Deterministic agents, RAG retrieval pipelines, async task queues, and enterprise automation.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Experiencia laboral", "Proyectos de IA", "Descargar CV"]
        : ["Work experience", "AI Projects", "Download CV"],
  },

  // 7. Work Experience (ESDI Systems)
  {
    keywords: [
      "experience",
      "experiencia",
      "esdi",
      "trabajo",
      "work",
      "job",
      "laboral",
      "carrera",
      "empresa",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Mi Experiencia Profesional:**\n\n**Desarrollador de Sistemas de IA y Automatización en ESDI Systems (Oct 2024 - Presente):**\n• Diseñé e implementé pipelines de automatización con **Odoo ERP**, **Selenium** y **Python**.\n• Creé bots de scraping para extracción estructurada de datos y conciliación con bases de datos SQL.\n• Desarrollé parsers con LLMs a través de OpenRouter para la extracción y validación de documentos comerciales.\n• Optimicé procesos de negocio reduciendo cientos de horas de trabajo manual al mes.`
        : `**My Professional Experience:**\n\n**AI Systems & Automation Developer at ESDI Systems (Oct 2024 - Present):**\n• Engineered business automation workflows connecting **Odoo ERP**, **Selenium**, and **Python**.\n• Built web scraping bots for structured supplier data extraction and SQL data reconciliation.\n• Developed LLM document extraction parsers via OpenRouter for business invoices.\n• Streamlined core operations, saving hundreds of manual hours each month.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Stack técnico", "Educación", "Descargar CV"]
        : ["Tech stack", "Education", "Download CV"],
  },

  // 8. Why Hire Him?
  {
    keywords: [
      "hire",
      "contratar",
      "fichar",
      "why hire",
      "por que contratar",
      "por qué contratar",
      "ventajas",
      "puntos fuertes",
      "fortalezas",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Por qué contar conmigo en tu equipo:**\n\n1. **Enfoque en producción:** Construyo **sistemas de agentes deterministas**, manejo colas en Redis y defino esquemas estrictos de tool-calling para evitar fallos o bucles infinitos.\n2. **Visión integral:** Domino el pipeline de datos completo, desde la ingesta y embeddings hasta la infraestructura de despliegue con Docker y bases SQL.\n3. **Pragmatismo técnico:** Resuelvo con código eficiente y directo, aplicando modelos de lenguaje donde realmente aportan valor cuantificable.\n4. **Rigor y autonomía:** Capacidad demostrada para analizar requerimientos complejos y entregar soluciones de software estables.`
        : `**Why bring me onto your team:**\n\n1. **Production Mindset:** I build **deterministic state loops**, manage Redis worker queues, and enforce strict JSON schemas for safe tool calling.\n2. **Full-Pipeline Vision:** I understand the entire lifecycle: from data ingestion and embeddings to Dockerized deployment and relational databases.\n3. **Pragmatic Engineering:** I write clean code where sufficient, and leverage AI models where they create measurable business value.\n4. **Autonomy & Rigor:** Proven ability to unpack complex specifications and deliver reliable, maintainable software systems.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Contacto directo", "Descargar CV", "Stack técnico"]
        : ["Direct contact", "Download CV", "Tech stack"],
  },

  // 9. Contact / Links
  {
    keywords: [
      "contact",
      "contacto",
      "email",
      "correo",
      "cv",
      "curriculum",
      "linkedin",
      "github",
      "kaggle",
    ],
    reply: (lang) =>
      lang === "es"
        ? `**Puedes contactar conmigo directamente a través de:**\n\n• **Email:** [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com)\n• **GitHub:** [github.com/xaviifar](https://github.com/xaviifar)\n• **LinkedIn:** [linkedin.com/in/xavi-far](https://www.linkedin.com/in/xavi-far/)\n• **Kaggle:** [kaggle.com/xaviifar](https://www.kaggle.com/xaviifar)\n• **Currículum:** [Descargar CV en PDF](/Xavi_Far_CV.pdf)\n\nTambién puedes utilizar el formulario de contacto al final de esta página.`
        : `**You can reach me directly via:**\n\n• **Email:** [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com)\n• **GitHub:** [github.com/xaviifar](https://github.com/xaviifar)\n• **LinkedIn:** [linkedin.com/in/xavi-far](https://www.linkedin.com/in/xavi-far/)\n• **Kaggle:** [kaggle.com/xaviifar](https://www.kaggle.com/xaviifar)\n• **Resume / CV:** [Download CV PDF](/Xavi_Far_CV.pdf)\n\nYou can also reach out via the contact form at the bottom of the page.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Ubicación", "Stack técnico", "¿Quién soy?"]
        : ["Location", "Tech stack", "Who am I?"],
  },

  // 10. Location
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
    ],
    reply: (lang) =>
      lang === "es"
        ? `Estoy ubicado en **Barcelona / Cataluña (España)**, disponible para posiciones en remoto, híbridas o presenciales enfocadas en ingeniería de sistemas de IA, agentes autónomos y arquitectura de datos.`
        : `I am based in **Barcelona / Catalonia (Spain)**, open to remote, hybrid, or on-site opportunities in AI engineering, autonomous systems, and backend data infrastructure.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Cómo contactarme", "Descargar CV", "¿Por qué contratarme?"]
        : ["How to contact me", "Download CV", "Why hire me?"],
  },

  // 11. Availability / Interviews
  {
    keywords: [
      "entrevista",
      "entrevistas",
      "horario",
      "schedule",
      "interview",
      "availability",
      "disponibilidad horaria",
      "reunion",
      "reunión",
      "call",
    ],
    reply: (lang) =>
      lang === "es"
        ? `Tengo disponibilidad preferentemente **por las tardes, a partir de las 15:30 (hora de Madrid, Europe/Madrid)**. Si necesitas una entrevista por la mañana, podemos valorarlo y acordarlo previamente. Puedes escribirme a [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com) para coordinar el horario.`
        : `I am available preferably **in the afternoons, from 15:30 CET / Madrid time (Europe/Madrid)**. If you need a morning slot, we can discuss and arrange it in advance. You can reach out at [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com) to coordinate.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Contacto directo", "Descargar CV", "Stack técnico"]
        : ["Direct contact", "Download CV", "Tech stack"],
  },

  // 12. Greetings
  {
    keywords: ["hola", "hello", "hi", "hey", "salut", "buenas", "buenos dias", "good morning"],
    reply: (lang) =>
      lang === "es"
        ? `¡Hola! ¿Qué te gustaría consultar sobre mi trabajo? Puedes preguntarme sobre mi **Plataforma Multi-Agente**, mi experiencia con **LangGraph y Python**, o solicitar mis datos de contacto y CV.`
        : `Hey! What would you like to know about my work? You can ask about my **AI Agent Platform**, experience with **LangGraph & Python**, or get my contact info and CV.`,
    followUps: (lang) =>
      lang === "es"
        ? ["¿Quién soy?", "Plataforma de agentes", "Descargar CV"]
        : ["Who am I?", "AI Agent Platform", "Download CV"],
  },
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .trim();
}

export function generateBotResponse(
  query: string,
  currentLang: "en" | "es"
): { text: string; suggestions: string[] } {
  const normQuery = normalize(query);

  const spanishMarkers = ["que", "quien", "como", "por que", "donde", "hola", "proyectos", "experiencia", "cv", "contratar"];
  const isSpanishPrompt = spanishMarkers.some((m) => normQuery.includes(m));
  const effectiveLang: "en" | "es" = isSpanishPrompt ? "es" : currentLang;

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

  if (effectiveLang === "es") {
    return {
      text: `Puedes preguntarme sobre mis **sistemas de agentes de IA**, mi **experiencia en ESDI Systems** o revisar mi código en [GitHub](https://github.com/xaviifar). También puedes escribirme directamente a [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com).`,
      suggestions: [
        "¿Quién soy?",
        "Plataforma de agentes",
        "Stack técnico",
        "Contacto directo",
      ],
    };
  }

  return {
    text: `You can ask about my **autonomous AI agent architectures**, my **experience at ESDI Systems**, or check my code on [GitHub](https://github.com/xaviifar). You can also reach me directly at [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com).`,
    suggestions: [
      "Who am I?",
      "AI Agent Platform",
      "Tech stack",
      "Get in touch",
    ],
  };
}
