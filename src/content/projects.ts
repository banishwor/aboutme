import { getAssetUrl } from '../utils/assetUrl';

export type ProjectStatus = 'Active' | 'Beta' | 'Prototype' | 'Archived';
export type ProjectCategory = 'Native Android' | 'Community Tools' | 'Engineering Archives';

export interface ProjectAction {
  label: string;
  url: string;
  isExternal: boolean;
  type: 'playstore' | 'pwa' | 'whatsapp' | 'github' | 'demo';
}

export interface ProjectItem {
  id: string;
  title: string;
  nativeTitle?: string;
  subtitle: string;
  category: ProjectCategory;
  status: ProjectStatus;
  statusLabel: string;
  iconPath?: string;
  iconFallback: string;
  accentColor: string;
  bgLight: string;
  summary: string;
  targetAudience?: string;
  capabilities: string[];
  techStack: string[];
  architectureHighlights: string[];
  lessonsLearned?: string;
  actions: ProjectAction[];
  hasMiniDemoUpcoming: boolean;
}

export const projects: ProjectItem[] = [
  // ================= 1. ACTIVE & BETA PRODUCTION APPS =================
  {
    id: 'manipur-calculator',
    title: 'Manipur Calculator',
    subtitle: 'Indigenous Land & Gold Unit Conversions + Modern Finance',
    category: 'Native Android',
    status: 'Active',
    statusLabel: 'Production Active',
    iconPath: getAssetUrl('projects/manipur-calculator.png'),
    iconFallback: 'Calculator',
    accentColor: '#D97706',
    bgLight: '#FFFBEB',
    summary: 'A high-precision offline utility bridging traditional Manipuri measurements with contemporary financial mathematics. Eliminates guesswork for rural land transactions and artisanal gold calculations.',
    targetAudience: 'Farmers, land surveyors, jewellers, goldsmiths, and local borrowers across Manipur.',
    capabilities: [
      'Traditional Manipuri land measurement conversions: Pari, Lourak, Sangam, and Loushal with sub-decimal precision.',
      'Traditional gold weight calculations: San, Rati, and Ana conversions mapped to live bullion rates.',
      'Modern financial calculation suite: Loan EMI, Gold Loan, Simple & Compound Interest with amortization.',
      'Persistent calculation history ledger stored entirely on-device without network latency.',
      'Bilingual interface with English and Meitei Mayek unit representations.'
    ],
    techStack: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room DB', 'BigDecimal', 'Offline-First'],
    architectureHighlights: [
      'Zero floating-point rounding errors through arbitrary-precision BigDecimal arithmetic.',
      'Local encrypted SQLite / Room persistence ensuring confidential financial records stay private on device.',
      'Reactive unidirectional data flow with Android Architecture Components (ViewModel, StateFlow).'
    ],
    actions: [
      {
        label: 'Get on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.manipurcalculator.app&hl=en',
        isExternal: true,
        type: 'playstore'
      }
    ],
    hasMiniDemoUpcoming: true
  },
  {
    id: 'manipuri-calendar',
    title: 'Manipuri Calendar',
    subtitle: 'Free & Ad-Free Meitei Lunar Calendar + Android Home Widgets',
    category: 'Native Android',
    status: 'Active',
    statusLabel: 'Production Active',
    iconPath: getAssetUrl('projects/manipuri-calendar.png'),
    iconFallback: 'Calendar',
    accentColor: '#059669',
    bgLight: '#ECFDF5',
    summary: 'A completely ad-free cultural calendar application serving the Manipuri diaspora. Seamlessly synchronizes traditional Meitei lunar months and astrological observances with the Gregorian calendar.',
    targetAudience: 'Manipuri households, cultural researchers, community event organizers worldwide.',
    capabilities: [
      'Full Meitei lunar cycle tracking: Tha (months), Thasi (lunar days), and moon phases (New Moon / Full Moon).',
      'Indigenous festivals & public holidays: Gaan-Ngai, Cheiraoba, Ningol Chakouba, Yaoshang, Kut, Kang.',
      'Tatnaba warning indicators and traditional auspicious timing notifications.',
      'Native Android glanceable home screen widgets in 2×2, 4×1, and 4×2 dimensions with live lunar art.',
      'Instant keyword search across all festivals, gazetted state holidays, and restricted holidays.'
    ],
    techStack: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Glance Widgets', 'PWA', 'Offline-First'],
    architectureHighlights: [
      'Strict Zero-Ad and Zero-Tracking policy to prioritize pure community utility and battery efficiency.',
      'Offline astronomical calculation engine computing lunar phases mathematically on-device without remote servers.',
      'Dual distribution: Native Android package on Play Store alongside an installable Progressive Web App (PWA).'
    ],
    actions: [
      {
        label: 'Get on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.manipurcalendar&hl=en',
        isExternal: true,
        type: 'playstore'
      },
      {
        label: 'Open Web / PWA Version',
        url: 'https://banishwor.github.io/manipuri-calendar-pwa/?install=auto',
        isExternal: true,
        type: 'pwa'
      }
    ],
    hasMiniDemoUpcoming: true
  },
  {
    id: 'khutsuman',
    title: 'Khutsuman',
    nativeTitle: 'ꯈꯨꯠꯁꯨꯃꯟ',
    subtitle: 'Daily Wage, Attendance & Hisab Management for Petty Contractors',
    category: 'Native Android',
    status: 'Beta',
    statusLabel: 'Coming Soon / Beta',
    iconPath: getAssetUrl('projects/khutsuman.png'),
    iconFallback: 'Users',
    accentColor: '#2563EB',
    bgLight: '#EFF6FF',
    summary: 'An offline-first operational assistant engineered specifically for construction site supervisors, Mohoriks (petty contractors), carpenters, and labor teams to manage attendance, wages, advances, and WhatsApp PDF billing.',
    targetAudience: 'Site supervisors, construction Mohoriks, master carpenters, small contractor teams.',
    capabilities: [
      'Granular attendance tracking: Full Day (1.0), Half Day (0.5), Overtime hours, and Absentee marks.',
      'Multi-site management with custom worker-specific daily wage rates.',
      'Financial ledgers for recording client cash advances, raw material expenses, and net profit.',
      'Instant one-tap export of clean, formatted PDF wage receipts directly shareable via WhatsApp.',
      '100% offline functionality enabling seamless bookkeeping even in remote hill sites without mobile connectivity.'
    ],
    techStack: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room DB (Encrypted)', 'Material 3', 'MVVM'],
    architectureHighlights: [
      'Local encrypted SQLCipher database ensuring sensitive labor wages and subcontractor contracts remain strictly confidential.',
      'Declarative Material 3 touch UI designed for fast single-handed input on rugged job sites with high outdoor contrast.',
      'On-device vector PDF generation engine with zero external cloud dependencies.'
    ],
    actions: [
      {
        label: 'Request Beta Access (WhatsApp)',
        url: 'https://wa.me/919612111619?text=Hi%20Banishwor,%20I%20would%20like%20to%20request%20beta%20access%20to%20Khutsuman!',
        isExternal: true,
        type: 'whatsapp'
      }
    ],
    hasMiniDemoUpcoming: true
  },
  {
    id: 'yek-salai',
    title: 'Yek Salai',
    subtitle: 'Ancestral Meitei Clan & Surname Identification Matrix',
    category: 'Community Tools',
    status: 'Active',
    statusLabel: 'Production Active',
    iconPath: getAssetUrl('projects/yek-salai.png'),
    iconFallback: 'GitBranch',
    accentColor: '#4F46E5',
    bgLight: '#EEF2FF',
    summary: 'An authoritative cultural database mapping over 860+ indigenous Manipuri surnames to the Seven Historical Clans (Yek Salais). Educates youth and preserves ancestral heritage rules.',
    targetAudience: 'Meitei community members, youth learning cultural roots, genealogical scholars.',
    capabilities: [
      'Comprehensive database of 860+ verified Manipuri family surnames mapped to their historical clan.',
      'The Seven Traditional Salais: Mangang, Luwang, Khuman, Angom, Moirang, Kha-Nganba, Chenglei.',
      'Cultural education on Yek Tinnaba and Shairuk Tinnaba (exogamous lineage marriage rules).',
      'Advanced eligibility checker for cultural awareness and genealogical identification.',
      'Community feedback channel for suggesting historical corrections and additions.'
    ],
    techStack: ['React Native', 'TypeScript', 'Firebase Remote Config', 'Offline Local Cache'],
    architectureHighlights: [
      'Dynamic cloud-managed dataset via Firebase Remote Config paired with aggressive local offline caching.',
      'Educational disclaimer framework ensuring clarity that the tool serves preservation, not legal arbitration.',
      'Fast substring search index providing instantaneous fuzzy matching as users type their surname.'
    ],
    actions: [
      {
        label: 'Get on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.yeksalaiapp&hl=en',
        isExternal: true,
        type: 'playstore'
      }
    ],
    hasMiniDemoUpcoming: true
  },

  // ================= 2. ENGINEERING ARCHIVES (LESSONS LEARNED) =================
  {
    id: 'leikaifix',
    title: 'LeikaiFix',
    subtitle: 'Civic Infrastructure Crowdsourcing & Municipal Accountability',
    category: 'Engineering Archives',
    status: 'Prototype',
    statusLabel: 'Paused / Prototype',
    iconFallback: 'Building',
    accentColor: '#EA580C',
    bgLight: '#FFF7ED',
    summary: 'An experimental civic tech platform enabling citizens to report local ward grievances (potholes, waterlogging, streetlights) with geo-tagged photos and automated constituency tagging.',
    targetAudience: 'Local ward residents, civic activists, community youth clubs.',
    capabilities: [
      'Camera capture with mandatory GPS exif verification to prevent false reporting.',
      'Constituency polygon mapping tagging problems directly to municipal ward representatives.',
      'Transparency analytics dashboard highlighting neglected wards and unresolved complaint timelines.',
      'Community upvoting to prioritize urgent road hazards and public health risks.'
    ],
    techStack: ['React Native', 'Node.js', 'PostgreSQL / PostGIS', 'Mapbox SDK', 'Cloud Storage'],
    architectureHighlights: [
      'Spatial queries using PostGIS spatial indexing for high-speed polygon containment lookups.',
      'Client-side image compression and metadata verification prior to network dispatch.'
    ],
    lessonsLearned: 'Development was intentionally paused due to sensitive regulatory and administrative realities: civic complaint platforms without formal governmental MOUs and verified agency response pipelines face severe user drop-off and potential local friction. Taught the critical lesson that civic software is 20% code and 80% institutional alignment.',
    actions: [],
    hasMiniDemoUpcoming: false
  },
  {
    id: 'ai-keyboard',
    title: 'On-Device AI Keyboard',
    subtitle: 'FlorisBoard Fork with Local Small Language Model (SLM) Inference',
    category: 'Engineering Archives',
    status: 'Archived',
    statusLabel: 'R&D / Archived',
    iconFallback: 'Cpu',
    accentColor: '#9333EA',
    bgLight: '#FAF5FF',
    summary: 'An exploratory Android input method editor (IME) running a quantized on-device language model to provide offline grammar correction, tone shifting, and auto-paraphrasing with zero cloud exposure.',
    targetAudience: 'Privacy-conscious mobile users, on-device AI researchers.',
    capabilities: [
      'Private offline text completion with zero telemetry or remote server requests.',
      'One-tap tone rewriting (Casual, Formal, Concise, Poetic) directly inside any input field.',
      'Grammar diagnostics and contextual vocabulary suggestions running entirely on local CPU/NPU.',
      'Based on the robust, open-source FlorisBoard architecture.'
    ],
    techStack: ['Kotlin', 'C++ / NDK', 'FlorisBoard IME', 'GGML / llama.cpp', 'Quantized SLM'],
    architectureHighlights: [
      'Low-bit 4-bit (Q4_K_M) model quantization to fit model weights into sub-1.5 GB memory footprint.',
      'Custom Android InputConnection hook to intercept text stream without breaking system accessibility.'
    ],
    lessonsLearned: 'Archived due to severe hardware performance bottlenecks: on-device neural text generation created 120ms–250ms token generation lag and heavy RAM pressure, dropping the typing loop below 60fps on typical 4GB/6GB RAM budget Android devices. The research proved that for soft keyboards, instantaneous 16ms touch latency is non-negotiable over complex generative features.',
    actions: [],
    hasMiniDemoUpcoming: false
  },
  {
    id: 'viral-prompts',
    title: 'Viral Prompts',
    subtitle: 'Curated AI Prompt Engineering Taxonomy & Idea Repository',
    category: 'Engineering Archives',
    status: 'Archived',
    statusLabel: 'Sunset / Sunset',
    iconFallback: 'Sparkles',
    accentColor: '#64748B',
    bgLight: '#F1F5F9',
    summary: 'A curated taxonomy and repository for AI creators, categorizing high-performing prompt templates for Midjourney, DALL·E, Stable Diffusion, and conversational LLMs.',
    targetAudience: 'Digital creators, graphic designers, prompt engineers.',
    capabilities: [
      'Categorized prompt patterns across photorealism, cinematic lighting, anime, and 3D render styles.',
      'Dynamic variable substitution slots allowing users to customize subjects and style seeds.',
      'Side-by-side visual output comparisons across multiple diffusion models.',
      'Copy-to-clipboard formatting ready for immediate paste into Discord or CLI.'
    ],
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel Edge Functions'],
    architectureHighlights: [
      'Statically generated catalog using incremental static regeneration for sub-second page loads.',
      'Lightweight local search engine ranking prompts by tag similarity and user upvotes.'
    ],
    lessonsLearned: 'Sunset because ongoing manual editorial curation without automated web scraping and synthetic testing pipelines proved too operationally labor-intensive as generative AI models evolved rapidly every few weeks. Proved that content databases require autonomous ingestion loops to remain viable long-term.',
    actions: [],
    hasMiniDemoUpcoming: false
  }
];
