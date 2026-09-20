import React, { useState } from 'react';
import { Search, X, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { coreApps } from '../content/apps';
import { skills } from '../content/skills';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: (appId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onLaunchApp
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingApps = trimmed === '' ? [] : coreApps.filter(a => 
    a.name.toLowerCase().includes(trimmed) || 
    a.subtitle.toLowerCase().includes(trimmed)
  );

  const matchingSkills = trimmed === '' ? [] : skills.filter(s =>
    s.name.toLowerCase().includes(trimmed) ||
    s.category.toLowerCase().includes(trimmed) ||
    s.projects.some(p => p.toLowerCase().includes(trimmed))
  );

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 700,
        background: 'rgba(15, 23, 42, 0.28)',
        backdropFilter: 'blur(20px) saturate(190%)',
        WebkitBackdropFilter: 'blur(20px) saturate(190%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 14px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {/* Floating Liquid Glass Spotlight Island */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '400px',
          maxHeight: '85vh',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(32px) saturate(210%)',
          WebkitBackdropFilter: 'blur(32px) saturate(210%)',
          borderRadius: '28px',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 24px 60px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.7) inset, 0 1px 3px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'springPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Top Header & Search Input */}
        <div style={{
          padding: '16px 16px 12px',
          borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
          background: 'rgba(255, 255, 255, 0.4)'
        }}>
          {/* Liquid Glass Search Capsule */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            padding: '10px 14px',
            border: '1px solid rgba(79, 70, 229, 0.3)',
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8) inset'
          }}>
            <Search size={18} color="#4F46E5" />
            <input 
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Banishwor's apps, skills, books..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13.5px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                color: '#0F172A'
              }}
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                aria-label="Clear search"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={16} />
              </button>
            )}
            <button 
              onClick={onClose}
              className="pressable"
              style={{
                border: '1px solid rgba(15, 23, 42, 0.06)',
                background: 'rgba(241, 245, 249, 0.85)',
                borderRadius: '8px',
                padding: '4px 9px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#475569'
              }}
            >
              Esc
            </button>
          </div>
        </div>

        {/* Dynamic Results Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {trimmed === '' ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'rgba(79, 70, 229, 0.08)',
                color: '#4F46E5',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px'
              }}>
                <Sparkles size={20} />
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                BANI // SPOTLIGHT
              </p>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                Quick finder for projects, skills, books, and articles
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '14px'
              }}>
                {['Kotlin', 'Books', 'MCA', 'Manipur', 'Roots', 'Gaming'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="pressable"
                    style={{
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '999px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#4F46E5'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Matching Apps */}
              {matchingApps.length > 0 && (
                <div>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: '#64748B',
                    letterSpacing: '0.4px',
                    paddingLeft: '4px'
                  }}>
                    APPS ({matchingApps.length})
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    {matchingApps.map(app => (
                      <div 
                        key={app.id}
                        onClick={() => {
                          onClose();
                          onLaunchApp(app.id);
                        }}
                        className="pressable"
                        style={{
                          background: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(12px)',
                          borderRadius: '14px',
                          padding: '10px 14px',
                          border: '1px solid rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: app.color }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{app.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>{app.subtitle}</div>
                          </div>
                        </div>
                        <ArrowRight size={14} color="#94A3B8" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Skills */}
              {matchingSkills.length > 0 && (
                <div>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: '#64748B',
                    letterSpacing: '0.4px',
                    paddingLeft: '4px'
                  }}>
                    SKILLS & TECH ({matchingSkills.length})
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    {matchingSkills.map(skill => (
                      <div 
                        key={skill.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(12px)',
                          borderRadius: '14px',
                          padding: '10px 14px',
                          border: '1px solid rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{skill.name}</span>
                          <span style={{ fontSize: '10px', color: '#4F46E5', fontWeight: 700, background: 'rgba(79, 70, 229, 0.08)', padding: '2px 7px', borderRadius: '999px' }}>
                            {skill.category}
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>
                          Used in: {skill.projects.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Web Search Option */}
              <div style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px solid rgba(15, 23, 42, 0.08)' }}>
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(query + ' Banishwor Athokpam')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="pressable"
                  style={{
                    background: 'rgba(238, 242, 255, 0.8)',
                    borderRadius: '14px',
                    padding: '11px 14px',
                    border: '1px solid rgba(79, 70, 229, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={14} color="#4F46E5" />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F46E5' }}>
                      Search web for "{query}"
                    </span>
                  </div>
                  <ExternalLink size={14} color="#4F46E5" />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
