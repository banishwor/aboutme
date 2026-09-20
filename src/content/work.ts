export interface WorkItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  current: boolean;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  description: string;
  responsibilities: string[];
  technologies: string[];
  color: string;
  bgLight: string;
}

export const workExperience: WorkItem[] = [
  {
    id: 'nts-tech',
    role: 'Software Developer & Instructor',
    organization: 'NTS Institute of Technology',
    location: 'Yairipok, Manipur',
    period: 'Oct 2023 – Present',
    current: true,
    type: 'Full-time',
    description: 'Dual engineering and pedagogical role combining production software development with technical instruction.',
    responsibilities: [
      'Instructing foundational and advanced courses in C, C++, Java, Web Development, and Data Structures.',
      'Developing and maintaining internal software solutions and client-facing web and mobile applications.',
      'Leading manual and automated software testing and quality assurance routines before release.',
      'Mentoring over 100+ students through hands-on capstone programming projects and algorithmic problem solving.'
    ],
    technologies: ['C', 'C++', 'Java', 'JavaScript', 'React', 'Kotlin', 'SQL', 'QA Testing', 'Git'],
    color: '#4F46E5',
    bgLight: '#EEF2FF'
  },
  {
    id: 'hi-tech-edu',
    role: 'Instructor & Technical Support',
    organization: 'Hi-Tech Computer Education',
    location: 'Thoubal, Manipur',
    period: 'Apr 2022 – Sep 2023',
    current: false,
    type: 'Full-time',
    description: 'Technical instruction and laboratory systems management for computer science and IT vocational courses.',
    responsibilities: [
      'Delivered structured lectures on programming fundamentals, database concepts, and computer applications.',
      'Conducted practical lab sessions guiding students through real-time debugging and code comprehension.',
      'Managed hardware infrastructure, operating system installations, network configurations, and lab maintenance.',
      'Assisted students with technical exam preparations and certification coursework.'
    ],
    technologies: ['C', 'C++', 'Python Fundamentals', 'DBMS', 'Operating Systems', 'Technical Support'],
    color: '#059669',
    bgLight: '#ECFDF5'
  },
  {
    id: 'freelance-dev',
    role: 'Freelance Software Developer',
    organization: 'Self-Employed / Community Solutions',
    location: 'Thoubal, Manipur',
    period: '2021 – Present',
    current: true,
    type: 'Freelance',
    description: 'Engineering native Android utilities, offline-first systems, and cultural preservation applications tailored for the Manipuri community.',
    responsibilities: [
      'Designed and engineered Manipur Calculator — specialized offline utility for indigenous land (Pari, Loukrak) and gold (San, Rati) units.',
      'Developed Manipuri Calendar tracking Meitei lunar phases, indigenous festivals (Gaan-Ngai, Cheiraoba), and Tatnaba.',
      'Created Khutsuman — offline-first labor attendance and daily wage hisab application using Room DB and Jetpack Compose.',
      'Built digital archives and genealogical tools including the Athokpam Family Tree lineage matrix.'
    ],
    technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room DB', 'TypeScript', 'React', 'Offline-First Architecture'],
    color: '#D97706',
    bgLight: '#FFFBEB'
  }
];
