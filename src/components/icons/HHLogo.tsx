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
                <linearGradient id="hh-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#312E81" />
                    <stop offset="45%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="hh-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <clipPath id="hh-clip">
                    <rect width="100" height="100" rx="22" />
                </clipPath>
            </defs>

            {showBackground && (
                <>
                    {/* Base gradient background */}
                    <rect width="100" height="100" rx="22" fill="url(#hh-bg)" />
                    {/* Gloss highlight clipped to badge shape */}
                    <rect
                        width="100"
                        height="54"
                        fill="url(#hh-gloss)"
                        clipPath="url(#hh-clip)"
                    />
                    {/* Inner border highlight */}
                    <rect
                        x="1.5" y="1.5"
                        width="97" height="97"
                        rx="21"
                        stroke="rgba(255,255,255,0.16)"
                        strokeWidth="1.5"
                    />
                </>
            )}

            {/* Single H — centered, bold, clean */}
            <path
                d="M32 20 L32 76 M32 48 L68 48 M68 20 L68 76"
                stroke="white"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.96"
            />
        </svg>
    );
};

export default HHLogo;