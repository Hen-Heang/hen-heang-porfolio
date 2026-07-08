import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
    const imgBuffer = readFileSync(join(process.cwd(), "public/image/hh-logo-mark.svg"))
    const logo = `data:image/svg+xml;base64,${imgBuffer.toString("base64")}`

    return new ImageResponse(
        (
            <img src={logo} style={{ width: 180, height: 180 }} alt="HH" />
        ),
        { ...size }
    )
}
