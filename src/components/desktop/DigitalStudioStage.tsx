import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Maximize2,
  Sparkles,
  Disc3
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';
import './DigitalStudioStage.css';

export interface StudioTrack {
  id: string; // YouTube video ID
  title: string;
  artist: string;
  year: string;
  genre: string;
  tag: string;
  duration: string;
}

export const STUDIO_PLAYLIST: StudioTrack[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    year: '1987',
    genre: 'Synth-Pop / Dance',
    tag: 'Classic Easter Egg Rickroll',
    duration: '3:33'
  },
  {
    id: '9bZkp7q19f0',
    title: 'GANGNAM STYLE',
    artist: 'PSY',
    year: '2012',
    genre: 'K-Pop / EDM',
    tag: '1B+ Global Viral Phenomenon',
    duration: '4:12'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Despacito',
    artist: 'Luis Fonsi ft. Daddy Yankee',
    year: '2017',
    genre: 'Latin Pop / Reggaeton',
    tag: 'Billboard #1 Global Anthem',
    duration: '4:41'
  },
  {
    id: 'hT_nvWreIhg',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    year: '2019',
    genre: 'Synthwave / Retro Pop',
    tag: 'Billboard Record Breaker',
    duration: '4:20'
  },
  {
    id: 'YQHsXMglC9A',
    title: 'Hello',
    artist: 'Adele',
    year: '2015',
    genre: 'Soul / Power Ballad',
    tag: 'Record-Breaking Masterpiece',
    duration: '6:06'
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    year: '2017',
    genre: 'Pop / Tropical Rhythm',
    tag: 'Multi-Billion Stream Record',
    duration: '4:23'
  }
];

interface DigitalStudioStageProps {
  isEmbedded?: boolean;
  selectedTrackIndex?: number;
  onSelectTrackIndex?: (idx: number) => void;
  onSwitchToMobile?: () => void;
}

