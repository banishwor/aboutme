import { coreApps } from './apps';
import { skills } from './skills';
import { baniPosts } from './blog';

export type SearchCategory = 'app' | 'project' | 'skill' | 'book' | 'heritage' | 'education';

export interface SearchableItem {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  category: SearchCategory;
  categoryLabel: string;
  appId: string;
  targetSubId?: string;
  color: string;
  bgLight: string;
  tags: string[];
  actionLabel?: string;
  iconName?: string;
}

export const searchIndex: SearchableItem[] = [
  // ================= 1. CORE APPS =================
  ...coreApps.map(app => ({
    id: `app-${app.id}`,
    title: app.name,
    subtitle: app.subtitle,
    description: `Open the ${app.name} OS workspace for ${app.subtitle.toLowerCase()}.`,
    category: 'app' as SearchCategory,
    categoryLabel: 'Applications',
    appId: app.id,
    color: app.color,
    bgLight: app.bgLight,
    tags: [
      app.name.toLowerCase(),
      app.subtitle.toLowerCase(),
      app.category.toLowerCase(),
      'app',
      'launch',
      'workspace'
    ],
    actionLabel: 'Open App',
    iconName: app.iconName
  })),

  // ================= 2. FUNCTIONAL MINI-DEMOS & ARCHIVES =================
  {
    id: 'proj-calculator',
    title: 'Manipur Calculator',
    subtitle: 'Land (Pari, Loukrak) & Gold (San, Rati) Unit Converter',
    description: 'Specialized regional unit calculation utility built with Kotlin, Room DB, and MVVM.',
    category: 'project',
    categoryLabel: 'Projects & Demos',
    appId: 'projects',
    targetSubId: 'manipur-calculator',
    color: '#059669',
    bgLight: '#ECFDF5',
    tags: [
      'manipur calculator', 'calculator', 'pari', 'loukrak', 'sangam', 'lousang',
      'san', 'rati', 'gold', 'land', 'units', 'converter', 'emi', 'offline', 'kotlin'
    ],
    actionLabel: 'View Project',
    iconName: 'FolderGit2'
  },
  {
    id: 'proj-calendar',
    title: 'Manipuri Calendar',
    subtitle: 'Meitei Lunar Calendar with Holidays & Tatnaba',
    description: 'Digital cultural calendar tracking lunar phases, indigenous festivals, and state holidays.',
    category: 'project',
    categoryLabel: 'Projects & Demos',
    appId: 'projects',
    targetSubId: 'manipuri-calendar',
    color: '#D97706',
    bgLight: '#FFFBEB',
    tags: [
      'calendar', 'manipuri calendar', 'meitei', 'lunar', 'tatnaba', 'cheiraoba',
      'gaan-ngai', 'yaoshang', 'festivals', 'holidays', 'android', 'kotlin'
    ],
    actionLabel: 'View Project',
    iconName: 'FolderGit2'
  },
  {
    id: 'proj-khutsuman',
    title: 'Khutsuman',
    subtitle: 'Daily Wage & Labor Attendance Tracker',
    description: 'Offline-first hisab system calculating daily/half-day laborer wages and attendance logs.',
    category: 'project',
    categoryLabel: 'Projects & Demos',
    appId: 'projects',
    targetSubId: 'khutsuman',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    tags: [
      'khutsuman', 'wage', 'attendance', 'labor', 'worker', 'hisab', 'money',
      'present', 'half-day', 'offline-first', 'room db', 'compose', 'kotlin'
    ],
    actionLabel: 'View Project',
    iconName: 'FolderGit2'
  },
  {
    id: 'proj-leikaifix',
    title: 'LeikaiFix Civic Prototype',
    subtitle: 'Local Ward Issue Reporting & Civic Analytics',
    description: 'Exploratory civic prototype for community problem reporting and municipal accountability.',
    category: 'project',
    categoryLabel: 'Projects & Demos',
    appId: 'projects',
    targetSubId: 'leikaifix',
    color: '#DC2626',
    bgLight: '#FEF2F2',
    tags: [
      'leikaifix', 'civic', 'roads', 'complaints', 'reporting', 'infrastructure',
      'prototype', 'engineering archive', 'lessons learned'
    ],
    actionLabel: 'View Archive',
    iconName: 'FolderGit2'
  },
  {
    id: 'proj-ai-keyboard',
    title: 'On-Device AI Keyboard',
    subtitle: 'FlorisBoard Fork & Small Language Model (SLM) Inference',
    description: 'Exploration of on-device neural text completion and memory efficiency on budget Android phones.',
    category: 'project',
    categoryLabel: 'Projects & Demos',
    appId: 'projects',
    targetSubId: 'ai-keyboard',
    color: '#9333EA',
    bgLight: '#FAF5FF',
    tags: [
      'ai keyboard', 'keyboard', 'florisboard', 'slm', 'small language model',
      'nlp', 'latency', 'ram', 'edge ai', 'on-device', 'android'
    ],
    actionLabel: 'View R&D',
    iconName: 'FolderGit2'
  },
  {
    id: 'proj-viral-prompts',
    title: 'Viral Prompts',
    subtitle: 'Curated AI Prompt Engineering Taxonomy & Idea Repository',
    description: 'AI prompt pattern repository for Midjourney, DALL-E, and diffusion models with lessons learned on curation.',
    category: 'project',
    categoryLabel: 'Projects & Demos',
    appId: 'projects',
    targetSubId: 'viral-prompts',
    color: '#64748B',
    bgLight: '#F1F5F9',
    tags: [
      'viral prompts', 'prompts', 'ai', 'midjourney', 'dall-e', 'stable diffusion',
      'gemini', 'prompt engineering', 'engineering archive', 'lessons learned'
    ],
    actionLabel: 'View Archive',
    iconName: 'FolderGit2'
  },
  {
    id: 'creator-bani-entertainment',
    title: 'Bani Entertainment (15K Gaming)',
    subtitle: 'Mobile Legends: Bang Bang MIL Influencer & Community',
    description: 'Gaming creator page with over 15,000 followers, esports tournament streams, and Badang Susanoo special skin giveaways.',
    category: 'project',
    categoryLabel: 'Gaming & Creator',
    appId: 'gaming',
    color: '#EA580C',
    bgLight: '#FFF7ED',
    tags: [
      'bani entertainment', 'gaming', 'mlbb', 'mobile legends', 'mil influencer',
      'esports', 'streamer', 'giveaway', 'badang', 'susanoo', 'facebook gaming'
    ],
    actionLabel: 'Open Gaming Hub',
    iconName: 'Gamepad2'
  },
  {
    id: 'creator-haloban-media',
    title: 'HaloBan Media (Facts & Lessons)',
    subtitle: 'Short-Form Documentary Channel on Science & Curiosities',
    description: 'Short-form educational documentary channel exploring historical curiosities, psychology, scientific paradoxes, and life lessons.',
    category: 'project',
    categoryLabel: 'Gaming & Creator',
    appId: 'gaming',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    tags: [
      'haloban media', 'haloban', 'documentary', 'facts', 'lessons', 'science',
      'curiosities', 'short-form video', 'shorts', 'reels', 'columbus', 'taj mahal',
      'winston churchill', 'churchill', 'bengal famine', 'history'
    ],
    actionLabel: 'Open Creator Hub',
    iconName: 'Brain'
  },

  // ================= 3. CULTURAL HERITAGE & ROOTS =================
  {
    id: 'heritage-yek-salai',
    title: 'Yek Salai (Seven Clans)',
    subtitle: 'Meitei Clan & Surname-to-Salai Lookup Matrix',
    description: 'Ancestral identity system mapping Manipuri surnames to the seven historical clans.',
    category: 'heritage',
    categoryLabel: 'Heritage & Roots',
    appId: 'roots',
    targetSubId: 'yek-salai',
    color: '#4F46E5',
    bgLight: '#EEF2FF',
    tags: [
      'yek salai', 'salai', 'mangang', 'luwang', 'khuman', 'angom', 'moirang',
      'kha-nganba', 'chenglei', 'meitei', 'clan', 'surnames', 'lineage', 'roots'
    ],
    actionLabel: 'Explore Clan',
    iconName: 'GitBranch'
  },
  {
    id: 'heritage-family-tree',
    title: 'Athokpam Family Tree',
    subtitle: 'Interactive Branching Lineage Matrix & Pedigree Graph',
    description: 'Genealogical preservation database recording ancestral lineages across generations.',
    category: 'heritage',
    categoryLabel: 'Heritage & Roots',
    appId: 'roots',
    targetSubId: 'family-tree',
    color: '#4F46E5',
    bgLight: '#EEF2FF',
    tags: [
      'athokpam', 'family tree', 'lineage', 'pedigree', 'ancestors', 'genealogy',
      'tree', 'clan', 'thoubal', 'generations', 'roots'
    ],
    actionLabel: 'View Tree',
    iconName: 'GitBranch'
  },
  {
    id: 'heritage-bani-blog',
    title: 'Bani — Voices of Meitei Heritage',
    subtitle: 'Native Editorial Reader for Meitei Cultural Stories',
    description: 'Digital publication dedicated to indigenous Meitei culture, Yek Salai jurisprudence, history, and folklore.',
    category: 'heritage',
    categoryLabel: 'Heritage & Publications',
    appId: 'bani',
    color: '#0891B2',
    bgLight: '#ECFEFF',
    tags: [
      'bani', 'meitei', 'culture', 'stories', 'folklore', 'history', 'editorial',
      'publication', 'reader', 'indigenous', 'clans', 'salai'
    ],
    actionLabel: 'Open Magazine',
    iconName: 'Feather'
  },
  // All 14 Normalized Articles
  ...baniPosts.map(post => ({
    id: `bani-story-${post.id}`,
    title: post.title,
    subtitle: `${post.category} · ${post.readTime} · ${post.publishedAt}`,
    description: post.excerpt,
    category: 'heritage' as SearchCategory,
    categoryLabel: 'Heritage & Stories',
    appId: 'bani',
    targetSubId: post.id,
    color: '#0891B2',
    bgLight: '#ECFEFF',
    tags: [
      ...post.title.toLowerCase().split(/\s+/),
      post.category.toLowerCase(),
      ...post.tags.map(t => t.toLowerCase()),
      'bani', 'story', 'article', 'meitei', 'kangleipak', 'heritage'
    ],
    actionLabel: 'Read Story',
    iconName: 'Feather'
  })),

  // ================= 4. BOOKS & PUBLICATIONS =================
  {
    id: 'book-pushback',
    title: 'Pushback',
    subtitle: 'The Manipuri Diaspora in Bangladesh & Personal Growth',
    description: 'Published work examining the historical resilience of the Meitei diaspora and life rebuilds.',
    category: 'book',
    categoryLabel: 'Books & Publications',
    appId: 'books',
    targetSubId: 'pushback',
    color: '#DC2626',
    bgLight: '#FEF2F2',
    tags: [
      'pushback', 'book', 'author', 'published', 'bangladesh', 'diaspora',
      'meitei', 'breakups', 'personal growth', 'amazon', 'kindle'
    ],
    actionLabel: 'Read Synopsis',
    iconName: 'BookOpen'
  },
  {
    id: 'book-echoes',
    title: 'The Echoes of Silence',
    subtitle: 'Between Heartbeats Series — Literary Reflections',
    description: 'Poetic reflections exploring contemplation, time, identity, and personal philosophies.',
    category: 'book',
    categoryLabel: 'Books & Publications',
    appId: 'books',
    targetSubId: 'echoes',
    color: '#B91C1C',
    bgLight: '#FEF2F2',
    tags: [
      'the echoes of silence', 'echoes', 'silence', 'book', 'author',
      'poetry', 'reflections', 'literature', 'between heartbeats'
    ],
    actionLabel: 'Read Synopsis',
    iconName: 'BookOpen'
  },

  // ================= 5. SKILLS & TECHNOLOGIES =================
  ...skills.map(skill => {
    // Map skill category to accent colors
    const colorMap: Record<string, { color: string; bg: string }> = {
      Mobile: { color: '#059669', bg: '#ECFDF5' },
      Web: { color: '#2563EB', bg: '#EFF6FF' },
      Core: { color: '#4F46E5', bg: '#EEF2FF' },
      'Data & Edge': { color: '#D97706', bg: '#FFFBEB' },
      Experimental: { color: '#9333EA', bg: '#FAF5FF' }
    };
    const palette = colorMap[skill.category] || { color: '#4F46E5', bg: '#EEF2FF' };

    return {
      id: `skill-${skill.id}`,
      title: skill.name,
      subtitle: `${skill.category} Technology · Used in ${skill.projects.slice(0, 2).join(', ')}`,
      description: skill.description || `Core engineering skill in ${skill.category}.`,
      category: 'skill' as SearchCategory,
      categoryLabel: 'Skills & Stack',
      appId: 'projects',
      color: palette.color,
      bgLight: palette.bg,
      tags: [
        skill.name.toLowerCase(),
        skill.id.toLowerCase(),
        skill.category.toLowerCase(),
        ...skill.projects.map(p => p.toLowerCase()),
        'skill',
        'tech',
        'stack'
      ],
      actionLabel: 'Inspect Stack',
      iconName: 'Layers'
    };
  }),

  // ================= 6. EDUCATION & RESEARCH =================
  {
    id: 'edu-mca',
    title: 'Manipur University (MCA)',
    subtitle: 'Master of Computer Applications — MU 7th State Rank (80.30%)',
    description: 'Graduated 1st Division with Distinction. Advanced coursework in Algorithms, DBMS, and Systems.',
    category: 'education',
    categoryLabel: 'Academic & Research',
    appId: 'education',
    targetSubId: 'mca-degree',
    color: '#D97706',
    bgLight: '#FFFBEB',
    tags: [
      'mca', 'manipur university', 'master', 'degree', '7th rank', 'rank',
      '80.30%', '80.3%', 'distinction', 'first division', 'academics', 'education'
    ],
    actionLabel: 'View Degree',
    iconName: 'GraduationCap'
  },
  {
    id: 'edu-hpc-workshop',
    title: 'High Performance Computing (HPC)',
    subtitle: 'National Supercomputing Mission Workshop (IIT Kharagpur × MU)',
    description: 'Specialized training in parallel computing, cluster architectures, and MPI paradigms.',
    category: 'education',
    categoryLabel: 'Academic & Research',
    appId: 'education',
    targetSubId: 'hpc-workshop',
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    tags: [
      'hpc', 'supercomputing', 'iit kharagpur', 'nsm', 'parallel computing',
      'mpi', 'clusters', 'national supercomputing mission', 'workshop'
    ],
    actionLabel: 'View Details',
    iconName: 'GraduationCap'
  },
  {
    id: 'edu-thesis',
    title: 'Missing Data Imputation Research',
    subtitle: 'MCA Master’s Thesis — Clustering-Based Imputation Techniques',
    description: 'Comparative study evaluating clustering algorithms for reconstructing sparse and missing datasets.',
    category: 'education',
    categoryLabel: 'Academic & Research',
    appId: 'education',
    targetSubId: 'mca-thesis',
    color: '#0891B2',
    bgLight: '#ECFEFF',
    tags: [
      'thesis', 'research', 'imputation', 'missing data', 'clustering',
      'data mining', 'machine learning', 'k-means', 'algorithms'
    ],
    actionLabel: 'View Research',
    iconName: 'GraduationCap'
  },
  {
    id: 'edu-thesis-ml',
    title: 'ML-Based Imputations in Tackling Missing Data',
    subtitle: 'MCA Research Project (2021-22) — Manipur University',
    description: 'Foundational study analyzing predictive vs clustering machine learning models on missing data.',
    category: 'education',
    categoryLabel: 'Academic & Research',
    appId: 'education',
    targetSubId: 'mca-ml-imputation-study',
    color: '#0284C7',
    bgLight: '#F0F9FF',
    tags: [
      'thesis', 'research', 'imputation', 'missing data', 'machine learning',
      'manipur university', 'algorithms', 'predictive'
    ],
    actionLabel: 'View Research',
    iconName: 'GraduationCap'
  }
];

