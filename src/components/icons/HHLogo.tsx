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
                    <stop offset="0%" stopColor="#26235C" />
                    <stop offset="42%" stopColor="#4F46E5" />
                    <stop offset="78%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
                <radialGradient id="hh-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30 24) scale(85)">
                    <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="hh-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <linearGradient id="hh-mark" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E0E7FF" />
                </linearGradient>
                <clipPath id="hh-clip">
                    <rect width="100" height="100" rx="24" />
                </clipPath>
            </defs>

            {showBackground && (
                <>
                    {/* Base gradient background */}
                    <rect width="100" height="100" rx="24" fill="url(#hh-bg)" />
                    {/* Soft corner glow for depth */}
                    <rect width="100" height="100" rx="24" fill="url(#hh-glow)" />
                    {/* Gloss highlight clipped to badge shape */}
                    <rect
                        width="100"
                        height="52"
                        fill="url(#hh-gloss)"
                        clipPath="url(#hh-clip)"
                    />
                    {/* Inner border highlight */}
                    <rect
                        x="1.5" y="1.5"
                        width="97" height="97"
                        rx="22.5"
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="1.5"
                    />
                </>
            )}

            {/* H monogram with a signature diagonal accent stroke */}
            <g opacity="0.98">
                <path
                    d="M30 18 L30 82 M30 50 L70 50 M70 18 L70 82"
                    stroke="url(#hh-mark)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20 68 L80 32"
                    stroke="url(#hh-mark)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.55"
                />
            </g>
        </svg>
    );
};

export default HHLogo;