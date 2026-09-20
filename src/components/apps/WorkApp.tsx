import React from 'react';
import { workExperience } from '../../content/work';
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal } from 'lucide-react';

export const WorkApp: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingBottom: '24px'
    }}>
      {/* Work Overview Banner */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '18px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px'
        }}>
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
            <Briefcase size={16} />
          </div>
          <div>
            <h3 style={{
              fontSize: '15px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: '#0F172A'
            }}>
              CAREER & INSTRUCTION
            </h3>
          </div>
        </div>

        <p style={{
          fontSize: '12px',
          color: '#64748B',
          lineHeight: 1.5,
          marginTop: '4px'
        }}>
          A dual trajectory combining production native Android and web software engineering with hands-on computer science instruction and laboratory mentorship.
        </p>

        {/* Quick Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginTop: '14px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(15, 23, 42, 0.06)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#4F46E5', fontFamily: 'var(--font-mono)' }}>
              3+ Yrs
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748B', fontWeight: 600 }}>
              Experience
            </div>
          </div>
          <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(15, 23, 42, 0.06)', borderRight: '1px solid rgba(15, 23, 42, 0.06)' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-mono)' }}>
              100+
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748B', fontWeight: 600 }}>
              Students Mentored
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-mono)' }}>
              4+ Apps
            </div>
            <div style={{ fontSize: '9.5px', color: '#64748B', fontWeight: 600 }}>
              Shipped Solutions
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Vertical Timeline */}
      <div style={{
        position: 'relative',
        paddingLeft: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Timeline Continuous Spine */}
        <div style={{
          position: 'absolute',
          top: '12px',
          bottom: '24px',
          left: '7px',
          width: '2px',
          background: 'linear-gradient(to bottom, #4F46E5 0%, #CBD5E1 90%)',
          borderRadius: '999px'
        }} />

        {workExperience.map((item) => (
          <div key={item.id} style={{ position: 'relative' }}>
            {/* Timeline Node Bullet */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '-22px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: `3px solid ${item.current ? '#10B981' : '#4F46E5'}`,
              boxShadow: item.current ? '0 0 8px rgba(16, 185, 129, 0.6)' : '0 0 6px rgba(79, 70, 229, 0.3)',
              zIndex: 2
            }} />

            {/* Experience Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {/* Card Header: Role & Period Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '14.5px',
                    fontWeight: 800,
                    color: '#0F172A',
                    lineHeight: 1.3
                  }}>
                    {item.role}
                  </h4>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#4F46E5',
                    marginTop: '2px'
                  }}>
                    {item.organization}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  flexShrink: 0
                }}>
                  {item.current && (
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#10B981',
                      background: 'rgba(16, 185, 129, 0.1)',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      letterSpacing: '0.4px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      ACTIVE
                    </span>
                  )}
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: '#475569',
                    background: '#F1F5F9',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Sub-meta: Date & Location */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '11px',
                color: '#64748B',
                borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
                paddingBottom: '8px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} color="#94A3B8" />
                  {item.period}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <MapPin size={12} color="#94A3B8" />
                  {item.location}
                </span>
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

              {/* Responsibilities Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-mono)' }}>
                  Key Contributions & Responsibilities
                </span>
                {item.responsibilities.map((resp, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <CheckCircle2 size={13} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.4 }}>
                      {resp}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies Pills */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                paddingTop: '6px',
                borderTop: '1px solid rgba(15, 23, 42, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginRight: '4px' }}>
                  <Terminal size={11} color="#94A3B8" />
                </div>
                {item.technologies.map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#475569',
                      background: '#F8FAFC',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      padding: '2px 7px',
                      borderRadius: '6px'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
