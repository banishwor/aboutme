import React, { useState, useMemo } from 'react';
import { projects, ProjectItem } from '../../content/projects';
import { 
  Calculator, 
  Calendar, 
  Users, 
  GitBranch, 
  Building, 
  Cpu, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare,
  X,
  FolderGit2,
  Play,
  Info,
  Search
} from 'lucide-react';
import { ManipurCalculatorMiniApp } from './demos/ManipurCalculatorMiniApp';
import { ManipuriCalendarMiniApp } from './demos/ManipuriCalendarMiniApp';
import { YekSalaiMiniApp } from './demos/YekSalaiMiniApp';
import { KhutsumanMiniApp } from './demos/KhutsumanMiniApp';

interface ProjectsAppProps {
  onClose?: () => void;
  onTouchStartHandle?: (e: React.TouchEvent) => void;
  onTouchMoveHandle?: (e: React.TouchEvent) => void;
  onTouchEndHandle?: () => void;
}

const ProjectAppIcon: React.FC<{ project: ProjectItem; size?: number }> = ({ project, size = 32 }) => {
  const [loadFailed, setLoadFailed] = useState(false);

  if (project.iconPath && !loadFailed) {
    return (
      <img 
        src={project.iconPath} 
        alt={`${project.title} icon`} 
        onError={() => setLoadFailed(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    );
  }

  switch (project.iconFallback) {
    case 'Calculator': return <Calculator size={size} color={project.accentColor} />;
    case 'Calendar': return <Calendar size={size} color={project.accentColor} />;
    case 'Users': return <Users size={size} color={project.accentColor} />;
    case 'GitBranch': return <GitBranch size={project.accentColor ? size : 22} color={project.accentColor} />;
    case 'Building': return <Building size={size} color={project.accentColor} />;
    case 'Cpu': return <Cpu size={size} color={project.accentColor} />;
    case 'Sparkles': return <Sparkles size={size} color={project.accentColor} />;
    default: return <FolderGit2 size={size} color={project.accentColor} />;
  }
};

export const ProjectsApp: React.FC<ProjectsAppProps> = ({
  onClose,
  onTouchStartHandle,
  onTouchMoveHandle,
  onTouchEndHandle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Production' | 'Archives'>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);
  const [activeDemoAppId, setActiveDemoAppId] = useState<string | null>(null);

  // Filter projects by search query and category
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === 'Production') {
        return project.category !== 'Engineering Archives';
      }
      if (selectedFilter === 'Archives') {
        return project.category === 'Engineering Archives';
      }
      return true;
    });
  }, [searchQuery, selectedFilter]);

  const productionMatches = filteredProjects.filter(p => p.category !== 'Engineering Archives');
  const archiveMatches = filteredProjects.filter(p => p.category === 'Engineering Archives');

  const getStatusBadge = (status: ProjectItem['status'], label: string) => {
    switch (status) {
      case 'Active':
        return {
          bg: '#ECFDF5',
          color: '#059669',
          border: 'rgba(5, 150, 105, 0.25)',
          dot: '#10B981',
          tag: 'PROD',
          text: label.toUpperCase()
        };
      case 'Beta':
        return {
          bg: '#EFF6FF',
          color: '#2563EB',
          border: 'rgba(37, 99, 235, 0.25)',
          dot: '#3B82F6',
          tag: 'BETA',
          text: label.toUpperCase()
        };
      case 'Prototype':
        return {
          bg: '#FFF7ED',
          color: '#C2410C',
          border: 'rgba(194, 65, 12, 0.25)',
          dot: '#F97316',
          tag: 'PAUSED',
          text: label.toUpperCase()
        };
      case 'Archived':
      default:
        return {
          bg: '#F1F5F9',
          color: '#475569',
          border: 'rgba(100, 116, 139, 0.2)',
          dot: '#94A3B8',
          tag: 'R&D',
          text: label.toUpperCase()
        };
    }
  };

  const handleLaunchDemo = (project: ProjectItem) => {
    if (project.id === 'manipur-calculator') {
      setActiveDemoAppId('manipur-calculator');
      return;
    }
    if (project.id === 'manipuri-calendar') {
      setActiveDemoAppId('manipuri-calendar');
      return;
    }
    if (project.id === 'yek-salai') {
      setActiveDemoAppId('yek-salai');
      return;
    }
    if (project.id === 'khutsuman') {
      setActiveDemoAppId('khutsuman');
      return;
    }
    setDemoNotice(`⚡ Mini-App Engine for ${project.title} will open right here in Phase 7B!`);
    setTimeout(() => {
      setDemoNotice(null);
    }, 3500);
  };

  if (activeDemoAppId === 'manipur-calculator') {
    return (
      <ManipurCalculatorMiniApp 
        onBack={() => setActiveDemoAppId(null)}
        onHome={() => {
          setActiveDemoAppId(null);
          setActiveProject(null);
          if (onClose) onClose();
        }}
      />
    );
  }

  if (activeDemoAppId === 'manipuri-calendar') {
    return (
      <ManipuriCalendarMiniApp 
        onBack={() => setActiveDemoAppId(null)}
        onHome={() => {
          setActiveDemoAppId(null);
          setActiveProject(null);
          if (onClose) onClose();
        }}
      />
    );
  }

  if (activeDemoAppId === 'yek-salai') {
    return (
      <YekSalaiMiniApp 
        onBack={() => setActiveDemoAppId(null)}
        onHome={() => {
          setActiveDemoAppId(null);
          setActiveProject(null);
          if (onClose) onClose();
        }}
      />
    );
  }

  if (activeDemoAppId === 'khutsuman') {
    return (
      <KhutsumanMiniApp 
        onBack={() => setActiveDemoAppId(null)}
        onHome={() => {
          setActiveDemoAppId(null);
          setActiveProject(null);
          if (onClose) onClose();
        }}
      />
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      padding: '4px 16px 20px',
      overflow: 'hidden'
    }}>
      {/* Top Touch Drag Handle Pill */}
      <div 
        onTouchStart={onTouchStartHandle}
        onTouchMove={onTouchMoveHandle}
        onTouchEnd={onTouchEndHandle}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '6px 0 10px',
          cursor: 'grab',
          userSelect: 'none'
        }}
      >
        <div style={{
          width: '38px',
          height: '4.5px',
          borderRadius: '999px',
          background: 'rgba(15, 23, 42, 0.25)'
        }} />
      </div>

      {/* Minimal Header Controls (Drawer Title + Close Button) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '8px',
            background: 'rgba(79, 70, 229, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FolderGit2 size={14} color="#4F46E5" />
          </div>
          <div>
            <h3 style={{
              fontSize: '13.5px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: '#0F172A',
              letterSpacing: '0.4px'
            }}>
              APP DRAWER
            </h3>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="pressable"
            aria-label="Close drawer"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.05)'
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Floating OS Search Capsule */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 18px rgba(15, 23, 42, 0.05)',
        marginBottom: '12px'
      }}>
        <Search size={16} color="#64748B" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 7 projects & archives..."
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '12.5px',
            color: '#0F172A',
            fontFamily: 'inherit'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              border: 'none',
              background: '#E2E8F0',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569'
            }}
          >
            <X size={11} />
          </button>
        )}
      </div>

      {/* Subtle Category Pills (Floating on Wallpaper) */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '16px',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        {(['All', 'Production', 'Archives'] as const).map(filter => {
          const isSelected = selectedFilter === filter;
          const count = filter === 'All' 
            ? projects.length 
            : filter === 'Production' 
            ? projects.filter(p => p.category !== 'Engineering Archives').length 
            : projects.filter(p => p.category === 'Engineering Archives').length;

          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className="pressable"
              style={{
                border: isSelected ? '1px solid #4F46E5' : '1px solid rgba(255, 255, 255, 0.8)',
                background: isSelected ? '#4F46E5' : 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(10px)',
                color: isSelected ? '#FFFFFF' : '#475569',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: isSelected ? '0 2px 8px rgba(79, 70, 229, 0.25)' : '0 1px 3px rgba(15, 23, 42, 0.03)'
              }}
            >
              <span>{filter === 'All' ? 'All' : filter}</span>
              <span style={{
                fontSize: '9.5px',
                padding: '1px 5px',
                borderRadius: '999px',
                background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.06)',
                color: isSelected ? '#FFFFFF' : '#64748B',
                fontFamily: 'var(--font-mono)'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Drawer Grid Canvas (Floating Directly on Blurred Wallpaper) */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '24px'
      }}>
        {/* ================= 1. PRODUCTION APPS ================= */}
        {productionMatches.length > 0 && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              rowGap: '16px'
            }}>
              {productionMatches.map(project => {
                const statusBadge = getStatusBadge(project.status, project.statusLabel);

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (project.id === 'manipur-calculator') {
                        setActiveDemoAppId('manipur-calculator');
                      } else if (project.id === 'manipuri-calendar') {
                        setActiveDemoAppId('manipuri-calendar');
                      } else if (project.id === 'yek-salai') {
                        setActiveDemoAppId('yek-salai');
                      } else if (project.id === 'khutsuman') {
                        setActiveDemoAppId('khutsuman');
                      } else {
                        setActiveProject(project);
                      }
                    }}
                    className="pressable"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {/* 58px Floating Squircle */}
                    <div style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '17px',
                      background: project.bgLight,
                      border: '1px solid rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: '6px'
                    }}>
                      <ProjectAppIcon project={project} size={26} />

                      {/* Small Status Pill Dot */}
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: statusBadge.dot,
                        border: '1.5px solid #FFFFFF'
                      }} />
                    </div>

                    {/* App Title */}
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      maxWidth: '74px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      {project.title}
                    </span>

                    {/* Tag */}
                    <span style={{
                      fontSize: '9px',
                      color: '#64748B',
                      marginTop: '2px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600
                    }}>
                      {statusBadge.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Minimal Divider between Production and Archives when showing All */}
        {selectedFilter === 'All' && productionMatches.length > 0 && archiveMatches.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '4px 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(15, 23, 42, 0.1)' }} />
            <span style={{
              fontSize: '9.5px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: '#94A3B8',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              R&D & Archives
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(15, 23, 42, 0.1)' }} />
          </div>
        )}

        {/* ================= 2. ARCHIVE APPS ================= */}
        {archiveMatches.length > 0 && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              rowGap: '16px'
            }}>
              {archiveMatches.map(project => {
                const statusBadge = getStatusBadge(project.status, project.statusLabel);

                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className="pressable"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {/* 58px Floating Squircle */}
                    <div style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '17px',
                      background: project.bgLight,
                      border: '1px solid rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: '6px'
                    }}>
                      <ProjectAppIcon project={project} size={24} />

                      {/* Small Status Pill Dot */}
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: statusBadge.dot,
                        border: '1.5px solid #FFFFFF'
                      }} />
                    </div>

                    {/* App Title */}
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      maxWidth: '74px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      {project.title}
                    </span>

                    {/* Tag */}
                    <span style={{
                      fontSize: '9px',
                      color: '#94A3B8',
                      marginTop: '2px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600
                    }}>
                      {statusBadge.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
            textAlign: 'center'
          }}>
            <Search size={32} color="#94A3B8" style={{ marginBottom: '8px' }} />
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>
              No projects match "{searchQuery}"
            </h4>
            <p style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px' }}>
              Try searching for "Calculator", "Kotlin", or "Calendar"
            </p>
          </div>
        )}
      </div>

      {/* ================= FROSTED GLASS DETAILS SHEET (POP-UP) ================= */}
      {activeProject && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 200,
            background: 'rgba(15, 23, 42, 0.42)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setActiveProject(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px 24px 0 0',
              padding: '16px 20px 24px',
              maxHeight: '90%',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 -10px 40px rgba(15, 23, 42, 0.2)',
              borderTop: '1px solid rgba(255, 255, 255, 0.9)',
              animation: 'slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Drag Handle & Top Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '-4px'
            }}>
              <span style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: '#64748B',
                letterSpacing: '0.4px',
                textTransform: 'uppercase'
              }}>
                {activeProject.category}
              </span>

              <button
                onClick={() => setActiveProject(null)}
                className="pressable"
                aria-label="Close details"
                style={{
                  width: '30px',
                  height: '30px',
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
                <X size={15} />
              </button>
            </div>

            {/* App Hero Row (Icon, Title, Native Title, Subtitle, Status) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: activeProject.bgLight,
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <ProjectAppIcon project={activeProject} size={32} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                    {activeProject.title}
                  </h3>
                  {activeProject.nativeTitle && (
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: activeProject.accentColor,
                      background: activeProject.bgLight,
                      padding: '1px 7px',
                      borderRadius: '6px'
                    }}>
                      {activeProject.nativeTitle}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', lineHeight: 1.3 }}>
                  {activeProject.subtitle}
                </p>

                {/* Status Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '9.5px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.4px',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  background: getStatusBadge(activeProject.status, activeProject.statusLabel).bg,
                  color: getStatusBadge(activeProject.status, activeProject.statusLabel).color,
                  border: `1px solid ${getStatusBadge(activeProject.status, activeProject.statusLabel).border}`,
                  marginTop: '6px'
                }}>
                  <span style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: getStatusBadge(activeProject.status, activeProject.statusLabel).dot
                  }} />
                  <span>{getStatusBadge(activeProject.status, activeProject.statusLabel).text}</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons (Try In-OS Demo & Store Link) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '10px 0',
              borderTop: '1px solid rgba(15, 23, 42, 0.06)',
              borderBottom: '1px solid rgba(15, 23, 42, 0.06)'
            }}>
              {/* Primary "Try In-OS Demo" CTA */}
              <button
                onClick={() => handleLaunchDemo(activeProject)}
                className="pressable"
                style={{
                  background: activeProject.id === 'manipur-calculator'
                    ? 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)'
                    : 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '11px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: activeProject.id === 'manipur-calculator'
                    ? '0 4px 14px rgba(21, 101, 192, 0.35)'
                    : '0 4px 14px rgba(79, 70, 229, 0.3)'
                }}
              >
                <Play size={15} fill="#FFFFFF" />
                <span>
                  {activeProject.id === 'manipur-calculator' 
                    ? '⚡ Launch Android Mini-App' 
                    : '⚡ Try In-OS Demo'}
                </span>
                <span style={{
                  fontSize: '9.5px',
                  background: activeProject.id === 'manipur-calculator' ? '#10B981' : 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800
                }}>
                  {activeProject.id === 'manipur-calculator' ? 'LIVE' : 'PHASE 7B'}
                </span>
              </button>

              {/* Interactive Notice Toast if Demo Button Tapped */}
              {demoNotice && (
                <div style={{
                  background: '#EEF2FF',
                  border: '1px solid rgba(79, 70, 229, 0.25)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#3730A3',
                  fontWeight: 600,
                  animation: 'popIn 0.2s ease-out'
                }}>
                  <Info size={16} color="#4F46E5" style={{ flexShrink: 0 }} />
                  <span>{demoNotice}</span>
                </div>
              )}

              {/* Verified Store & Access Links */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeProject.actions.map(action => {
                  if (action.type === 'whatsapp') {
                    return (
                      <a
                        key={action.label}
                        href={action.url}
                        target="_blank"
                        rel="noreferrer"
                        className="pressable"
                        style={{
                          flex: 1,
                          minWidth: '130px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: '#25D366',
                          color: '#FFFFFF',
                          borderRadius: '12px',
                          padding: '9px 14px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
                        }}
                      >
                        <MessageSquare size={14} />
                        <span>{action.label}</span>
                        <ExternalLink size={12} />
                      </a>
                    );
                  }

                  return (
                    <a
                      key={action.label}
                      href={action.url}
                      target="_blank"
                      rel="noreferrer"
                      className="pressable"
                      style={{
                        flex: 1,
                        minWidth: '130px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: action.type === 'playstore' ? '#0F172A' : '#F1F5F9',
                        color: action.type === 'playstore' ? '#FFFFFF' : '#1E293B',
                        borderRadius: '12px',
                        padding: '9px 14px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        border: action.type === 'playstore' ? 'none' : '1px solid rgba(15, 23, 42, 0.08)',
                        boxShadow: action.type === 'playstore' ? '0 2px 8px rgba(15, 23, 42, 0.15)' : 'none'
                      }}
                    >
                      <span>{action.label}</span>
                      <ExternalLink size={12} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Summary & Target Audience */}
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                About This Application
              </h5>
              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.55 }}>
                {activeProject.summary}
              </p>
              {activeProject.targetAudience && (
                <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#64748B' }}>
                  <strong style={{ color: '#475569' }}>Target Users:</strong> {activeProject.targetAudience}
                </div>
              )}
            </div>

            {/* Core Capabilities */}
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                Key Capabilities
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeProject.capabilities.map((cap, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '12px', color: '#334155', lineHeight: 1.45 }}>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Tech Stack */}
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                Technology & Architecture
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {activeProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid rgba(15, 23, 42, 0.06)',
                      borderRadius: '8px',
                      padding: '3px 8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#475569',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Transparent Post-Mortem / Lessons Learned (For Archives) */}
            {activeProject.lessonsLearned && (
              <div style={{
                background: '#FFFBEB',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: '14px',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  <AlertTriangle size={14} />
                  <span>Transparent Post-Mortem // Lessons Learned</span>
                </div>
                <p style={{ fontSize: '11.5px', color: '#92400E', lineHeight: 1.5 }}>
                  {activeProject.lessonsLearned}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
