import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  ArrowUpLeft, 
  FolderGit2, 
  Layers, 
  BookOpen, 
  GitBranch, 
  GraduationCap, 
  Compass
} from 'lucide-react';
import { searchUniversal, SearchableItem } from '../content/searchIndex';

interface ConnectedSearchProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLaunchApp: (appId: string) => void;
}

interface RecentQuery {
  id: string;
  queryText: string;
  title: string;
  badge: string;
  badgeColor: string;
  snippet: string;
  hasProfileButton?: boolean;
}

const funRecentQueries: RecentQuery[] = [
  {
    id: 'messi',
    queryText: 'banishwor fav player',
    title: 'Lionel Andrés Messi 🐐',
    badge: 'FAVOURITE PLAYER',
    badgeColor: '#D97706',
    snippet: "Die-hard Lionel Messi fan since day one. 8x Ballon d'Or, World Cup 2022 Champion. Football isn't just a sport—it's pure art."
  },
  {
    id: 'gf',
    queryText: 'banishwor gf',
    title: 'Forever Single 💔😂',
    badge: 'RELATIONSHIP STATUS',
    badgeColor: '#DC2626',
    snippet: "Single by choice (mostly the compiler's choice). He literally wrote an entire published book on breakups (Pushback) instead of getting a girlfriend. Currently committed to Kotlin & Gradle errors."
  },
  {
    id: 'sleep',
    queryText: 'banishwor sleep schedule',
    title: 'Error 404: Sleep Not Found 😴⚡',
    badge: 'HEALTH & ROUTINE',
    badgeColor: '#7C3AED',
    snippet: "Peak active coding hours: 11:00 PM – 4:00 AM. Powered by midnight debugging sessions, dark roast coffee, and sudden epiphanies when the code finally compiles."
  },
  {
    id: 'net-worth',
    queryText: 'banishwor net worth',
    title: 'Rich in Git Commits & Ideas 💸',
    badge: 'ESTIMATED ASSETS',
    badgeColor: '#059669',
    snippet: "Liquid assets: ₹250 in wallet, 50,000+ lines of code, infinite ambition, and an encrypted offline database of Meitei clan lineage."
  },
  {
    id: 'why-build',
    queryText: 'why banishwor build apps',
    title: 'Solving Real Local Problems 💡',
    badge: 'BUILDER PHILOSOPHY',
    badgeColor: '#0284C7',
    snippet: "\"Mainstream tech ignores regional needs. I build tools like Manipur Calculator (Pari, Loukrak), Yek Salai (clan heritage), and Khutsuman (worker hisab) so technology serves our community.\""
  },
  {
    id: 'who-is',
    queryText: 'who is banishwor athokpam',
    title: 'Banishwor Athokpam 🧑‍💻',
    badge: 'PROFILE OVERVIEW',
    badgeColor: '#4F46E5',
    snippet: "Software developer from Thoubal, Manipur. Master of Computer Applications (MU 7th State Rank, 80.30%), author of 2 published books, creator of Manipuri cultural tools, and educator.",
    hasProfileButton: true
  }
];

