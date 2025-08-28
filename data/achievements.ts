export interface Achievement {
    id: string
    titleKey: string
    issuer: string
    date: string
    type: 'certificate' | 'graduation' | 'award'
    descriptionKey?: string
    image?: string
    link?: string
}

export interface AchievementGroup {
    year: string
    issuer: string
    achievements: Achievement[]
}

// Helper function to group achievements by year and issuer
export const groupAchievementsByYearAndIssuer = (achievements: Achievement[]): AchievementGroup[] => {
    const groups: { [key: string]: { [issuer: string]: Achievement[] } } = {}
    
    achievements.forEach(achievement => {
        const year = achievement.date
        const issuer = achievement.issuer
        
        if (!groups[year]) {
            groups[year] = {}
        }
        if (!groups[year][issuer]) {
            groups[year][issuer] = []
        }
        
        groups[year][issuer].push(achievement)
    })
    
    // Convert to array format and sort by year (descending) and issuer
    const result: AchievementGroup[] = []
    
    Object.keys(groups)
        .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending
        .forEach(year => {
            Object.keys(groups[year])
                .sort() // Sort issuers alphabetically
                .forEach(issuer => {
                    result.push({
                        year,
                        issuer,
                        achievements: groups[year][issuer].sort((a, b) => a.titleKey.localeCompare(b.titleKey))
                    })
                })
        })
    
    return result
}

// Raw achievements data with translation keys
export const rawAchievements: Achievement[] = [
    {
        id: "1",
        titleKey: "achievements.bachelorsDegree",
        issuer: "University Name",
        date: "2023",
        type: "graduation",
        descriptionKey: "achievements.bachelorsDescription",
        image: "/graduate-image.jpg",
    },
    {
        id: "10",
        titleKey: "achievements.kshrdBasic",
        issuer: "KSHRD",
        date: "2023",
        type: "certificate",
        descriptionKey: "achievements.kshrdBasicDescription",
        image: "/certificate/kshrd-basic-course.png",
    },
    {
        id: "11",
        titleKey: "achievements.kshrdAdvanced",
        issuer: "KSHRD",
        date: "2023",
        type: "certificate",
        descriptionKey: "achievements.kshrdAdvancedDescription",
        image: "/certificate/kshrd-advance-course.png",
    },
    // Add more achievements as needed
]

// Grouped achievements for display
export const groupedAchievements = groupAchievementsByYearAndIssuer(rawAchievements)

// Flattened achievements (for backward compatibility if needed)
export const achievements = rawAchievements

// Utility function to add new achievements easily
export const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newId = (rawAchievements.length + 1).toString()
    const newAchievement: Achievement = {
        id: newId,
        ...achievement
    }
    rawAchievements.push(newAchievement)
    return newAchievement
}

