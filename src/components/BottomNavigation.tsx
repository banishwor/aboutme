import React from 'react';
import { SpaceId, homeSpaces } from '../content/apps';
import { ChevronUp } from 'lucide-react';

interface BottomNavigationProps {
  currentSpace: SpaceId;
  onSelectSpace: (space: SpaceId) => void;
  onOpenSkills: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentSpace,
  onSelectSpace,
  onOpenSkills
}) => {
  return (
    <nav style={{
      padding: '8px 18px 14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      userSelect: 'none',
      background: 'transparent'
    }}>
      {/* Swipe up for Dimensions tactile hint pill */}
      <button
        onClick={onOpenSkills}
        className="pressable"
        aria-label="Swipe up or tap for Dimensions"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(255, 255, 255, 0.94)',
          border: '1px solid rgba(79, 70, 229, 0.18)',
          borderRadius: '999px',
          padding: '4px 14px',
          boxShadow: '0 2px 10px rgba(79, 70, 229, 0.08)',
          color: '#1E293B',
          fontSize: '11px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        <ChevronUp size={13} color="#4F46E5" />
        <span>Swipe up for Dimensions ✦</span>
      </button>

      {/* Spatial Space Dots Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 10px',
        background: '#FFFFFF',
        borderRadius: '999px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 1px 4px rgba(15, 23, 42, 0.03)'
      }}>
        {homeSpaces.map((space) => {
          const active = currentSpace === space.id;
          return (
            <button
              key={space.id}
              onClick={() => onSelectSpace(space.id)}
              className="pressable"
              aria-label={`Go to ${space.label} space`}
              style={{
                width: active ? '20px' : '7px',
                height: '7px',
                borderRadius: '999px',
                background: active ? '#4F46E5' : '#CBD5E1',
                border: 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          );
        })}
      </div>
    </nav>
  );
};
