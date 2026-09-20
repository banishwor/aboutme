import React, { useState } from 'react';
import { books, BookItem } from '../../content/books';
import { 
  BookOpen, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ShoppingCart,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BooksAppProps {
  onClose: () => void;
  onTouchStartHandle?: (e: React.TouchEvent) => void;
  onTouchMoveHandle?: (e: React.TouchEvent) => void;
  onTouchEndHandle?: () => void;
}

type ViewMode = 'shelf' | 'cover' | 'reader';
type ReaderTheme = 'porcelain' | 'sepia' | 'midnight';
type ReaderFont = 'serif' | 'sans';

export const BooksApp: React.FC<BooksAppProps> = ({ 
  onClose, 
  onTouchStartHandle, 
  onTouchMoveHandle, 
  onTouchEndHandle 
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('shelf');
  const [isOpeningCover, setIsOpeningCover] = useState<boolean>(false);
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [expandedInfoBookId, setExpandedInfoBookId] = useState<string | null>(null);

  // E-Reader appearance states
  const [theme, setTheme] = useState<ReaderTheme>('porcelain');
  const [fontSize, setFontSize] = useState<number>(15);
  const [fontFamily, setFontFamily] = useState<ReaderFont>('serif');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const activeBook: BookItem | undefined = books.find(b => b.id === selectedBookId);
  const currentSection = activeBook?.sections[sectionIndex];

  // 1. Shelf -> Inspect Physical Cover
  const handleInspectCover = (bookId: string) => {
    setSelectedBookId(bookId);
    setViewMode('cover');
    setIsOpeningCover(false);
    setSectionIndex(0);
    setShowSettings(false);
  };

  // 2. Physical Cover -> Open into Chapter 1 (Kindle Reader)
  const handleOpenBook = () => {
    setIsOpeningCover(true);
    setTimeout(() => {
      setViewMode('reader');
      setIsOpeningCover(false);
    }, 380);
  };

  // Return to Shelf
  const handleReturnToShelf = () => {
    setViewMode('shelf');
    setSelectedBookId(null);
    setIsOpeningCover(false);
    setShowSettings(false);
  };

  const filteredBooks = selectedFilter === 'All'
    ? books
    : selectedFilter === 'Fiction'
      ? books.filter(b => b.genre.includes('Fiction'))
      : books.filter(b => !b.genre.includes('Fiction'));

  // Theme palettes for reader
  const themeStyles = {
    porcelain: {
      bg: '#FCFBF9',
      text: '#1E293B',
      meta: '#64748B',
      cardBg: '#FFFFFF',
      border: 'rgba(15, 23, 42, 0.08)',
      highlightBg: 'rgba(251, 191, 36, 0.28)',
      highlightText: '#92400E',
      barBg: 'rgba(255, 255, 255, 0.95)'
    },
    sepia: {
      bg: '#F5EEDB',
      text: '#2D241E',
      meta: '#786C5E',
      cardBg: '#EFE5CE',
      border: 'rgba(120, 53, 15, 0.15)',
      highlightBg: 'rgba(217, 119, 6, 0.22)',
      highlightText: '#78350F',
      barBg: 'rgba(245, 238, 219, 0.95)'
    },
    midnight: {
      bg: '#0A0A0C',
      text: '#E2E8F0',
      meta: '#94A3B8',
      cardBg: '#18181B',
      border: 'rgba(255, 255, 255, 0.12)',
      highlightBg: 'rgba(234, 179, 8, 0.2)',
      highlightText: '#FDE047',
      barBg: 'rgba(18, 18, 22, 0.95)'
    }
  }[theme];

  const fontStyle = fontFamily === 'serif' 
    ? 'Georgia, "Times New Roman", Cambria, serif' 
    : 'var(--font-sans), system-ui, sans-serif';

  // ================= MODE 2: CINEMATIC FULL-SCREEN 3D COVER INSPECTION =================
  if (viewMode === 'cover' && activeBook) {
    return (
      <div style={{
        height: '100%',
        minHeight: '100%',
        background: '#07090E',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '16px 20px',
        boxSizing: 'border-box',
        animation: 'fadeIn 0.25s ease-out',
        perspective: '1400px'
      }}>
        {/* Ambient Blurred Artwork Lighting in Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${activeBook.coverPath})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'blur(56px) brightness(0.2) saturate(180%)',
          transform: 'scale(1.25)',
          pointerEvents: 'none',
          opacity: 0.85
        }} />

        {/* Floating Top Drag Handle */}
        <div 
          onTouchStart={onTouchStartHandle}
          onTouchMove={onTouchMoveHandle}
          onTouchEnd={onTouchEndHandle}
          style={{
            position: 'absolute',
            top: '8px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 40,
            cursor: 'grab'
          }}
        >
          <div style={{ width: '40px', height: '4px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.3)' }} />
        </div>

        {/* Floating Minimal Glass Controls (No Text / No Links) */}
        <button
          onClick={handleReturnToShelf}
          className="pressable"
          aria-label="Back to library"
          title="Back to library"
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 40,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={onClose}
          className="pressable"
          aria-label="Close"
          title="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 40,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
          }}
        >
          <X size={16} />
        </button>

        {/* Full-Screen Physical 3D Hardcover Book (Tap Cover to Open into Reader) */}
        <div
          onClick={handleOpenBook}
          className="pressable"
          title="Tap cover to open book"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            height: '100%',
            maxHeight: '620px',
            cursor: 'pointer',
            transformOrigin: 'left center',
            transform: isOpeningCover 
              ? 'perspective(1400px) rotateY(-92deg) scale(1.02)' 
              : 'perspective(1400px) rotateY(-2.5deg)',
            opacity: isOpeningCover ? 0.05 : 1,
            transition: 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, box-shadow 0.3s ease',
            boxShadow: '22px 32px 64px rgba(0, 0, 0, 0.85), 6px 12px 24px rgba(0, 0, 0, 0.6)',
            borderRadius: '8px 16px 16px 8px',
            zIndex: 20
          }}
        >
          {/* Front Cover Artwork with Photorealistic Book Finish */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '8px 16px 16px 8px',
            overflow: 'hidden',
            position: 'relative',
            background: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <img 
              src={activeBook.coverPath} 
              alt={activeBook.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Realistic Left Spine Lighting / Cylindrical Shadow */}
            <div style={{
              position: 'absolute',
              inset: '0 88% 0 0',
              background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(255,255,255,0.22) 22%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Diagonal Ambient Hardcover Light Reflection */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.2) 100%)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Realistic Stacked Paper Pages Edge (Right Thickness) */}
          <div style={{
            position: 'absolute',
            top: '8px',
            bottom: '8px',
            right: '-14px',
            width: '15px',
            background: 'linear-gradient(to right, #D4D4D8 0%, #FAFAFA 40%, #E4E4E7 70%, #A1A1AA 100%)',
            borderRadius: '0 6px 6px 0',
            boxShadow: '3px 0 8px rgba(0,0,0,0.5)',
            transform: 'skewY(-2deg)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>
    );
  }

  // ================= MODE 3: FULL-BLEED NATIVE KINDLE E-READER =================
  if (viewMode === 'reader' && activeBook && currentSection) {
    const totalSections = activeBook.sections.length;
    const isFirstSection = sectionIndex === 0;
    const isLastSection = sectionIndex === totalSections - 1;

    return (
      <div style={{
        minHeight: '100%',
        background: themeStyles.bg,
        color: themeStyles.text,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background 0.2s ease, color 0.2s ease',
        animation: 'fadeIn 0.25s ease-out'
      }}>
        {/* Top Kindle Navigation Bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: themeStyles.barBg,
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${themeStyles.border}`,
          padding: '6px 14px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {/* Drag Handle Pill */}
          <div 
            onTouchStart={onTouchStartHandle}
            onTouchMove={onTouchMoveHandle}
            onTouchEnd={onTouchEndHandle}
            style={{ display: 'flex', justifyContent: 'center', padding: '2px 0 4px', cursor: 'grab' }}
          >
            <div style={{ width: '36px', height: '4px', borderRadius: '999px', background: theme === 'midnight' ? '#3F3F46' : '#CBD5E1' }} />
          </div>

          {/* Kindle Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            {/* Back to Cover Inspection / Shelf */}
            <button
              onClick={() => setViewMode('cover')}
              className="pressable"
              aria-label="Back to cover"
              style={{
                border: 'none',
                background: 'transparent',
                color: themeStyles.text,
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                padding: '4px 6px',
                borderRadius: '8px'
              }}
            >
              <ChevronLeft size={16} />
              <span>Cover</span>
            </button>

            {/* Book Title (Kindle Centered Small-Caps) */}
            <div style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: themeStyles.meta,
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: '0 8px'
            }}>
              {activeBook.title}
            </div>

            {/* Right Actions: Read Time & "Aa" Menu Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10.5px', color: themeStyles.meta, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} />
                <span>{activeBook.readTimeEstimate}</span>
              </span>

              <button
                onClick={() => setShowSettings(prev => !prev)}
                className="pressable"
                aria-label="Appearance settings"
                style={{
                  border: `1px solid ${themeStyles.border}`,
                  background: showSettings ? '#4F46E5' : 'transparent',
                  color: showSettings ? '#FFFFFF' : themeStyles.text,
                  borderRadius: '8px',
                  padding: '4px 9px',
                  fontSize: '12px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <span>Aa</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kindle "Aa" Appearance Popover Drawer */}
        {showSettings && (
          <div style={{
            background: themeStyles.cardBg,
            borderBottom: `1px solid ${themeStyles.border}`,
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            animation: 'slideDown 0.15s ease-out'
          }}>
            {/* Theme Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: themeStyles.meta, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Page Theme
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setTheme('porcelain')}
                  className="pressable"
                  style={{
                    border: theme === 'porcelain' ? '2px solid #4F46E5' : '1px solid #E2E8F0',
                    background: '#FCFBF9',
                    color: '#1E293B',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📜 Paper
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className="pressable"
                  style={{
                    border: theme === 'sepia' ? '2px solid #D97706' : '1px solid #D1C5B0',
                    background: '#F5EEDB',
                    color: '#2D241E',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🕯️ Sepia
                </button>
                <button
                  onClick={() => setTheme('midnight')}
                  className="pressable"
                  style={{
                    border: theme === 'midnight' ? '2px solid #A855F7' : '1px solid #27272A',
                    background: '#0A0A0C',
                    color: '#E2E8F0',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🌙 Midnight
                </button>
              </div>
            </div>

            {/* Font Sizer & Typeface Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setFontFamily('serif')}
                  className="pressable"
                  style={{
                    border: fontFamily === 'serif' ? '1.5px solid #4F46E5' : `1px solid ${themeStyles.border}`,
                    background: fontFamily === 'serif' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                    color: themeStyles.text,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Serif
                </button>
                <button
                  onClick={() => setFontFamily('sans')}
                  className="pressable"
                  style={{
                    border: fontFamily === 'sans' ? '1.5px solid #4F46E5' : `1px solid ${themeStyles.border}`,
                    background: fontFamily === 'sans' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                    color: themeStyles.text,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-sans), sans-serif',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Sans
                </button>
              </div>

              {/* Font Size Steppers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => setFontSize(prev => Math.max(13, prev - 1))}
                  className="pressable"
                  style={{
                    border: `1px solid ${themeStyles.border}`,
                    background: 'transparent',
                    color: themeStyles.text,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  A-
                </button>
                <span style={{ fontSize: '11px', fontWeight: 700, color: themeStyles.meta, width: '28px', textAlign: 'center' }}>
                  {fontSize}px
                </span>
                <button
                  onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
                  className="pressable"
                  style={{
                    border: `1px solid ${themeStyles.border}`,
                    background: 'transparent',
                    color: themeStyles.text,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reading Canvas */}
        <div style={{
          flex: 1,
          padding: '24px 22px 56px',
          maxWidth: '560px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          fontFamily: fontStyle
        }}>
          {/* Chapter Heading Hierarchy */}
          <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: `1px solid ${themeStyles.border}`, paddingBottom: '16px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '6px',
              color: themeStyles.text
            }}>
              {currentSection.sectionTitle}
            </h3>
            {currentSection.chapterSubtitle && (
              <h4 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: themeStyles.meta,
                letterSpacing: '0.4px',
                lineHeight: 1.4
              }}>
                {currentSection.chapterSubtitle}
              </h4>
            )}
          </div>

          {/* Paragraphs with Highlights */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: `${fontSize}px`,
            lineHeight: 1.8,
            letterSpacing: '0.15px'
          }}>
            {currentSection.paragraphs.map((paragraph, idx) => {
              const isHighlighted = currentSection.keyHighlight && paragraph.includes(currentSection.keyHighlight);

              if (isHighlighted) {
                return (
                  <p key={idx} style={{ margin: 0, textAlign: 'justify' }}>
                    <span style={{
                      background: themeStyles.highlightBg,
                      color: themeStyles.highlightText,
                      padding: '2px 4px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      boxDecorationBreak: 'clone',
                      WebkitBoxDecorationBreak: 'clone'
                    }}>
                      "{paragraph}"
                    </span>
                  </p>
                );
              }

              return (
                <p key={idx} style={{ margin: 0, textAlign: 'justify' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* End of Excerpt Callout */}
          {isLastSection && (
            <div style={{
              marginTop: '36px',
              background: themeStyles.cardBg,
              border: `1.5px solid ${themeStyles.border}`,
              borderRadius: '16px',
              padding: '18px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                color: '#D97706',
                background: 'rgba(217, 119, 6, 0.12)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)'
              }}>
                END OF SAMPLE EXCERPT
              </span>
              <h5 style={{ fontSize: '14.5px', fontWeight: 800, color: themeStyles.text, margin: 0 }}>
                Continue Reading "{activeBook.title}"
              </h5>
              <p style={{ fontSize: '11.5px', color: themeStyles.meta, maxWidth: '340px', lineHeight: 1.4, margin: 0 }}>
                The complete book is available worldwide on Amazon Kindle.
              </p>
              <a
                href={activeBook.amazonUrl}
                target="_blank"
                rel="noreferrer"
                className="pressable"
                style={{
                  marginTop: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#D97706',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '9px 16px',
                  fontSize: '12px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.3)'
                }}
              >
                <ShoppingCart size={14} />
                <span>Buy on Amazon Kindle</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Bottom Kindle Scrubber Bar */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 50,
          background: themeStyles.barBg,
          backdropFilter: 'blur(16px)',
          borderTop: `1px solid ${themeStyles.border}`,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {/* Previous Page Button */}
          <button
            onClick={() => setSectionIndex(prev => Math.max(0, prev - 1))}
            disabled={isFirstSection}
            className="pressable"
            aria-label="Previous page"
            style={{
              border: `1px solid ${themeStyles.border}`,
              background: 'transparent',
              color: isFirstSection ? themeStyles.meta : themeStyles.text,
              opacity: isFirstSection ? 0.3 : 1,
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: isFirstSection ? 'default' : 'pointer'
            }}
          >
            <ChevronLeft size={14} />
            <span>Prev</span>
          </button>

          {/* Location & Progress */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '180px',
              height: '4px',
              borderRadius: '999px',
              background: theme === 'midnight' ? '#27272A' : '#E2E8F0',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${((sectionIndex + 1) / totalSections) * 100}%`,
                background: '#4F46E5',
                transition: 'width 0.2s ease'
              }} />
            </div>

            <span style={{
              fontSize: '10.5px',
              color: themeStyles.meta,
              fontFamily: 'var(--font-mono)'
            }}>
              {currentSection.locationLabel}
            </span>
          </div>

          {/* Next Page Button */}
          <button
            onClick={() => setSectionIndex(prev => Math.min(totalSections - 1, prev + 1))}
            disabled={isLastSection}
            className="pressable"
            aria-label="Next page"
            style={{
              border: `1px solid ${themeStyles.border}`,
              background: isLastSection ? 'transparent' : '#4F46E5',
              color: isLastSection ? themeStyles.meta : '#FFFFFF',
              opacity: isLastSection ? 0.3 : 1,
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: isLastSection ? 'default' : 'pointer',
              boxShadow: isLastSection ? 'none' : '0 2px 6px rgba(79, 70, 229, 0.25)'
            }}
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // ================= MODE 1: APPLE BOOKS-STYLE NATIVE LIBRARY =================
  return (
    <div style={{
      minHeight: '100%',
      background: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '24px'
    }}>
      {/* Native Apple Books Library Header */}
      <div style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.02)',
        padding: '6px 16px 12px'
      }}>
        {/* Top Swipe Pill */}
        <div 
          onTouchStart={onTouchStartHandle}
          onTouchMove={onTouchMoveHandle}
          onTouchEnd={onTouchEndHandle}
          style={{ display: 'flex', justifyContent: 'center', padding: '2px 0 6px', cursor: 'grab' }}
        >
          <div style={{ width: '38px', height: '4.5px', borderRadius: '999px', background: '#CBD5E1' }} />
        </div>

        {/* Title Row with Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.3px', margin: 0 }}>
              Library
            </h2>
            <p style={{ fontSize: '11px', color: '#64748B', marginTop: '1px', margin: 0 }}>
              Tap a book cover to inspect & open
            </p>
          </div>

          <button
            onClick={onClose}
            className="pressable"
            aria-label="Close Library"
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

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
          {['All', 'Fiction', 'Self-Help'].map(cat => {
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className="pressable"
                style={{
                  border: isSelected ? '1px solid #0F172A' : '1px solid rgba(15, 23, 42, 0.08)',
                  background: isSelected ? '#0F172A' : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#64748B',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat === 'All' ? 'All Books (2)' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookshelf Presentation Canvas */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {filteredBooks.map(book => {
          const isInfoExpanded = expandedInfoBookId === book.id;

          return (
            <div
              key={book.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '16px',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Shelf Item Row: 3D Cover + Quick Metadata */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                {/* 3D Realistic Hardcover with Tap-to-Inspect */}
                <div 
                  onClick={() => handleInspectCover(book.id)}
                  className="pressable"
                  style={{
                    width: '104px',
                    height: '154px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: '5px 8px 18px rgba(15, 23, 42, 0.18), 0 2px 4px rgba(15, 23, 42, 0.1)',
                    position: 'relative',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    cursor: 'pointer',
                    transform: 'perspective(600px) rotateY(-5deg)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <img 
                    src={book.coverPath} 
                    alt={book.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Spine Lighting Accent */}
                  <div style={{
                    position: 'absolute',
                    inset: '0 84% 0 0',
                    background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
                    pointerEvents: 'none'
                  }} />
                  {/* "Tap Cover" badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    right: '6px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: '9px',
                    fontWeight: 800,
                    textAlign: 'center',
                    padding: '3px 0',
                    borderRadius: '6px',
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px'
                  }}>
                    <span>Inspect</span>
                  </div>
                </div>

                {/* Metadata Column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {book.series && (
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 800,
                      color: book.accentColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {book.series}
                    </span>
                  )}

                  <h3 
                    onClick={() => handleInspectCover(book.id)}
                    style={{
                      fontSize: '15.5px',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.25,
                      margin: 0,
                      cursor: 'pointer'
                    }}
                  >
                    {book.title}
                  </h3>

                  <p style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.35, margin: '2px 0 0' }}>
                    {book.subtitle}
                  </p>

                  {/* Format & ASIN Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      background: '#F1F5F9',
                      color: '#475569',
                      padding: '2px 6px',
                      borderRadius: '5px'
                    }}>
                      {book.format}
                    </span>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      background: '#F1F5F9',
                      color: '#475569',
                      padding: '2px 6px',
                      borderRadius: '5px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      ASIN: {book.asin}
                    </span>
                  </div>

                  {/* Action Buttons Row */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleInspectCover(book.id)}
                      className="pressable"
                      style={{
                        border: 'none',
                        background: book.accentColor,
                        color: '#FFFFFF',
                        borderRadius: '9px',
                        padding: '7px 12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer',
                        boxShadow: `0 2px 6px ${book.accentColor}35`
                      }}
                    >
                      <BookOpen size={13} />
                      <span>Open Book</span>
                    </button>

                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="pressable"
                      style={{
                        border: '1px solid rgba(15, 23, 42, 0.12)',
                        background: '#FFFFFF',
                        color: '#1E293B',
                        borderRadius: '9px',
                        padding: '7px 11px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'none'
                      }}
                    >
                      <ShoppingCart size={12} color="#D97706" />
                      <span>Amazon</span>
                      <ExternalLink size={10} color="#64748B" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Expandable Synopsis & Themes Drawer */}
              <div style={{ borderTop: '1px solid rgba(15, 23, 42, 0.06)', paddingTop: '8px' }}>
                <div 
                  onClick={() => setExpandedInfoBookId(prev => prev === book.id ? null : book.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '2px 0'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                    {isInfoExpanded ? 'Hide Details' : 'Synopsis & Themes'}
                  </span>
                  {isInfoExpanded ? <ChevronUp size={13} color="#94A3B8" /> : <ChevronDown size={13} color="#94A3B8" />}
                </div>

                {isInfoExpanded && (
                  <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px', animation: 'fadeIn 0.15s ease' }}>
                    <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                      {book.synopsis}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {book.coreThemes.map(theme => (
                        <span
                          key={theme}
                          style={{
                            fontSize: '9.5px',
                            fontWeight: 600,
                            color: book.accentColor,
                            background: book.bgLight,
                            padding: '2px 7px',
                            borderRadius: '5px'
                          }}
                        >
                          #{theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
