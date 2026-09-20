import React, { useState, useRef } from 'react';
import { coreApps } from '../content/apps';
import { X } from 'lucide-react';
import { AboutApp } from './apps/AboutApp';
import { WorkApp } from './apps/WorkApp';
import { EducationApp } from './apps/EducationApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { BooksApp } from './apps/BooksApp';
import { BaniApp } from './apps/BaniApp';
import { RootsApp } from './apps/RootsApp';
import { GamingApp } from './apps/GamingApp';

interface AppWindowProps {
  appId: string | null;
  onClose: () => void;
}

export const AppWindow: React.FC<AppWindowProps> = ({ appId, onClose }) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);

  if (!appId) return null;

  const app = coreApps.find(a => a.id === appId);
  if (!app) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;
    if (diff > 0) {
      // Elastic drag downwards
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 110) {
      onClose();
    }
    setDragY(0);
  };

  const isImmersiveApp = ['books', 'bani', 'projects', 'roots', 'gaming'].includes(appId);

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 600,
        background: appId === 'projects' 
          ? 'rgba(248, 250, 252, 0.68)' 
          : (appId === 'roots' ? '#0B0F19' : '#F8FAFC'),
        backdropFilter: appId === 'projects' ? 'blur(32px) saturate(190%)' : undefined,
        WebkitBackdropFilter: appId === 'projects' ? 'blur(32px) saturate(190%)' : undefined,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
        transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        touchAction: 'pan-y'
      }}
    >
      {/* App Header Bar with Tactile Drag Handle (Hidden for immersive apps like Books) */}
      {!isImmersiveApp && (
        <div 
          style={{
            background: '#FFFFFF',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)'
          }}
        >
          {/* Top Swipe-Down Drag Pill Handle */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0 2px',
              cursor: 'grab',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '40px',
              height: '5px',
              borderRadius: '999px',
              background: '#CBD5E1'
            }} />
          </div>

          {/* Header Content Row */}
          <div style={{
            padding: '8px 18px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: app.bgLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: app.color }} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)' }}>
                  {app.name.toUpperCase()}
                </h3>
                <p style={{ fontSize: '11px', color: '#64748B' }}>
                  {app.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="pressable"
              aria-label="Close application"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#F1F5F9',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* App Body Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: isImmersiveApp ? '0' : '16px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {appId === 'about' && <AboutApp />}
        {appId === 'work' && <WorkApp />}
        {appId === 'education' && <EducationApp />}
        {appId === 'projects' && (
          <ProjectsApp 
            onClose={onClose} 
            onTouchStartHandle={handleTouchStart}
            onTouchMoveHandle={handleTouchMove}
            onTouchEndHandle={handleTouchEnd}
          />
        )}
        {appId === 'books' && (
          <BooksApp 
            onClose={onClose} 
            onTouchStartHandle={handleTouchStart}
            onTouchMoveHandle={handleTouchMove}
            onTouchEndHandle={handleTouchEnd}
          />
        )}
        {appId === 'bani' && (
          <BaniApp 
            onClose={onClose} 
            onTouchStartHandle={handleTouchStart}
            onTouchMoveHandle={handleTouchMove}
            onTouchEndHandle={handleTouchEnd}
          />
        )}
        {appId === 'roots' && (
          <RootsApp 
            onClose={onClose} 
            onTouchStartHandle={handleTouchStart}
            onTouchMoveHandle={handleTouchMove}
            onTouchEndHandle={handleTouchEnd}
          />
        )}
        {appId === 'gaming' && (
          <GamingApp 
            onClose={onClose} 
            onTouchStartHandle={handleTouchStart}
            onTouchMoveHandle={handleTouchMove}
            onTouchEndHandle={handleTouchEnd}
          />
        )}

        {/* General Placeholder for upcoming phases (lab, arcade) */}
        {!['about', 'work', 'education', 'projects', 'books', 'bani', 'roots', 'gaming'].includes(appId) && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px 18px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            margin: 'auto 0'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: app.bgLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
            }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: app.color }} />
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
              {app.name} Application
            </h4>

            <p style={{ fontSize: '12.5px', color: '#64748B', maxWidth: '280px', lineHeight: 1.5 }}>
              This application is scheduled in the phased roadmap. Full interactive features, specialized UI models, and media archives will be unlocked in its dedicated milestone.
            </p>

            <div style={{
              marginTop: '4px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#F1F5F9',
              fontSize: '10.5px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: '#475569'
            }}>
              STATUS: READY FOR DEDICATED PHASE
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
