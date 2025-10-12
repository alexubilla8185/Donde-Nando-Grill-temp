import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
    // currentColor will be inherited from the parent's text color
    // This allows easy color changes (e.g., from white on hero to black on scroll)
  >
    <g fill="currentColor">
      {/* This circle will be the background color */}
      <circle cx="50" cy="50" r="48" />
    </g>
    {/* These are the parts of the logo that should NOT change color */}
    <g fill="white">
        <text x="50" y="45" fontFamily="'Playfair Display', serif" fontSize="16" textAnchor="middle" fontWeight="bold">DONDE</text>
        <rect x="15" y="48" width="70" height="4" />
        <text x="50" y="75" fontFamily="'Playfair Display', serif" fontSize="16" textAnchor="middle" fontWeight="bold">NANDO</text>
    </g>
    {/* These circles will 'punch holes' in the white bar by using the main fill color */}
    <g fill="currentColor">
        <circle cx="25" cy="50" r="3" />
        <circle cx="75" cy="50" r="3" />
    </g>
    {/* The flame icon, which has a fixed color */}
    <path d="M 45 25 C 40 20, 60 20, 55 25 C 65 25, 65 15, 50 15 C 35 15, 35 25, 45 25 Z" fill="#A21927"/>
  </svg>
);

export default Logo;