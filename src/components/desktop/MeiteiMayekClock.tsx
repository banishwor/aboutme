import React, { useEffect, useRef, useState } from 'react';
import './MeiteiMayekClock.css';

// Authentic Meitei Mayek Numerals for 1 to 12
const MEITEI_NUMERALS: { hour: number; glyph: string }[] = [
  { hour: 12, glyph: '꯱꯲' }, // 12
  { hour: 1, glyph: '꯱' },   // 1
  { hour: 2, glyph: '꯲' },   // 2
  { hour: 3, glyph: '꯳' },   // 3
  { hour: 4, glyph: '꯴' },   // 4
  { hour: 5, glyph: '꯵' },   // 5
  { hour: 6, glyph: '꯶' },   // 6
  { hour: 7, glyph: '꯷' },   // 7
  { hour: 8, glyph: '꯸' },   // 8
  { hour: 9, glyph: '꯹' },   // 9
  { hour: 10, glyph: '꯱꯰' }, // 10
  { hour: 11, glyph: '꯱꯱' }  // 11
];

export const MeiteiMayekClock: React.FC = () => {
  const hourHandRef = useRef<SVGLineElement | null>(null);
  const minHandRef = useRef<SVGLineElement | null>(null);
  const secHandGroupRef = useRef<SVGGElement | null>(null);
  const [digitalTime, setDigitalTime] = useState<string>('');

  useEffect(() => {
    let animId = 0;

    // High-frequency 60fps mechanical sweep engine
    const updateClock = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const s = now.getSeconds();
      const m = now.getMinutes();
      const h = now.getHours();

      // Continuous rotational angles (degrees)
      const secAngle = (s + ms / 1000) * 6;
      const minAngle = (m + s / 60 + ms / 60000) * 6;
      const hourAngle = ((h % 12) + m / 60 + s / 3600) * 30;

      if (secHandGroupRef.current) {
        secHandGroupRef.current.setAttribute('transform', `rotate(${secAngle} 120 120)`);
      }
      if (minHandRef.current) {
        minHandRef.current.setAttribute('transform', `rotate(${minAngle} 120 120)`);
      }
      if (hourHandRef.current) {
        hourHandRef.current.setAttribute('transform', `rotate(${hourAngle} 120 120)`);
      }

      animId = requestAnimationFrame(updateClock);
    };

    animId = requestAnimationFrame(updateClock);

    // Update digital sub-readout every second
    const updateDigital = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      setDigitalTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    updateDigital();
    const interval = setInterval(updateDigital, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, []);

  // Compute positions for 60 radial perimeter tick marks
  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const angle = i * 6;
    const isHour = i % 5 === 0;
    const isCardinal = i % 15 === 0;
    const rad = (angle * Math.PI) / 180;
    const rOuter = 108;
    const rInner = isCardinal ? 96 : isHour ? 100 : 104;

    const x1 = 120 + rOuter * Math.sin(rad);
    const y1 = 120 - rOuter * Math.cos(rad);
    const x2 = 120 + rInner * Math.sin(rad);
    const y2 = 120 - rInner * Math.cos(rad);

    return {
      angle,
      x1,
      y1,
      x2,
      y2,
      isHour,
      isCardinal
    };
  });

  // Compute exact coordinates for the 12 Meitei Mayek Numerals (Radius 82px)
  const numerals = MEITEI_NUMERALS.map(({ hour, glyph }) => {
    const angle = hour * 30;
    const rad = (angle * Math.PI) / 180;
    const r = 82;
    const x = 120 + r * Math.sin(rad);
    const y = 120 - r * Math.cos(rad);
    const isCardinal = hour % 3 === 0;

    return { hour, glyph, x, y, isCardinal };
  });

  return (
    <div className="meitei-clock-container" title="Live Meitei Mayek Chronometer (Kangleipak / Thoubal)">
      <svg
        viewBox="0 0 240 240"
        className="meitei-clock-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Outer Bezel Ambient Glow */}
          <radialGradient id="clockBezelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="rgba(30, 27, 75, 0.0)" />
            <stop offset="96%" stopColor="rgba(99, 102, 241, 0.12)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.25)" />
          </radialGradient>

          {/* Golden Needle Filter */}
          <filter id="goldHandGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#FBBF24" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* 1. Transparent Bezel & Orbital Rings */}
        <circle cx="120" cy="120" r="114" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
        <circle cx="120" cy="120" r="110" fill="url(#clockBezelGlow)" />
        <circle cx="120" cy="120" r="110" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.2" />
        <circle cx="120" cy="120" r="102" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="120" cy="120" r="62" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />

        {/* 2. 60 Precision Radial Perimeter Ticks */}
        {ticks.map((t, idx) => (
          <line
            key={idx}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.isCardinal ? '#FBBF24' : t.isHour ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.2)'}
            strokeWidth={t.isCardinal ? 2 : t.isHour ? 1.5 : 0.8}
            strokeLinecap="round"
          />
        ))}

        {/* 3. The 12 Authentic Meitei Mayek Numerals */}
        {numerals.map((num) => (
          <text
            key={num.hour}
            x={num.x}
            y={num.y}
            textAnchor="middle"
            dominantBaseline="central"
            className={`meitei-numeral ${num.isCardinal ? 'cardinal' : ''}`}
          >
            {num.glyph}
          </text>
        ))}

        {/* 4. Dial Center Inscriptions */}
        <text
          x="120"
          y="74"
          textAnchor="middle"
          className="meitei-clock-brand"
        >
          KANGLEIPAK
        </text>
        <text
          x="120"
          y="166"
          textAnchor="middle"
          className="meitei-clock-coords"
        >
          THOUBAL · 24.63° N
        </text>

        {/* 5. Hour Hand (White with luminous tip) */}
        <line
          ref={hourHandRef}
          x1="120"
          y1="120"
          x2="120"
          y2="72"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* 6. Minute Hand (Slender silver/white) */}
        <line
          ref={minHandRef}
          x1="120"
          y1="120"
          x2="120"
          y2="46"
          stroke="rgba(255, 255, 255, 0.88)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 7. Continuously Sweeping Second Hand (Gold Needle with Tail & Counterweight) */}
        <g ref={secHandGroupRef} filter="url(#goldHandGlow)">
          {/* Forward Needle */}
          <line
            x1="120"
            y1="120"
            x2="120"
            y2="34"
            stroke="#FBBF24"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Rear Counterweight Tail */}
          <line
            x1="120"
            y1="120"
            x2="120"
            y2="138"
            stroke="#FBBF24"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Rear Counterweight Disc */}
          <circle cx="120" cy="132" r="2.8" fill="#FBBF24" />
        </g>

        {/* 8. Center Jewel Pivot Hub */}
        <circle cx="120" cy="120" r="5.5" fill="#0F172A" stroke="#FBBF24" strokeWidth="1.6" />
        <circle cx="120" cy="120" r="2" fill="#FBBF24" />
      </svg>

      {/* Live Digital Monospace Readout Below Dial */}
      <div className="meitei-clock-digital-pill">
        <span className="meitei-live-dot" />
        <span className="meitei-digital-val">{digitalTime}</span>
        <span className="meitei-digital-tz">LIVE</span>
      </div>
    </div>
  );
};
