import React, { useState } from 'react';
import { X, Check, Copy, Smartphone, Sparkles } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../../utils/audioFeedback';

interface SendToPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SendToPhoneModal: React.FC<SendToPhoneModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetUrl = 'https://banishwor.github.io/aboutme/';
  // Quick dynamic QR service URL for high-contrast crisp scanning
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(targetUrl)}&margin=10&color=0F172A&bgcolor=FFFFFF`;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(7, 11, 20, 0.8)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px'
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(79, 70, 229, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          color: '#FFFFFF'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)'
        }}>
          <Smartphone size={24} color="#FFFFFF" />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
          Beam to Smartphone
        </h3>
        <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Scan this QR code with your phone camera to experience the native <strong style={{ color: '#E2E8F0' }}>BANI // OS</strong> mobile experience directly in your hand!
        </p>

        {/* QR Code Container */}
        <div style={{
          background: '#FFFFFF',
          padding: '16px',
          borderRadius: '20px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
          marginBottom: '24px'
        }}>
          <img
            src={qrUrl}
            alt="Scan to open on smartphone"
            style={{ width: '200px', height: '200px', display: 'block', borderRadius: '8px' }}
          />
        </div>

        {/* Copy Link Alternative */}
        <button
          onClick={handleCopy}
          className="pressable"
          style={{
            width: '100%',
            background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
            border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.12)'}`,
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: copied ? '#34D399' : '#E2E8F0',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Direct Portfolio Link'}</span>
        </button>

        <div style={{
          marginTop: '16px',
          fontSize: '11px',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Sparkles size={11} color="#6366F1" />
          <span>Optimized for iOS Safari & Android Chrome</span>
        </div>
      </div>
    </div>
  );
};