export const ConnectedSearch: React.FC<ConnectedSearchProps> = ({
  isOpen,
  onOpen,
  onClose,
  onLaunchApp
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const trimmed = query.trim().toLowerCase();

  // Run Universal Search Engine across apps, skills, books, heritage, and education
  const searchResults = trimmed === '' ? null : searchUniversal(trimmed);

  // Check if query matches any fun recent knowledge answer (Easter egg Google cards)
  const matchedAnswer = trimmed === '' ? null : funRecentQueries.find(f => 
    f.queryText.toLowerCase() === trimmed || 
    trimmed.includes(f.queryText.toLowerCase()) ||
    (f.id === 'messi' && trimmed.includes('messi')) ||
    (f.id === 'gf' && (trimmed.includes('gf') || trimmed.includes('single'))) ||
    (f.id === 'sleep' && trimmed.includes('sleep')) ||
    (f.id === 'net-worth' && trimmed.includes('worth')) ||
    (f.id === 'why-build' && (trimmed.includes('why') && trimmed.includes('build'))) ||
    (f.id === 'who-is' && (trimmed.includes('who is') || trimmed.includes('banishwor')))
  );

  const handleLaunchItem = (item: SearchableItem) => {
    onClose();
    onLaunchApp(item.appId);
  };

  return (
    <>
      {/* Dim & Blur Backdrop when Search is Active */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 400,
          background: 'rgba(15, 23, 42, 0.28)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* Unified Search Capsule & Connected Results Tray */}
      <div 
        style={{
          position: 'relative',
          zIndex: isOpen ? 500 : 10,
          width: '100%',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Morphing Search Input Bar */}
        <div 
          onClick={() => { if (!isOpen) onOpen(); }}
          style={{
            background: isOpen ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            borderRadius: isOpen ? '20px 20px 0 0' : '18px',
            border: isOpen ? '1.5px solid #4F46E5' : '1px solid rgba(255, 255, 255, 0.9)',
            borderBottom: isOpen ? '1px solid rgba(15, 23, 42, 0.08)' : undefined,
            boxShadow: isOpen 
              ? '0 12px 36px rgba(79, 70, 229, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset' 
              : '0 4px 14px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
            padding: '11px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            cursor: isOpen ? 'text' : 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <Search size={17} color={isOpen ? "#4F46E5" : "#64748B"} />
            
            {isOpen ? (
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, skills, books, research..."
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '13.5px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  color: '#0F172A'
                }}
              />
            ) : (
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#64748B',
                letterSpacing: '0.2px'
              }}>
                Search Banishwor...
              </span>
            )}
          </div>

          {/* Right Controls */}
          {isOpen ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {query && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear query"
                  style={{
                    border: 'none',
                    background: 'rgba(15, 23, 42, 0.06)',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748B',
                    cursor: 'pointer'
                  }}
                >
                  <X size={13} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="pressable"
                style={{
                  border: 'none',
                  background: 'rgba(241, 245, 249, 0.95)',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div style={{
              fontSize: '10.5px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: '#4F46E5',
              background: 'rgba(79, 70, 229, 0.08)',
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              LAUNCHER
            </div>
          )}
        </div>

        {/* Connected Liquid Glass Dropdown Tray */}
        {isOpen && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '420px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(32px) saturate(200%)',
              WebkitBackdropFilter: 'blur(32px) saturate(200%)',
              borderRadius: '0 0 24px 24px',
              border: '1.5px solid #4F46E5',
              borderTop: 'none',
              boxShadow: '0 20px 48px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
              overflowY: 'auto',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              animation: 'slideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {trimmed === '' ? (
              /* Google Search Style Recent Searches (Clean, No Spoilers) */
              <div style={{ padding: '2px 0 4px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  paddingLeft: '4px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#64748B',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.4px'
                  }}>
                    <Clock size={12} color="#94A3B8" />
                    <span>RECENT SEARCHES</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 500 }}>
                    Tap to search
                  </span>
                </div>

                {/* Google Recent Query Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {funRecentQueries.map(item => (
                    <div
                      key={item.id}
                      onClick={() => setQuery(item.queryText)}
                      className="pressable"
                      style={{
                        background: 'transparent',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(241, 245, 249, 0.8)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Clock size={15} color="#94A3B8" />
                        <span style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#1E293B',
                          letterSpacing: '0.1px'
                        }}>
                          {item.queryText}
                        </span>
                      </div>
                      <ArrowUpLeft size={15} color="#94A3B8" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* 1. Google Knowledge Graph Answer Card (When query matches funny easter egg) */}
                {matchedAnswer && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 0.95))',
                    borderRadius: '16px',
                    padding: '14px 16px',
                    border: `1.5px solid ${matchedAnswer.badgeColor}35`,
                    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)',
                    animation: 'slideDown 0.2s ease-out'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: matchedAnswer.badgeColor,
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.4px',
                      marginBottom: '4px'
                    }}>
                      <Sparkles size={12} />
                      <span>{matchedAnswer.badge}</span>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                      {matchedAnswer.title}
                    </h4>

                    <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, marginTop: '5px' }}>
                      {matchedAnswer.snippet}
                    </p>

                    {matchedAnswer.hasProfileButton && (
                      <button
                        onClick={() => { onClose(); onLaunchApp('about'); }}
                        className="pressable"
                        style={{
                          marginTop: '10px',
                          border: 'none',
                          background: '#4F46E5',
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>Open Full Profile</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                )}

                {/* 2. APPS & TOOLS SECTION */}
                {searchResults && searchResults.apps.length > 0 && (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#4F46E5',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      paddingLeft: '4px'
                    }}>
                      <FolderGit2 size={12} />
                      <span>APPS & TOOLS ({searchResults.apps.length})</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {searchResults.apps.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => handleLaunchItem(item)}
                          className="pressable"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '14px',
                            padding: '10px 12px',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '10px',
                              background: item.bgLight,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.title}
                              </div>
                              <div style={{ fontSize: '10.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.subtitle}
                              </div>
                            </div>
                          </div>

                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#4F46E5',
                            background: 'rgba(79, 70, 229, 0.08)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            flexShrink: 0
                          }}>
                            {item.actionLabel || 'Open'} <ArrowRight size={10} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. SKILLS & TECH STACK SECTION */}
                {searchResults && searchResults.skills.length > 0 && (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#059669',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      paddingLeft: '4px'
                    }}>
                      <Layers size={12} />
                      <span>SKILLS & STACK ({searchResults.skills.length})</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {searchResults.skills.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => handleLaunchItem(item)}
                          className="pressable"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '14px',
                            padding: '10px 12px',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px',
                            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                              {item.title}
                            </span>
                            <span style={{
                              fontSize: '9.5px',
                              fontWeight: 700,
                              color: item.color,
                              background: item.bgLight,
                              padding: '2px 7px',
                              borderRadius: '999px'
                            }}>
                              {item.subtitle.split('·')[0].trim()}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3 }}>
                            {item.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. BOOKS & PUBLICATIONS SECTION */}
                {searchResults && searchResults.books.length > 0 && (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#DC2626',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      paddingLeft: '4px'
                    }}>
                      <BookOpen size={12} />
                      <span>BOOKS & PUBLICATIONS ({searchResults.books.length})</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {searchResults.books.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => handleLaunchItem(item)}
                          className="pressable"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '14px',
                            padding: '10px 12px',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px'
                          }}
                        >
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#64748B', lineHeight: 1.3 }}>
                              {item.subtitle}
                            </div>
                          </div>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#DC2626',
                            background: '#FEF2F2',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}>
                            Read <ArrowRight size={10} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. HERITAGE & ROOTS SECTION */}
                {searchResults && searchResults.heritage.length > 0 && (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#4F46E5',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      paddingLeft: '4px'
                    }}>
                      <GitBranch size={12} />
                      <span>HERITAGE & ROOTS ({searchResults.heritage.length})</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {searchResults.heritage.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => handleLaunchItem(item)}
                          className="pressable"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '14px',
                            padding: '10px 12px',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px'
                          }}
                        >
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#64748B', lineHeight: 1.3 }}>
                              {item.subtitle}
                            </div>
                          </div>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#4F46E5',
                            background: '#EEF2FF',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}>
                            Explore <ArrowRight size={10} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. ACADEMIC & RESEARCH SECTION */}
                {searchResults && searchResults.education.length > 0 && (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: '#D97706',
                      letterSpacing: '0.5px',
                      marginBottom: '6px',
                      paddingLeft: '4px'
                    }}>
                      <GraduationCap size={12} />
                      <span>ACADEMIC & RESEARCH ({searchResults.education.length})</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {searchResults.education.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => handleLaunchItem(item)}
                          className="pressable"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '14px',
                            padding: '10px 12px',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px'
                          }}
                        >
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#64748B', lineHeight: 1.3 }}>
                              {item.subtitle}
                            </div>
                          </div>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#D97706',
                            background: '#FFFBEB',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}>
                            View <ArrowRight size={10} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State when no local matches */}
                {searchResults && searchResults.totalMatches === 0 && !matchedAnswer && (
                  <div style={{
                    padding: '24px 16px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Compass size={28} color="#94A3B8" />
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                      No local items matching "{query}"
                    </div>
                    <p style={{ fontSize: '11px', color: '#64748B', maxWidth: '240px', lineHeight: 1.4 }}>
                      Try searching for apps like "Calculator", skills like "Kotlin", or heritage like "Meitei".
                    </p>
                  </div>
                )}

                {/* External Google Web Search Fallback */}
                <div style={{ marginTop: '4px', paddingTop: '8px', borderTop: '1px solid rgba(15, 23, 42, 0.06)' }}>
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(query + ' Banishwor Athokpam')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="pressable"
                    style={{
                      background: 'rgba(238, 242, 255, 0.85)',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      border: '1px solid rgba(79, 70, 229, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Search size={13} color="#4F46E5" />
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#4F46E5' }}>
                        Search Google for "{query}"
                      </span>
                    </div>
                    <ExternalLink size={13} color="#4F46E5" />
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
