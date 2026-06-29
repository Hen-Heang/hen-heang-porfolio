import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const alt = "Hen Heang — Full-Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const TECH = [
    { label: "Java",        color: "#f89820" },
    { label: "Spring Boot", color: "#6db33f" },
    { label: "Next.js",     color: "#e4e4e7" },
    { label: "TypeScript",  color: "#3b82f6" },
    { label: "PostgreSQL",  color: "#60a5fa" },
]

export default async function Image() {
    const imgBuffer = readFileSync(join(process.cwd(), "public/image/heang_new.png"))
    const photo = `data:image/png;base64,${imgBuffer.toString("base64")}`

    return new ImageResponse(
        (
            <div style={{
                width: 1200, height: 630,
                backgroundColor: "#09090b",
                display: "flex", position: "relative", overflow: "hidden",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
                {/* Blob TL */}
                <div style={{
                    position: "absolute", top: -120, left: -80,
                    width: 520, height: 520, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
                }} />
                {/* Blob BR */}
                <div style={{
                    position: "absolute", bottom: -80, right: 340,
                    width: 380, height: 380, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                }} />

                {/* Left: content column */}
                <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "56px 0 56px 80px", flex: 1,
                }}>
                    {/* Available badge */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        backgroundColor: "rgba(99,102,241,0.12)",
                        border: "1px solid rgba(99,102,241,0.28)",
                        borderRadius: 100, padding: "7px 18px",
                        alignSelf: "flex-start", marginBottom: 28,
                    }}>
                        <div style={{
                            width: 7, height: 7, borderRadius: "50%",
                            backgroundColor: "#22c55e",
                        }} />
                        <span style={{
                            color: "#818cf8", fontSize: 13, fontWeight: 800,
                            letterSpacing: "0.15em", textTransform: "uppercase",
                        }}>
                            Available for hire
                        </span>
                    </div>

                    {/* Name */}
                    <div style={{
                        color: "#ffffff", fontSize: 74, fontWeight: 900,
                        lineHeight: 1, marginBottom: 14, letterSpacing: "-0.03em",
                        display: "flex",
                    }}>
                        Hen Heang
                    </div>

                    {/* Title */}
                    <div style={{
                        color: "#a1a1aa", fontSize: 26, fontWeight: 500,
                        marginBottom: 36, letterSpacing: "-0.01em",
                        display: "flex",
                    }}>
                        Full-Stack Software Engineer
                    </div>

                    {/* Tech pills */}
                    <div style={{
                        display: "flex", gap: 10, marginBottom: 44, flexWrap: "wrap",
                    }}>
                        {TECH.map(t => (
                            <div key={t.label} style={{
                                display: "flex", alignItems: "center",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 8, padding: "7px 16px",
                                color: t.color, fontSize: 14, fontWeight: 700,
                                letterSpacing: "0.04em",
                            }}>
                                {t.label}
                            </div>
                        ))}
                    </div>

                    {/* Footer row */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 20,
                        fontSize: 16, fontWeight: 500,
                    }}>
                        <span style={{ color: "#71717a", display: "flex" }}>📍 Seoul, South Korea</span>
                        <div style={{
                            width: 4, height: 4, borderRadius: "50%",
                            backgroundColor: "#3f3f46",
                        }} />
                        <span style={{ color: "#6366f1", fontWeight: 700, display: "flex" }}>
                            henheang.site
                        </span>
                    </div>
                </div>

                {/* Right: photo */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 380, padding: "60px 80px 60px 0",
                }}>
                    {/* Gradient ring */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 294, height: 294, borderRadius: 36,
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                        padding: 3,
                    }}>
                        {/* Photo container */}
                        <div style={{
                            display: "flex",
                            width: "100%", height: "100%",
                            borderRadius: 32, overflow: "hidden",
                            backgroundColor: "#18181b",
                        }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={photo}
                                style={{
                                    width: "100%", height: "100%",
                                    objectFit: "cover", objectPosition: "center top",
                                }}
                                alt="Hen Heang"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom gradient strip */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                    background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
                }} />
            </div>
        ),
        { ...size }
    )
}
