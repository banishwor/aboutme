import React from 'react';
import { Search, Command } from 'lucide-react';

interface SearchBarProps {
  onOpenSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onOpenSearch }) => {
  return (
    <div 
      onClick={onOpenSearch}
      className="pressable liquid-glass"
      role="button"
      tabIndex={0}
      aria-label="Open BANI Search"
      style={{
        borderRadius: '18px',
        padding: '11px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        color: '#64748B'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <Search size={16} color="#94A3B8" />
        <span style={{
          fontSize: '13px',
          fontWeight: 500,
          color: '#94A3B8',
          letterSpacing: '0.2px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          Search Banishwor...
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        fontSize: '10px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        color: '#94A3B8',
        background: '#F1F5F9',
        padding: '3px 6px',
        borderRadius: '6px'
      }}>
        <Command size={10} />
        K
      </div>
    </div>
  );
};
