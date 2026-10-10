import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Share2,
  Check,
  Smartphone,
  Feather,
  ScrollText,
  UserCheck
} from 'lucide-react';
import { baniPosts, BaniPost } from '../../content/blog';
import { profile } from '../../content/profile';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './HeritagePublicationStage.css';

interface HeritagePublicationStageProps {
  onSwitchToMobile?: () => void;
  onExploreNext?: () => void;
  isEmbedded?: boolean;
  selectedPostIndex?: number;
  onSelectPostIndex?: (idx: number) => void;
}

// Strictly the 3 curated cultural blog dispatches
export const CURATED_POSTS: BaniPost[] = baniPosts.slice(0, 3);

export const HeritagePublicationStage: React.FC<HeritagePublicationStageProps> = ({
  onSwitchToMobile,
  isEmbedded = false,
  selectedPostIndex: controlledPostIndex,
  onSelectPostIndex
}) => {
  // Selected article index within the 3 curated posts (0, 1, 2)
  const [localPostIndex, setLocalPostIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const selectedPostIndex = controlledPostIndex !== undefined ? controlledPostIndex : localPostIndex;
  const setSelectedPostIndex = (idx: number) => {
    if (onSelectPostIndex) onSelectPostIndex(idx);
    else setLocalPostIndex(idx);
  };
  const currentPost = CURATED_POSTS[selectedPostIndex] || CURATED_POSTS[0];
  const currentIndex = selectedPostIndex + 1;
  const totalCount = CURATED_POSTS.length;

  // Navigation handlers
  const handlePrev = () => {
    playClickSound(750, 0.03);
    const prevIdx = selectedPostIndex <= 0 ? CURATED_POSTS.length - 1 : selectedPostIndex - 1;
    if (onSelectPostIndex) onSelectPostIndex(prevIdx);
    else setLocalPostIndex(prevIdx);
  };

  const handleNext = () => {
    playClickSound(800, 0.03);
    const nextIdx = selectedPostIndex >= CURATED_POSTS.length - 1 ? 0 : selectedPostIndex + 1;
    if (onSelectPostIndex) onSelectPostIndex(nextIdx);
    else setLocalPostIndex(nextIdx);
  };

  const handleCopyLink = () => {
    playSuccessChime();
    navigator.clipboard.writeText(currentPost.sourceUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Curated research highlights for the 3 curated articles
  const getArticleHighlights = (post: BaniPost): string[] => {
    if (post.id === 'bani-2465941134708345721') {
      return [
        'Salai Taret: The 7 sacred exogamous clans codified under King Nongda Lairen Pakhangba (33–154 A.D.)',
        'Matrimonial Jurisprudence: The 6 strict prohibitions (Yek-thoknaba, Mungnaba, etc.) preventing inbreeding',
        'The Paphal Lambuba: 364 esoteric serpent designs representing clan protection and cosmic governance'
      ];
    }
    if (post.id === 'bani-271793456693682482') {
      return [
        'Historical Cataclysm: King Pamheiba (Garib Niwaz) and the Ramanandi Vaishnavite imposition',
        'Epu Maichou Khongnangthaba: The high priest who led indigenous resistance to defend Sanamahism',
        'Puya Meithaba: The tragic 1729 burning of sacred Kangleipak scriptures and loss of Meitei Mayek'
      ];
    }
    if (post.id === 'bani-2466650808538429284') {
      return [
        'Ningol Chakouba: Ancient harvest festival reaffirming eternal bonds between married daughters and parents',
        'Matrilineal Reverence: Ancestral banquet rooted in Lainingthou Sanamahi & Queen Leimarel Sidabi folklore',
        'Living Cultural Lifeline: The premier homecoming celebration preserving kinship across Kangleipak'
      ];
    }
    return [
      `Curated Research: Primary historical analysis preserved on baniat.blogspot.com`,
      `Oral Tradition & Scripture: Reconstructing ancient Kangleipak jurisprudence and heritage`,
      `Permanent Digital Record: Archived since ${post.publishedAt}`
    ];
  };

  return (
    <div className={`vos-heritage-stage ${isEmbedded ? 'embedded' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          1. WARM SUNLIT STUDY ROOM BACKDROP (Omitted if embedded in Unified stage)
          ───────────────────────────────────────────────────────────── */}
      {!isEmbedded && (
        <>
          <div className="vos-heritage-bg" />
          <div className="vos-heritage-overlay" />
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. SPATIAL SAFARI PILL TOOLBAR
          ───────────────────────────────────────────────────────────── */}
      {!isEmbedded && (
        <header className="vos-heritage-toolbar">
          {/* Left: Previous / Next Item Arrows + Counter */}
          <div className="vos-heritage-toolbar-left">
            <button
              onClick={handlePrev}
              title="Previous Dispatch"
              className="vos-heritage-pill-btn"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              title="Next Dispatch"
              className="vos-heritage-pill-btn"
            >
              <ChevronRight size={16} />
            </button>
            <div className="vos-heritage-counter-badge">
              <span>{String(currentIndex).padStart(2, '0')}</span>
              <span className="counter-sep">/</span>
              <span>{String(totalCount).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Center: Safari Spatial Pill Field with Publication Identity */}
          <a
            href={currentPost.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="vos-heritage-url-field"
            title="Click to visit original publication on baniat.blogspot.com"
          >
            <Feather size={13} style={{ color: '#D97706', flexShrink: 0 }} />
            <span className="vos-heritage-url-text">
              VOICES OF MEITEI HERITAGE · BANIAT.BLOGSPOT.COM
            </span>
            <ExternalLink size={11} style={{ color: '#94A3B8', flexShrink: 0 }} />
          </a>

          {/* Right: Author Profile Pill + Optional Phone OS Switch */}
          <div className="vos-heritage-toolbar-right">
            {onSwitchToMobile && (
              <button
                onClick={() => {
                  playClickSound(850, 0.04);
                  onSwitchToMobile();
                }}
                className="vos-heritage-pill-btn vos-phone-os-btn"
                title="Switch to Mobile Phone OS"
              >
                <Smartphone size={12} />
                <span>Phone OS</span>
              </button>
            )}
            <div className="vos-heritage-author-pill">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="vos-heritage-author-avatar"
              />
              <span className="vos-heritage-author-name">Bani · Cultural Blogger · Est. 2017</span>
            </div>
          </div>
        </header>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. DIRECTION A: THE FIRE-RESCUED PUYA CODEX (ANCIENT SCRAP MANUSCRIPT)
          (Aged deckled parchment, scorched edges, hemp binding & vermilion seal)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-broadsheet-container puya-scrap-codex">
        {/* Scorched Corner Burns (Symbolizing Survival from the 1729 Puya Meithaba) */}
        <div className="puya-scorch-burn scorch-top-left" />
        <div className="puya-scorch-burn scorch-bottom-right" />
        <div className="puya-scorch-burn scorch-top-right" />

        {/* Authentic Hand-Stitched Hemp Twine Binding down the Center Spine */}
        <div className="puya-hemp-spine">
          <div className="puya-stitch-groove" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="puya-stitch-point" style={{ top: `${14 + i * 14.5}%` }}>
              <div className="puya-stitch-hole" />
              <div className="puya-hemp-thread" />
            </div>
          ))}
          <div className="puya-hemp-knot-tassel" />
        </div>

        {/* ========================================================
            PAGE 1 (LEFT): BLOGGER IDENTITY, STORY & SLIP SELECTOR
            ======================================================== */}
        <section className="vos-broadsheet-page left-page puya-deckled-page">
          {/* Faint Horizontal Palm-Leaf Ruled Guide Lines */}
          <div className="puya-palm-ruled-lines" />

          {/* Scribe Marginalia Annotation in the outer margin */}
          <div className="puya-scribal-marginalia">
            <span>ꯄꯨꯌꯥ • Transcribed from sacred oral codices • Imphal Valley</span>
          </div>

          {/* Header Row: Blogger Profile & Mission */}
          <div className="vos-blogger-story-header">
            <div className="vos-blogger-mayek-lead">
              <span className="mayek-text">ꯃꯤꯇꯩ ꯍꯦꯔꯤꯇꯦꯖ ꯕ꯭ꯂꯣꯒ</span>
              <span className="mayek-sep">•</span>
              <span className="blog-domain">BANIAT.BLOGSPOT.COM</span>
            </div>
            <h2 className="vos-blogger-headline">
              Banishwor Athokpam (Bani)
            </h2>
            <div className="vos-blogger-byline">
              <span className="puya-ink-role">Cultural Researcher & Digital Archivist</span>
              <span className="byline-dot">•</span>
              <span>Blogging Since Jan 2017</span>
            </div>
          </div>

          {/* Sincere Personal Origin Story Box (from blogger about-me) */}
          <div className="vos-blogger-personal-card puya-scrap-card">
            <div className="puya-wax-seal-mini">❖</div>
            <p className="vos-blogger-statement puya-hand-text">
              I want to be entirely transparent: <strong>I am an MCA graduate, not a professional historian.</strong> I started this blog purely out of love for our Meitei heritage and a relentless desire to preserve it before ancient memories faded into obscurity.
            </p>
            <p className="vos-blogger-mission puya-hand-sub">
              Valuable historical information was often buried in rare palm-leaf records, old newspapers, or scattered across hard-to-find archives. I curate, rewrite for clarity, and design digital tools like the Sagei clan finder so modern generations stay connected with our ancestral roots.
            </p>
            <div className="vos-blogger-signoff">
              <UserCheck size={12} style={{ color: '#854D0E' }} />
              <span>Bani · Curating & Modernizing Meitei Heritage Since 2017</span>
            </div>
          </div>

          {/* Dispatch Selector as Antique Manuscript Parchment Slips */}
          <div className="vos-puya-tabs-section">
            <div className="vos-puya-tabs-label">
              <span>MANUSCRIPT CODEX FOLIOS</span>
              <span className="puya-label-script">ꯈꯣꯝꯖꯤꯟꯕ ꯄꯨꯌꯥ</span>
            </div>
            <div className="vos-puya-slips-list">
              <button
                onClick={() => {
                  playClickSound(800, 0.03);
                  setSelectedPostIndex(0);
                }}
                className={`puya-parchment-slip ${selectedPostIndex === 0 ? 'active' : ''}`}
              >
                <div className="puya-slip-numeral">
                  <span className="mayek-num">꯱</span>
                  <span className="roman-num">FOLIO I</span>
                </div>
                <div className="puya-slip-content">
                  <span className="puya-slip-title">The Yek-Salai System</span>
                  <span className="puya-slip-sub">Kinship Architecture & Matrimonial Jurisprudence</span>
                </div>
                <div className="puya-slip-seal" />
              </button>

              <button
                onClick={() => {
                  playClickSound(800, 0.03);
                  setSelectedPostIndex(1);
                }}
                className={`puya-parchment-slip ${selectedPostIndex === 1 ? 'active' : ''}`}
              >
                <div className="puya-slip-numeral">
                  <span className="mayek-num">꯲</span>
                  <span className="roman-num">FOLIO II</span>
                </div>
                <div className="puya-slip-content">
                  <span className="puya-slip-title">The Dark Era of Kangleipak</span>
                  <span className="puya-slip-sub">1729 Burning of the Sacred Puyas (Puya Meithaba)</span>
                </div>
                <div className="puya-slip-seal" />
              </button>

              <button
                onClick={() => {
                  playClickSound(800, 0.03);
                  setSelectedPostIndex(2);
                }}
                className={`puya-parchment-slip ${selectedPostIndex === 2 ? 'active' : ''}`}
              >
                <div className="puya-slip-numeral">
                  <span className="mayek-num">꯳</span>
                  <span className="roman-num">FOLIO III</span>
                </div>
                <div className="puya-slip-content">
                  <span className="puya-slip-title">Ningol Chakouba</span>
                  <span className="puya-slip-sub">Celebration of Matrilineal Affection & Living Kinship</span>
                </div>
                <div className="puya-slip-seal" />
              </button>
            </div>
          </div>

          {/* Page 1 Bottom: External Links & Blogger Profile */}
          <div className="vos-broadsheet-footer puya-scrap-footer">
            <a
              href="https://baniat.blogspot.com/p/about-me.html"
              target="_blank"
              rel="noreferrer"
              className="vos-blogger-about-link puya-link"
              title="Read full story on Blogger"
            >
              <span>📜 Read My Full Story on Blogger ↗</span>
            </a>

            <div className="vos-broadsheet-actions">
              <button
                onClick={handleCopyLink}
                className="vos-broadsheet-btn-ghost puya-btn-ghost"
                title="Copy dispatch link"
              >
                {isCopied ? <Check size={12} color="#15803D" /> : <Share2 size={12} />}
                <span>{isCopied ? 'Copied' : 'Share'}</span>
              </button>

              <a
                href={currentPost.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="vos-broadsheet-btn-primary puya-ink-btn"
                title="Open complete article on baniat.blogspot.com"
              >
                <span>Visit Blogspot</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================
            PAGE 2 (RIGHT): FIRE-RESCUED MANUSCRIPT LEAF & READER
            (Mounted Photo Plate with Brass Corners + Inscribed Prose)
            ======================================================== */}
        <section className="vos-broadsheet-page right-page puya-deckled-page">
          {/* Faint Horizontal Palm-Leaf Ruled Guide Lines */}
          <div className="puya-palm-ruled-lines" />

          {/* Authentic Scarlet Cinnabar Archivist Stamp (Stamped Askew on Corner) */}
          <div className="puya-cinnabar-stamp" title="Royal Archivist Provenance Seal">
            <svg viewBox="0 0 100 100" className="cinnabar-svg">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 2" opacity="0.85" />
              <circle cx="50" cy="50" r="41" fill="none" stroke="#B91C1C" strokeWidth="1.5" opacity="0.9" />
              <path
                d="M50 18 Q62 34 50 50 Q38 66 50 82 Q56 66 50 50 Q44 34 50 18 Z"
                fill="none"
                stroke="#DC2626"
                strokeWidth="2"
                opacity="0.8"
              />
              <text x="50" y="32" textAnchor="middle" fill="#B91C1C" fontSize="8" fontWeight="800" fontFamily="serif" letterSpacing="1">
                KANGLEIPAK
              </text>
              <text x="50" y="74" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                ꯕꯥꯅꯤ • 2017
              </text>
            </svg>
          </div>

          {/* Running Head with Authentic Meitei Mayek Script */}
          <div className="vos-manuscript-running-head puya-manuscript-head">
            <div className="vos-mayek-watermark puya-burnt-watermark">
              ꯂꯥꯏꯔꯦꯟ ꯄꯥꯈꯪꯕ • ꯄꯨꯌꯥ
            </div>
            <div className="vos-running-head-meta puya-header-folio">
              <span>FOLIO NO. 0{currentIndex}</span>
              <span className="vos-running-dot">•</span>
              <span>{currentPost.publishedAt.slice(-4)}</span>
            </div>
          </div>

          {/* Page 2 Body Content */}
          <div className="vos-manuscript-body">
            <AnimatePresence mode="wait">
              <motion.div
                key={`reader-${currentPost.id}`}
                className="vos-manuscript-content"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {/* Archival Photo Plate Mounted with Brass Photo Corners */}
                <div className="puya-mounted-plate-container">
                  <div className="puya-photo-corner top-left" />
                  <div className="puya-photo-corner top-right" />
                  <div className="puya-photo-corner bottom-left" />
                  <div className="puya-photo-corner bottom-right" />

                  <div className="puya-photo-frame">
                    <img
                      src={currentPost.coverImage}
                      alt={currentPost.title}
                      className="puya-photo-img"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/study-bg.jpg';
                      }}
                    />
                    <div className="puya-photo-matting-bar">
                      <span className="puya-plate-tag">PLATE 0{currentIndex}</span>
                      <span className="puya-plate-caption">
                        {currentPost.title.length > 55 ? `${currentPost.title.slice(0, 52)}...` : currentPost.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ancient Inscribed Prose Reader with Custom Scroll */}
                <div className="vos-manuscript-reader-scroll puya-manuscript-scroll">
                  <div className="vos-manuscript-prose">
                    {/* Ancient Manuscript Title */}
                    <h3 className="puya-inscribed-title">
                      {currentPost.title}
                    </h3>

                    {/* Illuminated Opening Paragraph with Medieval Calligraphic Drop Cap */}
                    <p className="puya-illuminated-prose">
                      <span className="puya-illuminated-dropcap">
                        {currentPost.excerpt.charAt(0)}
                      </span>
                      {currentPost.excerpt.slice(1)}
                    </p>

                    {/* Sacred Inscribed Slate Pull-Quote */}
                    <div className="puya-inscribed-slate">
                      <div className="puya-slate-trim" />
                      <p className="puya-slate-quote">
                        {currentPost.id === 'bani-2465941134708345721'
                          ? '"The Yek-Salai system is the absolute bedrock of Kangleipak jurisprudence, governing exogamy, ancestral reverence, and societal harmony."'
                          : currentPost.id === 'bani-271793456693682482'
                          ? '"In the tragic ashes of the 1729 Puya Meithaba, our sacred palm leaves burned, but the soul of Sanamahi memory survived through unyielding oral lineage."'
                          : '"Ningol Chakouba is not merely an annual feast—it is the living emotional lifeline preserving family affection, female reverence, and ancestral kinship across generations."'}
                      </p>
                    </div>

                    {/* Curated Field Highlights Inscribed as Ancient Law Codices */}
                    <div className="puya-laws-codex-box">
                      <div className="puya-laws-heading">
                        <ScrollText size={11} style={{ color: '#92400E' }} />
                        <span>SACRED RECORDINGS & PRINCIPLES</span>
                      </div>
                      {getArticleHighlights(currentPost).map((highlight, idx) => (
                        <div key={idx} className="puya-codex-line">
                          <span className="puya-codex-marker">❖</span>
                          <span className="puya-codex-text">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Direct Read Full Article Link */}
                    <a
                      href={currentPost.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="puya-scroll-dispatch-cta"
                    >
                      <span>Read complete historical treatise on baniat.blogspot.com</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};
