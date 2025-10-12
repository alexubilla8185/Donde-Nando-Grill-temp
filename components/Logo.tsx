import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
  >
    <defs>
        <mask id="logoTextMask">
            <rect width="100" height="100" fill="white"/>
            <text x="50" y="45" fontFamily="'Playfair Display', serif" fontSize="16" fill="black" textAnchor="middle" fontWeight="bold">DONDE</text>
            <rect x="15" y="48" width="70" height="4" fill="black"/>
            <text x="50" y="75" fontFamily="'Playfair Display', serif" fontSize="16" fill="black" textAnchor="middle" fontWeight="bold">NANDO</text>
            <circle cx="25" cy="50" r="3" fill="white" />
            <circle cx="75" cy="50" r="3" fill="white" />
        </mask>
    </defs>
    <g>
      <circle cx="50" cy="50" r="48" fill="currentColor" mask="url(#logoTextMask)"/>
      <path d="M 45 25 C 40 20, 60 20, 55 25 C 65 25, 65 15, 50 15 C 35 15, 35 25, 45 25 Z" fill="#A21927"/>
    </g>
  </svg>
);

export default Logo;