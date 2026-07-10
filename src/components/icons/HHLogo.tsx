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
            {showBackground && (
                <>
                    {/* Flat black badge, X-app style */}
                    <rect width="100" height="100" rx="24" fill="#000000" />
                    {/* Inner border so the badge stays visible on dark surfaces */}
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
                    stroke="#FFFFFF"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20 68 L80 32"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.55"
                />
            </g>
        </svg>
    );
};

export default HHLogo;
