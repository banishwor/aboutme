import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Calendar as CalendarIcon,
  Moon,
  Zap,
  BookOpen,
  ExternalLink,
  Smartphone,
  Globe
} from 'lucide-react';
import { 
  MONTH_CONFIGS_2027, 
  MEITEI_WEEKDAYS, 
  MonthDayData
} from '../../../content/manipuriCalendarData';

type CalendarTab = 'today' | 'calendar' | 'almanac' | 'info';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.manipurcalendar&hl=en';
const PWA_URL = 'https://banishwor.github.io/manipuri-calendar-pwa/?install=auto';

export const ManipuriCalendarScreen: React.FC = () => {
  // 1. By default, open 'calendar' page as requested by user
  const [activeTab, setActiveTab] = useState<CalendarTab>('calendar');
  const [monthIndex, setMonthIndex] = useState(0); // 0 = Jan 2027, 1 = Feb 2027
  const currentMonth = MONTH_CONFIGS_2027[monthIndex];
  
  // Selected day in calendar view
  const [selectedDay, setSelectedDay] = useState<MonthDayData>(
    currentMonth.days.find(d => d.events.length > 0) || currentMonth.days[0]
  );

  const handlePrevMonth = () => {
    if (monthIndex > 0) {
      const newIdx = monthIndex - 1;
      setMonthIndex(newIdx);
      setSelectedDay(MONTH_CONFIGS_2027[newIdx].days[0]);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex < MONTH_CONFIGS_2027.length - 1) {
      const newIdx = monthIndex + 1;
      setMonthIndex(newIdx);
      setSelectedDay(MONTH_CONFIGS_2027[newIdx].days[0]);
    }
  };

  // Build grid with leading blank padding days
  const leadingBlanks = Array(currentMonth.startDayOfWeek).fill(null);

  // Render Prompt Card for Today, Almanac, and Info pages
  const renderPromptCard = (
    badge: string,
    title: string,
    description: string,
    icon: React.ReactNode,
    highlights: string[]
  ) => {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '16px 12px',
        gap: '12px'
      }}>
        {/* Animated Feature Icon Circle */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#FFF1F2',
          border: '1.5px solid #FECDD3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(128, 14, 19, 0.12)'
        }}>
          {icon}
        </div>

        <div>
          <span style={{
            fontSize: '9px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#9F1239',
            background: '#FFE4E6',
            padding: '2px 8px',
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '6px'
          }}>
            {badge}
          </span>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 800,
            color: '#1E293B',
            margin: '0 0 4px',
            lineHeight: 1.2
          }}>
            {title}
          </h4>
          <p style={{
            fontSize: '10.5px',
            color: '#64748B',
            margin: 0,
            lineHeight: 1.4,
            maxWidth: '240px'
          }}>
            {description}
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%',
          maxWidth: '240px',
          background: '#FFFFFF',
          padding: '8px 10px',
          borderRadius: '10px',
          border: '1px solid #F1F5F9',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
        }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#334155' }}>
              <span style={{ color: '#16A34A', fontWeight: 800 }}>✓</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Dual Actions: Android App (Full) & PWA (Simpler) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', maxWidth: '240px', marginTop: '4px' }}>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#800E13',
              color: '#FFFFFF',
              fontSize: '10.5px',
              fontWeight: 800,
              padding: '8px 12px',
              borderRadius: '999px',
              textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(128, 14, 19, 0.25)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Smartphone size={13} />
            <span>Download Android App (Full Experience)</span>
          </a>

          <a
            href={PWA_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#FFFFFF',
              color: '#800E13',
              border: '1.5px solid #800E13',
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '7px 12px',
              borderRadius: '999px',
              textDecoration: 'none'
            }}
          >
            <Globe size={13} />
            <span>Open PWA (Simpler Version)</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: '#FDFBF7',
      color: '#1E293B',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* ================= 1. APP TOP HEADER ================= */}
      <div style={{
        background: '#800E13',
        color: '#FFFFFF',
        padding: '7px 12px 9px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(128, 14, 19, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CalendarIcon size={14} color="#FFFFFF" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, lineHeight: 1.2 }}>
              {activeTab === 'calendar' ? currentMonth.monthNameEnglish : 'Manipuri Calendar'}
            </div>
            <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
              {activeTab === 'calendar' ? currentMonth.meiteiSubtitleMayek : 'Manipuri Traditional Lunar Calendar (ꯃꯩꯇꯩ ꯊꯥꯄꯥꯟꯂꯣꯟ)'}
            </div>
          </div>
        </div>

        {/* Month Switcher (visible on Calendar tab) */}
        {activeTab === 'calendar' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <button
              onClick={handlePrevMonth}
              disabled={monthIndex === 0}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: monthIndex === 0 ? 'default' : 'pointer',
                opacity: monthIndex === 0 ? 0.35 : 1
              }}
            >
              <ChevronLeft size={13} />
            </button>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '0 4px', whiteSpace: 'nowrap' }}>
              {currentMonth.monthNameEnglish.split(' ')[0]}
            </span>
            <button
              onClick={handleNextMonth}
              disabled={monthIndex === MONTH_CONFIGS_2027.length - 1}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: monthIndex === MONTH_CONFIGS_2027.length - 1 ? 'default' : 'pointer',
                opacity: monthIndex === MONTH_CONFIGS_2027.length - 1 ? 0.35 : 1
              }}
            >
              <ChevronRight size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveTab('calendar')}
            style={{
              fontSize: '9.5px',
              fontWeight: 800,
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: '999px',
              cursor: 'pointer'
            }}
          >
            ← Calendar
          </button>
        )}
      </div>

      {/* ================= 2. SCROLLABLE BODY ================= */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: activeTab === 'calendar' ? '6px 8px 8px' : '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {/* TAB 1: TODAY (PROMPT CARD) */}
        {activeTab === 'today' && renderPromptCard(
          'DAILY LUNAR EPHEMERIS',
          'Today\'s Astronomical & Lunar Observances',
          'Access live Tatnaba warnings, real-time tithi changes, planetary hora, and auspicious timings directly on your home screen.',
          <Moon size={28} color="#800E13" />,
          [
            'Live Daily Tatnaba & Chahi Taba alerts',
            'Home Screen Widgets (2x2, 4x1, 4x2)',
            'Complete zero-ad and offline calculations'
          ]
        )}

        {/* TAB 2: CALENDAR (FULL WORKING MONTH VIEW - DEFAULT) */}
        {activeTab === 'calendar' && (
          <>
            {/* Selected Day Info Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '6px 8px',
              border: '1px solid rgba(128, 14, 19, 0.12)',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: selectedDay.isSunday ? '#DC2626' : '#800E13'
                  }}>
                    {selectedDay.dayNumber} {currentMonth.monthNameEnglish.split(' ')[0]}
                  </span>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '5px',
                    background: 'rgba(128, 14, 19, 0.08)',
                    color: '#800E13'
                  }}>
                    {MEITEI_WEEKDAYS[selectedDay.dayOfWeek].fullMayek}
                  </span>
                </div>

                {selectedDay.moonPhaseLabel && (
                  <span style={{
                    fontSize: '8.5px',
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: '999px',
                    background: selectedDay.moonPhase === 'full_moon' ? '#FEF3C7' : '#E2E8F0',
                    color: selectedDay.moonPhase === 'full_moon' ? '#92400E' : '#334155'
                  }}>
                    ● {selectedDay.moonPhaseLabel}
                  </span>
                )}
              </div>

              <div style={{ fontSize: '9.5px', color: '#475569', fontWeight: 600 }}>
                <span>Month: </span>
                <strong style={{ color: '#0F172A' }}>{selectedDay.meiteiMonthEnglish} ({selectedDay.meiteiMonthMayek})</strong>
                <span> · Tithi: </span>
                <strong style={{ color: '#800E13' }}>{selectedDay.lunarDaysMayek}</strong>
              </div>

              {selectedDay.events.length > 0 && (
                <div style={{
                  padding: '3px 6px',
                  borderRadius: '6px',
                  background: '#FFF1F2',
                  border: '1px solid #FECDD3',
                  fontSize: '9px',
                  color: '#9F1239',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Sparkles size={10} color="#E11D48" />
                  <span>{selectedDay.events.map(e => e.name).join(', ')}</span>
                </div>
              )}
            </div>

            {/* Calendar Grid Container */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '6px 4px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
            }}>
              {/* Weekday Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                marginBottom: '2px',
                paddingBottom: '3px',
                borderBottom: '1px solid #F1F5F9'
              }}>
                {MEITEI_WEEKDAYS.map((wd, i) => (
                  <div key={i} style={{
                    fontSize: '8.5px',
                    fontWeight: 800,
                    color: i === 0 ? '#DC2626' : '#64748B'
                  }}>
                    <div>{wd.english}</div>
                    <div style={{ fontSize: '7.5px', opacity: 0.8 }}>{wd.shortMayek}</div>
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '1px'
              }}>
                {leadingBlanks.map((_, i) => (
                  <div key={`blank-${i}`} style={{ height: '30px' }} />
                ))}

                {currentMonth.days.map((day) => {
                  const isSelected = selectedDay.dayNumber === day.dayNumber;
                  const hasEvent = day.events.length > 0;
                  const isFullMoon = day.moonPhase === 'full_moon';
                  const isNewMoon = day.moonPhase === 'new_moon';

                  return (
                    <div
                      key={day.dayNumber}
                      onClick={() => setSelectedDay(day)}
                      style={{
                        height: '30px',
                        borderRadius: '6px',
                        background: isSelected 
                          ? '#800E13' 
                          : hasEvent 
                          ? '#FFF1F2' 
                          : isFullMoon
                          ? '#FEF3C7'
                          : 'transparent',
                        color: isSelected 
                          ? '#FFFFFF' 
                          : day.isSunday 
                          ? '#DC2626' 
                          : '#1E293B',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '9.5px', fontWeight: 800, lineHeight: 1 }}>
                        {day.dayNumber}
                      </span>
                      <span style={{
                        fontSize: '7px',
                        lineHeight: 1,
                        marginTop: '1px',
                        opacity: isSelected ? 0.9 : 0.65,
                        fontWeight: 600
                      }}>
                        {day.lunarDaysMayek}
                      </span>

                      {/* Dot indicators */}
                      {hasEvent && !isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          width: '3.5px',
                          height: '3.5px',
                          borderRadius: '50%',
                          background: '#E11D48'
                        }} />
                      )}
                      {isFullMoon && !isSelected && (
                        <div style={{
                          position: 'absolute',
                          bottom: '1.5px',
                          width: '3.5px',
                          height: '3.5px',
                          borderRadius: '50%',
                          background: '#D97706'
                        }} />
                      )}
                      {isNewMoon && !isSelected && (
                        <div style={{
                          position: 'absolute',
                          bottom: '1.5px',
                          width: '3.5px',
                          height: '3.5px',
                          borderRadius: '50%',
                          background: '#0F172A'
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* TAB 3: ALMANAC (PROMPT CARD) */}
        {activeTab === 'almanac' && renderPromptCard(
          '100-YEAR LUNAR ALMANAC',
          'Meitei Chahi Taba & Astrological Ephemeris',
          'Astronomical algorithms mathematically computing 100+ years of Meitei lunar cycles, planetary transits, and traditional eclipses offline.',
          <Zap size={28} color="#800E13" />,
          [
            '100-Year Century Lunar Ephemeris',
            'Full Planetary Hora & Eclipse Computations',
            'Instant Festival & Holiday Search Engine'
          ]
        )}

        {/* TAB 4: INFO (PROMPT CARD) */}
        {activeTab === 'info' && renderPromptCard(
          'ABOUT MANIPURI CALENDAR',
          'Digital Cultural Heritage Initiative',
          'Built with love by Banishwor Athokpam to serve thousands across the global Manipuri diaspora with zero advertisements and zero tracking.',
          <BookOpen size={28} color="#800E13" />,
          [
            '100% Ad-Free & Privacy Respecting',
            'Developed by Banishwor Athokpam',
            'Proudly preserving Meitei Mayek culture'
          ]
        )}
      </div>

      {/* ================= 3. MANIPURI CALENDAR 4-TAB NAVIGATION BAR ================= */}
      <div style={{
        height: '40px',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexShrink: 0,
        userSelect: 'none',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Tab 1: Today */}
        <button
          onClick={() => setActiveTab('today')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '2px 0',
            color: activeTab === 'today' ? '#800E13' : '#94A3B8'
          }}
        >
          <Moon size={15} color={activeTab === 'today' ? '#800E13' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'today' ? 800 : 600 }}>
            Today
          </span>
        </button>

        {/* Tab 2: Calendar (Default Active) */}
        <button
          onClick={() => setActiveTab('calendar')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '2px 0',
            color: activeTab === 'calendar' ? '#800E13' : '#94A3B8'
          }}
        >
          <CalendarIcon size={15} color={activeTab === 'calendar' ? '#800E13' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'calendar' ? 800 : 600 }}>
            Calendar
          </span>
        </button>

        {/* Tab 3: Almanac */}
        <button
          onClick={() => setActiveTab('almanac')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '2px 0',
            color: activeTab === 'almanac' ? '#800E13' : '#94A3B8'
          }}
        >
          <Zap size={15} color={activeTab === 'almanac' ? '#800E13' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'almanac' ? 800 : 600 }}>
            Almanac
          </span>
        </button>

        {/* Tab 4: Info */}
        <button
          onClick={() => setActiveTab('info')}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '2px 0',
            color: activeTab === 'info' ? '#800E13' : '#94A3B8'
          }}
        >
          <BookOpen size={15} color={activeTab === 'info' ? '#800E13' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'info' ? 800 : 600 }}>
            Info
          </span>
        </button>
      </div>
    </div>
  );
};
