import Image from "next/image"

/** Grid of real captured screenshots for a project with a live, browsable UI. */
export function ScreenshotGallery({ images, title }: { images: string[]; title: string }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {images.map((src) => (
                <div key={src} className="relative aspect-video overflow-hidden rounded-lg border border-border">
                    <Image
                        src={src}
                        alt={`${title} — screenshot`}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 640px) 50vw, 100vw"
                    />
                </div>
            ))}
        </div>
    )
}
