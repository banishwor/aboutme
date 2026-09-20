export interface ClanInfo {
  id: number;
  name: string;
  meiteiMayek: string;
  color: string;
  badgeTextColor: string;
  description: string;
  deity: string;
  element: string;
}

export const SEVEN_SALAIS: Record<string, ClanInfo> = {
  Mangang: {
    id: 1,
    name: 'Mangang',
    meiteiMayek: 'ꯃꯉꯥꯡ',
    color: '#E92119',
    badgeTextColor: '#FFFFFF',
    description: 'The premier solar dynasty clan associated with royalty, fire, and the eastern horizon.',
    deity: 'Pakhangba (ꯄꯥꯈꯪꯕ)',
    element: 'Fire / East'
  },
  Luwang: {
    id: 2,
    name: 'Luwang',
    meiteiMayek: 'ꯂꯨꯋꯥꯡ',
    color: '#FFFFFF',
    badgeTextColor: '#0F172A',
    description: 'The clan of philosophical intellect, statecraft, justice, and the north-western realm.',
    deity: 'Luwang Pokpa (ꯂꯨꯋꯥꯡ ꯄꯣꯛꯄ)',
    element: 'Silver / North-West'
  },
  Khuman: {
    id: 3,
    name: 'Khuman',
    meiteiMayek: 'ꯈꯨꯃꯟ',
    color: '#000000',
    badgeTextColor: '#FFFFFF',
    description: 'The clan of valor, chivalry, deep waters, and the south-western dominion.',
    deity: 'Khuman Pokpa (ꯈꯨꯃꯟ ꯄꯣꯛꯄ)',
    element: 'Black / South-West'
  },
  Angom: {
    id: 4,
    name: 'Angom',
    meiteiMayek: 'ꯑꯉꯣꯝ',
    color: '#FBBF24',
    badgeTextColor: '#0F172A',
    description: 'The aristocratic noble clan renowned for scholarship, peace, and counsel.',
    deity: 'Pureiromba (ꯄꯨꯔꯩꯔꯣꯝꯕ)',
    element: 'Yellow / South-East'
  },
  Moirang: {
    id: 5,
    name: 'Moirang',
    meiteiMayek: 'ꯃꯣꯏꯔꯥꯡ',
    color: '#A80C3A',
    badgeTextColor: '#FFFFFF',
    description: 'The clan celebrated for epic literature, arts, chivalry, and Loktak Lake culture.',
    deity: 'Thangching (ꯊꯥꯡꯖꯤꯡ)',
    element: 'Dark Red / South'
  },
  'Khaba Nganba': {
    id: 6,
    name: 'Khaba Nganba',
    meiteiMayek: 'ꯈꯥꯕ ꯉꯥꯟꯕ',
    color: '#8B5CF6',
    badgeTextColor: '#FFFFFF',
    description: 'Ancient priestly clan holding sacred rites, pre-dating dynastic chronicles.',
    deity: 'Khaba Pokpa (ꯈꯥꯕ ꯄꯣꯛꯄ)',
    element: 'Violet / North'
  },
  'Salang Leisangthem': {
    id: 7,
    name: 'Salang Leisangthem',
    meiteiMayek: 'ꯁꯂꯥꯡ ꯂꯩꯁꯥꯡꯊꯦꯝ',
    color: '#0EA5E9',
    badgeTextColor: '#FFFFFF',
    description: 'The clan of agriculture, abundance, healing, and herbal medicine.',
    deity: 'Salang Pokpa (ꯁꯂꯥꯡ ꯄꯣꯛꯄ)',
    element: 'Sky Blue / North-East'
  }
};

export interface SurnameEntry {
  surname: string;
  meiteiMayek: string;
  clans: string[];
  notes?: string;
}

