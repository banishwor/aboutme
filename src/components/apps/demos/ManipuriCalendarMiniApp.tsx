import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Moon, 
  Zap, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Settings, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Shield
} from 'lucide-react';
import { 
  MONTH_CONFIGS_2027, 
  MEITEI_WEEKDAYS, 
  MonthDayData
} from '../../../content/manipuriCalendarData';
import { projects } from '../../../content/projects';

export interface ManipuriCalendarMiniAppProps {
  onBack: () => void;
  onHome: () => void;
}

type BottomTab = 'today' | 'calendar' | 'almanac' | 'info';

export const ManipuriCalendarMiniApp: React.FC<ManipuriCalendarMiniAppProps> = ({
  onBack,
  onHome
}) => {
  // 4 Bottom Tabs matching user's screenshot: 'today' | 'calendar' | 'almanac' | 'info'
  // Default is 'today' as requested by the user
  const [activeTab, setActiveTab] = useState<BottomTab>('today');

  // Month navigation: 0 = January 2027, 1 = February 2027
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(0);

  // Selected day for inspection
  const [selectedDay, setSelectedDay] = useState<MonthDayData | null>(MONTH_CONFIGS_2027[0].days[0]);

  // Project details from projects.ts for the information page
  const projectData = useMemo(() => {
    return projects.find(p => p.id === 'manipuri-calendar') || projects[1];
  }, []);

  const currentMonthConfig = MONTH_CONFIGS_2027[activeMonthIndex];

  // Handle system back navigation
  const handleSystemBack = () => {
    if (activeTab !== 'today') {
      setActiveTab('today');
    } else {
      onBack();
    }
  };

  const todayDate = new Date();
  const currentHour = todayDate.getHours();
  const meiteiGreeting = currentHour < 12 
    ? 'ꯃꯪꯉꯥꯡ ꯄꯨꯟꯁꯤꯕ (Good Morning)' 
    : currentHour < 17 
      ? 'ꯂꯨꯋꯥꯡ ꯄꯨꯟꯁꯤꯕ (Good Afternoon)' 
      : 'ꯈꯨꯃꯥꯟ ꯄꯨꯟꯁꯤꯕ (Good Evening)';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#FDFBF7', // Authentic ivory/parchment background from PWA manifest
      color: '#1E293B',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'absolute',
      inset: 0,
      zIndex: 500,
      overflow: 'hidden'
    }}>
      {/* ================= 1. TOP HEADER BAR (MATCHING SCREENSHOT) ================= */}
      <div style={{
        background: '#800E13',
        color: '#FFFFFF',
        padding: '10px 16px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(128, 14, 19, 0.25)',
        flexShrink: 0
      }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
            {activeTab === 'calendar' ? currentMonthConfig.monthNameEnglish : 'Manipuri Calendar'}
          </h3>
          <p style={{ fontSize: '12px', margin: '2px 0 0', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 600 }}>
            {activeTab === 'calendar' ? currentMonthConfig.meiteiSubtitleMayek : 'Manipuri Traditional Lunar Calendar (ꯃꯩꯇꯩ ꯊꯥꯄꯥꯟꯂꯣꯟ)'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('calendar')}
            className="pressable"
            title="Search days"
            aria-label="Search"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.18)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Search size={16} />
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className="pressable"
            title="Settings & Info"
            aria-label="Settings"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.18)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* ================= 3. SCROLLABLE APP BODY ================= */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* ================= TAB 1: TODAY (INFORMATION & OVERVIEW PAGE) ================= */}
        {activeTab === 'today' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Greeting Banner */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#800E13', margin: 0 }}>
                Khurumjari / ꯈꯨꯔꯨꯝꯖꯔꯤ
              </h4>
              <p style={{ fontSize: '11px', color: '#64748B', margin: 0, fontWeight: 500 }}>
                Greeting of peace and longevity • {meiteiGreeting}
              </p>
            </div>

            {/* Quick Action: Open 2027 Calendar Grid CTA */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px 16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <h5 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  2027 Lunar Calendar Grid
                </h5>
                <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0' }}>
                  Explore January & February 2027 with full Meitei lunar days & holidays.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('calendar')}
                className="pressable"
                style={{
                  background: '#800E13',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '11px',
                  padding: '9px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(128, 14, 19, 0.25)'
                }}
              >
                <CalendarIcon size={14} />
                <span>Open Grid</span>
              </button>
            </div>

            {/* App Overview & Identity Card */}
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
                  src="/projects/manipuri-calendar.png" 
                  alt="Manipuri Calendar" 
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(128, 14, 19, 0.2)'
                  }} 
                />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Manipuri Calendar
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                    <span style={{
                      background: '#ECFDF5',
                      color: '#059669',
                      border: '1px solid rgba(5, 150, 105, 0.25)',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: 800
                    }}>
                      PRODUCTION ACTIVE
                    </span>
                    <span style={{
                      background: '#FFF1F2',
                      color: '#BE123C',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: 700
                    }}>
                      PWA + ANDROID
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {projectData.summary}
              </p>

              {/* Direct Store & Web Links */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.manipurcalendar&hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="pressable"
                  style={{
                    flex: 1,
                    background: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '11px',
                    padding: '9px 12px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.15)'
                  }}
                >
                  <span>Google Play</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href="https://banishwor.github.io/manipuri-calendar-pwa/?install=auto"
                  target="_blank"
                  rel="noreferrer"
                  className="pressable"
                  style={{
                    flex: 1,
                    background: '#F1F5F9',
                    color: '#1E293B',
                    borderRadius: '11px',
                    padding: '9px 12px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Web PWA</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Core Capabilities Checklist */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <h5 style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', margin: 0 }}>
                Core Capabilities
              </h5>
              {projectData.capabilities.map((cap, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '12px', color: '#334155', lineHeight: 1.45 }}>{cap}</span>
                </div>
              ))}
            </div>

            {/* Technical Highlights & Zero-Ad Guarantee */}
            <div style={{
              background: '#FFFBEB',
              border: '1px solid rgba(217, 119, 6, 0.2)',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B45309', fontSize: '11px', fontWeight: 800 }}>
                <Shield size={14} />
                <span>Zero-Ad & Zero-Tracking Guarantee</span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#78350F', lineHeight: 1.5, margin: 0 }}>
                Built as a pure community service for Manipur. Operates 100% offline with zero remote analytics or battery-draining ad SDKs.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CALENDAR MONTH GRID (MATCHING SCREENSHOT) ================= */}
        {activeTab === 'calendar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Month Navigation Row: [<] [Today] [>] */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2px 0'
            }}>
              {/* Prev Month Button */}
              <button
                onClick={() => setActiveMonthIndex(0)}
                disabled={activeMonthIndex === 0}
                className="pressable"
                aria-label="Previous Month"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeMonthIndex === 0 ? '#CBD5E1' : '#1E293B',
                  cursor: activeMonthIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Centered Dark Red "Today" Pill Button (from Screenshot) */}
              <button
                onClick={() => {
                  setActiveMonthIndex(0);
                  setSelectedDay(MONTH_CONFIGS_2027[0].days[0]);
                }}
                className="pressable"
                style={{
                  background: '#800E13',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '8px 24px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(128, 14, 19, 0.3)'
                }}
              >
                Today
              </button>

              {/* Next Month Button */}
              <button
                onClick={() => setActiveMonthIndex(1)}
                disabled={activeMonthIndex === 1}
                className="pressable"
                aria-label="Next Month"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeMonthIndex === 1 ? '#CBD5E1' : '#1E293B',
                  cursor: activeMonthIndex === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* 7 Meitei Weekday Headers (Crimson Text from Screenshot) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              textAlign: 'center',
              padding: '4px 0'
            }}>
              {MEITEI_WEEKDAYS.map((wd, idx) => (
                <div key={idx} style={{
                  color: idx === 0 ? '#DC2626' : '#800E13',
                  fontWeight: 700,
                  fontSize: '11px',
                  lineHeight: 1.2
                }}>
                  <div>{wd.shortMayek}</div>
                </div>
              ))}
            </div>

            {/* 7-Column Calendar Grid (Tactile White Squircles) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '5px'
            }}>
              {/* Empty leading offset slots */}
              {Array.from({ length: currentMonthConfig.startDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} style={{ minHeight: '64px' }} />
              ))}

              {/* Month Days */}
              {currentMonthConfig.days.map((day) => {
                const isSelected = selectedDay?.gregorianDate === day.gregorianDate;
                const topBadgeEvent = day.events[0];

                return (
                  <div
                    key={day.gregorianDate}
                    onClick={() => setSelectedDay(day)}
                    className="pressable"
                    style={{
                      minHeight: '66px',
                      background: topBadgeEvent?.isHoliday ? '#FFF1F2' : '#FFFFFF',
                      border: isSelected ? '2px solid #800E13' : '1px solid #E2E8F0',
                      borderRadius: '14px',
                      padding: '3px 2px 4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isSelected 
                        ? '0 4px 12px rgba(128, 14, 19, 0.2)' 
                        : '0 1px 3px rgba(0, 0, 0, 0.03)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Top Festival/Holiday Pill */}
                    {topBadgeEvent ? (
                      <div style={{
                        fontSize: '7px',
                        fontWeight: 800,
                        color: '#B91C1C',
                        background: '#FEE2E2',
                        padding: '1px 3px',
                        borderRadius: '4px',
                        width: '90%',
                        textAlign: 'center',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}>
                        {topBadgeEvent.shortLabel}
                      </div>
                    ) : (
                      <div style={{ height: '11px' }} />
                    )}

                    {/* Day Number (Red for Sunday) */}
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 800,
                      color: day.isSunday || topBadgeEvent?.isHoliday ? '#DC2626' : '#0F172A',
                      lineHeight: 1
                    }}>
                      {day.dayNumber}
                    </div>

                    {/* Special Moon Phase Marker */}
                    {day.moonPhase === 'full_moon' && (
                      <div style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: '#F59E0B',
                        boxShadow: '0 0 4px #F59E0B'
                      }} />
                    )}
                    {day.moonPhase === 'new_moon' && (
                      <div style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: '#64748B'
                      }} />
                    )}
                    {day.moonPhase === 'ekadasi' && (
                      <div style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: 'linear-gradient(90deg, #F59E0B 50%, #E2E8F0 50%)'
                      }} />
                    )}

                    {/* Meitei Month & Day Subscript */}
                    <div style={{
                      fontSize: '8px',
                      color: isSelected ? '#800E13' : '#64748B',
                      fontWeight: 700,
                      textAlign: 'center',
                      lineHeight: 1.1
                    }}>
                      <div>{day.meiteiMonthMayek}</div>
                      <div>{day.lunarDaysMayek}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Day Detail Drawer */}
            {selectedDay && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {new Date(selectedDay.gregorianDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </h5>
                    <p style={{ fontSize: '12px', color: '#800E13', fontWeight: 700, margin: '2px 0 0' }}>
                      {selectedDay.meiteiMonthMayek} ({selectedDay.meiteiMonthEnglish}) • ꯊꯥꯁꯤ {selectedDay.lunarDaysMayek}
                    </p>
                  </div>

                  {selectedDay.moonPhaseLabel && (
                    <span style={{
                      background: selectedDay.moonPhase === 'full_moon' ? '#FEF3C7' : '#F1F5F9',
                      color: selectedDay.moonPhase === 'full_moon' ? '#92400E' : '#334155',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 800
                    }}>
                      {selectedDay.moonPhaseLabel}
                    </span>
                  )}
                </div>

                {selectedDay.events.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                    {selectedDay.events.map((ev, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: ev.isHoliday ? '#FFF1F2' : '#F8FAFC',
                          border: ev.isHoliday ? '1px solid rgba(225, 29, 72, 0.2)' : '1px solid #E2E8F0',
                          borderRadius: '10px',
                          padding: '8px 12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12.5px', fontWeight: 700, color: ev.isHoliday ? '#9F1239' : '#1E293B' }}>
                            {ev.name}
                          </span>
                          <span style={{
                            fontSize: '9px',
                            fontWeight: 800,
                            color: ev.isHoliday ? '#BE123C' : '#64748B',
                            textTransform: 'uppercase'
                          }}>
                            {ev.isHoliday ? 'HOLIDAY' : 'OBSERVANCE'}
                          </span>
                        </div>
                        {ev.description && (
                          <p style={{ fontSize: '11px', color: '#475569', margin: '4px 0 0', lineHeight: 1.4 }}>
                            {ev.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: 0 }}>
                    Normal auspicious calendar day with standard lunar observances.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: ALMANAC (PANCHANG & TATNABA PROMPT) ================= */}
        {activeTab === 'almanac' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '24px 18px',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            marginTop: '8px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#FFF1F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(128, 14, 19, 0.15)'
            }}>
              <Zap size={26} color="#800E13" />
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#FFF1F2',
                border: '1px solid rgba(128, 14, 19, 0.25)',
                borderRadius: '8px',
                padding: '3px 8px',
                color: '#800E13',
                fontSize: '10px',
                fontWeight: 800,
                marginBottom: '8px'
              }}>
                <Sparkles size={12} />
                <span>FULL APP FEATURE</span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Traditional Meitei Almanac & Tatnaba
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px', lineHeight: 1.5, maxWidth: '290px' }}>
                Complete Thapanlon astrological calendar containing Tatnaba warnings, daily auspicious directions, and sunrise/sunset timings.
              </p>
            </div>

            {/* Feature Highlights */}
            <div style={{
              width: '100%',
              background: '#FAFAFA',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '11.5px',
              color: '#334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Tatnaba warning indicators & taboos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Daily Choghadiya & auspicious travel directions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Traditional astrological Nakshatra tracking</span>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.manipurcalendar&hl=en"
              target="_blank"
              rel="noreferrer"
              className="pressable"
              style={{
                marginTop: '4px',
                background: '#800E13',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '11px 20px',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(128, 14, 19, 0.25)'
              }}
            >
              <span>Download Full App on Google Play</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* ================= TAB 4: INFO (CULTURAL THAPANLON & CREDITS) ================= */}
        {activeTab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '18px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#800E13', margin: 0 }}>
                About Meitei Thapanlon (ꯃꯩꯇꯩ ꯊꯥꯄꯥꯟꯂꯣꯟ)
              </h4>
              <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.55, margin: 0 }}>
                The Meitei calendar is an ancient lunisolar system synchronized with the moon's phases. Each lunar month begins with the New Moon (*Thasi*) and features sacred cultural observances including Cheiraoba, Imoinu Iratpa, and Ningol Chakouba.
              </p>

              <div style={{
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '12px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#800E13' }}>12 LUNAR MONTHS</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Sajibu to Lamta</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#800E13' }}>7 SALAIS (CLANS)</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Khuman, Luwang, Mangang...</div>
                </div>
              </div>
            </div>

            {/* Developer Credits */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '16px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <img
                src="/profile-pic.jpg"
                alt="Banishwor Athokpam"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #800E13'
                }}
              />
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Banishwor Athokpam
                </h5>
                <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0' }}>
                  Creator & Developer · MCA 7th Rank
                </p>
                <a
                  href="https://github.com/banishwor/manipuri-calendar-pwa"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '11px', color: '#800E13', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
                >
                  <span>GitHub Repository</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= 4. AUTHENTIC 4-TAB BOTTOM NAVIGATION BAR (MATCHING SCREENSHOT) ================= */}
      <div style={{
        height: '56px',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        flexShrink: 0,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Tab 1: Today (☾ Crescent Moon Icon) */}
        <button
          onClick={() => setActiveTab('today')}
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
          <Moon size={18} color={activeTab === 'today' ? '#800E13' : '#94A3B8'} />
          <span style={{
            fontSize: '10.5px',
            fontWeight: activeTab === 'today' ? 800 : 500,
            color: activeTab === 'today' ? '#800E13' : '#94A3B8'
          }}>
            Today
          </span>
        </button>

        {/* Tab 2: Calendar (📅 Calendar Icon - highlighted with dark red text in screenshot) */}
        <button
          onClick={() => setActiveTab('calendar')}
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
          <CalendarIcon size={18} color={activeTab === 'calendar' ? '#800E13' : '#94A3B8'} />
          <span style={{
            fontSize: '10.5px',
            fontWeight: activeTab === 'calendar' ? 800 : 500,
            color: activeTab === 'calendar' ? '#800E13' : '#94A3B8'
          }}>
            Calendar
          </span>
        </button>

        {/* Tab 3: Almanac (⚡ Lightning / Compass Icon) */}
        <button
          onClick={() => setActiveTab('almanac')}
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
          <Zap size={18} color={activeTab === 'almanac' ? '#800E13' : '#94A3B8'} />
          <span style={{
            fontSize: '10.5px',
            fontWeight: activeTab === 'almanac' ? 800 : 500,
            color: activeTab === 'almanac' ? '#800E13' : '#94A3B8'
          }}>
            Almanac
          </span>
        </button>

        {/* Tab 4: Info (🕮 Book Icon) */}
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
          <BookOpen size={18} color={activeTab === 'info' ? '#800E13' : '#94A3B8'} />
          <span style={{
            fontSize: '10.5px',
            fontWeight: activeTab === 'info' ? 800 : 500,
            color: activeTab === 'info' ? '#800E13' : '#94A3B8'
          }}>
            Info
          </span>
        </button>
      </div>

      {/* ================= 5. ANDROID GESTURE & 3-BUTTON SYSTEM BAR ================= */}
      <div style={{
        height: '38px',
        background: '#FDFBF7',
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
