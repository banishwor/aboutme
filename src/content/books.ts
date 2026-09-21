import { getAssetUrl } from '../utils/assetUrl';

export interface BookExcerptSection {
  id: string;
  sectionTitle: string;
  chapterSubtitle?: string;
  locationLabel: string;
  paragraphs: string[];
  keyHighlight?: string;
}

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  series?: string;
  author: string;
  asin: string;
  amazonUrl: string;
  coverPath: string;
  accentColor: string;
  bgLight: string;
  genre: string;
  format: string;
  publicationYear: string;
  readTimeEstimate: string;
  synopsis: string;
  coreThemes: string[];
  sections: BookExcerptSection[];
}

export const books: BookItem[] = [
  // ================= 1. THE ECHOES OF SILENCE =================
  {
    id: 'echoes-of-silence',
    title: 'The Echoes of Silence',
    subtitle: 'Book I — The Silence Between Heartbeats',
    series: 'Between Heartbeats Series',
    author: 'Banishwor Athokpam',
    asin: 'B0GT48RW96',
    amazonUrl: 'https://www.amazon.in/Echoes-Silence-Book-Between-Heartbeats-ebook/dp/B0GT48RW96',
    coverPath: getAssetUrl('echoes-cover.jpg'),
    accentColor: '#991B1B',
    bgLight: '#FEF2F2',
    genre: 'Literary Fiction / Coming-of-Age & Quiet Romance',
    format: 'Kindle Edition',
    publicationYear: '2023',
    readTimeEstimate: '4 min excerpt',
    synopsis: 'A lyrical, deeply introspective story following Bren Atherton—a quiet, observant boy who solves words like mathematical equations. As he navigates unspoken family bonds, academic trials, and the arrival of Gemma Lancaster, silence transforms from a refuge into the loudest force in his life.',
    coreThemes: [
      'The Mathematics of Grammar',
      'Quiet Resilience',
      'Unspoken Bonds',
      'The Loudest Silence',
      'Identity & Self-Worth'
    ],
    sections: [
      {
        id: 'echoes-sec-1',
        sectionTitle: 'CHAPTER 1',
        chapterSubtitle: 'THE BOY WHO SOLVED WORDS LIKE EQUATIONS',
        locationLabel: 'Location 37 of 243 · 4%',
        paragraphs: [
          'Some boys grow up loud.',
          'They run across playgrounds, shout down hallways, and leave echoes of laughter behind them. I didn’t.',
          'I grew up quiet enough that most people forgot I was even there.',
          'My name is Bren Atherton. And silence was always the place where I felt most comfortable.',
          'I never hated people. I just preferred quiet things—quiet rooms, quiet evenings, quiet thoughts that moved through my mind like careful handwriting.',
          'While other kids spent their afternoons chasing each other through dusty fields, most of my childhood revolved around one person: my older brother, Brayden Atherton.',
          'Brayden was everything I wasn’t. Loud. Confident. Impossible to ignore. But somehow we still fit together—like two completely different notes that somehow made a strange kind of harmony.',
          'Most evenings followed the same routine. A small room. An old television glowing softly. A gaming console humming beneath it. Pixelated heroes running across tiny digital worlds. Brayden shouting every time he won. Me quietly trying again every time I lost.',
          'Those small moments were enough for me. The outside world always felt louder than necessary.',
          'School was different. Not difficult. Just uncomfortable.',
          'Teachers liked me. I was disciplined. I didn’t interrupt lessons. I didn’t cause trouble. If teachers could design the perfect student, they would probably design someone like me.',
          'But other students rarely understood me. I didn’t talk much—not because I had nothing to say, but because speaking always felt unnecessary. Sometimes silence was easier.',
          'There was something strange about the way my mind worked, especially with language.',
          'Most students learned language through meaning, through conversations, through practice. I didn’t. I studied grammar like mathematics. Rules. Patterns. Structures. To me, sentences were equations: subjects, verbs, objects, everything with a position, everything with logic.',
          'Because of that, something strange happened. My English grammar became almost perfect. My notebooks were always clean. My answers were always structured. Teachers praised my writing.'
        ],
        keyHighlight: 'To me, sentences were equations: subjects, verbs, objects, everything with a position, everything with logic.'
      },
      {
        id: 'echoes-sec-2',
        sectionTitle: 'CHAPTER 1 (CONTINUED)',
        chapterSubtitle: 'THE NOTICE BOARD & GEMMA LANCASTER',
        locationLabel: 'Location 42 of 243 · 6%',
        paragraphs: [
          'But when it came to *speaking*, everything slowed down. Words felt heavy in my mouth, like puzzles I had to solve before saying them aloud.',
          'At home, I mostly spoke two languages. My small tribal language, Aroki, and English. But there was one language that refused to cooperate with my brain—the national language taught in every school: Valerian.',
          'No matter how much I studied it, the words never stayed in my head. The grammar felt wrong. The exams always punished me for it. Every time.',
          'From second grade to fourth grade, I studied at Everfield Flower School, a small institution surrounded by fields and narrow dusty roads. Every morning we stood in lines for assembly, teachers on one side, students everywhere else. Sometimes the principal would announce the position holders for the term.',
          'And sometimes my name was called. "Bren Atherton."',
          'Students clapped. Teachers nodded. I walked to the stage calmly, took the certificate, nodded politely, and walked back to my place. I never knew what to do when people applauded.',
          'But every year the final results told a different story. Term exams: excellent. Final ranking: disappointing. The reason was always the same—that single subject dragged my score down every year.',
          'Slowly, I started believing something I never said out loud: *Maybe I’m not as smart as people think*. Children rarely voice such thoughts. But we believe them anyway. Quietly.',
          'Near the end of fourth grade, my father suggested something unexpected: a new school. A bigger one. Bright Meridian Academy was one of the most competitive schools in Thoral District. More students. Harder exams. Greater competition.',
          'Most children would have been nervous. I accepted immediately. Not because I was brave, but because I underestimated myself. I thought something simple: *If I fail, at least it will happen somewhere bigger*.',
          'Months later, the exam results were posted on the notice board. Students crowded around it, searching for their names and ranks. I searched quietly.',
          'Then I found my name: **Rank: 11 out of 130 students.**',
          'For a moment, I just stared at the board. Something unfamiliar moved inside my chest—not excitement, not pride, just realization. *Maybe I was wrong about myself.*',
          'But there was something else I didn’t know. Someone had already noticed me long before I noticed them. A girl. One class below me. She had watched me walk onto the assembly stage more than once and remembered me—not because I spoke, not because I smiled, but because I didn’t.',
          'Her name was Gemma Lancaster.',
          'At that time, I had absolutely no idea she existed. That would change very soon. Because one evening, my father decided I needed extra lessons. He took me to a small tutoring house near the edge of Arath Village. The tutor’s name was Soren Vale.',
          'It was supposed to be a normal evening. Just another class. Just another ordinary day. But sometimes the smallest moments quietly change your life.',
          'And that evening, I was about to meet the girl who would someday become the loudest silence in my heart.'
        ],
        keyHighlight: 'And that evening, I was about to meet the girl who would someday become the loudest silence in my heart.'
      }
    ]
  },

  // ================= 2. PUSHBACK =================
  {
    id: 'pushback',
    title: 'Pushback',
    subtitle: 'How Breakups Can Lead to Personal Growth and Development',
    author: 'Banishwor Athokpam',
    asin: 'B0BTB1JVVB',
    amazonUrl: 'https://www.amazon.in/Pushback-Breakups-Personal-Growth-Development-ebook/dp/B0BTB1JVVB',
    coverPath: getAssetUrl('pushback-cover.jpg'),
    accentColor: '#DC2626',
    bgLight: '#FEF2F2',
    genre: 'Non-Fiction / Psychology, Self-Help & Personal Growth',
    format: 'Kindle Edition',
    publicationYear: '2023',
    readTimeEstimate: '3 min excerpt',
    synopsis: 'A pragmatic, empathetic psychological guide examining how the intense pain of relationship endings can be transformed into an indispensable catalyst for self-discovery, emotional resilience, and personal rebuild.',
    coreThemes: [
      'Breakups as a Catalyst for Growth',
      'Self-Reflection & Introspection',
      'Rebuilding Self-Worth',
      'Root Causes of Relationship Endings',
      'Emotional Resilience'
    ],
    sections: [
      {
        id: 'pushback-sec-1',
        sectionTitle: 'INTRODUCTION',
        chapterSubtitle: 'THE CATALYST FOR PERSONAL GROWTH',
        locationLabel: 'Location 12 of 83 · 15%',
        paragraphs: [
          'Breakups can be emotionally difficult and painful, especially when the relationship was significant and meaningful. The end of a relationship can trigger feelings of sadness, anger, guilt, and even depression. It can also cause a sense of loss and a feeling of failure.',
          'However, despite the pain and difficulty, breakups can also be a necessary step in personal growth and development. When a relationship ends, it can be an opportunity for people to reflect on themselves, their values, and their priorities. It can also be an opportunity to learn from past mistakes and to identify patterns that may have contributed to the relationship’s failure.',
          'Through self-reflection and introspection, people can gain a deeper understanding of themselves and what they want in a relationship. They can also identify areas in which they need to improve, and make positive changes in their lives. A breakup can be a catalyst for personal growth, allowing people to focus on their own happiness and well-being, and to build a brighter, healthier future.',
          'Additionally, ending a relationship that is not healthy or fulfilling can open up new opportunities for growth and self-discovery, and allow individuals to find a more suitable and fulfilling relationship.',
          'It is important to remember that breakups are a natural part of life, and that it is possible to move on and find happiness again. It may take time, but with the right mindset and strategies, people can use the experience of a breakup as a "pushback" in their lives, to help them grow and develop into a better version of themselves.'
        ],
        keyHighlight: 'People can use the experience of a breakup as a "pushback" in their lives, to help them grow and develop into a better version of themselves.'
      },
      {
        id: 'pushback-sec-2',
        sectionTitle: 'CHAPTER 1',
        chapterSubtitle: 'UNDERSTANDING THE REASONS BEHIND A BREAKUP',
        locationLabel: 'Location 54 of 83 · 59%',
        paragraphs: [
          'Why relationships may come to an end?',
          'There are many reasons why relationships may come to an end. Some of the most common reasons include:',
          '1. Lack of communication: When partners are unable to effectively communicate with each other, it can lead to misunderstandings, resentment, and a breakdown of the relationship.',
          '2. Lack of trust: Trust is a crucial component in any relationship. When trust is broken, it can be difficult to regain and may ultimately lead to the end of the relationship.',
          '3. Infidelity: Cheating can be a major cause of breakups. It can cause feelings of betrayal and a loss of trust and respect in the relationship.',
          '4. Different priorities or goals: When partners have different priorities or goals, it can cause conflict and make it difficult to maintain a healthy relationship.',
          '5. Growing apart: Sometimes, as people change and grow, they may find that they no longer have the same interests or values as their partner. This can lead to a feeling of disconnection and a gradual drifting apart.',
          '6. Lack of intimacy: When partners don’t feel a sense of emotional or physical closeness, it can make the relationship feel unfulfilling.',
          '7. Financial issues: Money can be a major source of stress and conflict in relationships. Financial disagreements can lead to fights and ultimately the end of the relationship.',
          '8. Physical or emotional abuse: Physical or emotional abuse can cause serious damage to a relationship and make it impossible to continue.'
        ],
        keyHighlight: 'Ending a relationship that is not healthy or fulfilling can open up new opportunities for growth and self-discovery.'
      }
    ]
  }
];
