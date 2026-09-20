import React from 'react';
import { 
  User, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  BookOpen, 
  Feather, 
  GitBranch, 
  Gamepad2, 
  FlaskConical, 
  Sparkles,
  LucideIcon
} from 'lucide-react';
import { AppDefinition } from '../content/apps';

interface AppTileProps {
  app: AppDefinition;
  onLaunch: (appId: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  BookOpen,
  Feather,
  GitBranch,
  Gamepad2,
  FlaskConical,
  Sparkles
};

export const AppTile: React.FC<AppTileProps> = ({ app, onLaunch }) => {
  const IconComponent = iconMap[app.iconName] || Sparkles;

  return (
    <div
      onClick={() => onLaunch(app.id)}
      className="pressable"
      role="button"
      tabIndex={0}
      aria-label={`Open ${app.name} application`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '4px 2px',
        gap: '5px',
        width: '100%',
        maxWidth: '72px'
      }}
    >
      {/* Authentic Mobile App Squircle Tile */}
      <div style={{
        width: '54px',
        height: '54px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.07), 0 1px 3px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease'
      }}>
        {/* Soft chromatic inner gradient tint */}
        <div style={{
          position: 'absolute',
          inset: '3px',
          borderRadius: '13px',
          background: `linear-gradient(135deg, ${app.bgLight} 0%, rgba(255, 255, 255, 0.6) 100%)`,
          opacity: 0.9
        }} />

        {/* Crisp App Icon Glyph */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconComponent size={25} color={app.color} strokeWidth={2.1} />
        </div>
      </div>

      {/* App Name and Descriptive Subtitle */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%'
      }}>
        <span style={{
          fontSize: '11.5px',
          fontWeight: 700,
          color: '#0F172A',
          letterSpacing: '-0.1px',
          lineHeight: 1.2,
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
        }}>
          {app.name}
        </span>
        <span style={{
          fontSize: '9px',
          fontWeight: 500,
          color: '#475569',
          letterSpacing: '-0.1px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '68px',
          marginTop: '1px'
        }}>
          {app.subtitle}
        </span>
      </div>
    </div>
  );
};
