import React from 'react';

interface HHLogoProps {
    className?: string;
    size?: number;
    showBackground?: boolean;
}

export const HHLogo: React.FC<HHLogoProps> = ({ 
    className = "", 
    size = 40,
    showBackground = true 
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-all duration-300 ${className}`}
        >
            <defs>
                <linearGradient id="hh-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#D946EF" />
                </linearGradient>
                <filter id="hh-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {showBackground && (
                <rect 
                    width="100" 
                    height="100" 
                    rx="24" 
                    fill="currentColor" 
                    className="text-slate-100 dark:text-slate-900"
                />
            )}

            {/* Main HH Icon Path */}
            <g filter="url(#hh-glow)">
                {/* Left H */}
                <path
                    d="M25 30V70M25 50H45M45 30V70"
                    stroke="url(#hh-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                />
                {/* Right H */}
                <path
                    d="M55 30V70M55 50H75M75 30V70"
                    stroke="url(#hh-gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                />
            </g>

            {/* Abstract "Code" element - small dot or line */}
            <circle cx="50" cy="85" r="4" fill="url(#hh-gradient)" opacity="0.8" />
        </svg>
    );
};

export default HHLogo;
