import React from 'react';
import './LiquidBackground.css';

const LiquidBackground: React.FC = () => {
  return (
    <div className="liquid-background">
      <div className="liquid-blur"></div>
      <svg>
        <filter id="liquid-effect">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" />
          <feDisplacementMap in="SourceGraphic" scale="100" />
        </filter>
      </svg>
    </div>
  );
};

export default LiquidBackground;