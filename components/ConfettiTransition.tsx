import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'motion/react';

// Decorative diagonal + confetti transition that blends the white sections above
// into the peach Event Gallery band below.
//
// Positions are percentages inside the confetti band, which starts 320px above the
// top of the peach band and is 800px tall, so the confetti already starts falling
// through the Legacy section above the diagonal (the seam sits at roughly 40%).
//
// `speed` drives the parallax: pieces drift by +/- (speed * 220)px and rotate a
// little as the band travels through the viewport, so mixed values separate the layers.

type Piece = {
  left: string;
  top: string;
  size: number;
  rotate: number;
  color: string;
  kind: 'paper' | 'sliver' | 'triangle' | 'crescent';
  speed: number;
  blur?: number;
  hideOnMobile?: boolean;
};

const pieces: Piece[] = [
  // Upper scatter - these fall across the white Legacy section above the seam
  { left: '88%', top: '10%', size: 56, rotate: -18, color: '#F4592B', kind: 'paper', speed: 0.25, blur: 5, hideOnMobile: true },
  { left: '55%', top: '26%', size: 46, rotate: 16, color: '#FBBF24', kind: 'crescent', speed: 0.9, hideOnMobile: true },
  { left: '18%', top: '30%', size: 32, rotate: 22, color: '#F4592B', kind: 'paper', speed: 0.6 },

  // Around the diagonal seam (roughly 40% of the band)
  { left: '2%', top: '52%', size: 74, rotate: -14, color: '#F4592B', kind: 'paper', speed: 0.2, blur: 4 },
  { left: '42%', top: '46%', size: 56, rotate: 16, color: '#FBBF24', kind: 'crescent', speed: 0.7 },
  { left: '68%', top: '43%', size: 38, rotate: 12, color: '#F4592B', kind: 'paper', speed: 1, hideOnMobile: true },
  { left: '86%', top: '45%', size: 52, rotate: 138, color: '#F59E0B', kind: 'crescent', speed: 0.35, hideOnMobile: true },
  { left: '26%', top: '56%', size: 34, rotate: 22, color: '#F4592B', kind: 'paper', speed: 0.85 },
  { left: '62%', top: '57%', size: 60, rotate: -158, color: '#F59E0B', kind: 'crescent', speed: 0.45, hideOnMobile: true },
  { left: '76%', top: '58%', size: 34, rotate: -28, color: '#EF4444', kind: 'triangle', speed: 0.8, hideOnMobile: true },

  // Lower scatter - on the peach band behind the gallery heading
  { left: '82%', top: '70%', size: 52, rotate: 20, color: '#F4592B', kind: 'paper', speed: 0.3, blur: 5, hideOnMobile: true },
  { left: '28%', top: '72%', size: 30, rotate: 34, color: '#EF4444', kind: 'triangle', speed: 0.95 },
  { left: '68%', top: '76%', size: 34, rotate: 18, color: '#FCD9A0', kind: 'paper', speed: 0.5, hideOnMobile: true },
  { left: '11%', top: '78%', size: 52, rotate: -26, color: '#F59E0B', kind: 'crescent', speed: 0.4 },
];

const shapeFor = (piece: Piece) => {
  switch (piece.kind) {
    // Irregular quad, like a folded scrap of paper
    case 'paper':
      return <polygon points="2,7 16,2 23,15 8,22" fill={piece.color} />;
    // Narrow, more elongated scrap
    case 'sliver':
      return <polygon points="1,9 20,3 23,10 5,18" fill={piece.color} />;
    case 'triangle':
      return <polygon points="3,20 13,3 22,19" fill={piece.color} />;
    // Thin ribbon arc
    default:
      return <path d="M4 8 C14 30, 30 34, 38 26 C28 30, 14 22, 8 6 Z" fill={piece.color} />;
  }
};

const ConfettiPiece: React.FC<{ piece: Piece; progress: MotionValue<number>; parallax: boolean }> = ({
  piece,
  progress,
  parallax,
}) => {
  const drift = piece.speed * 220;
  const spin = piece.speed * 24;
  const y = useTransform(progress, [0, 1], parallax ? [drift, -drift] : [0, 0]);
  const rotate = useTransform(
    progress,
    [0, 1],
    parallax ? [piece.rotate - spin, piece.rotate + spin] : [piece.rotate, piece.rotate]
  );

  return (
    <motion.svg
      className={`absolute ${piece.hideOnMobile ? 'hidden md:block' : ''}`}
      style={{
        left: piece.left,
        top: piece.top,
        width: piece.size,
        height: piece.size,
        rotate,
        y,
        filter: piece.blur ? `blur(${piece.blur}px)` : undefined,
        willChange: 'transform',
      }}
      viewBox={piece.kind === 'crescent' ? '0 0 40 40' : '0 0 25 25'}
      focusable="false"
    >
      {shapeFor(piece)}
    </motion.svg>
  );
};

const ConfettiTransition: React.FC = () => {
  const bandRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      {/* White wedge: creates the diagonal edge against the peach background */}
      <svg
        className="absolute inset-x-0 top-0 w-full h-24 md:h-44"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        focusable="false"
      >
        <polygon points="0,0 1440,0 0,180" fill="#FFFFFF" />
      </svg>

      {/* Confetti scattered from the Legacy section above, down across the seam.
          No overflow clipping here so the parallax drift stays visible at both ends. */}
      <div ref={bandRef} className="absolute inset-x-0 -top-80 h-[800px]">
        {pieces.map((piece, index) => (
          <ConfettiPiece
            key={index}
            piece={piece}
            progress={scrollYProgress}
            parallax={!prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfettiTransition;
