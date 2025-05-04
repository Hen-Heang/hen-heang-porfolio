interface StatsCardProps {
    value: string
    label: string
    color: string
}

export function StatsCard({ value, label, color }: StatsCardProps) {
    return (
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
            <div className="text-gray-600 dark:text-gray-300">{label}</div>
        </div>
    )
}
