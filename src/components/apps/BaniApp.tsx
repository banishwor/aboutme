import React, { useState, useRef } from 'react';
import { 
  baniPosts, 
  baniCategories, 
  baniPublicationMeta, 
  BaniPost, 
  BaniCategory 
} from '../../content/blog';
import { 
  ChevronLeft, 
  X, 
  ExternalLink, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  ArrowRight, 
  Feather, 
  Check, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';

interface BaniAppProps {
  onClose: () => void;
  initialPostId?: string | null;
  onTouchStartHandle?: (e: React.TouchEvent) => void;
  onTouchMoveHandle?: (e: React.TouchEvent) => void;
  onTouchEndHandle?: () => void;
}

type ViewMode = 'magazine' | 'reader';

export const BaniApp: React.FC<BaniAppProps> = ({
  onClose,
  initialPostId,
  onTouchStartHandle,
  onTouchMoveHandle,
  onTouchEndHandle
}) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(initialPostId || null);
  const [viewMode, setViewMode] = useState<ViewMode>(initialPostId ? 'reader' : 'magazine');
  const [selectedCategory, setSelectedCategory] = useState<BaniCategory>('All');
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bani_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const readerContentRef = useRef<HTMLDivElement>(null);

  const [externalPromptPost, setExternalPromptPost] = useState<BaniPost | null>(null);

  const activePost = baniPosts.find(p => p.id === selectedPostId) || baniPosts[0];
  const featuredPost = baniPosts.find(p => p.isFeatured) || baniPosts[0];

  const filteredPosts = selectedCategory === 'All'
    ? baniPosts
    : baniPosts.filter(p => p.category === selectedCategory);

  // Handle scroll progress in reader
  const handleScroll = () => {
    if (!readerContentRef.current) return;
    const el = readerContentRef.current;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight <= 0) {
      setReadingProgress(100);
      return;
    }
    const currentProgress = (el.scrollTop / totalHeight) * 100;
    setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
  };

  const handleOpenReader = (postId: string) => {
    setSelectedPostId(postId);
    setViewMode('reader');
    setReadingProgress(0);
    if (readerContentRef.current) {
      readerContentRef.current.scrollTop = 0;
    }
  };

  const handleArticleClick = (post: BaniPost) => {
    if (post.hasFullContent) {
      handleOpenReader(post.id);
    } else {
      setExternalPromptPost(post);
    }
  };

  const renderExternalPromptModal = () => {
    if (!externalPromptPost) return null;
    return (
      <div 
        onClick={() => setExternalPromptPost(null)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '380px',
            background: '#FFFFFF',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 24px 50px rgba(15, 23, 42, 0.35)',
            border: '1px solid rgba(15, 23, 42, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'springPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Cover / Header Artwork */}
          {externalPromptPost.coverImage && (
            <div style={{
              width: '100%',
              height: '140px',
              position: 'relative',
              overflow: 'hidden',
              background: '#0F172A'
            }}>
              <img 
                src={externalPromptPost.coverImage} 
                alt={externalPromptPost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 100%)'
              }} />
              <span style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                background: '#0891B2',
                color: '#FFFFFF',
                fontSize: '9.5px',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '6px',
                letterSpacing: '0.4px'
              }}>
                {externalPromptPost.category}
              </span>
            </div>
          )}

          <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748B' }}>
              <Calendar size={12} />
              <span>{externalPromptPost.publishedAt}</span>
              <span>•</span>
              <Clock size={12} />
              <span>{externalPromptPost.readTime}</span>
            </div>

            <h3 style={{
              fontSize: '16.5px',
              fontWeight: 800,
              color: '#0F172A',
              margin: 0,
              lineHeight: 1.35,
              fontFamily: 'Georgia, Cambria, serif'
            }}>
              {externalPromptPost.title}
            </h3>

            <p style={{
              fontSize: '12px',
              color: '#475569',
              margin: 0,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {externalPromptPost.excerpt}
            </p>

            <div style={{
              margin: '4px 0',
              padding: '10px 12px',
              borderRadius: '12px',
              background: '#ECFEFF',
              border: '1px solid rgba(8, 145, 178, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Feather size={16} color="#0891B2" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: '#0E7490', fontWeight: 600, lineHeight: 1.4 }}>
                This story is archived on the official <strong>Bani</strong> publication website.
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
              <a
                href={externalPromptPost.sourceUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setExternalPromptPost(null)}
                className="pressable"
                style={{
                  background: '#0891B2',
                  color: '#FFFFFF',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(8, 145, 178, 0.35)'
                }}
              >
                <span>Read Full Article on Blog</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setExternalPromptPost(null)}
                className="pressable"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748B',
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Back to Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleBackToMagazine = () => {
    setViewMode('magazine');
    setReadingProgress(0);
  };

  const handleToggleBookmark = (postId: string) => {
    setBookmarked(prev => {
      const next = prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId];
      localStorage.setItem('bani_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const handleShare = (post: BaniPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: post.sourceUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(post.sourceUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Find related stories from same category
  const relatedPosts = baniPosts
    .filter(p => p.id !== activePost.id && p.category === activePost.category)
    .slice(0, 3);

  // Next & Previous post
  const currentIndex = baniPosts.findIndex(p => p.id === activePost.id);
  const prevPost = currentIndex > 0 ? baniPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < baniPosts.length - 1 ? baniPosts[currentIndex + 1] : null;

  // ================= VIEW 1: DEDICATED NATIVE ARTICLE READER =================
  if (viewMode === 'reader' && activePost) {
    const isSaved = bookmarked.includes(activePost.id);

    return (
      <div 
        ref={readerContentRef}
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflowY: 'auto',
          background: '#FCFBF9',
          color: '#1E293B',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'fadeIn 0.22s ease-out'
        }}
      >
        {/* Top Sticky Editorial Header & Scroll Progress */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(252, 251, 249, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
        }}>
          {/* Reading Scroll Progress Bar */}
          <div style={{ width: '100%', height: '3px', background: 'rgba(15, 23, 42, 0.06)' }}>
            <div style={{
              width: `${readingProgress}%`,
              height: '100%',
              background: 'linear-gradient(to right, #0891B2, #2563EB)',
              transition: 'width 0.1s linear'
            }} />
          </div>

          {/* Drag Handle Pill */}
          <div 
            onTouchStart={onTouchStartHandle}
            onTouchMove={onTouchMoveHandle}
            onTouchEnd={onTouchEndHandle}
            style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 2px', cursor: 'grab' }}
          >
            <div style={{ width: '38px', height: '4px', borderRadius: '999px', background: '#CBD5E1' }} />
          </div>

          {/* Navigation Controls Row */}
          <div style={{
            padding: '6px 14px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}>
            {/* Back to Magazine */}
            <button
              onClick={handleBackToMagazine}
              className="pressable"
              aria-label="Back to stories"
              style={{
                border: 'none',
                background: 'rgba(15, 23, 42, 0.05)',
                color: '#1E293B',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '11.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
              <span>Stories</span>
            </button>

            {/* Truncated Middle Category Label */}
            <div style={{
              flex: 1,
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              padding: '0 8px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#64748B',
              fontFamily: 'var(--font-mono)'
            }}>
              {activePost.category.toUpperCase()}
            </div>

            {/* Actions: Bookmark, Share, Close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => handleToggleBookmark(activePost.id)}
                className="pressable"
                aria-label="Bookmark"
                title={isSaved ? 'Remove bookmark' : 'Bookmark story'}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isSaved ? '#FEF3C7' : 'rgba(15, 23, 42, 0.05)',
                  color: isSaved ? '#D97706' : '#64748B',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={15} fill={isSaved ? '#D97706' : 'none'} />
              </button>

              <button
                onClick={() => handleShare(activePost)}
                className="pressable"
                aria-label="Share story"
                title="Share or copy link"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: copiedLink ? '#DCFCE7' : 'rgba(15, 23, 42, 0.05)',
                  color: copiedLink ? '#15803D' : '#64748B',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {copiedLink ? <Check size={15} /> : <Share2 size={15} />}
              </button>

              <button
                onClick={onClose}
                className="pressable"
                aria-label="Close"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.05)',
                  color: '#64748B',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Article Reader Body */}
        <article style={{
          padding: '24px 20px 60px',
          maxWidth: '720px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Metadata Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <span style={{
              background: '#ECFEFF',
              color: '#0891B2',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '6px',
              letterSpacing: '0.4px',
              textTransform: 'uppercase'
            }}>
              {activePost.category}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B' }}>
              <Calendar size={13} />
              <span>{activePost.publishedAt}</span>
            </div>

            <span style={{ color: '#CBD5E1' }}>•</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B' }}>
              <Clock size={13} />
              <span>{activePost.readTime}</span>
            </div>
          </div>

          {/* Article Main Headline */}
          <h1 style={{
            fontSize: '25px',
            lineHeight: 1.3,
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 16px',
            fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            letterSpacing: '-0.3px'
          }}>
            {activePost.title}
          </h1>

          {/* Lead Standfirst Excerpt */}
          <p style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#475569',
            fontStyle: 'italic',
            borderLeft: '3px solid #0891B2',
            paddingLeft: '14px',
            margin: '0 0 24px'
          }}>
            {activePost.excerpt}
          </p>

          {/* Byline Author Tag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#ECFEFF',
                color: '#0891B2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Feather size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                  {baniPublicationMeta.author}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Founder, {baniPublicationMeta.title} · Voices of Meitei Heritage
                </div>
              </div>
            </div>

            <a
              href={activePost.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#0891B2',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                background: '#F0FDFA'
              }}
            >
              <span>Blogger</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Hero Cover Image (If available) */}
          {activePost.coverImage && (
            <div style={{
              width: '100%',
              borderRadius: '14px',
              overflow: 'hidden',
              marginBottom: '28px',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
              border: '1px solid rgba(15, 23, 42, 0.08)'
            }}>
              <img 
                src={activePost.coverImage} 
                alt={activePost.title}
                style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Article HTML Content Body with Clean Inline Styles */}
          <div 
            className="bani-article-content"
            dangerouslySetInnerHTML={{ __html: activePost.content }}
            style={{
              fontSize: '15.5px',
              lineHeight: 1.8,
              color: '#334155',
              fontFamily: 'Georgia, Cambria, serif'
            }}
          />

          {/* Source Attribution & Web View Callout Card */}
          <div style={{
            marginTop: '40px',
            padding: '20px',
            borderRadius: '16px',
            background: '#F8FAFC',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#ECFEFF',
              color: '#0891B2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Feather size={20} />
            </div>

            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
              Read on Original Bani Blog
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', maxWidth: '360px', margin: 0, lineHeight: 1.5 }}>
              This article was published as part of Banishwor Athokpam's cultural research archive on Meitei genealogy and Kangleipak civilization.
            </p>

            <a
              href={activePost.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: '6px',
                background: '#0891B2',
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(8, 145, 178, 0.35)'
              }}
            >
              <span>Open on baniat.blogspot.com</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Next / Prev Navigation */}
          <div style={{
            marginTop: '32px',
            display: 'grid',
            gridTemplateColumns: prevPost && nextPost ? '1fr 1fr' : '1fr',
            gap: '12px'
          }}>
            {prevPost && (
              <div 
                onClick={() => handleArticleClick(prevPost)}
                className="pressable"
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  ← Previous Story
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {prevPost.title}
                </div>
              </div>
            )}

            {nextPost && (
              <div 
                onClick={() => handleArticleClick(nextPost)}
                className="pressable"
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  textAlign: 'right'
                }}
              >
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Next Story →
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {nextPost.title}
                </div>
              </div>
            )}
          </div>

          {/* Related Stories Strip */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 800,
                color: '#64748B',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                More in {activePost.category}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {relatedPosts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => handleArticleClick(rel)}
                    className="pressable"
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {rel.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {rel.publishedAt} · {rel.readTime}
                      </div>
                    </div>
                    <ChevronRight size={16} color="#94A3B8" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {renderExternalPromptModal()}
      </div>
    );
  }

  // ================= VIEW 2: EDITORIAL MAGAZINE FEED =================
  return (
    <div style={{
      height: '100%',
      overflowY: 'auto',
      background: '#F8FAFC',
      color: '#0F172A',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Top Magazine Header Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        padding: '6px 16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {/* Drag Handle Pill */}
        <div 
          onTouchStart={onTouchStartHandle}
          onTouchMove={onTouchMoveHandle}
          onTouchEnd={onTouchEndHandle}
          style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 2px', cursor: 'grab' }}
        >
          <div style={{ width: '38px', height: '4px', borderRadius: '999px', background: '#CBD5E1' }} />
        </div>

        {/* Magazine Title & Controls Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: '#ECFEFF',
              color: '#0891B2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(8, 145, 178, 0.15)'
            }}>
              <Feather size={17} />
            </div>
            <div>
              <h2 style={{
                fontSize: '17px',
                fontWeight: 900,
                color: '#0F172A',
                margin: 0,
                letterSpacing: '-0.3px',
                fontFamily: 'Georgia, Cambria, serif'
              }}>
                BANI
              </h2>
              <p style={{ fontSize: '10.5px', color: '#64748B', margin: 0, fontWeight: 600 }}>
                {baniPublicationMeta.subtitle}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '10.5px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              background: '#F1F5F9',
              color: '#475569',
              padding: '4px 8px',
              borderRadius: '6px'
            }}>
              {baniPosts.length} STORIES
            </span>

            <button
              onClick={onClose}
              className="pressable"
              aria-label="Close"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.05)',
                color: '#64748B',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Track */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingTop: '8px',
          scrollbarWidth: 'none'
        }}>
          {baniCategories.map(cat => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className="pressable"
                style={{
                  border: 'none',
                  background: isSelected ? '#0891B2' : '#F1F5F9',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'background 0.15s ease'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '9.5px',
                  opacity: isSelected ? 0.9 : 0.7,
                  fontWeight: 800
                }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Magazine Body Feed */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* HERO FEATURED ARTICLE */}
        {(selectedCategory === 'All' || selectedCategory === featuredPost.category) && (
          <div
            onClick={() => handleArticleClick(featuredPost)}
            className="pressable"
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#0F172A',
              color: '#FFFFFF',
              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.16)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '260px',
              justifyContent: 'flex-end',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Background Image with Gradient Dimmer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${featuredPost.coverImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              filter: 'brightness(0.65)'
            }} />

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.5) 60%, rgba(15, 23, 42, 0.2) 100%)'
            }} />

            {/* Featured Badge */}
            <div style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              zIndex: 10,
              background: '#0891B2',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 900,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={11} />
              <span>FEATURED STORY</span>
            </div>

            {/* Content Overlay */}
            <div style={{ position: 'relative', zIndex: 10, padding: '18px' }}>
              <div style={{
                fontSize: '11px',
                color: '#67E8F9',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                marginBottom: '6px'
              }}>
                {featuredPost.category} • {featuredPost.readTime}
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 900,
                lineHeight: 1.3,
                margin: '0 0 8px',
                color: '#FFFFFF',
                fontFamily: 'Georgia, Cambria, serif'
              }}>
                {featuredPost.title}
              </h3>

              <p style={{
                fontSize: '12px',
                color: '#CBD5E1',
                margin: '0 0 14px',
                lineHeight: 1.45,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {featuredPost.excerpt}
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 800,
                color: '#FFFFFF',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '999px'
              }}>
                <span>Read Story</span>
                <ArrowRight size={13} />
              </div>
            </div>
          </div>
        )}

        {/* SECTION HEADER: LATEST STORIES */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: 800,
            color: '#0F172A',
            margin: 0,
            letterSpacing: '-0.2px'
          }}>
            {selectedCategory === 'All' ? 'All Stories' : selectedCategory}
          </h4>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ARTICLES FEED LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => handleArticleClick(post)}
              className="pressable"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              {/* Thumbnail Image */}
              {post.coverImage && (
                <div style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#E2E8F0'
                }}>
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Story Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 800,
                    color: '#0891B2',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px'
                  }}>
                    {post.category}
                  </span>
                  <span style={{ color: '#CBD5E1', fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '10.5px', color: '#64748B' }}>
                    {post.readTime}
                  </span>
                  {post.hasFullContent ? (
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#059669',
                      background: '#ECFDF5',
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}>
                      In-OS Reader
                    </span>
                  ) : (
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#0891B2',
                      background: '#ECFEFF',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}>
                      Blog ↗
                    </span>
                  )}
                </div>

                <h4 style={{
                  fontSize: '13.5px',
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1.35,
                  margin: '0 0 4px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontFamily: 'Georgia, Cambria, serif'
                }}>
                  {post.title}
                </h4>

                <p style={{
                  fontSize: '11.5px',
                  color: '#64748B',
                  margin: 0,
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {post.excerpt}
                </p>
              </div>

              <ChevronRight size={16} color="#94A3B8" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* PUBLICATION FOOTER */}
        <div style={{
          marginTop: '12px',
          marginBottom: '24px',
          padding: '16px',
          borderRadius: '16px',
          background: '#FFFFFF',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <p style={{ fontSize: '11px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
            Published by <strong>Banishwor Athokpam</strong> under the Bani cultural research initiative.
          </p>

          <a
            href={baniPublicationMeta.blogUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#0891B2',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Visit baniat.blogspot.com</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {renderExternalPromptModal()}
    </div>
  );
};
