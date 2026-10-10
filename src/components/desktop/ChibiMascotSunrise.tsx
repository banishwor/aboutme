import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Sun } from 'lucide-react';
import { playMascotBoopSound } from '../../utils/audioFeedback';

interface ChibiMascotSunriseProps {
  isDaylight?: boolean;
  onSunrise: () => void;
  onButtonPressStateChange?: (isPressed: boolean) => void;
}

type MascotPhase =
  | 'offscreen'
  | 'walking_in'
  | 'arrived'
  | 'tapping'
  | 'celebrating'
  | 'walking_home'
  | 'frustrated_in'
  | 'frustrated_tap'
  | 'frustrated_cheer'
  | 'gone_home';

export const ChibiMascotSunrise: React.FC<ChibiMascotSunriseProps> = ({
  isDaylight,
  onSunrise,
  onButtonPressStateChange
}) => {
  const [phase, setPhase] = useState<MascotPhase>('offscreen');
  const [dialog, setDialog] = useState<string>('');
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPetted, setIsPetted] = useState(false);
  const [walkCycle, setWalkCycle] = useState(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const walkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasCompletedSunriseEntranceRef = useRef(false);
  const wasInDaylightRef = useRef(false);

  const clearTimers = () => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  };

  const addTimer = (cb: () => void, ms: number) => {
    const t = setTimeout(cb, ms);
    timerRefs.current.push(t);
    return t;
  };

  const startWalkCycle = () => {
    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    walkIntervalRef.current = setInterval(() => {
      setWalkCycle((prev) => (prev + 1) % 4);
    }, 180);
  };

  const stopWalkCycle = () => {
    if (walkIntervalRef.current) {
      clearInterval(walkIntervalRef.current);
      walkIntervalRef.current = null;
    }
    setWalkCycle(0);
  };

  // Blinking loop for expressive anime face
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3200);
    return () => clearInterval(blinkInterval);
  }, []);

  // Sunrise awakening choreography: runs automatically when mounted on scroll
  useEffect(() => {
    clearTimers();
    hasCompletedSunriseEntranceRef.current = false;
    wasInDaylightRef.current = false;
    setPhase('offscreen');

    // Step 1: At T+300ms, start wandering in from offscreen through the dark
    addTimer(() => {
      setPhase('walking_in');
      startWalkCycle();
      setDialog('Who turned off all the lights? 🙈🌑');
    }, 300);

    // Dialogue progression while stumbling & feeling her way in the dark
    addTimer(() => {
      setDialog('Oof! Wandering in the dark... 🐾🕯️');
    }, 1500);

    addTimer(() => {
      setDialog('Wait... is that it? Aha! Found it! ✨');
    }, 2700);

    // Step 2: At T+3400ms, arrive directly above the lighting switch
    addTimer(() => {
      stopWalkCycle();
      setPhase('arrived');
      setDialog("Time to turn on the sunrise light! ☀️📚");
    }, 3400);

    // Step 3: At T+4200ms, reach down and click the light switch!
    addTimer(() => {
      setPhase('tapping');
      setDialog('*CLICK!* SUNRISE! ☀️✨');
      if (onButtonPressStateChange) onButtonPressStateChange(true);
      playMascotBoopSound();
      onSunrise();

      addTimer(() => {
        if (onButtonPressStateChange) onButtonPressStateChange(false);
      }, 250);
    }, 4200);

    // Step 4: At T+4800ms, celebrate with raised arms & golden sunlight
    addTimer(() => {
      setPhase('celebrating');
      setDialog('Ah, warm morning light! Enjoy the books~ 📖🌸');
    }, 4800);

    // Step 5: At T+7600ms, walk back home in daylight
    addTimer(() => {
      setPhase('walking_home');
      startWalkCycle();
      setDialog('Happy reading! Bye bye~ ☀️✨');
    }, 7600);

    // Step 6: At T+10200ms, fully off-screen and mark entrance as complete
    addTimer(() => {
      stopWalkCycle();
      setPhase('gone_home');
      setDialog('');
      hasCompletedSunriseEntranceRef.current = true;
      wasInDaylightRef.current = true;
    }, 10200);

    return () => {
      clearTimers();
      if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FRUSTRATION HANDLER: When user turns dark mode back on in Act 11!
  useEffect(() => {
    // Only react strictly AFTER initial sunrise entrance has completed
    if (!hasCompletedSunriseEntranceRef.current) return;

    // Detect when user manually toggles back to dark mode
    if (wasInDaylightRef.current && !isDaylight) {
      clearTimers();
      wasInDaylightRef.current = false;

      // She comes back frustrated from the right!
      setPhase('frustrated_in');
      startWalkCycle();
      setDialog('Hey! Who turned off MY sun?! 😤💢');

      // Arrives at button and angrily taps it back on!
      addTimer(() => {
        stopWalkCycle();
        setPhase('frustrated_tap');
        setDialog('*ANGRY SUNRISE TAP!* 😤💥');
        if (onButtonPressStateChange) onButtonPressStateChange(true);
        playMascotBoopSound();
        onSunrise(); // Flips light back on!

        addTimer(() => {
          if (onButtonPressStateChange) onButtonPressStateChange(false);
        }, 220);
      }, 2000);

      // Frustrated celebration
      addTimer(() => {
        setPhase('frustrated_cheer');
        setDialog("Don't touch the dark switch! Hmph! 😤☀️");
      }, 2700);

      // Walk back home
      addTimer(() => {
        setPhase('walking_home');
        startWalkCycle();
        setDialog('Going back... keep the sunshine on! ☀️✨');
      }, 5200);

      // Gone
      addTimer(() => {
        stopWalkCycle();
        setPhase('gone_home');
        setDialog('');
        wasInDaylightRef.current = true;
      }, 7600);
    }

    if (isDaylight && hasCompletedSunriseEntranceRef.current) {
      wasInDaylightRef.current = true;
    }
  }, [isDaylight, onSunrise, onButtonPressStateChange]);

  const handlePet = () => {
    if (phase === 'gone_home' || phase === 'offscreen') return;
    playMascotBoopSound();
    setIsPetted(true);
    setDialog('Hehe, that tickles! 🐾💕');
    setTimeout(() => setIsPetted(false), 900);
    setTimeout(() => setDialog(''), 3200);
  };

  const getWalkBob = () => {
    if (phase !== 'walking_in' && phase !== 'walking_home' && phase !== 'frustrated_in') return 0;
    const bobs = [-2, -4, -2, 0];
    return bobs[walkCycle] || 0;
  };

  const getWalkTilt = () => {
    if (phase !== 'walking_in' && phase !== 'walking_home' && phase !== 'frustrated_in') return 0;
    const tilts = [-3, 0, 3, 0];
    return tilts[walkCycle] || 0;
  };

  const isFrustrated = phase === 'frustrated_in' || phase === 'frustrated_tap' || phase === 'frustrated_cheer';
  const isCheering = phase === 'celebrating' || phase === 'frustrated_cheer';
  const isTapping = phase === 'tapping' || phase === 'frustrated_tap';
  const isWalking = phase === 'walking_in' || phase === 'walking_home' || phase === 'frustrated_in';

  if (phase === 'gone_home' || phase === 'offscreen') return null;

  return (
    <motion.div
      className="chibi-mascot-container"
      initial={{ x: 340, y: 120, opacity: 0 }}
      animate={
        phase === 'walking_in' || phase === 'frustrated_in'
          ? {
              x: phase === 'frustrated_in' ? [340, 220, 100, 0] : [340, 270, 290, 200, 220, 130, 150, 70, 20, 0],
              y: phase === 'frustrated_in' ? [120, 60, 20, 0] : [120, 90, 105, 70, 85, 40, 55, 20, -5, 0],
              rotate: phase === 'frustrated_in' ? [5, -5, 5, 0] : [8, -12, 14, -10, 12, -8, 10, -6, 4, 0],
              opacity: 1,
              scale: isPetted ? 1.15 : 1,
              transition: {
                duration: phase === 'frustrated_in' ? 2.0 : 3.4,
                ease: 'easeInOut'
              }
            }
          : phase === 'arrived' || phase === 'tapping' || phase === 'celebrating' || phase === 'frustrated_tap' || phase === 'frustrated_cheer'
          ? {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: isPetted ? 1.15 : isTapping ? 0.95 : 1,
              transition: { duration: 0.18 }
            }
          : phase === 'walking_home'
          ? {
              x: [0, 90, 200, 340],
              y: [0, 40, 80, 140],
              rotate: [0, 6, -6, 0],
              opacity: [1, 1, 0.8, 0],
              scale: [1, 1, 0.9, 0.8],
              transition: {
                duration: 2.4,
                ease: 'easeInOut'
              }
            }
          : {}
      }
      style={{
        position: 'absolute',
        bottom: 'calc(100% - 12px)',
        left: '50%',
        marginLeft: -24,
        zIndex: 60,
        pointerEvents: 'auto',
        overflow: 'visible'
      }}
    >
      {/* Speech Bubble — positioned to her LEFT so it never clips top or right edges */}
      <AnimatePresence>
        {dialog && (
          <motion.div
            key={`chibi-dialog-${dialog}`}
            initial={{ opacity: 0, x: 8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.92 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: 'calc(100% + 12px)',
              top: '2px',
              padding: '6px 14px',
              background: isFrustrated ? 'rgba(220, 38, 38, 0.95)' : 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: isFrustrated ? '1px solid rgba(248, 113, 113, 0.65)' : '1px solid rgba(245, 158, 11, 0.65)',
              borderRadius: '12px',
              color: '#F8FAFC',
              fontSize: '11.5px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              boxShadow: isFrustrated
                ? '0 6px 20px rgba(220, 38, 38, 0.45), 0 0 12px rgba(220, 38, 38, 0.3)'
                : '0 6px 20px rgba(0, 0, 0, 0.45), 0 0 15px rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 100,
              pointerEvents: 'none'
            }}
          >
            <Sun size={12} style={{ color: isFrustrated ? '#FCA5A5' : '#F59E0B', flexShrink: 0 }} />
            <span>{dialog}</span>
            {/* Arrow tail pointing right towards the chibi */}
            <div
              style={{
                position: 'absolute',
                top: '11px',
                left: '100%',
                width: 0,
                height: 0,
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderLeft: isFrustrated ? '7px solid rgba(220, 38, 38, 0.95)' : '7px solid rgba(15, 23, 42, 0.95)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles when celebrating */}
      {isCheering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.4, 1.6], y: -16 }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: -14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <Sparkles size={28} style={{ color: isFrustrated ? '#EF4444' : '#F59E0B', filter: `drop-shadow(0 0 10px ${isFrustrated ? '#EF4444' : '#F59E0B'})` }} />
        </motion.div>
      )}

      {/* Frustration anger marks */}
      {isFrustrated && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1], scale: [0.5, 1.2, 0.9, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.8 }}
          style={{
            position: 'absolute',
            top: -18,
            left: -2,
            fontSize: '16px',
            pointerEvents: 'none',
            zIndex: 70
          }}
        >
          💢
        </motion.div>
      )}

      {/* Love reaction when petted */}
      {isPetted && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -26, scale: 1.25 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: -14,
            right: 2,
            pointerEvents: 'none'
          }}
        >
          <Heart size={20} style={{ color: '#EC4899', fill: '#EC4899' }} />
        </motion.div>
      )}

      {/* Exact Vector SVG Character matching Bani's Companion from Act 08 */}
      <motion.div
        className="chibi-avatar"
        onClick={handlePet}
        title="Bani's Companion (Click to pet!)"
        animate={{
          y: isTapping ? 5 : getWalkBob(),
          rotate: isCheering
            ? [0, 6, -6, 0]
            : isFrustrated && !isTapping
            ? [0, -3, 3, -3, 0]
            : getWalkTilt(),
          scaleX: phase === 'walking_home' ? -1 : 1
        }}
        transition={{
          y: { duration: 0.18 },
          rotate: isCheering ? { repeat: 2, duration: 0.4 } : { duration: 0.18 },
          scaleX: { duration: 0.2 }
        }}
        style={{
          cursor: 'pointer',
          filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4))',
          overflow: 'visible'
        }}
      >
        <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
          {/* Cyber Twintail Ribbons / Hair Floats */}
          <path d="M6 22C3 15 5 7 11 8C13 14 11 23 9 26L6 22Z" fill="url(#chibiHairGradSunrise)" stroke="#8B5CF6" strokeWidth="1.2" />
          <path d="M42 22C45 15 43 7 37 8C35 14 37 23 39 26L42 22Z" fill="url(#chibiHairGradSunrise)" stroke="#8B5CF6" strokeWidth="1.2" />

          {/* Glowing Cat/Cyber Ears */}
          <path d="M11 15L15 4C15.6 2.5 18 3.5 17.5 5.5L16 16" fill="url(#chibiEarGradSunrise)" stroke="#A78BFA" strokeWidth="1.2" />
          <path d="M37 15L33 4C32.4 2.5 30 3.5 30.5 5.5L32 16" fill="url(#chibiEarGradSunrise)" stroke="#A78BFA" strokeWidth="1.2" />

          {/* Little Cute Cape / Body */}
          <path d="M15 36C15 33 24 32 33 36C35 42 33 46 24 46C15 46 13 42 15 36Z" fill="url(#chibiCapeGradSunrise)" stroke="#8B5CF6" strokeWidth="1.2" />

          {/* Chibi Head / Face */}
          <ellipse cx="24" cy="24" rx="16" ry="14" fill="url(#chibiSkinGradSunrise)" stroke="rgba(196, 181, 253, 0.8)" strokeWidth="1.4" />

          {/* Cute Anime Hair Bangs */}
          <path d="M9 20C12 12 18 11 24 11C30 11 36 12 39 20C36 15 30 14 24 14C18 14 12 15 9 20Z" fill="url(#chibiHairGradSunrise)" />
          <path d="M20 12C22 17 25 18 27 12" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" />

          {/* Soft Anime Blush */}
          <ellipse cx="13" cy="27" rx="3.2" ry="1.8" fill={isFrustrated ? '#EF4444' : '#F472B6'} opacity={isFrustrated ? '0.8' : '0.65'} />
          <ellipse cx="35" cy="27" rx="3.2" ry="1.8" fill={isFrustrated ? '#EF4444' : '#F472B6'} opacity={isFrustrated ? '0.8' : '0.65'} />

          {/* Left Eye */}
          {isCheering ? (
            <path d="M15 23Q18 20 21 23" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          ) : isFrustrated ? (
            <g>
              <path d="M14 22L21 24" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
              <ellipse cx="18" cy="25" rx="2.5" ry="3" fill="#1E1B4B" />
              <circle cx="19" cy="24" r="1" fill="#FFFFFF" />
            </g>
          ) : isBlinking ? (
            <path d="M15 24Q18 26 21 24" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <g>
              <ellipse cx="18" cy="23.5" rx="3" ry="4" fill="#1E1B4B" />
              <circle cx="19" cy="22" r="1.3" fill="#FFFFFF" />
              <circle cx="17" cy="24.8" r="0.7" fill="#A78BFA" />
            </g>
          )}

          {/* Right Eye */}
          {isCheering ? (
            <path d="M27 23Q30 20 33 23" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          ) : isFrustrated ? (
            <g>
              <path d="M34 22L27 24" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
              <ellipse cx="30" cy="25" rx="2.5" ry="3" fill="#1E1B4B" />
              <circle cx="31" cy="24" r="1" fill="#FFFFFF" />
            </g>
          ) : isBlinking ? (
            <path d="M27 24Q30 26 33 24" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <g>
              <ellipse cx="30" cy="23.5" rx="3" ry="4" fill="#1E1B4B" />
              <circle cx="31" cy="22" r="1.3" fill="#FFFFFF" />
              <circle cx="29" cy="24.8" r="0.7" fill="#A78BFA" />
            </g>
          )}

          {/* Cute Mouth */}
          {isCheering ? (
            <path d="M22 28Q24 32 26 28" stroke="#1E1B4B" strokeWidth="1.6" strokeLinecap="round" fill="#FDA4AF" />
          ) : isFrustrated ? (
            <path d="M20 29Q24 26 28 29" stroke="#1E1B4B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          ) : isTapping ? (
            <circle cx="24" cy="28.5" r="1.6" fill="#1E1B4B" />
          ) : (
            <path d="M22 28Q24 29.5 26 28" stroke="#1E1B4B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          )}

          {/* ─── HANDS & ARMS ─── */}
          {/* TAPPING: Right hand stretches down to physically press the button below */}
          {isTapping && (
            <g>
              {/* Left hand on hip */}
              <ellipse cx="13" cy="36" rx="3.5" ry="3" fill="#FFF" stroke="#8B5CF6" strokeWidth="1.2" />
              {/* Right arm reaching down past the body toward the button */}
              <path d="M32 34C34 40 35 48 36 56" stroke="#EDE9FE" strokeWidth="4" strokeLinecap="round" />
              {/* Right hand pressing on button surface */}
              <ellipse cx="36" cy="56" rx="4.5" ry="3.5" fill="#FFFFFF" stroke={isFrustrated ? '#EF4444' : '#D97706'} strokeWidth="1.4" />
              {/* Tap impact ripple */}
              <path d="M31 57Q36 59 41 57" stroke={isFrustrated ? '#EF4444' : '#F59E0B'} strokeWidth="1.2" strokeLinecap="round" fill="none" />
              {isFrustrated && <text x="41" y="52" fontSize="10" fill="#EF4444">💥</text>}
            </g>
          )}

          {/* CELEBRATING: Both hands raised */}
          {isCheering && (
            <g>
              <path d="M15 33L10 24" stroke="#EDE9FE" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="9" cy="23" r="3.2" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.2" />
              <path d="M33 33L38 24" stroke="#EDE9FE" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="39" cy="23" r="3.2" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.2" />
            </g>
          )}

          {/* WALKING: Alternate leg positions */}
          {isWalking && !isTapping && !isCheering && (
            <g>
              {/* Walking arms swinging */}
              <ellipse cx={14 + (walkCycle % 2 === 0 ? -2 : 2)} cy="38" rx="3.2" ry="2.8" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.2" />
              <ellipse cx={34 + (walkCycle % 2 === 0 ? 2 : -2)} cy="38" rx="3.2" ry="2.8" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.2" />
              {/* Little walking feet indicators */}
              <ellipse cx={20 + (walkCycle % 2 === 0 ? -1 : 1)} cy="47" rx="4" ry="2" fill="#7C3AED" opacity="0.5" />
              <ellipse cx={28 + (walkCycle % 2 === 0 ? 1 : -1)} cy="47" rx="4" ry="2" fill="#7C3AED" opacity="0.5" />
            </g>
          )}

          {/* NORMAL IDLE / ARRIVED: Hands resting */}
          {!isTapping && !isCheering && !isWalking && (
            <g>
              <ellipse cx="14" cy="38" rx="3.2" ry="2.8" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.2" />
              <ellipse cx="34" cy="38" rx="3.2" ry="2.8" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.2" />
            </g>
          )}

          {/* Gradients */}
          <defs>
            <linearGradient id="chibiSkinGradSunrise" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.65" stopColor="#FFF1F2" />
              <stop offset="1" stopColor="#FEE2E2" />
            </linearGradient>
            <linearGradient id="chibiHairGradSunrise" x1="10" y1="5" x2="38" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C4B5FD" />
              <stop offset="0.6" stopColor="#A78BFA" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="chibiEarGradSunrise" x1="12" y1="3" x2="18" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A78BFA" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="chibiCapeGradSunrise" x1="14" y1="32" x2="34" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7C3AED" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
};
