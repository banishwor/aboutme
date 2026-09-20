export type AttendanceType = 'full' | 'half' | 'overtime' | 'absent';

export interface AttendanceOption {
  type: AttendanceType;
  label: string;
  fraction: number;
  badgeColor: string;
  textColor: string;
  bgActive: string;
}

export const ATTENDANCE_OPTIONS: Record<AttendanceType, AttendanceOption> = {
  full: {
    type: 'full',
    label: 'Full (1.0)',
    fraction: 1.0,
    badgeColor: '#059669',
    textColor: '#FFFFFF',
    bgActive: '#059669'
  },
  half: {
    type: 'half',
    label: 'Half (0.5)',
    fraction: 0.5,
    badgeColor: '#D97706',
    textColor: '#FFFFFF',
    bgActive: '#D97706'
  },
  overtime: {
    type: 'overtime',
    label: 'OT (1.5x)',
    fraction: 1.5,
    badgeColor: '#4F46E5',
    textColor: '#FFFFFF',
    bgActive: '#4F46E5'
  },
  absent: {
    type: 'absent',
    label: 'Absent (0.0)',
    fraction: 0.0,
    badgeColor: '#DC2626',
    textColor: '#FFFFFF',
    bgActive: '#DC2626'
  }
};

export interface WorkerProfile {
  id: string;
  name: string;
  meiteiMayek: string;
  role: string;
  dailyRate: number; // in INR (₹)
  phone: string;
  joinedDate: string;
  avatarColor: string;
  totalDaysWorked: number;
  totalAdvancePaid: number;
}

export interface JobSite {
  id: string;
  name: string;
  location: string;
  clientName: string;
  clientBudget: number;
  moneyReceived: number;
  startDate: string;
  status: 'In Progress' | 'Completed';
}

export const SAMPLE_JOB_SITES: JobSite[] = [
  {
    id: 'site-imphal-west',
    name: 'House Construction — Imphal West',
    location: 'Uripok Kangchup Road, Imphal',
    clientName: 'N. Sanatomba Singh',
    clientBudget: 350000,
    moneyReceived: 210000,
    startDate: '01 Aug 2026',
    status: 'In Progress'
  },
  {
    id: 'site-thoubal',
    name: 'Tile & Granite Flooring — Thoubal',
    location: 'Thoubal Wangmataba',
    clientName: 'K. Ratan Kumar',
    clientBudget: 120000,
    moneyReceived: 85000,
    startDate: '15 Aug 2026',
    status: 'In Progress'
  }
];

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: 'w-1',
    name: 'Ibomcha Singh',
    meiteiMayek: 'ꯏꯕꯣꯝꯆꯥ ꯁꯤꯡꯍ',
    role: 'Head Mason (Raj Mistry)',
    dailyRate: 800,
    phone: '+91 98621 44521',
    joinedDate: '01 Aug 2026',
    avatarColor: '#005AC1',
    totalDaysWorked: 22.5,
    totalAdvancePaid: 6500
  },
  {
    id: 'w-2',
    name: 'Tomba Meitei',
    meiteiMayek: 'ꯇꯣꯝꯕ ꯃꯩꯇꯩ',
    role: 'Lead Carpenter (Usuba)',
    dailyRate: 750,
    phone: '+91 97742 88102',
    joinedDate: '04 Aug 2026',
    avatarColor: '#D97706',
    totalDaysWorked: 18.0,
    totalAdvancePaid: 4500
  },
  {
    id: 'w-3',
    name: 'Chaoba Sharma',
    meiteiMayek: 'ꯆꯥꯎꯕ ꯁꯔꯃꯥ',
    role: 'Site Helper (Jogali)',
    dailyRate: 500,
    phone: '+91 96120 77319',
    joinedDate: '01 Aug 2026',
    avatarColor: '#059669',
    totalDaysWorked: 24.0,
    totalAdvancePaid: 5000
  },
  {
    id: 'w-4',
    name: 'Biren Luwang',
    meiteiMayek: 'ꯕꯤꯔꯦꯟ ꯂꯨꯋꯥꯡ',
    role: 'Finishing Painter',
    dailyRate: 700,
    phone: '+91 94360 22910',
    joinedDate: '10 Aug 2026',
    avatarColor: '#7C3AED',
    totalDaysWorked: 14.5,
    totalAdvancePaid: 3500
  }
];

export interface WorkerStatement {
  worker: WorkerProfile;
  equivalentDays: number;
  grossWagesEarned: number;
  advancesPaid: number;
  netBalanceDue: number;
}

export function calculateWorkerStatement(worker: WorkerProfile, additionalDaysToday = 0): WorkerStatement {
  const equivalentDays = worker.totalDaysWorked + additionalDaysToday;
  const grossWagesEarned = equivalentDays * worker.dailyRate;
  const advancesPaid = worker.totalAdvancePaid;
  const netBalanceDue = grossWagesEarned - advancesPaid;

  return {
    worker,
    equivalentDays,
    grossWagesEarned,
    advancesPaid,
    netBalanceDue
  };
}

/**
 * Formats a clean, professional WhatsApp text Hisab statement formatted with INR (₹)
 * exactly as produced by Khutsuman's Android sharing engine.
 */
export function generateWhatsAppHisabText(statement: WorkerStatement, siteName: string): string {
  const { worker, equivalentDays, grossWagesEarned, advancesPaid, netBalanceDue } = statement;

  return `*KHUTSUMAN (ꯈꯨꯠꯁꯨꯃꯟ) — WORKER HISAB RECEIPT*
━━━━━━━━━━━━━━━━━━━━
👷 *Worker:* ${worker.name} (${worker.role})
📍 *Job Site:* ${siteName}
📅 *Daily Wage Rate:* ₹${worker.dailyRate.toLocaleString('en-IN')}/day

📊 *ATTENDANCE & WAGE SUMMARY:*
• Total Days Worked: *${equivalentDays} days*
• Gross Wage Earned: *₹${grossWagesEarned.toLocaleString('en-IN')}*
• Cash Advance Paid: *₹${advancesPaid.toLocaleString('en-IN')}*
────────────────────
💰 *NET BALANCE DUE:* *₹${netBalanceDue.toLocaleString('en-IN')}*
━━━━━━━━━━━━━━━━━━━━
_Verified Digital Statement via Khutsuman App._
_100% Offline & Transparent Labor Accounting._`;
}