export interface SearchResultsGrouped {
  apps: SearchableItem[];
  skills: SearchableItem[];
  books: SearchableItem[];
  heritage: SearchableItem[];
  education: SearchableItem[];
  totalMatches: number;
}

/**
 * Universal search query engine matching titles, subtitles, descriptions, and semantic tags.
 */
export function searchUniversal(rawQuery: string): SearchResultsGrouped {
  const q = rawQuery.trim().toLowerCase();

  if (!q) {
    return {
      apps: [],
      skills: [],
      books: [],
      heritage: [],
      education: [],
      totalMatches: 0
    };
  }

  // Tokenize query words for multi-word matching (e.g. "kotlin calculator")
  const tokens = q.split(/\s+/).filter(Boolean);

  const matchedItems = searchIndex.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(q);
    const subtitleMatch = item.subtitle.toLowerCase().includes(q);
    const tagMatch = item.tags.some(tag => tag.includes(q) || q.includes(tag));
    const tokenMatch = tokens.every(tok => 
      item.title.toLowerCase().includes(tok) ||
      item.subtitle.toLowerCase().includes(tok) ||
      item.tags.some(t => t.includes(tok))
    );

    return titleMatch || subtitleMatch || tagMatch || tokenMatch;
  });

  return {
    apps: matchedItems.filter(i => i.category === 'app' || i.category === 'project'),
    skills: matchedItems.filter(i => i.category === 'skill'),
    books: matchedItems.filter(i => i.category === 'book'),
    heritage: matchedItems.filter(i => i.category === 'heritage'),
    education: matchedItems.filter(i => i.category === 'education'),
    totalMatches: matchedItems.length
  };
}
