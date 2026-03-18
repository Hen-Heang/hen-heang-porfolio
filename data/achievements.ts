export interface Achievement {
    id: string
    title: string
    issuer: string
    date: string
    type: 'certificate' | 'graduation' | 'award'
    description?: string
    image?: string
    link?: string
}

export interface AchievementGroup {
    year: string
    issuer: string
    achievements: Achievement[]
}

const groupAchievementsByYearAndIssuer = (achievements: Achievement[]): AchievementGroup[] => {
    const groups: { [key: string]: { [issuer: string]: Achievement[] } } = {}

    achievements.forEach(achievement => {
        const { date: year, issuer } = achievement
        if (!groups[year]) groups[year] = {}
        if (!groups[year][issuer]) groups[year][issuer] = []
        groups[year][issuer].push(achievement)
    })

    const result: AchievementGroup[] = []
    Object.keys(groups)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .forEach(year => {
            Object.keys(groups[year])
                .sort()
                .forEach(issuer => {
                    result.push({
                        year,
                        issuer,
                        achievements: groups[year][issuer].sort((a, b) => a.title.localeCompare(b.title))
                    })
                })
        })

    return result
}

export const rawAchievements: Achievement[] = [
    {
        id: "1",
        title: "Bachelor's Degree in Computer Science",
        issuer: "University Name",
        date: "2023",
        type: "graduation",
        description: "Graduated with honors in Computer Science with focus on web development and software engineering.",
        image: "/graduate-image.jpg",
    },
    {
        id: "10",
        title: "KSHRD Basic Course Certificate",
        issuer: "KSHRD",
        date: "2023",
        type: "certificate",
        description: "Completed the basic course training program at KSHRD, covering fundamental skills and knowledge.",
        image: "/certificate/kshrd-basic-course.webp",
    },
    {
        id: "11",
        title: "KSHRD Advanced Course Certificate",
        issuer: "KSHRD",
        date: "2023",
        type: "certificate",
        description: "Successfully completed the advanced course training program at KSHRD, demonstrating advanced skills and expertise.",
        image: "/certificate/kshrd-advance-course.webp",
    },
]

export const groupedAchievements = groupAchievementsByYearAndIssuer(rawAchievements)