// Scoped strictly to the 7 surnames requested by the user
export const SCOPED_SURNAMES: SurnameEntry[] = [
  {
    surname: 'Athokpam',
    meiteiMayek: 'ꯑꯊꯣꯛꯄꯝ',
    clans: ['Luwang'],
    notes: 'Paternal lineage of Luwang Pokpa.'
  },
  {
    surname: 'Leimapokpam',
    meiteiMayek: 'ꯂꯩꯃꯄꯣꯛꯄꯝ',
    clans: ['Mangang'],
    notes: 'Paternal lineage of Mangang dynasty.'
  },
  {
    surname: 'Langpoklakpam',
    meiteiMayek: 'ꯂꯥꯡꯄꯣꯛꯂꯥꯛꯄꯝ',
    clans: ['Mangang'],
    notes: 'Associated with Mangang Salai (Langpoglakpam).'
  },
  {
    surname: 'Laishram',
    meiteiMayek: 'ꯂꯥꯏꯁ꯭ꯔꯝ',
    clans: ['Khuman'],
    notes: 'Paternal lineage of Khuman Salai.'
  },
  {
    surname: 'Ningombam',
    meiteiMayek: 'ꯅꯤꯉꯣꯝꯕꯝ',
    clans: ['Angom'],
    notes: 'Paternal lineage of Angom Salai.'
  },
  {
    surname: 'Mutum',
    meiteiMayek: 'ꯃꯨꯇꯨꯝ',
    clans: ['Mangang', 'Moirang'],
    notes: 'Multi-clan surname with both Mangang and Moirang branches.'
  },
  {
    surname: 'Thongam',
    meiteiMayek: 'ꯊꯣꯡꯑꯝ',
    clans: ['Khuman', 'Khaba Nganba'],
    notes: 'Multi-clan surname with both Khuman and Khaba Nganba branches.'
  }
];

export interface MarriageRule {
  id: string;
  title: string;
  meiteiMayek: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  color: string;
}

export const MEITEI_KINSHIP_RULES: MarriageRule[] = [
  {
    id: 'yek-tinnaba',
    title: 'Yek Tinnaba',
    meiteiMayek: 'ꯌꯦꯛ ꯇꯤꯟꯅꯕ',
    description: 'Marriage within the same paternal clan (Salai) is strictly forbidden. Individuals sharing the same Yek are considered brothers and sisters (lineage siblings).',
    severity: 'critical',
    color: '#DC2626'
  },
  {
    id: 'sairuk-tinnaba',
    title: 'Sairuk / Sairup Tinnaba',
    meiteiMayek: 'ꯁꯥꯏꯔꯨꯛ ꯇꯤꯟꯅꯕ',
    description: 'Marriage is strictly prohibited between offspring born of the same father through different mothers.',
    severity: 'critical',
    color: '#2563EB'
  },
  {
    id: 'pee-pen-tinnaba',
    title: 'Pee Tinnaba & Pen Tinnaba',
    meiteiMayek: 'ꯄꯤ ꯇꯤꯟꯅꯕ ꯑꯃꯁꯨꯡ ꯄꯦꯟ ꯇꯤꯟꯅꯕ',
    description: 'Kinship prohibitions extending through direct paternal and maternal collateral branches.',
    severity: 'critical',
    color: '#059669'
  },
  {
    id: 'leinung-pen-tinnaba',
    title: 'Leinung Pen Tinnaba',
    meiteiMayek: 'ꯂꯩꯅꯨꯡ ꯄꯦꯟ ꯇꯤꯟꯅꯕ',
    description: 'Exogamy rule prohibiting union between individuals who share a maternal grandmother within three generations.',
    severity: 'warning',
    color: '#8B5CF6'
  },
  {
    id: 'mungnaba',
    title: 'Mungnaba',
    meiteiMayek: 'ꯃꯨꯡꯅꯕ',
    description: 'Generational prohibition restricting marriage within seven paternal generations and five maternal generations.',
    severity: 'warning',
    color: '#D97706'
  },
  {
    id: 'ee-omnaba',
    title: 'Ee-Omnaba',
    meiteiMayek: 'ꯏ-ꯑꯣꯝꯅꯕ',
    description: 'Blood-sharing prohibition preventing union among descendants of recent common biological ancestry.',
    severity: 'critical',
    color: '#E11D48'
  },
  {
    id: 'ngaknaba',
    title: 'Ngaknaba',
    meiteiMayek: 'ꯉꯥꯛꯅꯕ',
    description: 'Customary social avoidance protocol observed between certain inter-clan allied lineages.',
    severity: 'info',
    color: '#64748B'
  }
];

export interface CompatibilityResult {
  compatible: boolean;
  status: 'allowed' | 'prohibited' | 'same_surname' | 'disambiguation' | 'not_found';
  title: string;
  subtitle: string;
  rationale?: string;
  ruleViolated?: string;
  surname1: string;
  surname2: string;
  clan1?: string;
  clan2?: string;
  possibleClans1?: string[];
  possibleClans2?: string[];
}

