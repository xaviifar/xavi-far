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
  "Who is Xavi and what does he do?",
  "Tell me about his AI Agent Platform",
  "What is his core tech stack?",
  "How can I contact Xavi?",
];

export const INITIAL_SUGGESTIONS_ES = [
  "¿Quién es Xavi y a qué se dedica?",
  "Háblame de su plataforma de agentes IA",
  "¿Cuál es su stack tecnológico?",
  "¿Cómo puedo contactar con Xavi?",
];

export function getGreeting(lang: "en" | "es"): string {
  if (lang === "es") {
    return "¡Hola! Soy el asistente virtual de Xavi Far. Estoy aquí para responderte sobre sus proyectos de agentes autónomos, arquitectura de sistemas, stack tecnológico o experiencia. ¿Qué te gustaría saber sobre él?";
  }
  return "Hey! I'm Xavi Far's AI assistant. I'm here to answer directly about his autonomous agent systems, architecture, tech stack, experience, or projects. What would you like to know about him?";
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
      "a que se dedica",
      "a qué se dedica",
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
        ? `**Xavi Far** es un **AI Software Engineer** afincado en Barcelona / Cataluña.\n\nSe especializa en **sistemas de agentes autónomos con bucles deterministas**, arquitecturas de memoria vectorial (RAG), colas asíncronas en Redis y desarrollo backend robusto en Python.\n\nCombina formación técnica en **Inteligencia Artificial y Big Data**, Desarrollo de Aplicaciones Multiplataforma y Administración de Sistemas. Su enfoque es pragmático: resolver problemas de ingeniería reales con código mantenible, trazable y testeado.`
        : `**Xavi Far** is an **AI Software Engineer** based in Barcelona / Catalonia, Spain.\n\nHe focuses on **production-grade autonomous AI agents with deterministic state loops**, vector memory architectures (RAG), Redis-backed queues, and containerized backend systems.\n\nHe blends specialized training in **AI & Big Data** with multi-platform software development and Linux systems administration. Pragmatic, code-first, and zero hallucination.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Plataforma Multi-Agente", "Stack tecnológico", "Experiencia laboral"]
        : ["AI Agent Platform", "Tech stack", "Work experience"],
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
        ? `**Plataforma Multi-Agente de IA** (su proyecto destacado):\n\n• **Propósito:** Orquestación robusta de múltiples agentes autónomos ejecutando herramientas en bucles de estado deterministas.\n• **Arquitectura:** Colas de tareas en **Redis 7.2** para desacoplar procesos, **memoria vectorial Qdrant** para retención de contexto a largo plazo y contención en **Docker**.\n• **Su enfoque de ingeniería:** Validación estricta de esquemas de llamadas a herramientas (tool-calling loops) para evitar ejecuciones fallidas o bucles infinitos.\n\nPuedes consultar el código en su [GitHub](https://github.com/xaviifar).`
        : `**AI Agent Platform** (his flagship project):\n\n• **Core challenge:** Reliable orchestration of autonomous agents executing deterministic tool-calling loops.\n• **Tech Stack:** **Redis 7.2 queues** for async task scheduling, **Qdrant vector memory** for semantic recall, and **Docker** isolation.\n• **Engineering approach:** Strict JSON schema validation and deterministic state transitions so agent tool execution behaves predictably.\n\nCheck out the codebase on his [GitHub](https://github.com/xaviifar).`,
    followUps: (lang) =>
      lang === "es"
        ? ["Gmail AI Agent", "Stack de Python", "¿Cómo contactar con Xavi?"]
        : ["Gmail AI Agent", "Python stack", "How to contact Xavi?"],
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
        ? `**Gmail AI Agent** (su asistente inteligente de correo):\n\n• **Propósito:** Automatizar la clasificación semántica, etiquetado y limpieza de su buzón de Gmail mediante IA.\n• **Bajo el capó:** Desarrollado con **LangGraph StateGraphs** y **LangChain**, integrando tool calling para interactuar directamente con la API de Gmail de forma segura.\n• **Capacidades:** Comprensión de intención, extracción de llamadas a la acción, triaje por lotes y síntesis de voz con ElevenLabs TTS.`
        : `**Gmail AI Agent** (his intelligent email assistant):\n\n• **Purpose:** Autonomous semantic classification, batch triage, and inbox organization.\n• **Under the hood:** Built with **LangGraph StateGraphs** and **LangChain**, integrating structured tool calling against the Gmail API.\n• **Capabilities:** Interprets message intent, extracts action items, executes safe batch actions, and synthesizes audio summaries via ElevenLabs TTS.`,
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
        ? `**BOE RAG Retrieval System** (su buscador semántico jurídico):\n\n• **Propósito:** Pipeline de búsqueda semántica y recuperación documental sobre el Boletín Oficial del Estado.\n• **Arquitectura:** Chunking por ventana deslizante de 512 tokens, base vectorial **Qdrant**, y reordenamiento híbrido con **BM25**.\n• **Ingesta:** Sincronización programada con **Apache Airflow** y endpoints servidos mediante **FastAPI** en contenedores Docker.`
        : `**BOE RAG Retrieval System** (legal document intelligence):\n\n• **Purpose:** Semantic search and knowledge retrieval over the Spanish Official State Gazette records.\n• **Architecture:** 512-token sliding-window chunking, **Qdrant** vector database, and hybrid reranking via **BM25**.\n• **Ingestion:** Automated scheduling with **Apache Airflow** and served via **FastAPI** Docker containers.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Plataforma Multi-Agente", "Stack tecnológico", "Contacto directo"]
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
        ? `Otros proyectos que ha desarrollado Xavi:\n\n1. **McDonald's Sentiment Analysis:**\nPipeline de NLP sobre reseñas de clientes en Barcelona, comparando regresión logística frente a redes neuronales TF-IDF con evaluación ROC (AUC 0.941).\n\n2. **Party:**\nMarketplace y plataforma móvil para Android en Kotlin con catálogo interactivo, carrito y sincronización con MySQL.\n\n3. **Enterprise Odoo Automation (ESDI Systems):**\nSuite de automatización empresarial con módulos Odoo ERP, scraping en Selenium, conciliación SQL y análisis con LLMs.`
        : `Other projects Xavi has built:\n\n1. **McDonald's Sentiment Analysis:**\nNLP customer review pipeline on Barcelona reviews, comparing logistic regression against TF-IDF Neural Networks (ROC AUC 0.941).\n\n2. **Party:**\nEvent coordination Android mobile app written in native Kotlin with real-time MySQL synchronization.\n\n3. **Enterprise Odoo Automation (ESDI Systems):**\nProduction business automation integrating custom Odoo ERP models, Selenium bots, SQL reconciliation, and LLM parsing.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Plataforma Multi-Agente", "Stack tecnológico", "Experiencia laboral"]
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
      "stack tecnologico",
      "stack tecnológico",
      "su stack",
      "su stack tecnologico",
      "cual es su stack",
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
        ? `**Stack Técnico Principal de Xavi:**\n\n• **Lenguajes:** Python (su lenguaje principal para IA y backend), SQL, TypeScript, Bash, Kotlin.\n• **Frameworks & IA:** LangGraph, LangChain, FastAPI, Flask, Scikit-learn, TensorFlow, Qdrant, Pandas.\n• **Infraestructura & Datos:** PostgreSQL, Redis, MySQL, Docker, Apache Airflow, Linux (Ubuntu/Debian), Git.\n• **Especialidad:** Agentes deterministas, pipelines RAG, colas asíncronas de trabajo y automatización empresarial.`
        : `**Xavi's Core Tech Stack:**\n\n• **Languages:** Python (Advanced - his primary language for AI & backend), SQL, TypeScript, Bash, Kotlin.\n• **Frameworks & AI:** LangGraph, LangChain, FastAPI, Flask, Scikit-learn, TensorFlow, Qdrant, Pandas.\n• **Data & Infrastructure:** PostgreSQL, Redis, MySQL, Docker, Apache Airflow, Linux (Ubuntu/Debian), Git.\n• **Focus:** Deterministic agents, RAG retrieval pipelines, async task queues, and enterprise automation.`,
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
        ? `**Experiencia Profesional de Xavi:**\n\n**Desarrollador de Sistemas de IA y Automatización en ESDI Systems (Oct 2024 - Presente):**\n• Diseñó e implementó pipelines de automatización con **Odoo ERP**, **Selenium** y **Python**.\n• Creó bots de scraping para extracción estructurada de datos y conciliación con bases de datos SQL.\n• Desarrolló parsers con LLMs a través de OpenRouter para la extracción y validación de documentos comerciales.\n• Optimizó procesos de negocio reduciendo cientos de horas de trabajo manual al mes.`
        : `**Xavi's Professional Experience:**\n\n**AI Systems & Automation Developer at ESDI Systems (Oct 2024 - Present):**\n• Engineered business automation workflows connecting **Odoo ERP**, **Selenium**, and **Python**.\n• Built web scraping bots for structured supplier data extraction and SQL data reconciliation.\n• Developed LLM document extraction parsers via OpenRouter for business invoices.\n• Streamlined core operations, saving hundreds of manual hours each month.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Stack tecnológico", "Educación", "Descargar CV"]
        : ["Tech stack", "Education", "Download CV"],
  },

  // 8. Strengths & Technical Approach
  {
    keywords: [
      "puntos fuertes",
      "fortalezas",
      "ventajas",
      "enfoque",
      "filosofia",
      "filosofía",
      "strengths",
      "contratar",
      "hire",
      "fichar",
    ],
    reply: (lang) =>
      lang === "es"
        ? `Actualmente Xavi no está en búsqueda activa de empleo. Sus puntos fuertes y enfoque como ingeniero son:\n\n1. **Enfoque en producción:** Construye **sistemas de agentes deterministas**, maneja colas en Redis y define esquemas estrictos de tool-calling para evitar fallos o bucles infinitos.\n2. **Visión integral:** Domina el pipeline de datos completo, desde la ingesta y embeddings hasta la infraestructura con Docker y bases SQL.\n3. **Pragmatismo técnico:** Resuelve con código eficiente y directo, aplicando IA donde realmente aporta valor medible.\n4. **Rigor y autonomía:** Capacidad para estructurar arquitecturas complejas y entregar software robusto.`
        : `Xavi is currently not actively looking for employment. His core strengths and engineering mindset are:\n\n1. **Production Mindset:** He builds **deterministic state loops**, manages Redis worker queues, and enforces strict JSON schemas for safe tool calling.\n2. **Full-Pipeline Vision:** He understands the entire lifecycle: from data ingestion and embeddings to Dockerized deployment and relational databases.\n3. **Pragmatic Engineering:** He writes clean code where sufficient, and leverages AI models where they create measurable business value.\n4. **Autonomy & Rigor:** Proven ability to unpack complex specifications and deliver reliable, maintainable software systems.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Contacto directo", "Descargar CV", "Stack tecnológico"]
        : ["Direct contact", "Download CV", "Tech stack"],
  },

  // 9. Contact / Links
  {
    keywords: [
      "contact",
      "contacto",
      "contactar",
      "contactar con xavi",
      "contact xavi",
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
        ? `**Puedes contactar con Xavi directamente a través de:**\n\n• **Email:** [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com)\n• **GitHub:** [github.com/xaviifar](https://github.com/xaviifar)\n• **LinkedIn:** [linkedin.com/in/xavi-far](https://www.linkedin.com/in/xavi-far/)\n• **Kaggle:** [kaggle.com/xaviifar](https://www.kaggle.com/xaviifar)\n• **Currículum:** [Descargar CV en PDF](/Xavi_Far_CV.pdf)\n\nTambién puedes utilizar el formulario de contacto al final de esta página.`
        : `**You can reach Xavi directly via:**\n\n• **Email:** [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com)\n• **GitHub:** [github.com/xaviifar](https://github.com/xaviifar)\n• **LinkedIn:** [linkedin.com/in/xavi-far](https://www.linkedin.com/in/xavi-far/)\n• **Kaggle:** [kaggle.com/xaviifar](https://www.kaggle.com/xaviifar)\n• **Resume / CV:** [Download CV PDF](/Xavi_Far_CV.pdf)\n\nYou can also reach out via the contact form at the bottom of the page.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Ubicación", "Stack tecnológico", "¿Quién es Xavi?"]
        : ["Location", "Tech stack", "Who is Xavi?"],
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
    ],
    reply: (lang) =>
      lang === "es"
        ? `Xavi está afincado en **Barcelona / Cataluña (España)**, enfocado en el desarrollo e investigación de sistemas de agentes de IA, arquitecturas de datos y automatización.`
        : `Xavi is based in **Barcelona / Catalonia (Spain)**, focusing on AI agent systems engineering, data pipelines, and intelligent automation.`,
    followUps: (lang) =>
      lang === "es"
        ? ["Contactar con Xavi", "Descargar CV", "Stack tecnológico"]
        : ["Contact Xavi", "Download CV", "Tech stack"],
  },

  // 11. Availability / Contact
  {
    keywords: [
      "entrevista",
      "entrevistas",
      "horario",
      "schedule",
      "interview",
      "availability",
      "disponibilidad",
      "disponibilidad horaria",
      "reunion",
      "reunión",
      "call",
    ],
    reply: (lang) =>
      lang === "es"
        ? `Actualmente Xavi no está en procesos de entrevistas ni en búsqueda activa de empleo. Si quieres contactar con él para charlar sobre tecnología o proponer alguna colaboración, puedes escribirle a [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com).`
        : `Xavi is currently not actively interviewing or seeking new job positions. If you would like to connect to discuss tech or collaborate, feel free to reach out to [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com).`,
    followUps: (lang) =>
      lang === "es"
        ? ["Contacto directo", "Descargar CV", "Stack tecnológico"]
        : ["Direct contact", "Download CV", "Tech stack"],
  },

  // 12. Greetings
  {
    keywords: ["hola", "hello", "hi", "hey", "salut", "buenas", "buenos dias", "good morning"],
    reply: (lang) =>
      lang === "es"
        ? `¡Hola! ¿Qué te gustaría consultar sobre Xavi y su trabajo? Puedes preguntarme sobre su **Plataforma Multi-Agente**, su experiencia con **LangGraph y Python**, su stack tecnológico o solicitar sus datos de contacto y CV.`
        : `Hey! What would you like to know about Xavi and his work? You can ask about his **AI Agent Platform**, experience with **LangGraph & Python**, his tech stack, or get his contact info and CV.`,
    followUps: (lang) =>
      lang === "es"
        ? ["¿Quién es Xavi?", "Plataforma de agentes", "Descargar CV"]
        : ["Who is Xavi?", "AI Agent Platform", "Download CV"],
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
      text: `Puedes preguntarme sobre los **sistemas de agentes de IA** de Xavi, su **experiencia en ESDI Systems**, su **stack tecnológico** o revisar su código en [GitHub](https://github.com/xaviifar). También puedes escribirle directamente a [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com).`,
      suggestions: [
        "¿Quién es Xavi?",
        "Plataforma de agentes",
        "Stack tecnológico",
        "Contacto directo",
      ],
    };
  }

  return {
    text: `You can ask about Xavi's **autonomous AI agent architectures**, his **experience at ESDI Systems**, his **tech stack**, or check his code on [GitHub](https://github.com/xaviifar). You can also reach him directly at [xavifarmartinez@gmail.com](mailto:xavifarmartinez@gmail.com).`,
    suggestions: [
      "Who is Xavi?",
      "AI Agent Platform",
      "Tech stack",
      "Get in touch",
    ],
  };
}
