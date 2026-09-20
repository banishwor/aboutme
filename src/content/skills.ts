export interface SkillItem {
  id: string;
  name: string;
  category: "Core" | "Mobile" | "Web" | "Data & Edge" | "Experimental";
  description?: string;
  projects: string[];
}

export const skills: SkillItem[] = [
  // Mobile
  {
    id: "kotlin",
    name: "Kotlin",
    category: "Mobile",
    description: "Modern expressive language for Android and multiplatform applications.",
    projects: ["Manipur Calculator", "Manipuri Calendar", "Khutsuman"]
  },
  {
    id: "android-sdk",
    name: "Android SDK",
    category: "Mobile",
    description: "Core Android development lifecycle, widgets, and background services.",
    projects: ["Manipuri Calendar", "Manipur Calculator"]
  },
  {
    id: "jetpack-compose",
    name: "Jetpack Compose",
    category: "Mobile",
    description: "Declarative modern UI toolkit for Android interfaces.",
    projects: ["Manipur Calculator", "Khutsuman"]
  },
  {
    id: "room-db",
    name: "Room Database",
    category: "Mobile",
    description: "Robust local-first SQLite abstraction with encrypted persistence.",
    projects: ["Manipur Calculator", "Khutsuman"]
  },
  {
    id: "mvvm",
    name: "MVVM Architecture",
    category: "Mobile",
    description: "Clean separation of presentation, state, and business domain layers.",
    projects: ["Khutsuman", "Manipur Calculator"]
  },

  // Web
  {
    id: "typescript",
    name: "TypeScript",
    category: "Web",
    description: "Strictly-typed JavaScript delivering scalable, resilient frontends.",
    projects: ["BANI OS", "Athokpam Family Tree"]
  },
  {
    id: "react",
    name: "React",
    category: "Web",
    description: "Component-driven reactive UI architecture.",
    projects: ["BANI OS", "Yek Salai Web"]
  },
  {
    id: "vanilla-css",
    name: "Modern CSS & Design Systems",
    category: "Web",
    description: "Responsive layouts, CSS custom properties, and micro-animations.",
    projects: ["BANI OS", "Legacy Portfolio Showcase"]
  },
  {
    id: "canvas-webapi",
    name: "HTML5 Canvas & Web APIs",
    category: "Web",
    description: "Dynamic 2D graphics, particles, and interactive rendering.",
    projects: ["BANI OS", "Constellation Engine"]
  },

  // Core & QA
  {
    id: "testing",
    name: "Software Testing & QA",
    category: "Core",
    description: "Manual & automated validation, test case design, and regression testing.",
    projects: ["Hi-Tech QA Support", "NTS Tech Instruction"]
  },
  {
    id: "maintenance",
    name: "Software Maintenance & Debugging",
    category: "Core",
    description: "Root cause analysis, system profiling, and performance tuning.",
    projects: ["Client Freelance Solutions", "NTS Institute"]
  },
  {
    id: "git",
    name: "Git & Version Control",
    category: "Core",
    description: "Branching strategies, collaborative workflows, and release tags.",
    projects: ["BANI OS", "GitHub Pages Portals"]
  },

  // Data & Edge
  {
    id: "hpc",
    name: "High Performance Computing",
    category: "Data & Edge",
    description: "Parallel computing and supercomputing paradigms (IIT Kharagpur × MU).",
    projects: ["National Supercomputing Mission Workshop"]
  },
  {
    id: "ml-imputation",
    name: "ML & Data Mining Research",
    category: "Data & Edge",
    description: "Clustering-based missing data imputation techniques for data consistency.",
    projects: ["MCA Master's Thesis"]
  },
  {
    id: "offline-first",
    name: "Offline-First Systems",
    category: "Data & Edge",
    description: "Local data persistence with zero network latency dependency.",
    projects: ["Manipur Calculator", "Khutsuman"]
  },

  // Experimental
  {
    id: "on-device-ai",
    name: "On-Device Small Language Models",
    category: "Experimental",
    description: "Exploring edge NLP inference, memory pressure, and typing latency.",
    projects: ["On-Device AI Keyboard (R&D)"]
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering & Generative AI",
    category: "Experimental",
    description: "Systematic multi-turn prompt design and generative workflows.",
    projects: ["Viral Prompts Archive"]
  }
];

export const skillCategories = ["All", "Mobile", "Web", "Core", "Data & Edge", "Experimental"] as const;