export const DigitalStudioStage: React.FC<DigitalStudioStageProps> = ({
  isEmbedded = false,
  selectedTrackIndex: controlledTrackIndex,
  onSelectTrackIndex
}) => {
  const [localTrackIndex, setLocalTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [keyCounter, setKeyCounter] = useState<number>(0); // Force iframe re-mount if needed
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const selectedTrackIndex = controlledTrackIndex !== undefined ? controlledTrackIndex : localTrackIndex;
  const setSelectedTrackIndex = (idx: number) => {
    if (onSelectTrackIndex) onSelectTrackIndex(idx);
    else setLocalTrackIndex(idx);
    setKeyCounter((prev) => prev + 1);
  };

  const currentTrack = STUDIO_PLAYLIST[selectedTrackIndex] || STUDIO_PLAYLIST[0];

  const handleSelectTrack = (index: number) => {
    playSuccessChime();
    setSelectedTrackIndex(index);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    playClickSound(750, 0.03);
    const prevIdx = selectedTrackIndex <= 0 ? STUDIO_PLAYLIST.length - 1 : selectedTrackIndex - 1;
    setSelectedTrackIndex(prevIdx);
  };

  const handleNext = () => {
    playClickSound(800, 0.03);
    const nextIdx = selectedTrackIndex >= STUDIO_PLAYLIST.length - 1 ? 0 : selectedTrackIndex + 1;
    setSelectedTrackIndex(nextIdx);
  };

  const handleShuffle = () => {
    playSuccessChime();
    let randomIdx = Math.floor(Math.random() * STUDIO_PLAYLIST.length);
    if (randomIdx === selectedTrackIndex) {
      randomIdx = (selectedTrackIndex + 1) % STUDIO_PLAYLIST.length;
    }
    setSelectedTrackIndex(randomIdx);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    playClickSound(850, 0.04);
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className={`vos-studio-stage ${isEmbedded ? 'embedded' : ''}`}>
      {/* ─────────────────────────────────────────────────────────────
          DUAL-PANEL SPATIAL DESK:
          LEFT: Apple Pro Studio Cinema Monitor (780px)
          RIGHT: VisionOS Frosted Glass iPhone Remote (400px)
          ───────────────────────────────────────────────────────────── */}
      <div className="vos-studio-desk-container">
        {/* ========================================================
            PANEL 1: APPLE PRO STUDIO CINEMA MONITOR (LEFT)
            ======================================================== */}
        <div className="vos-cinema-monitor-panel">
          {/* Ambient LED Audio Halo Backlight */}
          <div className="vos-cinema-ambient-halo" />

          {/* Physical Monitor Chassis */}
          <div className="vos-cinema-chassis">
            {/* Top Bezel: iSight Camera & Mic Dot */}
            <div className="vos-cinema-top-bezel">
              <div className="vos-cinema-camera-dot" />
            </div>

            {/* Anti-Reflective Glare Sheen */}
            <div className="vos-cinema-glare-overlay" />

            {/* Video Viewport Area (16:9 Cinema Aspect) */}
            <div className="vos-cinema-screen">
              <iframe
                key={`${currentTrack.id}-${keyCounter}`}
                src={`https://www.youtube-nocookie.com/embed/${currentTrack.id}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&modestbranding=1&rel=0&iv_load_policy=3`}
                title={`${currentTrack.title} — ${currentTrack.artist}`}
                className="vos-cinema-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Monitor Bottom Aluminum Bar & Track Meta */}
            <div className="vos-cinema-bottom-bar">
              <div className="vos-cinema-on-air-tag">
                <span className="on-air-pulse-dot" />
                <span className="on-air-label">STUDIO BROADCAST</span>
                <span className="on-air-sep">·</span>
                <span className="on-air-track-title">{currentTrack.title}</span>
                <span className="on-air-artist">({currentTrack.artist})</span>
              </div>

              <div className="vos-cinema-bar-right">
                <span className="vos-cinema-tag-chip">{currentTrack.tag}</span>
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="vos-cinema-btn-icon"
                  title="Expand Video"
                >
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Metallic Aluminum Stand Base */}
          <div className="vos-cinema-stand-neck" />
          <div className="vos-cinema-stand-foot" />
        </div>

        {/* ========================================================
            PANEL 2: FROSTED GLASS IPHONE REMOTE (RIGHT)
            ======================================================== */}
        <div className="vos-studio-remote-panel">
          {/* Dynamic Island: Audio Equalizer */}
          <div className="vos-remote-dynamic-island">
            <div className="vos-remote-island-camera" />
            <div className="vos-remote-island-waves">
              <span className="wave-bar bar-1" />
              <span className="wave-bar bar-2" />
              <span className="wave-bar bar-3" />
              <span className="wave-bar bar-4" />
            </div>
          </div>

          {/* Remote Header */}
          <div className="vos-remote-header">
            <div className="vos-remote-header-left">
              <Disc3 size={13} className="text-pink-600 animate-spin-slow" />
              <span className="vos-remote-title">STUDIO JUKEBOX</span>
            </div>
            <button
              onClick={handleShuffle}
              className="vos-remote-shuffle-badge"
              title="Pick a random surprise track"
            >
              <Shuffle size={11} />
              <span>Surprise Me</span>
            </button>
          </div>

          {/* Active Track Dossier Card */}
          <div className="vos-remote-track-card">
            <img
              src={`https://img.youtube.com/vi/${currentTrack.id}/mqdefault.jpg`}
              alt={currentTrack.title}
              className="vos-remote-album-art"
            />
            <div className="vos-remote-track-info">
              <div className="vos-remote-track-title" title={currentTrack.title}>
                {currentTrack.title}
              </div>
              <div className="vos-remote-track-artist">{currentTrack.artist}</div>
              <div className="vos-remote-track-meta">
                <span>{currentTrack.year}</span>
                <span>•</span>
                <span>{currentTrack.genre}</span>
              </div>
            </div>
          </div>

          {/* Remote Playback Transport Controls */}
          <div className="vos-remote-transport">
            <button
              onClick={handlePrev}
              className="vos-remote-btn"
              title="Previous Track"
            >
              <SkipBack size={15} />
            </button>
            <button
              onClick={togglePlayPause}
              className="vos-remote-btn-play"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={17} fill="#FFFFFF" /> : <Play size={17} fill="#FFFFFF" />}
            </button>
            <button
              onClick={handleNext}
              className="vos-remote-btn"
              title="Next Track"
            >
              <SkipForward size={15} />
            </button>
          </div>

          {/* Playlist Section Header */}
          <div className="vos-remote-playlist-label">
            <span>RETRO EASTER EGG PLAYLIST</span>
            <span className="playlist-count">06 TRACKS</span>
          </div>

          {/* Interactive Scrollable Playlist Drawer */}
          <div className="vos-remote-playlist-scroll">
            {STUDIO_PLAYLIST.map((track, idx) => {
              const isActive = idx === selectedTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`vos-remote-playlist-item ${isActive ? 'active' : ''}`}
                >
                  <span className="playlist-track-idx">{String(idx + 1).padStart(2, '0')}</span>
                  <img
                    src={`https://img.youtube.com/vi/${track.id}/default.jpg`}
                    alt={track.title}
                    className="playlist-item-thumb"
                  />
                  <div className="playlist-item-meta">
                    <span className="playlist-item-title">{track.title}</span>
                    <span className="playlist-item-artist">{track.artist}</span>
                  </div>
                  <span className="playlist-item-duration">{track.duration}</span>
                </button>
              );
            })}
          </div>

          {/* Fun Easter Egg Rickroll Note */}
          <div className="vos-remote-easter-egg-footer">
            <Sparkles size={11} style={{ color: '#F59E0B' }} />
            <span>Interactive Ambient Audio Console // BANI OS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
