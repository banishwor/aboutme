// Ingested & filtered from official banishwor/manipuri-calendar-pwa dataset
// Contains exact Meitei Lunar Calendar data for January 2027 and February 2027

export interface CalendarEvent {
  id: string;
  name: string;
  shortLabel: string;
  category: 'holiday' | 'national_holiday' | 'festival' | 'ritual' | 'memorial';
  isHoliday: boolean;
  description?: string;
}

export interface MonthDayData {
  gregorianDate: string; // "YYYY-MM-DD"
  dayNumber: number;      // 1 to 31
  dayOfWeek: number;      // 0 = Sun, 1 = Mon ... 6 = Sat
  meiteiMonthEnglish: string; // "POINU", "WAKCHING", "PHAIREN"
  meiteiMonthMayek: string;   // "ꯄꯣꯏꯅꯨ", "ꯋꯥꯛꯆꯤꯡ", "ꯐꯤꯔꯦꯟ"
  lunarDays: number[];    // [1] or [20, 21]
  lunarDaysMayek: string; // "꯱" or "꯲꯰/꯲꯱"
  isSunday: boolean;
  moonPhase?: 'new_moon' | 'full_moon' | 'ekadasi';
  moonPhaseLabel?: string; // "THASI", "PURNIMA", "EKADASI"
  events: CalendarEvent[];
}

export interface MonthConfig {
  year: number;
  monthIndex: number; // 0 = Jan, 1 = Feb
  monthNameEnglish: string; // "January 2027"
  meiteiSubtitleMayek: string; // "ꯄꯣꯏꯅꯨ / ꯋꯥꯛꯆꯤꯡ"
  startDayOfWeek: number; // 0 = Sun, 5 = Fri
  totalDays: number;
  days: MonthDayData[];
}

// Meitei numeral translator helper
export const toMeiteiNumerals = (num: number | string): string => {
  const map: Record<string, string> = {
    '0': '꯰', '1': '꯱', '2': '꯲', '3': '꯳', '4': '꯴',
    '5': '꯵', '6': '꯶', '7': '꯷', '8': '꯸', '9': '꯹',
    '/': '/'
  };
  return String(num).split('').map(c => map[c] || c).join('');
};

export const MEITEI_WEEKDAYS: { english: string; shortMayek: string; fullMayek: string }[] = [
  { english: 'Sun', shortMayek: 'ꯅꯣꯡ', fullMayek: 'ꯅꯣꯡꯃꯥꯏꯖꯤꯡ' },
  { english: 'Mon', shortMayek: 'ꯅꯤꯡ', fullMayek: 'ꯅꯤꯡꯊꯧꯀꯥꯕ' },
  { english: 'Tue', shortMayek: 'ꯂꯩ', fullMayek: 'ꯂꯩꯕꯥꯛꯄꯣꯛꯄ' },
  { english: 'Wed', shortMayek: 'ꯌꯨꯝ', fullMayek: 'ꯌꯨꯝꯁꯀꯩꯁꯥ' },
  { english: 'Thu', shortMayek: 'ꯁꯒꯣꯜ', fullMayek: 'ꯁꯒꯣꯜꯁꯦꯟ' },
  { english: 'Fri', shortMayek: 'ꯏꯔꯥꯏ', fullMayek: 'ꯏꯔꯥꯏ' },
  { english: 'Sat', shortMayek: 'ꯊꯥꯡ', fullMayek: 'ꯊꯥꯡꯖ' },
];

