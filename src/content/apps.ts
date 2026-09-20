export interface AppDefinition {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  category: "Identity" | "Publishing" | "Heritage" | "Play";
  color: string;
  bgLight: string;
  space: "HOME" | "ROOTS" | "CREATE" | "PLAY";
}

export const coreApps: AppDefinition[] = [
  {
    id: "about",
    name: "About",
    subtitle: "Profile & Story",
    iconName: "User",
    category: "Identity",
    color: "#2563EB", // Blue
    bgLight: "#EFF6FF",
    space: "HOME"
  },
  {
    id: "work",
    name: "Work",
    subtitle: "Experience & Teaching",
    iconName: "Briefcase",
    category: "Identity",
    color: "#059669", // Emerald
    bgLight: "#ECFDF5",
    space: "HOME"
  },
  {
    id: "projects",
    name: "Projects",
    subtitle: "Software & Archives",
    iconName: "FolderGit2",
    category: "Identity",
    color: "#7C3AED", // Violet
    bgLight: "#F5F3FF",
    space: "HOME"
  },
  {
    id: "education",
    name: "Education",
    subtitle: "MCA 7th Rank & BCA",
    iconName: "GraduationCap",
    category: "Identity",
    color: "#D97706", // Amber
    bgLight: "#FFFBEB",
    space: "HOME"
  },
  {
    id: "books",
    name: "Books",
    subtitle: "Published Author",
    iconName: "BookOpen",
    category: "Publishing",
    color: "#DC2626", // Red / Coral
    bgLight: "#FEF2F2",
    space: "CREATE"
  },
  {
    id: "bani",
    name: "Bani",
    subtitle: "Meitei Heritage Pub",
    iconName: "Feather",
    category: "Publishing",
    color: "#0891B2", // Cyan / Teal
    bgLight: "#ECFEFF",
    space: "CREATE"
  },
  {
    id: "roots",
    name: "Roots",
    subtitle: "Clan & Lineage Matrix",
    iconName: "GitBranch",
    category: "Heritage",
    color: "#4F46E5", // Indigo
    bgLight: "#EEF2FF",
    space: "ROOTS"
  },
  {
    id: "gaming",
    name: "Gaming",
    subtitle: "Creator & MLBB Era",
    iconName: "Gamepad2",
    category: "Play",
    color: "#EA580C", // Orange
    bgLight: "#FFF7ED",
    space: "PLAY"
  },
  {
    id: "lab",
    name: "Lab",
    subtitle: "R&D & Experiments",
    iconName: "FlaskConical",
    category: "Play",
    color: "#9333EA", // Purple
    bgLight: "#FAF5FF",
    space: "PLAY"
  },
  {
    id: "play",
    name: "Arcade",
    subtitle: "Mini Interactive Games",
    iconName: "Sparkles",
    category: "Play",
    color: "#16A34A", // Green
    bgLight: "#F0FDF4",
    space: "PLAY"
  }
];

export const homeSpaces = [
  { id: "HOME", label: "Home", description: "Identity & Launchpad" },
  { id: "ROOTS", label: "Roots", description: "Lineage & Cultural Heritage" },
  { id: "CREATE", label: "Create", description: "Publications & Books" },
  { id: "PLAY", label: "Play", description: "Experiments & Arcade" }
] as const;

export type SpaceId = typeof homeSpaces[number]["id"];
