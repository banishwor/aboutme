import React, { useState } from 'react';
import { skills, skillCategories } from '../content/skills';
import { X, Layers } from 'lucide-react';

interface SkillsLayerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectName: string) => void;
}

export const SkillsLayer: React.FC<SkillsLayerProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 500,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'visibility 0.35s ease',
        visibility: isOpen ? 'visible' : 'hidden'
      }}
    >
      {/* Dim Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.35)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.35s ease'
        }}
      />

      {/* Slide-Up Sheet */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '86%',
          maxHeight: '86%',
          background: '#F8FAFC',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          borderTop: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 -16px 48px rgba(15, 23, 42, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Top Drag Handle & Close Bar */}
        <div style={{
          padding: '12px 20px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
          background: '#FFFFFF'
        }}>
          {/* Grab Pill */}
          <div 
            onClick={onClose}
            style={{
              width: '40px',
              height: '5px',
              borderRadius: '999px',
              background: '#CBD5E1',
              cursor: 'pointer'
            }} 
          />

          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4F46E5'
              }}>
                <Layers size={16} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: '#0F172A',
                  letterSpacing: '0.3px'
                }}>
                  SKILLS // ENGINE
                </h3>
                <p style={{ fontSize: '11px', color: '#64748B' }}>
                  Technologies mapped directly to real projects
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="pressable"
              aria-label="Close Skills layer"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                background: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div style={{
            width: '100%',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '4px',
            paddingTop: '4px',
            scrollbarWidth: 'none'
          }}>
            {skillCategories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="pressable"
                  style={{
                    padding: '5px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: active ? 700 : 500,
                    whiteSpace: 'nowrap',
                    border: active ? '1px solid #4F46E5' : '1px solid rgba(15, 23, 42, 0.08)',
                    background: active ? '#4F46E5' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#475569',
                    boxShadow: active ? '0 2px 8px rgba(79, 70, 229, 0.25)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Content List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {filteredSkills.map(skill => (
            <div 
              key={skill.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0F172A'
                }}>
                  {skill.name}
                </h4>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#64748B',
                  background: '#F1F5F9',
                  padding: '2px 8px',
                  borderRadius: '999px'
                }}>
                  {skill.category}
                </span>
              </div>

              {skill.description && (
                <p style={{
                  fontSize: '12px',
                  color: '#64748B',
                  marginBottom: '10px',
                  lineHeight: 1.4
                }}>
                  {skill.description}
                </p>
              )}

              {/* Linked Projects Evidence */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#94A3B8' }}>
                  Used in:
                </span>
                {skill.projects.map(proj => (
                  <span 
                    key={proj}
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: '#4F46E5',
                      background: 'rgba(79, 70, 229, 0.07)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div style={{ height: '24px' }} />
        </div>
      </div>
    </div>
  );
};
