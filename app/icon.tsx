import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
    const imgBuffer = readFileSync(join(process.cwd(), "public/image/heang_portfolio_logo.png"))
    const logo = `data:image/png;base64,${imgBuffer.toString("base64")}`

    return new ImageResponse(
        (
            <img src={logo} style={{ width: 32, height: 32 }} alt="HH" />
        ),
        { ...size }
    )
}
