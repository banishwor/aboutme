export interface GamingGiveaway {
  id: string;
  title: string;
  date: string;
  game: string;
  item: string;
  recipient: string;
  quoteMessage: string;
  caption: string;
  imageUrl: string;
}

export interface CreatorMilestone {
  era: string;
  title: string;
  description: string;
  badge: string;
}

export interface HaloBanDocumentary {
  id: string;
  episodeNumber: string;
  title: string;
  category: string;
  badge: string;
  videoUrl: string;
  description: string;
  highlights: string[];
}

export interface GamingHubData {
  baniEntertainment: {
    title: string;
    tagline: string;
    followers: string;
    role: string;
    gameTitle: string;
    facebookUrl: string;
    logoUrl: string;
    summary: string;
    stats: { label: string; value: string }[];
    milestones: CreatorMilestone[];
    giveaways: GamingGiveaway[];
    tactics: { title: string; desc: string; icon: string }[];
  };
  halobanMedia: {
    title: string;
    tagline: string;
    logoUrl: string;
    summary: string;
    stats: { label: string; value: string }[];
    pillars: { title: string; category: string; description: string }[];
    productionPipeline: { step: string; label: string; detail: string }[];
    documentaries: HaloBanDocumentary[];
  };
}

export const gamingHubData: GamingHubData = {
  baniEntertainment: {
    title: "Bani Entertainment",
    tagline: "Mobile Legends: Bang Bang (MLBB) Creator & Esports Community",
    followers: "15K+ Followers",
    role: "MIL Influencer & Gaming Streamer",
    gameTitle: "Mobile Legends: Bang Bang",
    facebookUrl: "https://www.facebook.com/banientertainment",
    logoUrl: "/gaming/bani-entertainment-logo.png",
    summary: "A thriving gaming creator page founded by Banishwor Athokpam, gathering a dedicated community of over 15,000 followers. Recognized as an official MIL (Mobile Legends Influencer League) creator, broadcasting high-tier competitive gameplay, custom community tournaments, and legendary skin giveaways.",
    stats: [
      { label: "Community Followers", value: "15,000+" },
      { label: "Creator Status", value: "MIL Influencer" },
      { label: "Focus Title", value: "Mobile Legends" },
      { label: "Community Perks", value: "Skin Giveaways" }
    ],
    milestones: [
      {
        era: "Genesis",
        title: "Community Launch",
        description: "Started streaming competitive Mobile Legends ranked matches and custom lobby battles.",
        badge: "COMMUNITY"
      },
      {
        era: "Growth",
        title: "Official MIL Status",
        description: "Recognized as an official Mobile Legends Influencer League creator by Moonton.",
        badge: "VERIFIED"
      },
      {
        era: "15K Milestone",
        title: "15,000 Loyal Followers",
        description: "Grew the gaming community past 15,000 engaged followers across Manipur and northeast esports circles.",
        badge: "15K CLUB"
      },
      {
        era: "Loyalty",
        title: "Skin & Diamond Giveaways",
        description: "Organized community giveaways gifting special skins, battle passes, and in-game rewards to active supporters.",
        badge: "GIVEAWAYS"
      }
    ],
    giveaways: [
      {
        id: "badang-susanoo",
        title: "Special Skin Giveaway: Badang Susanoo",
        date: "September 4, 2021",
        game: "Mobile Legends: Bang Bang",
        item: "Badang 'Susanoo' Special Skin",
        recipient: "Dhaneshwor Waikhom",
        quoteMessage: "Your friend Banishwor gifted you Susanoo skin and left a message: Enjoy your Day... Keep Supporting... 👍",
        caption: "A memorable community giveaway milestone celebrating supporter loyalty with in-game Special tier skin gifting.",
        imageUrl: "/gaming/mlbb-giveaway-badang.png"
      }
    ],
    tactics: [
      {
        title: "Burst Fighter Mastery",
        desc: "Precision timing on initiation heroes like Badang and Chou, executing seamless crowd control knockups and wall stuns.",
        icon: "Sword"
      },
      {
        title: "Macro Map Awareness",
        desc: "Anticipating enemy jungle rotations, tracking Turtle/Lord spawn timers, and orchestrating surprise bush ganks.",
        icon: "Compass"
      },
      {
        title: "Community Shotcalling",
        desc: "Hosting custom 5v5 scrims, providing live voice commentary, and mentoring up-and-coming local esports players.",
        icon: "Users"
      }
    ]
  },
  halobanMedia: {
    title: "HaloBan Media",
    tagline: "Facts & Lessons // Short-Form Documentaries",
    logoUrl: "/gaming/haloban-media-logo.png",
    summary: "A digital documentary project co-owned by Banishwor, crafting compelling, research-backed short-form educational videos. Designed to ignite curiosity by translating complex scientific concepts, historical curiosities, and personal growth lessons into fast-paced visual stories.",
    stats: [
      { label: "Content Format", value: "Short Documentaries" },
      { label: "Core Pillars", value: "Facts & Lessons" },
      { label: "Production Style", value: "Research-Driven" },
      { label: "Audience Goal", value: "Curiosity & Mindset" }
    ],
    pillars: [
      {
        title: "Unsolved Curiosities & History",
        category: "Deep Dives",
        description: "Exploring enigmatic historical anomalies, archaeological breakthroughs, and forgotten milestones from around the globe."
      },
      {
        title: "Psychology & Cognitive Bias",
        category: "Human Mind",
        description: "Deconstructing mental models, behavioral science, cognitive blind spots, and the hidden mechanics behind daily decisions."
      },
      {
        title: "Science & Natural Wonders",
        category: "Cosmos & Biology",
        description: "Visualizing space phenomena, quantum paradoxes, and microscopic wonders in concise, high-retention formats."
      },
      {
        title: "Resilience & Life Lessons",
        category: "Mindset",
        description: "Distilling hard-won lessons on discipline, perseverance, and emotional growth inspired by real human triumphs."
      }
    ],
    productionPipeline: [
      {
        step: "01",
        label: "Fact Verification",
        detail: "Cross-referencing scientific journals, historical archives, and academic publications for zero misinformation."
      },
      {
        step: "02",
        label: "Hook & Narrative",
        detail: "Drafting high-retention 60-second scripts with clear narrative arcs, curiosity gaps, and memorable conclusions."
      },
      {
        step: "03",
        label: "Cinematic Editing",
        detail: "Dynamic motion graphics, rhythmic sound design, kinetic typography, and precision visual timing."
      }
    ],
    documentaries: [
      {
        id: "haloban-doc-1",
        episodeNumber: "01",
        title: "Christopher Columbus: The Myth vs. The Unfiltered Truth",
        category: "Historical Deconstruction",
        badge: "88 SECONDS",
        videoUrl: "/gaming/videos/haloban-doc-1.mp4",
        description: "Think you know the story of Christopher Columbus? You've been sold a myth. Here is the unfiltered truth in 88 seconds deconstructing the biggest history lie taught in school.",
        highlights: ["ColumbusMyth", "88Seconds", "UnfilteredTruth", "SchoolLies"]
      },
      {
        id: "haloban-doc-2",
        episodeNumber: "02",
        title: "Taj Mahal: Beyond the Love Story — The Dark Secrets",
        category: "Mughal Empire & Architecture",
        badge: "DARK SECRETS",
        videoUrl: "/gaming/videos/haloban-doc-2.mp4",
        description: "You think you know the story of the Taj Mahal? It wasn't just a love story — it was a saga of 14 children, a suffering empire, ruthless ambition, and dark secrets history books leave out.",
        highlights: ["TajMahal", "14Children", "MughalEmpire", "HiddenHistory"]
      },
      {
        id: "haloban-doc-3",
        episodeNumber: "03",
        title: "The Two Churchills: Savior of the West or Tyrant of the Empire?",
        category: "Colonial History & Famine",
        badge: "TWO CHURCHILLS",
        videoUrl: "/gaming/videos/haloban-doc-3.mp4",
        description: "Winston Churchill is celebrated for defying Hitler, but during the 1943 Bengal famine, his policies diverted food while 3 million starved. Was he a hero, a tyrant, or both?",
        highlights: ["BengalFamine1943", "TwoChurchills", "BritishEmpire", "SaviorOrTyrant"]
      }
    ]
  }
};
