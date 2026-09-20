export interface ProfileData {
  name: string;
  systemName: string;
  leadTitle: string;
  subtitles: string[];
  location: string;
  email: string;
  linkedIn: string;
  github: string;
  twitter: string;
  portfolio: string;
  status: string;
  bio: string;
  instagram: string;
  avatarUrl: string;
  resumeUrl: string;
  detailedBio: string;
  stats: { label: string; value: string; hint?: string }[];
  favorites: {
    id: string;
    title: string;
    category: string;
    description: string;
    iconName: string;
    color: string;
    bgLight: string;
    link?: string;
    linkText?: string;
  }[];
}

export const profile: ProfileData = {
  name: "Banishwor Athokpam",
  systemName: "BANI // OS",
  leadTitle: "Software Developer & Educator",
  subtitles: [
    "Software Developer",
    "Android & Full Stack",
    "Author of Pushback",
    "Digital Heritage Creator",
    "Open Source Builder"
  ],
  location: "Thoubal, Manipur, India",
  email: "banishworath@gmail.com",
  linkedIn: "https://www.linkedin.com/in/banishwor/",
  github: "https://github.com/banishwor",
  twitter: "https://x.com/banishwor",
  instagram: "https://www.instagram.com/banishwor_ath/",
  portfolio: "https://banishwor.github.io/",
  status: "Available for Work",
  bio: "Master of Computer Applications graduate (MU 7th State Rank, 80.30%) with hands-on expertise in native Android engineering, offline-first architectures, software QA testing, and digital cultural preservation.",
  detailedBio: "I am a detail-oriented software developer and educator based in Thoubal, Manipur. Graduating 7th in state with 80.30% in MCA from Manipur University, my engineering focuses on building high-reliability native applications that solve real community needs. From offline utilities like Manipur Calculator and Khutsuman to authoring books on diaspora history and resilience, I bridge algorithmic rigor with human purpose.",
  avatarUrl: "/profile-pic.jpg",
  resumeUrl: "/resume.pdf",
  stats: [
    { label: "MCA State Rank", value: "7th Rank", hint: "80.30% Distinction" },
    { label: "Published Books", value: "2 Titles", hint: "Pushback & Echoes" },
    { label: "Dev & Teaching", value: "3+ Years", hint: "100+ Students" },
    { label: "Origin & Base", value: "Thoubal", hint: "Manipur, India" }
  ],
  favorites: [
    {
      id: 'football',
      title: 'Die-Hard Football & Lionel Messi Fan',
      category: 'Sports & Passion',
      description: 'Die-hard Lionel Messi fan since day one. Passionate about football tactics, international tournaments, and the artistry of the beautiful game.',
      iconName: 'Trophy',
      color: '#D97706',
      bgLight: '#FFFBEB'
    },
    {
      id: 'crypto',
      title: 'Cryptocurrency Enthusiast',
      category: 'Decentralized Tech',
      description: 'Active investor in Bitcoin and blockchain ecosystems since 2019. Founder of "Crypto Enthusiastic" WhatsApp community and instructor on crypto concepts.',
      iconName: 'Coins',
      color: '#2563EB',
      bgLight: '#EFF6FF'
    },
    {
      id: 'author',
      title: 'Published Author',
      category: 'Literature & Writing',
      description: 'Author of "Pushback: How Breakups Can Lead to Personal Growth and Development" (available on Amazon) and "The Echoes of Silence".',
      iconName: 'BookOpen',
      color: '#DC2626',
      bgLight: '#FEF2F2',
      link: 'https://www.amazon.in/Pushback-Breakups-Personal-Growth-Development-ebook/dp/B0BTB1JVVB',
      linkText: 'View on Amazon'
    },
    {
      id: 'entertainment',
      title: 'Entertainment & Superhero Lore Geek',
      category: 'Pop Culture',
      description: 'Marvel and DC universe nerd. Deeply fascinated by multi-arc superhero storytelling, cinematic worldbuilding, comic lore, and visual narratives.',
      iconName: 'Film',
      color: '#9333EA',
      bgLight: '#FAF5FF'
    },
    {
      id: 'travel',
      title: 'Cultural Explorer & Traveller',
      category: 'Travel & Exploration',
      description: 'Passionate about travelling, discovering historical sites, experiencing indigenous cuisines, and documenting cultural heritage.',
      iconName: 'MapPin',
      color: '#059669',
      bgLight: '#ECFDF5'
    },
    {
      id: 'gaming-creator',
      title: 'Gaming Creator & Documentary Producer',
      category: 'Gaming & Digital Media',
      description: 'Creator of "Bani Entertainment" gaming page with 15,000+ followers and MIL Influencer for Mobile Legends (MLBB). Co-owner of "HaloBan Media", a documentary channel creating short-form interesting facts.',
      iconName: 'Gamepad2',
      color: '#EA580C',
      bgLight: '#FFF7ED'
    }
  ]
};
