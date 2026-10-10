import React, { useState, useMemo } from 'react';
import { 
  Home,
  Heart, 
  Search,
  HelpCircle,
  User,
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ArrowLeftRight
} from 'lucide-react';
import { 
  SEVEN_SALAIS, 
  SCOPED_SURNAMES, 
  checkCompatibility,
  CompatibilityResult
} from '../../../content/yekSalaiData';
import { getAssetUrl } from '../../../utils/assetUrl';

type TabType = 'home' | 'marriage' | 'browse' | 'facts' | 'profile';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.yeksalaiapp&hl=en';

const tabTitles: Record<TabType, string> = {
  home: 'Home (Seven Salais)',
  marriage: 'Marriage Compatibility',
  browse: 'Browse 860+ Surnames',
  facts: 'Meitei Kinship Facts',
  profile: 'App Profile & About'
};

export const YekSalaiScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('marriage');
  const [boySurname, setBoySurname] = useState('Athokpam');
  const [girlSurname, setGirlSurname] = useState('Leimapokpam');

  const result: CompatibilityResult = useMemo(() => {
    return checkCompatibility(boySurname, girlSurname);
  }, [boySurname, girlSurname]);

  const boyClanInfo = result.clan1 ? SEVEN_SALAIS[result.clan1] : null;
  const girlClanInfo = result.clan2 ? SEVEN_SALAIS[result.clan2] : null;

  const popularSurnames = ['Athokpam', 'Leimapokpam', 'Langpoklakpam', 'Khumanthem', 'Heikrujam', 'Ningombam', 'Mutum'];

  const handleSwap = () => {
    const temp = boySurname;
    setBoySurname(girlSurname);
    setGirlSurname(temp);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: '#F8FAFC',
      color: '#1E293B',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* 1. App Top Header */}
      <div style={{
        background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
        color: '#FFFFFF',
        padding: '8px 12px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(4, 120, 87, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={getAssetUrl('projects/yek-salai.png')}
            alt="Yek Salai"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '7px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
            }}
          />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, lineHeight: 1.2 }}>
              Yek-Salai Meitei Clan
            </div>
            <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
              {tabTitles[activeTab]}
            </div>
          </div>
        </div>

        <span style={{
          fontSize: '9px',
          fontWeight: 800,
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 7px',
          borderRadius: '999px',
          color: '#FFFFFF'
        }}>
          Puya Exogamy
        </span>
      </div>

      {/* 2. Main Content Area */}
      {activeTab === 'marriage' ? (
        /* ================= WORKING COMPATIBILITY SCREEN ================= */
        <div style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '10px 10px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Input Pair Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {/* Groom Surname Picker */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <label style={{ fontSize: '10px', fontWeight: 800, color: '#475569' }}>
                  GROOM SURNAME (ꯏꯄꯥ ꯌꯨꯝꯅꯥꯛ)
                </label>
                {boyClanInfo && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    color: boyClanInfo.color === '#000000' ? '#334155' : boyClanInfo.color
                  }}>
                    {boyClanInfo.name} ({boyClanInfo.meiteiMayek})
                  </span>
                )}
              </div>
              <select
                value={boySurname}
                onChange={(e) => setBoySurname(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#0F172A',
                  background: '#F8FAFC',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {SCOPED_SURNAMES.map(s => (
                  <option key={s.surname} value={s.surname}>
                    {s.surname} ({s.meiteiMayek}) — {s.clans.join('/')}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button Divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={handleSwap}
                title="Swap Groom and Bride Surnames"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  color: '#64748B',
                  fontSize: '8.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <ArrowLeftRight size={10} />
                <span>Swap</span>
              </button>
            </div>

            {/* Bride Surname Picker */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <label style={{ fontSize: '10px', fontWeight: 800, color: '#475569' }}>
                  BRIDE SURNAME (ꯏꯃꯥ ꯌꯨꯝꯅꯥꯛ)
                </label>
                {girlClanInfo && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    color: girlClanInfo.color === '#000000' ? '#334155' : girlClanInfo.color
                  }}>
                    {girlClanInfo.name} ({girlClanInfo.meiteiMayek})
                  </span>
                )}
              </div>
              <select
                value={girlSurname}
                onChange={(e) => setGirlSurname(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#0F172A',
                  background: '#F8FAFC',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {SCOPED_SURNAMES.map(s => (
                  <option key={s.surname} value={s.surname}>
                    {s.surname} ({s.meiteiMayek}) — {s.clans.join('/')}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick preset chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '2px' }}>
              <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, alignSelf: 'center', marginRight: '2px' }}>
                Try:
              </span>
              {popularSurnames.slice(0, 4).map(s => (
                <button
                  key={s}
                  onClick={() => setGirlSurname(s)}
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    background: girlSurname === s ? '#E0F2FE' : '#F1F5F9',
                    color: girlSurname === s ? '#0284C7' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Compatibility Verdict Card */}
          <div style={{
            background: result.compatible ? '#F0FDF4' : '#FEF2F2',
            border: `1.5px solid ${result.compatible ? '#86EFAC' : '#FECACA'}`,
            borderRadius: '12px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {result.compatible ? (
                <CheckCircle2 size={16} color="#16A34A" />
              ) : (
                <XCircle size={16} color="#DC2626" />
              )}
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                color: result.compatible ? '#15803D' : '#B91C1C'
              }}>
                {result.title}
              </span>
            </div>

            <div style={{
              fontSize: '10px',
              fontWeight: 600,
              color: result.compatible ? '#166534' : '#991B1B',
              lineHeight: 1.3
            }}>
              {result.subtitle}
            </div>

            {result.rationale && (
              <div style={{
                fontSize: '9.5px',
                color: '#475569',
                background: 'rgba(255, 255, 255, 0.7)',
                padding: '5px 8px',
                borderRadius: '7px',
                marginTop: '2px'
              }}>
                {result.rationale}
              </div>
            )}
          </div>

          {/* Seven Salais Quick Reference Matrix */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '8px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '9.5px',
              fontWeight: 800,
              color: '#64748B',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <ShieldCheck size={11} color="#047857" />
              <span>THE 7 PRINCIPAL SALAIS (ꯌꯦꯛ ꯷)</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
              {Object.values(SEVEN_SALAIS).slice(0, 6).map(clan => (
                <div
                  key={clan.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 6px',
                    borderRadius: '6px',
                    background: '#F8FAFC',
                    border: '1px solid #F1F5F9'
                  }}
                >
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: clan.color,
                    border: clan.color === '#FFFFFF' ? '1px solid #CBD5E1' : 'none'
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                      {clan.name}
                    </span>
                    <span style={{ fontSize: '7.5px', color: '#64748B' }}>
                      {clan.meiteiMayek}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ================= OTHER TABS: DIRECT DOWNLOAD FOR FULL EXPERIENCE ================= */
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          textAlign: 'center',
          gap: '14px'
        }}>
          {/* App Icon */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 6px 18px rgba(4, 120, 87, 0.25)',
            border: '1px solid rgba(4, 120, 87, 0.2)',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={getAssetUrl('projects/yek-salai.png')}
              alt="Yek Salai"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
              {tabTitles[activeTab]}
            </h3>
            <p style={{ fontSize: '11px', color: '#64748B', margin: 0, lineHeight: 1.5, maxWidth: '240px' }}>
              Download the full app on Google Play to access this feature.
            </p>
          </div>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              padding: '9px 18px',
              borderRadius: '999px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(4, 120, 87, 0.3)',
              cursor: 'pointer'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M3.6 1.8L14.3 12.5L3.6 23.2C3.2 22.8 3 22.1 3 21.3V3.7C3 2.9 3.2 2.2 3.6 1.8Z" fill="#00C1FF"/>
              <path d="M17.9 8.9L14.3 12.5L3.6 1.8C4.1 1.3 4.9 1.1 5.7 1.6L17.9 8.9Z" fill="#00E676"/>
              <path d="M17.9 16.1L5.7 23.4C4.9 23.9 4.1 23.7 3.6 23.2L14.3 12.5L17.9 16.1Z" fill="#FF334B"/>
              <path d="M21.7 11.2L17.9 8.9L14.3 12.5L17.9 16.1L21.7 13.8C22.6 13.3 22.6 12.3 21.7 11.2Z" fill="#FFBA00"/>
            </svg>
            <span>Download on Google Play</span>
          </a>
        </div>
      )}

      {/* 3. Bottom Navigation Bar (Home, Marriage, Browse, Facts, Profile) */}
      <div style={{
        height: '46px',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 4px',
        flexShrink: 0,
        zIndex: 10
      }}>
        {/* 1. Home */}
        <button
          onClick={() => setActiveTab('home')}
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
            padding: '4px 0',
            color: activeTab === 'home' ? '#047857' : '#94A3B8'
          }}
        >
          <Home size={15} color={activeTab === 'home' ? '#047857' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'home' ? 800 : 600 }}>Home</span>
        </button>

        {/* 2. Marriage */}
        <button
          onClick={() => setActiveTab('marriage')}
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
            padding: '4px 0',
            color: activeTab === 'marriage' ? '#047857' : '#94A3B8'
          }}
        >
          <Heart size={15} color={activeTab === 'marriage' ? '#047857' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'marriage' ? 800 : 600 }}>Marriage</span>
        </button>

        {/* 3. Browse */}
        <button
          onClick={() => setActiveTab('browse')}
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
            padding: '4px 0',
            color: activeTab === 'browse' ? '#047857' : '#94A3B8'
          }}
        >
          <Search size={15} color={activeTab === 'browse' ? '#047857' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'browse' ? 800 : 600 }}>Browse</span>
        </button>

        {/* 4. Facts */}
        <button
          onClick={() => setActiveTab('facts')}
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
            padding: '4px 0',
            color: activeTab === 'facts' ? '#047857' : '#94A3B8'
          }}
        >
          <HelpCircle size={15} color={activeTab === 'facts' ? '#047857' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'facts' ? 800 : 600 }}>Facts</span>
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => setActiveTab('profile')}
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
            padding: '4px 0',
            color: activeTab === 'profile' ? '#047857' : '#94A3B8'
          }}
        >
          <User size={15} color={activeTab === 'profile' ? '#047857' : '#94A3B8'} />
          <span style={{ fontSize: '9px', fontWeight: activeTab === 'profile' ? 800 : 600 }}>Profile</span>
        </button>
      </div>
    </div>
  );
};
