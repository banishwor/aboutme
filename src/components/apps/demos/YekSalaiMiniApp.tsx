import React, { useState } from 'react';
import { 
  Heart, 
  ArrowLeftRight, 
  RotateCcw, 
  ShieldCheck, 
  ExternalLink, 
  Info, 
  Search, 
  HelpCircle, 
  User, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronRight, 
  Home
} from 'lucide-react';
import { 
  SEVEN_SALAIS, 
  SCOPED_SURNAMES, 
  MEITEI_KINSHIP_RULES, 
  checkCompatibility, 
  CompatibilityResult 
} from '../../../content/yekSalaiData';

export interface YekSalaiMiniAppProps {
  onBack: () => void;
  onHome: () => void;
}

type TabType = 'home' | 'compatibility' | 'search' | 'facts' | 'profile';

export const YekSalaiMiniApp: React.FC<YekSalaiMiniAppProps> = ({ onBack, onHome }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [boySurname, setBoySurname] = useState<string>('Athokpam');
  const [girlSurname, setGirlSurname] = useState<string>('Leimapokpam');
  const [selectedBranch1, setSelectedBranch1] = useState<string | undefined>();
  const [selectedBranch2, setSelectedBranch2] = useState<string | undefined>();
  const [activeInputFocus, setActiveInputFocus] = useState<'boy' | 'girl'>('girl');

  // Initial calculation with default values
  const [result, setResult] = useState<CompatibilityResult | null>(() => {
    return checkCompatibility('Athokpam', 'Leimapokpam');
  });

  // Recent checks log
  const [recentChecks, setRecentChecks] = useState<Array<{ boy: string; girl: string; result: CompatibilityResult }>>([
    {
      boy: 'Athokpam',
      girl: 'Leimapokpam',
      result: checkCompatibility('Athokpam', 'Leimapokpam')
    },
    {
      boy: 'Leimapokpam',
      girl: 'Langpoklakpam',
      result: checkCompatibility('Leimapokpam', 'Langpoklakpam')
    }
  ]);

  const handleRunCheck = (s1 = boySurname, s2 = girlSurname, b1 = selectedBranch1, b2 = selectedBranch2) => {
    const res = checkCompatibility(s1, s2, b1, b2);
    setResult(res);

    if (res.status !== 'disambiguation' && res.status !== 'not_found') {
      setRecentChecks(prev => {
        const filtered = prev.filter(p => !(p.boy.toLowerCase() === s1.toLowerCase() && p.girl.toLowerCase() === s2.toLowerCase()));
        return [{ boy: s1, girl: s2, result: res }, ...filtered].slice(0, 4);
      });
    }
  };

  const handleSwap = () => {
    const tempB = boySurname;
    const tempG = girlSurname;
    setBoySurname(tempG);
    setGirlSurname(tempB);
    const tempBBranch = selectedBranch1;
    setSelectedBranch1(selectedBranch2);
    setSelectedBranch2(tempBBranch);
    handleRunCheck(tempG, tempB, selectedBranch2, tempBBranch);
  };

  const handleSelectSurnameChip = (surname: string) => {
    if (activeInputFocus === 'boy') {
      setBoySurname(surname);
      setSelectedBranch1(undefined);
      setActiveInputFocus('girl');
      handleRunCheck(surname, girlSurname, undefined, selectedBranch2);
    } else {
      setGirlSurname(surname);
      setSelectedBranch2(undefined);
      handleRunCheck(boySurname, surname, selectedBranch1, undefined);
    }
  };

  const handleClear = () => {
    setBoySurname('');
    setGirlSurname('');
    setSelectedBranch1(undefined);
    setSelectedBranch2(undefined);
    setResult(null);
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
      {/* ================= 1. NATIVE EMERALD / TEAL HEADER (FLUSH, ZERO FAKE STATUS BAR) ================= */}
      <div style={{
        background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)', // Authentic emerald green from Android app
        color: '#FFFFFF',
        padding: '12px 16px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 14px rgba(4, 120, 87, 0.28)',
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
              src="/projects/yek-salai.png" 
              alt="Yek Salai" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
              {activeTab === 'home' && 'Yek Salai (ꯌꯦꯛ ꯁꯂꯥꯏ)'}
              {activeTab === 'compatibility' && 'Marriage Compatibility'}
              {activeTab === 'search' && 'Surname & Clan Finder'}
              {activeTab === 'facts' && 'Meitei Kinship Facts'}
              {activeTab === 'profile' && 'About Yek Salai'}
            </h3>
            <p style={{ fontSize: '11px', margin: '2px 0 0', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 500 }}>
              {activeTab === 'home' && 'Seven Salais of Kangleipak & Kinship Guide'}
              {activeTab === 'compatibility' && 'Exogamy Rules & Yek Tinnaba Checker'}
              {activeTab === 'search' && '860+ Ancestral Surnames Index'}
              {activeTab === 'facts' && 'Traditional Puya Customary Prohibitions'}
              {activeTab === 'profile' && 'Developed by Banishwor Athokpam'}
            </p>
          </div>
        </div>

        {/* Action Badge */}
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
          PRODUCTION
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
                  src="/projects/yek-salai.png" 
                  alt="Yek Salai App" 
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(4, 120, 87, 0.2)'
                  }} 
                />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Yek Salai (ꯌꯦꯛ ꯁꯂꯥꯏ)
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                    <span style={{
                      background: '#ECFDF5',
                      color: '#059669',
                      border: '1px solid rgba(5, 150, 105, 0.25)',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: 700
                    }}>
                      ● PRODUCTION ACTIVE
                    </span>
                    <span style={{
                      background: '#F1F5F9',
                      color: '#475569',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9px',
                      fontWeight: 600
                    }}>
                      GOOGLE PLAY
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                A digital repository and kinship guardian preserving the genealogical heritage of the Meitei civilization. Features comprehensive surname-to-clan mapping for 860+ family names and automated exogamy verification according to ancestral <em>Puya</em> traditions.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                <button
                  onClick={() => setActiveTab('compatibility')}
                  className="pressable"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
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
                    boxShadow: '0 2px 8px rgba(4, 120, 87, 0.25)'
                  }}
                >
                  <Heart size={14} fill="#FFFFFF" />
                  <span>Marriage Compatibility</span>
                </button>

                <a
                  href="https://play.google.com/store/apps/details?id=com.yeksalaiapp"
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
                  <ExternalLink size={14} />
                  <span>Play Store</span>
                </a>
              </div>
            </div>

            {/* The Seven Salais of Kangleipak Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  The Seven Salais (ꯁꯂꯥꯏ ꯇꯔꯦꯠ)
                </h5>
                <span style={{ fontSize: '11px', color: '#047857', fontWeight: 700 }}>
                  7 Clans
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '8px'
              }}>
                {Object.values(SEVEN_SALAIS).map(clan => (
                  <div
                    key={clan.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: clan.color,
                        border: clan.id === 2 ? '1px solid #CBD5E1' : 'none',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                      }} />
                      <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>
                        {clan.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>
                      {clan.meiteiMayek} · {clan.element}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sacred Kinship Rules Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Traditional Kinship Prohibitions
              </h5>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {MEITEI_KINSHIP_RULES.slice(0, 4).map(rule => (
                  <div
                    key={rule.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '12px',
                      border: '1px solid #E2E8F0',
                      borderLeft: `4px solid ${rule.color}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A' }}>
                        {rule.title}
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>
                        {rule.meiteiMayek}
                      </span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                      {rule.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering & Community Note Card */}
            <div style={{
              background: '#F0FDF4',
              borderRadius: '14px',
              padding: '14px',
              border: '1px solid rgba(4, 120, 87, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#047857" />
                <h6 style={{ fontSize: '12px', fontWeight: 800, color: '#047857', margin: 0 }}>
                  Community & Cultural Integrity
                </h6>
              </div>
              <p style={{ fontSize: '11px', color: '#166534', lineHeight: 1.45, margin: 0 }}>
                Developed by Banishwor Athokpam as a non-profit cultural reference tool. Zero user tracking, zero data collection, and 100% offline rule evaluation to protect privacy and support community wisdom.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 2: COMPATIBILITY (INTERACTIVE MARRIAGE CHECKER) ================= */}
        {activeTab === 'compatibility' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Input Form Card */}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Enter or Select Surnames
                </h4>
                <button
                  onClick={handleClear}
                  className="pressable"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#64748B',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={12} />
                  <span>Clear</span>
                </button>
              </div>

              {/* Input Fields Row with Swap Button */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '8px',
                alignItems: 'center'
              }}>
                {/* Boy's Surname Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Boy's Surname
                  </label>
                  <input
                    type="text"
                    value={boySurname}
                    onFocus={() => setActiveInputFocus('boy')}
                    onChange={(e) => {
                      setBoySurname(e.target.value);
                      setSelectedBranch1(undefined);
                    }}
                    placeholder="e.g. Athokpam"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: activeInputFocus === 'boy' ? '2px solid #047857' : '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0F172A',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Centered Swap Button */}
                <button
                  onClick={handleSwap}
                  className="pressable"
                  title="Swap Surnames"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    color: '#047857',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginTop: '16px'
                  }}
                >
                  <ArrowLeftRight size={16} />
                </button>

                {/* Girl's Surname Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Girl's Surname
                  </label>
                  <input
                    type="text"
                    value={girlSurname}
                    onFocus={() => setActiveInputFocus('girl')}
                    onChange={(e) => {
                      setGirlSurname(e.target.value);
                      setSelectedBranch2(undefined);
                    }}
                    placeholder="e.g. Leimapokpam"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: activeInputFocus === 'girl' ? '2px solid #047857' : '1px solid #CBD5E1',
                      background: '#F8FAFC',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0F172A',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Quick-Select Suggestion Chips (The 7 Curated Surnames) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 600 }}>
                    Quick Select (Filling: <strong>{activeInputFocus === 'boy' ? "Boy's" : "Girl's"}</strong>):
                  </span>
                  <span style={{ fontSize: '10px', color: '#047857', fontWeight: 700 }}>
                    7 Demo Surnames
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {SCOPED_SURNAMES.map(entry => {
                    const isBoy = boySurname.toLowerCase() === entry.surname.toLowerCase();
                    const isGirl = girlSurname.toLowerCase() === entry.surname.toLowerCase();
                    return (
                      <button
                        key={entry.surname}
                        onClick={() => handleSelectSurnameChip(entry.surname)}
                        className="pressable"
                        style={{
                          background: isBoy || isGirl ? '#065F46' : '#F1F5F9',
                          color: isBoy || isGirl ? '#FFFFFF' : '#334155',
                          border: isBoy || isGirl ? '1px solid #065F46' : '1px solid #E2E8F0',
                          borderRadius: '8px',
                          padding: '5px 9px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>{entry.surname}</span>
                        <span style={{ fontSize: '9px', opacity: 0.75 }}>
                          ({entry.clans.join('/')})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Check Compatibility Button */}
              <button
                onClick={() => handleRunCheck()}
                className="pressable"
                style={{
                  background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '13px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(4, 120, 87, 0.28)'
                }}
              >
                <Heart size={16} fill="#FFFFFF" />
                <span>Check Marriage Compatibility</span>
              </button>
            </div>

            {/* Disambiguation Modal / Selector (for Multi-Clan surnames like Mutum or Thongam) */}
            {result?.status === 'disambiguation' && (
              <div style={{
                background: '#FEF3C7',
                border: '1px solid #F59E0B',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} color="#D97706" />
                  <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#92400E', margin: 0 }}>
                    Branch Disambiguation Required
                  </h5>
                </div>
                <p style={{ fontSize: '11.5px', color: '#78350F', margin: 0, lineHeight: 1.45 }}>
                  {result.rationale}
                </p>

                {result.possibleClans1 && result.possibleClans1.length > 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#92400E' }}>
                      Select {boySurname}'s Clan:
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {result.possibleClans1.map(clan => (
                        <button
                          key={clan}
                          onClick={() => {
                            setSelectedBranch1(clan);
                            handleRunCheck(boySurname, girlSurname, clan, selectedBranch2);
                          }}
                          className="pressable"
                          style={{
                            flex: 1,
                            background: selectedBranch1 === clan ? '#92400E' : '#FFFFFF',
                            color: selectedBranch1 === clan ? '#FFFFFF' : '#92400E',
                            border: '1px solid #D97706',
                            borderRadius: '8px',
                            padding: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {clan} Salai
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {result.possibleClans2 && result.possibleClans2.length > 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#92400E' }}>
                      Select {girlSurname}'s Clan:
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {result.possibleClans2.map(clan => (
                        <button
                          key={clan}
                          onClick={() => {
                            setSelectedBranch2(clan);
                            handleRunCheck(boySurname, girlSurname, selectedBranch1, clan);
                          }}
                          className="pressable"
                          style={{
                            flex: 1,
                            background: selectedBranch2 === clan ? '#92400E' : '#FFFFFF',
                            color: selectedBranch2 === clan ? '#FFFFFF' : '#92400E',
                            border: '1px solid #D97706',
                            borderRadius: '8px',
                            padding: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {clan} Salai
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Compatibility Result Card */}
            {result && result.status !== 'disambiguation' && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                border: result.compatible ? '2px solid #10B981' : '2px solid #EF4444',
                boxShadow: result.compatible ? '0 4px 14px rgba(16, 185, 129, 0.15)' : '0 4px 14px rgba(239, 68, 68, 0.15)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Result Status Banner */}
                <div style={{
                  background: result.compatible ? '#059669' : '#DC2626',
                  color: '#FFFFFF',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {result.compatible ? (
                    <CheckCircle2 size={28} color="#FFFFFF" />
                  ) : (
                    <XCircle size={28} color="#FFFFFF" />
                  )}
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                      {result.title}
                    </h4>
                    <p style={{ fontSize: '11px', margin: '2px 0 0', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                      {result.subtitle}
                    </p>
                  </div>
                </div>

                {/* Clan Breakdown Grid */}
                {result.clan1 && result.clan2 && (
                  <div style={{
                    padding: '14px 16px',
                    background: '#F8FAFC',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px'
                  }}>
                    {/* Boy's Clan Tile */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                        Boy's Lineage
                      </span>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                        {result.surname1}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: SEVEN_SALAIS[result.clan1]?.color || '#64748B',
                          border: result.clan1 === 'Luwang' ? '1px solid #CBD5E1' : 'none'
                        }} />
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>
                          {result.clan1} Salai
                        </span>
                      </div>
                    </div>

                    {/* Girl's Clan Tile */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                        Girl's Lineage
                      </span>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                        {result.surname2}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: SEVEN_SALAIS[result.clan2]?.color || '#64748B',
                          border: result.clan2 === 'Luwang' ? '1px solid #CBD5E1' : 'none'
                        }} />
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>
                          {result.clan2} Salai
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cultural Explanation & Rationale */}
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Info size={14} color="#64748B" />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      Ancestral Customary Rationale
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                    {result.rationale}
                  </p>
                </div>
              </div>
            )}

            {/* Recent Checks Section */}
            {recentChecks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Recent Queries
                </h5>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {recentChecks.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setBoySurname(item.boy);
                        setGirlSurname(item.girl);
                        setResult(item.result);
                      }}
                      className="pressable"
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.result.compatible ? (
                          <CheckCircle2 size={16} color="#059669" />
                        ) : (
                          <XCircle size={16} color="#DC2626" />
                        )}
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                            {item.boy} + {item.girl}
                          </div>
                          <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                            {item.result.clan1 && item.result.clan2 
                              ? `${item.result.clan1} & ${item.result.clan2}` 
                              : item.result.title}
                          </div>
                        </div>
                      </div>

                      <ChevronRight size={14} color="#94A3B8" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: FIND CLAN (PREVIEW / STORE GATE) ================= */}
        {activeTab === 'search' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '18px',
              border: '1px solid #E2E8F0',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Search size={22} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                860+ Surnames Directory
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5, margin: 0, maxWidth: '280px' }}>
                The full native Android version includes real-time fuzzy search across the complete Meitei surname encyclopedia with historical Puya lineage traces.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.yeksalaiapp"
                target="_blank"
                rel="noreferrer"
                className="pressable"
                style={{
                  background: '#047857',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(4, 120, 87, 0.25)',
                  marginTop: '4px'
                }}
              >
                <ExternalLink size={14} />
                <span>Explore Full Index on Play Store</span>
              </a>
            </div>
          </div>
        )}

        {/* ================= TAB 4: FACTS (FAQ & CULTURAL WISDOM) ================= */}
        {activeTab === 'facts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Customary Kinship FAQ
            </h4>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>
                Why is Yek Tinnaba so strictly observed?
              </div>
              <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                In ancient Meitei cosmology, all members sharing a Salai trace their lineage to a single primal ancestor. Intermarriage within the clan is considered marrying one's sibling, which disrupts ancestral harmony and causes genetic stagnation.
              </p>
            </div>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>
                Can surnames belong to more than one clan?
              </div>
              <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Yes. Certain surnames such as <em>Mutum</em> (Mangang and Moirang) or <em>Thongam</em> (Khuman and Khaba Nganba) branched historically across distinct migratory paths and Royal appointments. In these cases, family elders verify the exact ancestral hearth (<em>Yum</em>).
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 5: PROFILE (DEVELOPER CREDENTIALS) ================= */}
        {activeTab === 'profile' && (
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
                  background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
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
                    MCA (Rank 7 Distinction) · Android & Cultural Software Engineer
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Creator of Yek Salai, Manipur Calculator, and Manipuri Calendar PWA. Dedicated to engineering software that empowers the heritage, language, and everyday tools of Manipur.
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
          <Home size={18} color={activeTab === 'home' ? '#047857' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'home' ? 800 : 500,
            color: activeTab === 'home' ? '#047857' : '#94A3B8'
          }}>
            Yek Salai
          </span>
        </button>

        <button
          onClick={() => setActiveTab('compatibility')}
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
          <Heart size={18} color={activeTab === 'compatibility' ? '#047857' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'compatibility' ? 800 : 500,
            color: activeTab === 'compatibility' ? '#047857' : '#94A3B8'
          }}>
            Marriage Check
          </span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
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
          <Search size={18} color={activeTab === 'search' ? '#047857' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'search' ? 800 : 500,
            color: activeTab === 'search' ? '#047857' : '#94A3B8'
          }}>
            Find Clan
          </span>
        </button>

        <button
          onClick={() => setActiveTab('facts')}
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
          <HelpCircle size={18} color={activeTab === 'facts' ? '#047857' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'facts' ? 800 : 500,
            color: activeTab === 'facts' ? '#047857' : '#94A3B8'
          }}>
            Facts
          </span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
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
          <User size={18} color={activeTab === 'profile' ? '#047857' : '#94A3B8'} />
          <span style={{
            fontSize: '10px',
            fontWeight: activeTab === 'profile' ? 800 : 500,
            color: activeTab === 'profile' ? '#047857' : '#94A3B8'
          }}>
            Profile
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
