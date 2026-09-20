import React from 'react';
import { profile } from '../../content/profile';
import { 
  FileText, 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Instagram, 
  MapPin, 
  Sparkles, 
  Trophy, 
  Coins, 
  BookOpen, 
  Film, 
  Gamepad2, 
  ExternalLink,
  Heart
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Coins,
  BookOpen,
  Film,
  MapPin,
  Gamepad2
};

export const AboutApp: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingBottom: '24px'
    }}>
      {/* Profile Hero Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '20px 18px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative background plume */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(79, 70, 229, 0) 70%)',
          pointerEvents: 'none'
        }} />

        {/* 64px Avatar with Status Ring */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <img 
            src={profile.avatarUrl} 
            alt={profile.name}
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '22px',
              objectFit: 'cover',
              border: '2px solid rgba(15, 23, 42, 0.08)',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.1)'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68"><rect width="68" height="68" fill="%234F46E5"/><text x="34" y="42" font-family="sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">BA</text></svg>';
            }}
          />
          <span 
            title="Available for opportunities"
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              background: '#10B981',
              border: '2.5px solid #FFFFFF',
              boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)'
            }} 
          />
        </div>

        {/* Name & Academic Rank Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: '#0F172A',
            letterSpacing: '0.2px'
          }}>
            {profile.name}
          </h2>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            color: '#4F46E5',
            background: 'rgba(79, 70, 229, 0.08)',
            padding: '2px 8px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            <Sparkles size={10} />
            MCA 80.3%
          </span>
        </div>

        {/* Lead Title & Origin */}
        <div style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#4F46E5',
          marginBottom: '4px'
        }}>
          {profile.leadTitle}
        </div>

        <div style={{
          fontSize: '11.5px',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '16px'
        }}>
          <MapPin size={12} color="#94A3B8" />
          <span>{profile.location}</span>
        </div>

        {/* Quick Action Touch Chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          width: '100%'
        }}>
          <a 
            href={profile.resumeUrl}
            download
            className="pressable"
            style={{
              background: '#4F46E5',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '8px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.28)'
            }}
          >
            <FileText size={14} />
            <span>Resume (PDF)</span>
          </a>

          <a 
            href={`mailto:${profile.email}`}
            className="pressable"
            style={{
              background: 'rgba(241, 245, 249, 0.95)',
              color: '#1E293B',
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(15, 23, 42, 0.06)'
            }}
          >
            <Mail size={14} color="#4F46E5" />
            <span>Email</span>
          </a>

          <a 
            href={profile.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="pressable"
            style={{
              background: 'rgba(241, 245, 249, 0.95)',
              color: '#1E293B',
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(15, 23, 42, 0.06)'
            }}
          >
            <Linkedin size={14} color="#0A66C2" />
            <span>LinkedIn</span>
          </a>

          <a 
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="pressable"
            style={{
              background: 'rgba(241, 245, 249, 0.95)',
              color: '#1E293B',
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(15, 23, 42, 0.06)'
            }}
          >
            <Github size={14} color="#0F172A" />
            <span>GitHub</span>
          </a>

          <a 
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="pressable"
            style={{
              background: 'rgba(241, 245, 249, 0.95)',
              color: '#1E293B',
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(15, 23, 42, 0.06)'
            }}
          >
            <Instagram size={14} color="#E1306C" />
            <span>Instagram</span>
          </a>

          <a 
            href={profile.twitter}
            target="_blank"
            rel="noreferrer"
            className="pressable"
            style={{
              background: 'rgba(241, 245, 249, 0.95)',
              color: '#1E293B',
              borderRadius: '12px',
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(15, 23, 42, 0.06)'
            }}
          >
            <Twitter size={14} color="#1DA1F2" />
            <span>X / Twitter</span>
          </a>
        </div>
      </div>

      {/* Quick Stats Metrics Grid (4-Card Matrix) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px'
      }}>
        {profile.stats.map(stat => (
          <div 
            key={stat.label}
            style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '14px',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: '0 2px 10px rgba(15, 23, 42, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.4px', fontFamily: 'var(--font-mono)' }}>
              {stat.label}
            </span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '4px 0 2px', fontFamily: 'var(--font-mono)' }}>
              {stat.value}
            </div>
            {stat.hint && (
              <span style={{ fontSize: '10.5px', color: '#4F46E5', fontWeight: 600 }}>
                {stat.hint}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Bio Narrative Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '18px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.02)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: '#4F46E5',
          letterSpacing: '0.5px',
          marginBottom: '8px'
        }}>
          <Sparkles size={13} />
          <span>ABOUT // PHILOSOPHY</span>
        </div>

        <p style={{
          fontSize: '12.5px',
          color: '#334155',
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          {profile.detailedBio}
        </p>
      </div>

      {/* Verified Legacy Favourites & Lifestyle Deck */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: '#0F172A',
          letterSpacing: '0.5px',
          paddingLeft: '4px'
        }}>
          <Heart size={13} color="#E11D48" />
          <span>FAVOURITES & LIFESTYLE</span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {profile.favorites.map(fav => {
            const FavIcon = iconMap[fav.iconName] || Sparkles;

            return (
              <div
                key={fav.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '14px 16px',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: fav.bgLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <FavIcon size={15} color={fav.color} />
                    </div>

                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#0F172A'
                    }}>
                      {fav.title}
                    </h4>
                  </div>

                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: fav.color,
                    background: fav.bgLight,
                    padding: '2px 7px',
                    borderRadius: '6px',
                    flexShrink: 0
                  }}>
                    {fav.category}
                  </span>
                </div>

                <p style={{
                  fontSize: '11.5px',
                  color: '#475569',
                  lineHeight: 1.45,
                  paddingLeft: '36px'
                }}>
                  {fav.description}
                </p>

                {fav.link && (
                  <div style={{ paddingLeft: '36px', marginTop: '2px' }}>
                    <a 
                      href={fav.link}
                      target="_blank"
                      rel="noreferrer"
                      className="pressable"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: fav.color,
                        textDecoration: 'none'
                      }}
                    >
                      <span>{fav.linkText || 'Learn More'}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
