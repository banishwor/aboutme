import React from 'react';
import { SpaceId } from '../content/apps';
import { Layers } from 'lucide-react';

interface TopBarProps {
  currentSpace: SpaceId;
  onOpenSkills: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentSpace, onOpenSkills }) => {
  return (
    <header style={{
      padding: '12px 18px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      userSelect: 'none',
      background: 'transparent'
    }}>
      {/* Brand Monogram */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 700,
        color: '#0F172A',
        letterSpacing: '0.5px'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '2px',
          background: '#4F46E5',
          display: 'inline-block'
        }} />
        BANI // OS
      </div>

      {/* Active Space Indicator */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 700,
        color: '#64748B',
        background: '#FFFFFF',
        padding: '3px 10px',
        borderRadius: '999px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
        letterSpacing: '0.8px'
      }}>
        {currentSpace}
      </div>

      {/* Skills Trigger Icon */}
      <button
        onClick={onOpenSkills}
        className="pressable"
        aria-label="Open Skills drawer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: '#FFFFFF',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          borderRadius: '999px',
          padding: '4px 8px',
          color: '#4F46E5',
          fontSize: '11px',
          fontWeight: 700,
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
        }}
      >
        <Layers size={13} />
        <span>Skills</span>
      </button>
    </header>
  );
};
