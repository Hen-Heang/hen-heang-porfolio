export function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded-lg bg-zinc-800/60 ${className}`} />
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={`h-3 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
                />
            ))}
        </div>
    )
}