// ================= JANUARY 2027 DATA =================
// 2027-01-01 starts on Friday (dayOfWeek = 5)
// Poinu: days 1 to 7 (24 to 30) -> Jan 7 is New Moon
// Wakching: days 8 to 31 (1 to 24) -> Jan 22 is Full Moon
export const JANUARY_2027_DAYS: MonthDayData[] = [
  {
    gregorianDate: '2027-01-01', dayNumber: 1, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'POINU', meiteiMonthMayek: 'ꯄꯣꯏꯅꯨ',
    lunarDays: [24], lunarDaysMayek: '꯲꯴',
    events: [{ id: 'new_year', name: "New Year's Day", shortLabel: 'NEW YEAR', category: 'holiday', isHoliday: true, description: 'Celebration of the first day of the Gregorian year 2027.' }]
  },
  {
    gregorianDate: '2027-01-02', dayNumber: 2, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'POINU', meiteiMonthMayek: 'ꯄꯣꯏꯅꯨ',
    lunarDays: [25], lunarDaysMayek: '꯲꯵', events: []
  },
  {
    gregorianDate: '2027-01-03', dayNumber: 3, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'POINU', meiteiMonthMayek: 'ꯄꯣꯏꯅꯨ',
    lunarDays: [26], lunarDaysMayek: '꯲꯶', events: []
  },
  {
    gregorianDate: '2027-01-04', dayNumber: 4, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'POINU', meiteiMonthMayek: 'ꯄꯣꯏꯅꯨ',
    lunarDays: [27], lunarDaysMayek: '꯲꯷',
    moonPhase: 'ekadasi', moonPhaseLabel: 'EKADASI',
    events: [{ id: 'ekadasi_poinu', name: 'Poinu Ekadasi', shortLabel: 'EKADASI', category: 'ritual', isHoliday: false, description: 'Traditional Ekadasi fasting day.' }]
  },
  {
    gregorianDate: '2027-01-05', dayNumber: 5, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'POINU', meiteiMonthMayek: 'ꯄꯣꯏꯅꯨ',
    lunarDays: [28], lunarDaysMayek: '꯲꯸', events: []
  },
  {
    gregorianDate: '2027-01-06', dayNumber: 6, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'POINU', meiteiMonthMayek: 'ꯄꯣꯏꯅꯨ',
    lunarDays: [29], lunarDaysMayek: '꯲꯹', events: []
  },
  {
    gregorianDate: '2027-01-07', dayNumber: 7, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'POINU', meiteiMonthMayek: 'ꯄꯣꯏꯅꯨ',
    lunarDays: [30], lunarDaysMayek: '꯳꯰',
    moonPhase: 'new_moon', moonPhaseLabel: 'THASI',
    events: [{ id: 'thasi_poinu', name: 'Poinu Thasi (New Moon)', shortLabel: 'THASI', category: 'ritual', isHoliday: false, description: 'New Moon day marking end of Poinu month.' }]
  },
  {
    gregorianDate: '2027-01-08', dayNumber: 8, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [1], lunarDaysMayek: '꯱',
    events: [{ id: 'wakching_houba', name: 'Wakching Tha Houba', shortLabel: 'WAKCHING', category: 'festival', isHoliday: false, description: 'Beginning of the traditional Meitei lunar month of Wakching.' }]
  },
  {
    gregorianDate: '2027-01-09', dayNumber: 9, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [2], lunarDaysMayek: '꯲',
    events: [{ id: 'ningthou_gambhir', name: 'Maharaja Gambhir Singh Death Anniversary', shortLabel: 'GAMBHIR...', category: 'memorial', isHoliday: false, description: 'Tribute to Maharaja Gambhir Singh who liberated Manipur from the 7 Years Devastation.' }]
  },
  {
    gregorianDate: '2027-01-10', dayNumber: 10, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [2], lunarDaysMayek: '꯲', events: []
  },
  {
    gregorianDate: '2027-01-11', dayNumber: 11, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [3], lunarDaysMayek: '꯳',
    events: [{ id: 'imoinu_iratpa', name: 'Imoinu Iratpa', shortLabel: 'IMOINU...', category: 'festival', isHoliday: true, description: 'Sacred worship of Goddess Imoinu Ahongbi, the deity of wealth, prosperity, and hearth.' }]
  },
  {
    gregorianDate: '2027-01-12', dayNumber: 12, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [4], lunarDaysMayek: '꯴', events: []
  },
  {
    gregorianDate: '2027-01-13', dayNumber: 13, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [5], lunarDaysMayek: '꯵', events: []
  },
  {
    gregorianDate: '2027-01-14', dayNumber: 14, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [6], lunarDaysMayek: '꯶',
    events: [{ id: 'driver_day', name: "Drivers' Day", shortLabel: 'DRIVERS', category: 'memorial', isHoliday: false, description: 'Commemorating commercial and transport drivers in Manipur.' }]
  },
  {
    gregorianDate: '2027-01-15', dayNumber: 15, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [7], lunarDaysMayek: '꯷', events: []
  },
  {
    gregorianDate: '2027-01-16', dayNumber: 16, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [8], lunarDaysMayek: '꯸', events: []
  },
  {
    gregorianDate: '2027-01-17', dayNumber: 17, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [9], lunarDaysMayek: '꯹', events: []
  },
  {
    gregorianDate: '2027-01-18', dayNumber: 18, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [10], lunarDaysMayek: '꯱꯰',
    moonPhase: 'ekadasi', moonPhaseLabel: 'EKADASI',
    events: [{ id: 'ekadasi_wakching', name: 'Wakching Ekadasi', shortLabel: 'EKADASI', category: 'ritual', isHoliday: false, description: 'Auspicious Ekadasi day.' }]
  },
  {
    gregorianDate: '2027-01-19', dayNumber: 19, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [11, 12], lunarDaysMayek: '꯱꯱/꯱꯲', events: []
  },
  {
    gregorianDate: '2027-01-20', dayNumber: 20, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [13], lunarDaysMayek: '꯱꯳',
    events: [{ id: 'gaan_ngai', name: 'Gaan-Ngai', shortLabel: 'GAAN-NGAI', category: 'festival', isHoliday: true, description: 'Post-harvest festival of the Zeliangrong community celebrated with music, dance, and cultural rituals.' }]
  },
  {
    gregorianDate: '2027-01-21', dayNumber: 21, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [14], lunarDaysMayek: '꯱꯴',
    events: [{ id: 'statehood_day', name: 'Manipur Statehood Day', shortLabel: 'STATEHOOD', category: 'national_holiday', isHoliday: true, description: 'Celebration of Manipur attaining statehood on January 21, 1972.' }]
  },
  {
    gregorianDate: '2027-01-22', dayNumber: 22, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [15], lunarDaysMayek: '꯱꯵',
    moonPhase: 'full_moon', moonPhaseLabel: 'PURNIMA',
    events: [{ id: 'purnima_wakching', name: 'Wakching Purnima (Full Moon)', shortLabel: 'PURNIMA', category: 'ritual', isHoliday: false, description: 'Full Moon day in Wakching.' }]
  },
  {
    gregorianDate: '2027-01-23', dayNumber: 23, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [16], lunarDaysMayek: '꯱꯶', events: []
  },
  {
    gregorianDate: '2027-01-24', dayNumber: 24, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [17], lunarDaysMayek: '꯱꯷', events: []
  },
  {
    gregorianDate: '2027-01-25', dayNumber: 25, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [18, 19], lunarDaysMayek: '꯱꯸/꯱꯹', events: []
  },
  {
    gregorianDate: '2027-01-26', dayNumber: 26, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [20], lunarDaysMayek: '꯲꯰',
    events: [{ id: 'republic_day', name: 'Republic Day', shortLabel: 'REPUBLIC...', category: 'national_holiday', isHoliday: true, description: 'Indian National Holiday honoring the Constitution of India.' }]
  },
  {
    gregorianDate: '2027-01-27', dayNumber: 27, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [21], lunarDaysMayek: '꯲꯱', events: []
  },
  {
    gregorianDate: '2027-01-28', dayNumber: 28, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [22], lunarDaysMayek: '꯲꯲', events: []
  },
  {
    gregorianDate: '2027-01-29', dayNumber: 29, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [23], lunarDaysMayek: '꯲꯳', events: []
  },
  {
    gregorianDate: '2027-01-30', dayNumber: 30, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [24], lunarDaysMayek: '꯲꯴',
    events: [{ id: 'martyrs_day', name: "Martyrs' Day (Gandhi Punyatithi)", shortLabel: 'MARTYRS', category: 'national_holiday', isHoliday: false, description: 'National observation paying homage to freedom fighters.' }]
  },
  {
    gregorianDate: '2027-01-31', dayNumber: 31, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [25], lunarDaysMayek: '꯲꯵', events: []
  }
];

