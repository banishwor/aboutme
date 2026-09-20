import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ClipboardCheck, 
  Receipt, 
  Briefcase, 
  Info, 
  Calendar, 
  Send, 
  Copy, 
  Check, 
  Phone
} from 'lucide-react';
import { 
  SAMPLE_JOB_SITES, 
  INITIAL_WORKERS, 
  ATTENDANCE_OPTIONS, 
  AttendanceType, 
  calculateWorkerStatement, 
  generateWhatsAppHisabText 
} from '../../../content/khutsumanData';

export interface KhutsumanMiniAppProps {
  onBack: () => void;
  onHome: () => void;
}

type TabType = 'home' | 'attendance' | 'hisab' | 'works' | 'info';

export const KhutsumanMiniApp: React.FC<KhutsumanMiniAppProps> = ({ onBack, onHome }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('site-imphal-west');
  
  // Attendance state: workerId -> AttendanceType
  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceType>>({
    'w-1': 'full',     // Ibomcha: Full 1.0 (₹800)
    'w-2': 'half',     // Tomba: Half 0.5 (₹375)
    'w-3': 'full',     // Chaoba: Full 1.0 (₹500)
    'w-4': 'overtime'  // Biren: OT 1.5x (₹1,050)
  });

  const [selectedWorkerIdForHisab, setSelectedWorkerIdForHisab] = useState<string>('w-1');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const activeSite = useMemo(() => {
    return SAMPLE_JOB_SITES.find(s => s.id === selectedSiteId) || SAMPLE_JOB_SITES[0];
  }, [selectedSiteId]);

  // Handle toggling worker attendance chip
  const handleToggleAttendance = (workerId: string, type: AttendanceType) => {
    setAttendanceState(prev => ({
      ...prev,
      [workerId]: type
    }));
  };

  // Today's live calculation metrics across all workers
  const todaySummary = useMemo(() => {
    let totalEquivalentDays = 0;
    let totalWagesToday = 0;
    let fullCount = 0;
    let halfCount = 0;
    let otCount = 0;
    let absentCount = 0;

    INITIAL_WORKERS.forEach(w => {
      const status = attendanceState[w.id] || 'full';
      const opt = ATTENDANCE_OPTIONS[status];
      const fraction = opt.fraction;
      const earned = w.dailyRate * fraction;

      totalEquivalentDays += fraction;
      totalWagesToday += earned;

      if (status === 'full') fullCount++;
      if (status === 'half') halfCount++;
      if (status === 'overtime') otCount++;
      if (status === 'absent') absentCount++;
    });

    return {
      totalEquivalentDays,
      totalWagesToday,
      fullCount,
      halfCount,
      otCount,
      absentCount
    };
  }, [attendanceState]);

  // Selected worker statement for Hisab
  const selectedWorker = useMemo(() => {
    return INITIAL_WORKERS.find(w => w.id === selectedWorkerIdForHisab) || INITIAL_WORKERS[0];
  }, [selectedWorkerIdForHisab]);

  const workerStatement = useMemo(() => {
    const todayStatus = attendanceState[selectedWorker.id] || 'full';
    const opt = ATTENDANCE_OPTIONS[todayStatus];
    const todayDays = opt.fraction;
    return calculateWorkerStatement(selectedWorker, todayDays);
  }, [selectedWorker, attendanceState]);

  const whatsAppText = useMemo(() => {
    return generateWhatsAppHisabText(workerStatement, activeSite.name);
  }, [workerStatement, activeSite]);

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsAppText);
    setCopiedNotification(true);
    setTimeout(() => {
      setCopiedNotification(false);
    }, 2500);
  };

  const handleSystemBack = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    } else {
      onBack();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#F8FAFC',
      color: '#0F172A',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'absolute',
      inset: 0,
      zIndex: 500,
      overflow: 'hidden'
    }}>
      {/* ================= 1. NATIVE ROYAL BLUE HEADER (FLUSH, ZERO FAKE STATUS BAR) ================= */}
      <div style={{
        background: 'linear-gradient(135deg, #005AC1 0%, #1E40AF 100%)', // Authentic BlueBrand from Android app
        color: '#FFFFFF',
        padding: '12px 16px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 14px rgba(0, 90, 193, 0.28)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* App Squircle Icon */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            background: 'rgba(255, 255, 255, 0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <img 
              src="/projects/khutsuman.png" 
              alt="Khutsuman" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
              {activeTab === 'home' && 'Khutsuman (ꯈꯨꯠꯁꯨꯃꯟ)'}
              {activeTab === 'attendance' && "Today's Attendance Roster"}
              {activeTab === 'hisab' && 'Worker Hisab Statement'}
              {activeTab === 'works' && 'Job Sites & Projects'}
              {activeTab === 'info' && 'About Khutsuman'}
            </h3>
            <p style={{ fontSize: '11px', margin: '2px 0 0', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 500 }}>
              {activeTab === 'home' && 'Daily Wage, Attendance & Hisab Ledger'}
              {activeTab === 'attendance' && 'Tap-to-Toggle Daily Attendance & Wage Math'}
              {activeTab === 'hisab' && 'Transparent Balance Sheet & WhatsApp Receipts'}
              {activeTab === 'works' && 'Multi-Site Budget & Expense Tracker'}
              {activeTab === 'info' && '100% Offline SQLite Room DB Architecture'}
            </p>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          padding: '4px 8px',
          color: '#FFFFFF',
          fontSize: '9.5px',
          fontWeight: 700,
          letterSpacing: '0.4px'
        }}>
          BETA / OFFLINE
        </div>
      </div>

      {/* ================= 2. SCROLLABLE APP BODY ================= */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* ================= TAB 1: HOME (DETAIL / PROJECT OVERVIEW PAGE) ================= */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* App Hero Overview Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src="/projects/khutsuman.png" 
                  alt="Khutsuman App" 
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0, 90, 193, 0.2)'
                  }} 
                />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Khutsuman (ꯈꯨꯠꯁꯨꯃꯟ)
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                    <span style={{
                      background: '#EEF2FF',
                      color: '#4F46E5',
                      border: '1px solid rgba(79, 70, 229, 0.25)',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: 700
                    }}>
                      ● BETA IN PROGRESS
                    </span>
                    <span style={{
                      background: '#ECFDF5',
                      color: '#059669',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: 600
                    }}>
                      100% OFFLINE ROOM DB
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                In Manipur and across India, petty contractors (<em>Mohoriks</em>), carpenters, and daily wage laborers struggle with water-damaged paper notebooks (<em>Khata</em>) and wage disputes. Khutsuman provides a 100% offline, dispute-free digital Hisab ledger right on the supervisor's phone.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className="pressable"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #005AC1 0%, #1E40AF 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 90, 193, 0.25)'
                  }}
                >
                  <ClipboardCheck size={15} />
                  <span>Open Today Attendance</span>
                </button>

                <a
                  href="https://wa.me/+919612111619?text=Hello%20Banishwor,%20I%20would%20like%20to%20request%20early%20beta%20access%20to%20Khutsuman%20Android%20app."
                  target="_blank"
                  rel="noreferrer"
                  className="pressable"
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)'
                  }}
                >
                  <Phone size={14} />
                  <span>Request Beta</span>
                </a>
              </div>
            </div>

            {/* Financial Overview Bento Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Job Sites Overview
              </h5>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}>
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '12px 10px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Active Sites
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#005AC1' }}>
                    2 Works
                  </span>
                  <span style={{ fontSize: '9.5px', color: '#64748B' }}>
                    Imphal & Thoubal
                  </span>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '12px 10px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Wages Due
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#DC2626' }}>
                    ₹23,400
                  </span>
                  <span style={{ fontSize: '9.5px', color: '#64748B' }}>
                    Across 4 Workers
                  </span>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '12px 10px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Laborers
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>
                    4 Active
                  </span>
                  <span style={{ fontSize: '9.5px', color: '#64748B' }}>
                    Roster Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Why Khutsuman Outperforms Paper Ledgers
              </h5>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid #059669',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>
                    Transparent Attendance & Auto-Accountability
                  </div>
                  <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                    Mark Full Day (1.0), Half Day (0.5), Overtime (1.5x), or Absent (0.0) with zero duplicate entries. Past unrecorded days auto-flag to eliminate memory gaps.
                  </p>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid #4F46E5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>
                    WhatsApp-Friendly Hisab Statements
                  </div>
                  <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                    Instant 1-tap statement receipts formatted with INR (₹) currency sent directly to workers or site owners over WhatsApp. Completely resolves payment misunderstandings.
                  </p>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid #005AC1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>
                    100% Offline & Resilient to Rain
                  </div>
                  <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                    Built with Kotlin & Room SQLite to operate in remote hilly construction sectors with zero cellular signal. No records are ever washed away or torn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ATTENDANCE (CORE INTERACTIVE ROSTER) ================= */}
        {activeTab === 'attendance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Active Job Site Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
            }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Current Job Site
                </span>
                <h5 style={{ fontSize: '13.5px', fontWeight: 800, color: '#005AC1', margin: '2px 0 0' }}>
                  {activeSite.name}
                </h5>
                <span style={{ fontSize: '10.5px', color: '#64748B' }}>
                  📍 {activeSite.location}
                </span>
              </div>

              <button
                onClick={() => setActiveTab('hisab')}
                className="pressable"
                style={{
                  background: '#EEF2FF',
                  color: '#4F46E5',
                  border: '1px solid rgba(79, 70, 229, 0.25)',
                  borderRadius: '10px',
                  padding: '7px 11px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <Receipt size={13} />
                <span>View Hisab</span>
              </button>
            </div>

            {/* Today's Live Arithmetic Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #005AC1 0%, #1E40AF 100%)',
              borderRadius: '16px',
              padding: '14px',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(0, 90, 193, 0.22)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} color="#FFFFFF" />
                  <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Today's Attendance Payout
                  </span>
                </div>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontWeight: 700
                }}>
                  {todaySummary.totalEquivalentDays} Days Total
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '24px', fontWeight: 800 }}>
                  ₹{todaySummary.totalWagesToday.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  earned today across {INITIAL_WORKERS.length} workers
                </span>
              </div>

              {/* Status Tally Badges */}
              <div style={{
                display: 'flex',
                gap: '6px',
                paddingTop: '6px',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <span style={{ fontSize: '10px', background: 'rgba(5, 150, 105, 0.4)', padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>
                  {todaySummary.fullCount} Full (1.0)
                </span>
                <span style={{ fontSize: '10px', background: 'rgba(217, 119, 6, 0.4)', padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>
                  {todaySummary.halfCount} Half (0.5)
                </span>
                <span style={{ fontSize: '10px', background: 'rgba(79, 70, 229, 0.4)', padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>
                  {todaySummary.otCount} OT (1.5x)
                </span>
                <span style={{ fontSize: '10px', background: 'rgba(220, 38, 38, 0.4)', padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>
                  {todaySummary.absentCount} Absent
                </span>
              </div>
            </div>

            {/* Worker Roster List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  Worker Daily Roster ({INITIAL_WORKERS.length})
                </h5>
                <span style={{ fontSize: '10.5px', color: '#64748B' }}>
                  Tap chips to update status
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {INITIAL_WORKERS.map(worker => {
                  const currentStatus = attendanceState[worker.id] || 'full';
                  const opt = ATTENDANCE_OPTIONS[currentStatus];
                  const earnedToday = worker.dailyRate * opt.fraction;

                  return (
                    <div
                      key={worker.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      {/* Worker Details Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: worker.avatarColor,
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '13px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                          }}>
                            {worker.name.split(' ').map(n => n[0]).join('')}
                          </div>

                          <div>
                            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                              {worker.name}
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>
                              {worker.role} · ₹{worker.dailyRate}/day
                            </div>
                          </div>
                        </div>

                        {/* Earned Today Pill */}
                        <div style={{
                          background: currentStatus === 'absent' ? '#FEE2E2' : '#ECFDF5',
                          color: currentStatus === 'absent' ? '#DC2626' : '#059669',
                          border: currentStatus === 'absent' ? '1px solid rgba(220, 38, 38, 0.2)' : '1px solid rgba(5, 150, 105, 0.25)',
                          borderRadius: '8px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: 800,
                          textAlign: 'right'
                        }}>
                          {currentStatus === 'absent' ? '₹0' : `+₹${earnedToday.toLocaleString('en-IN')}`}
                        </div>
                      </div>

                      {/* Tap-to-Toggle Attendance Chips */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '6px'
                      }}>
                        {(['full', 'half', 'overtime', 'absent'] as AttendanceType[]).map(type => {
                          const option = ATTENDANCE_OPTIONS[type];
                          const isSelected = currentStatus === type;

                          return (
                            <button
                              key={type}
                              onClick={() => handleToggleAttendance(worker.id, type)}
                              className="pressable"
                              style={{
                                background: isSelected ? option.badgeColor : '#F1F5F9',
                                color: isSelected ? '#FFFFFF' : '#475569',
                                border: isSelected ? `1px solid ${option.badgeColor}` : '1px solid #E2E8F0',
                                borderRadius: '8px',
                                padding: '6px 4px',
                                fontSize: '11px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '3px',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {isSelected && <Check size={12} strokeWidth={3} />}
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: HISAB / STATEMENTS (CORE INTERACTIVE FEATURE 2) ================= */}
        {activeTab === 'hisab' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Worker Selector Horizontal Scroll */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Select Worker for Statement:
              </span>

              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '2px',
                scrollbarWidth: 'none'
              }}>
                {INITIAL_WORKERS.map(worker => {
                  const isSelected = selectedWorker.id === worker.id;
                  return (
                    <button
                      key={worker.id}
                      onClick={() => setSelectedWorkerIdForHisab(worker.id)}
                      className="pressable"
                      style={{
                        background: isSelected ? '#005AC1' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#334155',
                        border: isSelected ? '1px solid #005AC1' : '1px solid #CBD5E1',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        boxShadow: isSelected ? '0 2px 8px rgba(0, 90, 193, 0.25)' : 'none'
                      }}
                    >
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isSelected ? '#FFFFFF' : worker.avatarColor
                      }} />
                      <span>{worker.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Worker Statement Balance Sheet Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedWorker.name}
                  </h4>
                  <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0' }}>
                    {selectedWorker.role} · Rate: ₹{selectedWorker.dailyRate}/day
                  </p>
                </div>

                <div style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid rgba(5, 150, 105, 0.25)',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontWeight: 800
                }}>
                  ACTIVE LEDGER
                </div>
              </div>

              {/* Itemized Calculation Breakdown */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '12px 14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#64748B' }}>Equivalent Days Worked:</span>
                  <strong style={{ color: '#0F172A' }}>{workerStatement.equivalentDays} Days</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#64748B' }}>Gross Wages Accrued:</span>
                  <strong style={{ color: '#0F172A' }}>₹{workerStatement.grossWagesEarned.toLocaleString('en-IN')}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#64748B' }}>Less: Advances Paid:</span>
                  <strong style={{ color: '#DC2626' }}>-₹{workerStatement.advancesPaid.toLocaleString('en-IN')}</strong>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '8px',
                  borderTop: '1px solid #CBD5E1'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    Net Outstanding Balance:
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>
                    ₹{workerStatement.netBalanceDue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* 1-Tap WhatsApp Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCopyWhatsApp}
                  className="pressable"
                  style={{
                    flex: 1,
                    background: copiedNotification ? '#059669' : '#005AC1',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 90, 193, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {copiedNotification ? <Check size={15} /> : <Copy size={15} />}
                  <span>{copiedNotification ? 'Receipt Copied!' : 'Copy WhatsApp Text'}</span>
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(whatsAppText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="pressable"
                  style={{
                    background: '#25D366', // WhatsApp Green
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
                  }}
                >
                  <Send size={15} />
                  <span>Share</span>
                </a>
              </div>
            </div>

            {/* Live WhatsApp Statement Preview Card */}
            <div style={{
              background: '#EFEAE2', // WhatsApp chat wallpaper ivory
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid #D1D7DB',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#25D366'
                }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#111B21', textTransform: 'uppercase' }}>
                  WhatsApp Receipt Preview
                </span>
              </div>

              <pre style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '12px',
                margin: 0,
                fontSize: '11px',
                lineHeight: 1.45,
                color: '#111B21',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)'
              }}>
                {whatsAppText}
              </pre>
            </div>
          </div>
        )}

        {/* ================= TAB 4: WORKS (SITES PREVIEW) ================= */}
        {activeTab === 'works' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Job Sites & Project Ledgers
            </h4>

            {SAMPLE_JOB_SITES.map(site => (
              <div
                key={site.id}
                onClick={() => {
                  setSelectedSiteId(site.id);
                  setActiveTab('attendance');
                }}
                className="pressable"
                style={{
                  background: selectedSiteId === site.id ? '#F0F7FF' : '#FFFFFF',
                  borderRadius: '14px',
                  padding: '14px',
                  border: selectedSiteId === site.id ? '2px solid #005AC1' : '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#005AC1' }}>
                    {site.name} {selectedSiteId === site.id && '✓'}
                  </span>
                  <span style={{ fontSize: '10px', background: '#EEF2FF', color: '#4F46E5', padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>
                    {site.status}
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#475569' }}>
                  Client: <strong>{site.clientName}</strong> · Started: {site.startDate}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  background: '#F8FAFC',
                  padding: '8px 10px',
                  borderRadius: '8px'
                }}>
                  <span>Budget: ₹{site.clientBudget.toLocaleString('en-IN')}</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Received: ₹{site.moneyReceived.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TAB 5: INFO (DEVELOPER & ARCHITECTURE) ================= */}
        {activeTab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #005AC1 0%, #1E40AF 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '18px'
                }}>
                  BA
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Banishwor Athokpam
                  </h4>
                  <p style={{ fontSize: '11.5px', color: '#64748B', margin: '2px 0 0' }}>
                    MCA (Rank 7 Distinction) · Android & Ledger Software Engineer
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Designed and engineered Khutsuman as a native Android application using Kotlin, Jetpack Compose, and Room Database. Dedicated to building offline, private, and durable software tools for the construction and labor ecosystem of Manipur.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= 3. AUTHENTIC 5-TAB BOTTOM NAVIGATION BAR ================= */}
      <div style={{
        height: '56px',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexShrink: 0,
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        <button
          onClick={() => setActiveTab('home')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <Home size={18} color={activeTab === 'home' ? '#005AC1' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'home' ? 800 : 500,
            color: activeTab === 'home' ? '#005AC1' : '#94A3B8'
          }}>
            Home
          </span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <ClipboardCheck size={18} color={activeTab === 'attendance' ? '#005AC1' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'attendance' ? 800 : 500,
            color: activeTab === 'attendance' ? '#005AC1' : '#94A3B8'
          }}>
            Attendance
          </span>
        </button>

        <button
          onClick={() => setActiveTab('hisab')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <Receipt size={18} color={activeTab === 'hisab' ? '#005AC1' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'hisab' ? 800 : 500,
            color: activeTab === 'hisab' ? '#005AC1' : '#94A3B8'
          }}>
            Hisab
          </span>
        </button>

        <button
          onClick={() => setActiveTab('works')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <Briefcase size={18} color={activeTab === 'works' ? '#005AC1' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'works' ? 800 : 500,
            color: activeTab === 'works' ? '#005AC1' : '#94A3B8'
          }}>
            Works
          </span>
        </button>

        <button
          onClick={() => setActiveTab('info')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <Info size={18} color={activeTab === 'info' ? '#005AC1' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'info' ? 800 : 500,
            color: activeTab === 'info' ? '#005AC1' : '#94A3B8'
          }}>
            Info
          </span>
        </button>
      </div>

      {/* ================= 4. ANDROID GESTURE & 3-BUTTON SYSTEM BAR ================= */}
      <div style={{
        height: '38px',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        userSelect: 'none'
      }}>
        {/* Back Button (Triangle ◀) */}
        <button
          onClick={handleSystemBack}
          className="pressable"
          title="Back"
          aria-label="Back"
          style={{
            border: 'none',
            background: 'transparent',
            color: '#475569',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>

        {/* Centered Android Gesture Pill Bar */}
        <div 
          onClick={onHome}
          className="pressable"
          title="Swipe up for Home"
          style={{
            width: '96px',
            height: '4px',
            background: '#CBD5E1',
            borderRadius: '999px',
            cursor: 'pointer'
          }}
        />

        {/* Recents Button (Square ■) */}
        <button
          onClick={onBack}
          className="pressable"
          title="App Drawer"
          aria-label="App Drawer"
          style={{
            border: 'none',
            background: 'transparent',
            color: '#475569',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '2px',
            border: '2px solid #475569'
          }} />
        </button>
      </div>
    </div>
  );
};