/**
 * Checks marriage compatibility between two surnames using authentic Meitei Yek Salai rules
 * extracted from Banishwor's YekSalaiService.js.
 */
export function checkCompatibility(
  s1Raw: string, 
  s2Raw: string, 
  selectedClan1Override?: string, 
  selectedClan2Override?: string
): CompatibilityResult {
  const s1 = s1Raw.trim();
  const s2 = s2Raw.trim();

  if (!s1 || !s2) {
    return {
      compatible: false,
      status: 'not_found',
      title: 'Missing Surname',
      subtitle: 'Please enter or select both surnames.',
      surname1: s1,
      surname2: s2
    };
  }

  // 1. Same Surname Check (Siblings)
  if (s1.toLowerCase() === s2.toLowerCase()) {
    return {
      compatible: false,
      status: 'same_surname',
      title: 'Marriage Prohibited (Same Surname)',
      subtitle: 'Union between individuals with the same surname is strictly forbidden.',
      rationale: 'In traditional Meitei custom, sharing the same surname denotes immediate patrilineal siblinghood. Marriage is strictly forbidden at the most severe customary level.',
      ruleViolated: 'Patrilineal Siblinghood (Yek Tinnaba)',
      surname1: s1,
      surname2: s2
    };
  }

  // Find entries in scoped surnames (case-insensitive)
  const entry1 = SCOPED_SURNAMES.find(e => e.surname.toLowerCase() === s1.toLowerCase());
  const entry2 = SCOPED_SURNAMES.find(e => e.surname.toLowerCase() === s2.toLowerCase());

  if (!entry1 || !entry2) {
    return {
      compatible: false,
      status: 'not_found',
      title: 'Surname Outside Demo Scope',
      subtitle: 'One or both surnames are not in the curated 7-surname demo set.',
      rationale: 'Please choose from the 7 curated surnames (Athokpam, Leimapokpam, Langpoklakpam, Laishram, Ningombam, Mutum, Thongam) or install the full Yek Salai app from Google Play for the complete 860+ surname database.',
      surname1: s1,
      surname2: s2
    };
  }

  const clans1 = entry1.clans;
  const clans2 = entry2.clans;

  // Check if disambiguation is needed and not overridden
  if ((clans1.length > 1 && !selectedClan1Override) || (clans2.length > 1 && !selectedClan2Override)) {
    return {
      compatible: false,
      status: 'disambiguation',
      title: 'Branch Disambiguation Required',
      subtitle: 'One or both surnames belong to multiple Salais.',
      rationale: `In Meitei history, surnames like ${clans1.length > 1 ? entry1.surname : ''} ${clans2.length > 1 ? entry2.surname : ''} branch into multiple clans. Please select the specific clan branch below to test exact compatibility.`,
      surname1: entry1.surname,
      surname2: entry2.surname,
      possibleClans1: clans1,
      possibleClans2: clans2
    };
  }

  const clan1 = selectedClan1Override || clans1[0];
  const clan2 = selectedClan2Override || clans2[0];

  // 2. Yek Tinnaba Check (Same Clan)
  if (clan1 === clan2) {
    return {
      compatible: false,
      status: 'prohibited',
      title: 'Marriage Prohibited (Yek Tinnaba)',
      subtitle: `Violation: Both surnames belong to the ${clan1} Salai.`,
      rationale: `Traditional Meitei customary law strictly prohibits marriage within the same clan (${clan1}). Descendants of the same Yek are considered brothers and sisters sharing identical paternal ancestral heritage.`,
      ruleViolated: 'Yek Tinnaba (Same Clan Exogamy Prohibition)',
      surname1: entry1.surname,
      surname2: entry2.surname,
      clan1,
      clan2
    };
  }

  // 3. Marriage Allowed (Distinct Clans)
  return {
    compatible: true,
    status: 'allowed',
    title: 'Marriage Allowed',
    subtitle: `Customary Exogamy Validated (${clan1} + ${clan2})`,
    rationale: `According to traditional Meitei customs, ${entry1.surname} (${clan1} Salai) and ${entry2.surname} (${clan2} Salai) belong to distinct ancestral lineages. No clan violation (Yek Tinnaba) exists between these two paternal lines.`,
    surname1: entry1.surname,
    surname2: entry2.surname,
    clan1,
    clan2
  };
}