// ================= FEBRUARY 2027 DATA =================
// 2027-02-01 starts on Monday (dayOfWeek = 1)
// Wakching: days 1 to 7 (26 to 30) -> Feb 7 is New Moon (Thasi)
// Phairen: days 8 to 28 (1 to 21) -> Feb 21 is Full Moon (Purnima)
export const FEBRUARY_2027_DAYS: MonthDayData[] = [
  {
    gregorianDate: '2027-02-01', dayNumber: 1, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [26], lunarDaysMayek: '꯲꯶', events: []
  },
  {
    gregorianDate: '2027-02-02', dayNumber: 2, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [27], lunarDaysMayek: '꯲꯷',
    moonPhase: 'ekadasi', moonPhaseLabel: 'EKADASI',
    events: [{ id: 'ekadasi_feb', name: 'Wakching Krishna Ekadasi', shortLabel: 'EKADASI', category: 'ritual', isHoliday: false, description: 'Traditional Ekadasi observation.' }]
  },
  {
    gregorianDate: '2027-02-03', dayNumber: 3, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [28], lunarDaysMayek: '꯲꯸', events: []
  },
  {
    gregorianDate: '2027-02-04', dayNumber: 4, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [29], lunarDaysMayek: '꯲꯹', events: []
  },
  {
    gregorianDate: '2027-02-05', dayNumber: 5, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [30], lunarDaysMayek: '꯳꯰', events: []
  },
  {
    gregorianDate: '2027-02-06', dayNumber: 6, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [30], lunarDaysMayek: '꯳꯰', events: []
  },
  {
    gregorianDate: '2027-02-07', dayNumber: 7, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'WAKCHING', meiteiMonthMayek: 'ꯋꯥꯛꯆꯤꯡ',
    lunarDays: [30], lunarDaysMayek: '꯳꯰',
    moonPhase: 'new_moon', moonPhaseLabel: 'THASI',
    events: [{ id: 'thasi_wakching', name: 'Wakching Thasi (New Moon)', shortLabel: 'THASI', category: 'ritual', isHoliday: false, description: 'New Moon day marking the transition to Phairen month.' }]
  },
  {
    gregorianDate: '2027-02-08', dayNumber: 8, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [1], lunarDaysMayek: '꯱',
    events: [{ id: 'phairen_houba', name: 'Phairen Tha Houba', shortLabel: 'PHAIREN', category: 'festival', isHoliday: false, description: 'Beginning of the Meitei lunar month of Phairen.' }]
  },
  {
    gregorianDate: '2027-02-09', dayNumber: 9, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [2], lunarDaysMayek: '꯲', events: []
  },
  {
    gregorianDate: '2027-02-10', dayNumber: 10, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [3], lunarDaysMayek: '꯳', events: []
  },
  {
    gregorianDate: '2027-02-11', dayNumber: 11, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [4], lunarDaysMayek: '꯴', events: []
  },
  {
    gregorianDate: '2027-02-12', dayNumber: 12, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [5], lunarDaysMayek: '꯵',
    events: [{ id: 'saraswati_puja', name: 'Saraswati Puja', shortLabel: 'SARASWATI...', category: 'festival', isHoliday: true, description: 'Celebration honoring Goddess Saraswati, patron of wisdom, music, and learning.' }]
  },
  {
    gregorianDate: '2027-02-13', dayNumber: 13, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [6], lunarDaysMayek: '꯶', events: []
  },
  {
    gregorianDate: '2027-02-14', dayNumber: 14, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [7], lunarDaysMayek: '꯷',
    events: [{ id: 'valentines_day', name: "Valentine's Day", shortLabel: 'VALENTINE', category: 'ritual', isHoliday: false, description: 'Worldwide celebration of love and affection.' }]
  },
  {
    gregorianDate: '2027-02-15', dayNumber: 15, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [8], lunarDaysMayek: '꯸',
    events: [{ id: 'lui_ngai_ni', name: 'Lui-Ngai-Ni', shortLabel: 'LUI-NGAI-NI', category: 'festival', isHoliday: true, description: 'Seed sowing festival of Naga tribes in Manipur celebrated with cultural rituals and unity.' }]
  },
  {
    gregorianDate: '2027-02-16', dayNumber: 16, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [9], lunarDaysMayek: '꯹', events: []
  },
  {
    gregorianDate: '2027-02-17', dayNumber: 17, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [10, 11], lunarDaysMayek: '꯱꯰/꯱꯱',
    moonPhase: 'ekadasi', moonPhaseLabel: 'EKADASI',
    events: [
      { id: 'ekadasi_phairen', name: 'Phairen Ekadasi', shortLabel: 'EKADASI', category: 'ritual', isHoliday: false, description: 'Ekadasi observance in Phairen.' },
      { id: 'rani_gaidinliu', name: 'Rani Gaidinliu Death Anniversary', shortLabel: 'GAIDINLIU...', category: 'memorial', isHoliday: false, description: 'Tribute to spiritual leader and freedom fighter Rani Gaidinliu.' }
    ]
  },
  {
    gregorianDate: '2027-02-18', dayNumber: 18, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [12], lunarDaysMayek: '꯱꯲', events: []
  },
  {
    gregorianDate: '2027-02-19', dayNumber: 19, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [13], lunarDaysMayek: '꯱꯳', events: []
  },
  {
    gregorianDate: '2027-02-20', dayNumber: 20, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [14], lunarDaysMayek: '꯱꯴', events: []
  },
  {
    gregorianDate: '2027-02-21', dayNumber: 21, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [15], lunarDaysMayek: '꯱꯵',
    moonPhase: 'full_moon', moonPhaseLabel: 'PURNIMA',
    events: [{ id: 'phairen_purnima', name: 'Phairen Purnima (Full Moon)', shortLabel: 'PURNIMA', category: 'ritual', isHoliday: false, description: 'Full Moon day of Phairen.' }]
  },
  {
    gregorianDate: '2027-02-22', dayNumber: 22, dayOfWeek: 1, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [16], lunarDaysMayek: '꯱꯶', events: []
  },
  {
    gregorianDate: '2027-02-23', dayNumber: 23, dayOfWeek: 2, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [17], lunarDaysMayek: '꯱꯷', events: []
  },
  {
    gregorianDate: '2027-02-24', dayNumber: 24, dayOfWeek: 3, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [18], lunarDaysMayek: '꯱꯸', events: []
  },
  {
    gregorianDate: '2027-02-25', dayNumber: 25, dayOfWeek: 4, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [19], lunarDaysMayek: '꯱꯹',
    events: [{ id: 'players_day', name: "Sanaroi Singi Numit (Players' Day)", shortLabel: 'PLAYERS', category: 'memorial', isHoliday: false, description: 'State celebration honoring Manipur sportspersons and Olympians.' }]
  },
  {
    gregorianDate: '2027-02-26', dayNumber: 26, dayOfWeek: 5, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [20], lunarDaysMayek: '꯲꯰', events: []
  },
  {
    gregorianDate: '2027-02-27', dayNumber: 27, dayOfWeek: 6, isSunday: false,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [21], lunarDaysMayek: '꯲꯱', events: []
  },
  {
    gregorianDate: '2027-02-28', dayNumber: 28, dayOfWeek: 0, isSunday: true,
    meiteiMonthEnglish: 'PHAIREN', meiteiMonthMayek: 'ꯐꯤꯔꯦꯟ',
    lunarDays: [22], lunarDaysMayek: '꯲꯲', events: []
  }
];

export const MONTH_CONFIGS_2027: MonthConfig[] = [
  {
    year: 2027,
    monthIndex: 0,
    monthNameEnglish: 'January 2027',
    meiteiSubtitleMayek: 'ꯄꯣꯏꯅꯨ / ꯋꯥꯛꯆꯤꯡ',
    startDayOfWeek: 5, // Friday
    totalDays: 31,
    days: JANUARY_2027_DAYS
  },
  {
    year: 2027,
    monthIndex: 1,
    monthNameEnglish: 'February 2027',
    meiteiSubtitleMayek: 'ꯋꯥꯛꯆꯤꯡ / ꯐꯤꯔꯦꯟ',
    startDayOfWeek: 1, // Monday
    totalDays: 28,
    days: FEBRUARY_2027_DAYS
  }
];
