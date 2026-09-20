export interface DimensionItem {
  id: string;
  number: string;
  title: string;
  role: string;
  color: string;
  gradient: string;
  badge: string;
  tagline: string;
  summary: string;
  keyStats: { label: string; value: string }[];
  highlights: string[];
  ctaLabel: string;
  targetAppId?: string;
  externalUrl?: string;
}

export const dimensionsData: DimensionItem[] = [
  {
    id: "software-engineer",
    number: "01",
    title: "The Software Engineer",
    role: "Native Android & Full-Stack Developer",
    color: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(6, 95, 70, 0.12) 100%)",
    badge: "ENGINEERING & SYSTEMS",
    tagline: "Building high-reliability offline utilities for real community needs.",
    summary: "Specializing in native Android engineering, offline-first SQLite architectures with Room DB, Jetpack Compose, and high-precision domain mathematics. Creator of 4 production-grade mobile applications addressing unique regional problems in Manipur.",
    keyStats: [
      { label: "Production Apps", value: "4 Apps" },
      { label: "Primary Core", value: "Kotlin & Compose" },
      { label: "Architecture", value: "Offline-First MVVM" },
      { label: "Math Engine", value: "BigDecimal" }
    ],
    highlights: [
      "Manipur Calculator: Indigenous Land (Pari, Lourak, Sangam) & Gold converter",
      "Manipuri Calendar: Meitei lunar calendar & festival synchronization",
      "Yek Salai: 7 Clans exogamy marriage compatibility engine",
      "Khutsuman: Daily wage attendance roster & 1-tap WhatsApp statement"
    ],
    ctaLabel: "Open Projects Drawer ↗",
    targetAppId: "projects"
  },
  {
    id: "published-author",
    number: "02",
    title: "The Published Author",
    role: "Novelist & Emotional Resilience Writer",
    color: "#E11D48",
    gradient: "linear-gradient(135deg, rgba(225, 29, 72, 0.28) 0%, rgba(136, 19, 55, 0.12) 100%)",
    badge: "LITERATURE & WRITING",
    tagline: "Translating emotional struggles into catalysts for self-discovery.",
    summary: "Published author of two titles available internationally on Amazon Kindle. Exploring the delicate intersections of heartbreak, personal development, school memories, and the quiet dignity of starting over.",
    keyStats: [
      { label: "Published Titles", value: "2 Books" },
      { label: "Platform", value: "Amazon Kindle" },
      { label: "Debut Work", value: "Pushback" },
      { label: "Latest Novel", value: "The Echoes of Silence" }
    ],
    highlights: [
      "Pushback: How Breakups Can Lead to Personal Growth and Development",
      "The Echoes of Silence: Fiction novel following Bren Atherton at Bright Meridian Academy",
      "Native in-OS Kindle E-Reader with real verbatim chapters & 3 reading themes",
      "Available globally on Amazon Kindle with direct store links"
    ],
    ctaLabel: "Open Books Shelf ↗",
    targetAppId: "books"
  },
  {
    id: "cultural-preserver",
    number: "03",
    title: "The Cultural Preserver",
    role: "Digital Custodian of Meitei Lineage",
    color: "#6366F1",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.28) 0%, rgba(49, 46, 129, 0.12) 100%)",
    badge: "HERITAGE & ROOTS",
    tagline: "Preserving 19th-century oral genealogy in modern digital interactive code.",
    summary: "Digital custodian of the Athokpam clan (Luwang Salai) genealogy, spanning six documented generations from 19th-century founding patriarch Tonu Athokpamcha. Creator of the interactive Yek Salai clan database and publisher of Bani heritage articles.",
    keyStats: [
      { label: "Documented Gens", value: "6 Generations" },
      { label: "Family Database", value: "42 Members" },
      { label: "Salai Affiliation", value: "Luwang (ꯂꯨꯋꯥꯡ)" },
      { label: "Timeline", value: "1850s–Present" }
    ],
    highlights: [
      "Athokpam Roots: Living 13-beat genealogical scroll odyssey",
      "Yek Salai: Preserving the 7 ancestral Meitei clans & marriage rules",
      "Bani Editorial: In-depth articles on Meitei history, culture, and kinship",
      "100% offline data integrity with zero third-party tracking"
    ],
    ctaLabel: "Explore Athokpam Roots ↗",
    targetAppId: "roots"
  },
  {
    id: "gaming-creator",
    number: "04",
    title: "The Content & Gaming Creator",
    role: "Esports Influencer & Documentary Producer",
    color: "#F97316",
    gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.28) 0%, rgba(124, 45, 18, 0.12) 100%)",
    badge: "CREATOR & ESPORTS",
    tagline: "Building digital communities through gaming tactics and documentary storytelling.",
    summary: "Creator behind 'Bani Entertainment'—a gaming page with over 15,000 followers and MIL influencer status for Mobile Legends: Bang Bang (MLBB). Co-owner of 'HaloBan Media', producing short-form documentary videos and interesting facts across social media.",
    keyStats: [
      { label: "Bani Entertainment", value: "15K+ Followers" },
      { label: "Gaming Speciality", value: "MLBB MIL Influencer" },
      { label: "HaloBan Media", value: "Short Facts Docu" },
      { label: "Channels", value: "FB, Insta & YouTube" }
    ],
    highlights: [
      "Bani Entertainment: 15,000+ gaming community followers",
      "Official MIL (Mobile Legends Influencer League) creator & esports streamer",
      "HaloBan Media: Compelling short-form documentaries & educational curiosities",
      "Multi-platform production spanning Facebook, Instagram, and YouTube"
    ],
    ctaLabel: "Open Gaming Archive ↗",
    targetAppId: "gaming"
  },
  {
    id: "cs-researcher",
    number: "05",
    title: "The CS Researcher & Scholar",
    role: "MCA State Rank Holder & HPC Scholar",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.28) 0%, rgba(76, 29, 149, 0.12) 100%)",
    badge: "ACADEMIA & RESEARCH",
    tagline: "Rigorous academic foundations bridging machine learning and high-performance computing.",
    summary: "Graduated 7th State Rank in Master of Computer Applications (MCA) from Manipur University with 80.30% First Division with Distinction. Conducted empirical research in machine learning imputation techniques and participated in national supercomputing programs at IIT Kharagpur.",
    keyStats: [
      { label: "MCA State Merit", value: "Rank 7 (MU)" },
      { label: "Distinction Mark", value: "80.30% (2651 M)" },
      { label: "Thesis Domain", value: "ML Data Imputation" },
      { label: "HPC Program", value: "IIT Kharagpur / NSM" }
    ],
    highlights: [
      "MCA Thesis: Empirical study on clustering-based missing data imputation (K-Means & FCM)",
      "High Performance Computing (HPC) workshop under National Supercomputing Mission at IIT Kharagpur",
      "Official Examination Gazette No. MU/EXAM/MCA(6)/2023 verified credentials",
      "3+ years educating over 100+ students in software programming and technical foundations"
    ],
    ctaLabel: "View Academic Credentials ↗",
    targetAppId: "education"
  }
];
