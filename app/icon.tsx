import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 100 100"
                    fill="none"
                >
                    {/* Left H */}
                    <path
                        d="M15 25V75M15 50H40M40 25V75"
                        stroke="white"
                        stroke-width="12"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    {/* Right H */}
                    <path
                        d="M55 25V75M55 50H80M80 25V75"
                        stroke="white"
                        stroke-width="12"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        ),
        { ...size }
    )
}
