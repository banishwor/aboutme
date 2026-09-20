export interface DegreeItem {
  id: string;
  degree: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  score: string;
  division: string;
  rank?: string;
  description: string;
  highlights: string[];
  color: string;
  bgLight: string;
  officialDocumentUrl?: string;
  officialDocumentTitle?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  category: 'Thesis' | 'Workshop' | 'Certification';
  description: string;
  keyPoints: string[];
  tags: string[];
  color: string;
  bgLight: string;
  officialDocumentUrl?: string;
  officialDocumentTitle?: string;
}

export const degrees: DegreeItem[] = [
  {
    id: 'mca-degree',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Manipur University, Chanchipur',
    boardOrUniversity: 'Manipur University (Central University)',
    year: '2023',
    score: '80.30%',
    division: 'I Division with Distinction',
    rank: '7th Position in State',
    description: 'Postgraduate master’s degree covering advanced computing paradigms, software engineering methodologies, database architectures, and distributed systems.',
    highlights: [
      'Secured 7th Position in State among affiliated colleges with 80.30% marks.',
      'Graduated in First Division with Distinction.',
      'Authored Master’s research thesis on clustering-based missing data imputation.',
      'Coursework: Advanced Algorithms, Distributed Databases, Object-Oriented Software Design, Cloud & Parallel Computing.'
    ],
    color: '#D97706',
    bgLight: '#FFFBEB',
    officialDocumentUrl: '/mca-rank-result.png',
    officialDocumentTitle: 'MU Official Rank Gazette (June 2023)'
  },
  {
    id: 'bca-degree',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'NIELIT Imphal, Akampat',
    boardOrUniversity: 'Manipur University',
    year: '2020',
    score: '68.38%',
    division: 'I Division',
    description: 'Undergraduate professional degree establishing core computer science foundations, algorithmic programming, web development, and database management.',
    highlights: [
      'Graduated in First Division (68.38%).',
      'Developed strong foundation in C, C++, Core Java, Relational Databases (SQL), and Data Structures.',
      'Completed practical capstone systems and laboratory projects at National Institute of Electronics & Information Technology (NIELIT).'
    ],
    color: '#2563EB',
    bgLight: '#EFF6FF'
  },
  {
    id: 'hse-class-12',
    degree: 'Higher Secondary Examination (HSE / Class 12)',
    institution: 'The Fancier Abhiram Hr. Sec. School',
    boardOrUniversity: 'COHSEM',
    year: '2016',
    score: '72.80%',
    division: 'I Division',
    description: 'Higher secondary education focusing on Science stream curriculum, analytical reasoning, and mathematics.',
    highlights: [
      'First Division pass (72.80%) under Council of Higher Secondary Education, Manipur (COHSEM).',
      'Core subjects: Physics, Chemistry, and Mathematics (Science Stream).'
    ],
    color: '#059669',
    bgLight: '#ECFDF5'
  },
  {
    id: 'aisse-class-10',
    degree: 'All India Secondary School Examination (AISSE / Class 10)',
    institution: 'Ruda Academy School, Thoubal',
    boardOrUniversity: 'CBSE',
    year: '2014',
    score: '89.93%',
    division: 'I Division with Distinction',
    description: 'Secondary school education establishing academic excellence in mathematics, science, and social sciences.',
    highlights: [
      'Graduated First Division with 89.93% marks under Central Board of Secondary Education (CBSE).',
      'High distinctions across Mathematics, Science, and English language.'
    ],
    color: '#7C3AED',
    bgLight: '#F5F3FF'
  }
];

export const researchAndCertifications: ResearchItem[] = [
  {
    id: 'mca-thesis',
    title: 'Empirical study on clustering-based missing data imputation techniques',
    subtitle: 'MCA Master’s Research Dissertation',
    organization: 'Department of Computer Science, Manipur University',
    date: '2023',
    category: 'Thesis',
    description: 'An empirical investigation and comparative performance analysis of machine learning clustering algorithms utilized for missing data reconstruction in high-dimensional datasets.',
    keyPoints: [
      'Evaluated K-Means, Fuzzy C-Means, and Hierarchical clustering methodologies for data consistency.',
      'Benchmarked imputation accuracy, mean squared error (MSE), and computational latency across varied missing data ratios.',
      'Demonstrated the effectiveness of proximity-based cluster imputation for preserving statistical distribution in incomplete records.'
    ],
    tags: ['Machine Learning', 'Data Mining', 'Clustering', 'K-Means', 'Data Imputation', 'Python / SciPy'],
    color: '#0891B2',
    bgLight: '#ECFEFF'
  },
  {
    id: 'mca-ml-imputation-study',
    title: 'A Study on Machine Learning-Based Imputations in Tackling Missing Data',
    subtitle: 'MCA Research Project',
    organization: 'Department of Computer Science, Manipur University',
    date: '2021–2022',
    category: 'Thesis',
    description: 'Exploratory machine learning investigation analyzing missing value reconstruction and statistical feature preservation across sparse data matrices.',
    keyPoints: [
      'Surveyed statistical vs. algorithmic machine learning imputation strategies in incomplete datasets.',
      'Evaluated preservation of feature distributions, standard errors, and parameter estimates.',
      'Established foundational empirical methodology leading directly to the postgraduate MCA dissertation.'
    ],
    tags: ['Machine Learning', 'Data Imputation', 'Algorithms', 'Manipur University', 'Python'],
    color: '#0284C7',
    bgLight: '#F0F9FF'
  },
  {
    id: 'nsm-hpc-workshop',
    title: 'Workshop on High Performance Computing',
    subtitle: 'National Supercomputing Mission (NSM) Technical Program',
    organization: 'Manipur University & IIT Kharagpur',
    date: 'July 2023',
    category: 'Workshop',
    description: 'Specialized residential training in high performance parallel supercomputing architectures, cluster configurations, and parallel algorithm development.',
    keyPoints: [
      'Hands-on parallel programming with OpenMP and Message Passing Interface (MPI).',
      'GPU parallel computing concepts, memory hierarchy, and compute node communication.',
      'Cluster job scheduling (SLURM), distributed memory profiling, and workload parallelization.',
      'Conducted under the joint auspices of IIT Kharagpur and Manipur University as part of the National Supercomputing Mission.'
    ],
    tags: ['High Performance Computing (HPC)', 'Supercomputing', 'OpenMP', 'MPI', 'Parallel Computing', 'IIT Kharagpur'],
    color: '#4F46E5',
    bgLight: '#EEF2FF'
  }
];
