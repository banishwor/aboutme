import React, { useState } from 'react';
import { degrees, researchAndCertifications } from '../../content/education';
import { GraduationCap, Award, Cpu, CheckCircle2, Building, Calendar, FileText, ExternalLink, X, Check } from 'lucide-react';

export const EducationApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'degrees' | 'research'>('degrees');
  const [viewingDoc, setViewingDoc] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      paddingBottom: '24px',
      position: 'relative'
    }}>
      {/* Lightbox Modal for Official Verification Documents */}
      {viewingDoc && (
        <div 
          onClick={() => setViewingDoc(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.78)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '480px',
              maxHeight: '90vh',
              background: '#FFFFFF',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '14px 16px',
              background: '#F8FAFC',
              borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: '#FFFBEB',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D97706'
                }}>
                  <Award size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                    {viewingDoc.title}
                  </h4>
                  <p style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>
                    {viewingDoc.subtitle || 'Official Academic Examination Gazette'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingDoc(null)}
                className="pressable"
                aria-label="Close document preview"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#EDF2F7',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Verified Highlight Callout */}
            <div style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#D97706',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Check size={11} strokeWidth={3} />
              </div>
              <div style={{ fontSize: '11px', color: '#92400E', fontWeight: 600, lineHeight: 1.35 }}>
                <span style={{ fontWeight: 800 }}>Verified Record: </span>
                Roll No. 2036 · BANISHWOR ATHOKPAM · Rank 7 · First Division with Distinction (2651 Marks)
              </div>
            </div>

            {/* Scrollable Document Image Container */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              background: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={viewingDoc.url} 
                alt={viewingDoc.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                  display: 'block'
                }}
              />
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '10px 16px',
              background: '#FFFFFF',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '10.5px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                MANIPUR UNIVERSITY · EXAM/MCA(6)/2023
              </span>
              <a
                href={viewingDoc.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#4F46E5',
                  textDecoration: 'none'
                }}
              >
                <span>Open Full Image</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Segmented Dual-Tab Switcher */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '4px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4px',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
      }}>
        <button
          onClick={() => setActiveTab('degrees')}
          className="pressable"
          style={{
            border: 'none',
            background: activeTab === 'degrees' ? '#4F46E5' : 'transparent',
            color: activeTab === 'degrees' ? '#FFFFFF' : '#475569',
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '11.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'degrees' ? '0 2px 8px rgba(79, 70, 229, 0.28)' : 'none'
          }}
        >
          <GraduationCap size={14} />
          <span>Degrees & Schooling</span>
        </button>

        <button
          onClick={() => setActiveTab('research')}
          className="pressable"
          style={{
            border: 'none',
            background: activeTab === 'research' ? '#4F46E5' : 'transparent',
            color: activeTab === 'research' ? '#FFFFFF' : '#475569',
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '11.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'research' ? '0 2px 8px rgba(79, 70, 229, 0.28)' : 'none'
          }}
        >
          <Cpu size={14} />
          <span>Research & HPC</span>
        </button>
      </div>

      {/* TAB 1: Degrees & Schooling */}
      {activeTab === 'degrees' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {degrees.map((item, index) => {
            const isFeatured = index === 0; // MCA featured card

            return (
              <div
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: isFeatured ? '18px' : '16px',
                  border: isFeatured ? '1.5px solid rgba(217, 119, 6, 0.35)' : '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: isFeatured ? '0 6px 20px rgba(217, 119, 6, 0.06)' : '0 2px 8px rgba(15, 23, 42, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Gold Highlight Tag for MCA 7th State Rank */}
                {isFeatured && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                    color: '#FFFFFF',
                    fontSize: '9.5px',
                    fontWeight: 800,
                    padding: '3px 12px',
                    borderRadius: '0 0 0 14px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Award size={11} />
                    <span>STATE MERIT RANK</span>
                  </div>
                )}

                {/* Degree Title & Score */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px',
                  paddingRight: isFeatured ? '120px' : '0'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '14.5px',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.3
                    }}>
                      {item.degree}
                    </h4>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: item.color,
                      marginTop: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Building size={12} />
                      <span>{item.institution}</span>
                    </div>
                  </div>
                </div>

                {/* Score & Board Meta Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: item.bgLight,
                  borderRadius: '12px',
                  padding: '8px 12px',
                  margin: '4px 0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: item.color, fontFamily: 'var(--font-mono)' }}>
                      {item.score}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569' }}>
                      ({item.division})
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#64748B' }}>
                    <Calendar size={12} color="#94A3B8" />
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '12px',
                  color: '#475569',
                  lineHeight: 1.45,
                  fontWeight: 500
                }}>
                  {item.description}
                </p>

                {/* Key Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '2px' }}>
                  {item.highlights.map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <CheckCircle2 size={12} color={item.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '11px', color: '#334155', lineHeight: 1.4 }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Official University Document Verification Button */}
                {item.officialDocumentUrl && (
                  <button
                    onClick={() => setViewingDoc({
                      url: item.officialDocumentUrl!,
                      title: item.officialDocumentTitle || 'Official University Gazette',
                      subtitle: 'Manipur University Result Notification (No. MU/EXAM/MCA(6)/2023)'
                    })}
                    className="pressable"
                    style={{
                      marginTop: '6px',
                      alignSelf: 'flex-start',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                      border: '1.5px solid rgba(217, 119, 6, 0.35)',
                      borderRadius: '11px',
                      padding: '8px 14px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#B45309',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(217, 119, 6, 0.08)'
                    }}
                  >
                    <FileText size={13} color="#D97706" />
                    <span>View Official Merit Gazette (MU Proof)</span>
                    <ExternalLink size={12} color="#D97706" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Research & Advanced Certifications */}
      {activeTab === 'research' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {researchAndCertifications.map(item => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '18px',
                border: `1.5px solid ${item.color}30`,
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {/* Category Badge & Date */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 800,
                  color: item.color,
                  background: item.bgLight,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.4px'
                }}>
                  {item.category.toUpperCase()}
                </span>

                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Calendar size={12} color="#94A3B8" />
                  {item.date}
                </span>
              </div>

              {/* Title & Organization */}
              <div>
                <h4 style={{
                  fontSize: '14.5px',
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1.3
                }}>
                  "{item.title}"
                </h4>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: item.color,
                  marginTop: '3px'
                }}>
                  {item.organization}
                </div>
              </div>

              {/* Overview Description */}
              <p style={{
                fontSize: '12px',
                color: '#475569',
                lineHeight: 1.5,
                fontWeight: 500
              }}>
                {item.description}
              </p>

              {/* Empirical Findings & Practical Modules */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '12px',
                border: '1px solid rgba(15, 23, 42, 0.05)'
              }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Key Research & Technical Modules
                </span>
                {item.keyPoints.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <CheckCircle2 size={12} color={item.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '11px', color: '#334155', lineHeight: 1.4 }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Domain Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginTop: '2px'
              }}>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: item.color,
                      background: item.bgLight,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
