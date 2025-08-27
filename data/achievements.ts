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
                        achievements: groups[year][issuer].sort((a, b) => a.title.localeCompare(b.title))
                    })
                })
        })
    
    return result
}

// Raw achievements data
export const rawAchievements: Achievement[] = [
    {
        id: "1",
        title: "Bachelor's Degree in Computer Science",
        issuer: "University Name",
        date: "2023",
        type: "graduation",
        description: "Graduated with honors in Computer Science with focus on web development and software engineering.",
        image: "/image/graduation.jpg",
    },
    {
        id: "2",
        title: "React Developer Certification",
        issuer: "Meta",
        date: "2023",
        type: "certificate",
        description: "Completed comprehensive React development course covering modern React patterns and best practices.",
        link: "https://example.com/certificate-link",
    },
    {
        id: "3",
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2023",
        type: "certificate",
        description: "Mastered JavaScript fundamentals, ES6, regular expressions, debugging, data structures, and algorithms.",
        link: "https://www.freecodecamp.org/certification/your-username/javascript-algorithms-and-data-structures",
    },
    {
        id: "4",
        title: "Front End Development Libraries",
        issuer: "freeCodeCamp",
        date: "2023",
        type: "certificate",
        description: "Learned Bootstrap, jQuery, Sass, React, and Redux for modern front-end development.",
        link: "https://www.freecodecamp.org/certification/your-username/front-end-development-libraries",
    },
    {
        id: "5",
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        date: "2023",
        type: "certificate",
        description: "Built responsive websites using HTML, CSS, and modern design principles.",
        link: "https://www.freecodecamp.org/certification/your-username/responsive-web-design",
    },
    {
        id: "6",
        title: "TypeScript Developer",
        issuer: "Microsoft",
        date: "2023",
        type: "certificate",
        description: "Advanced TypeScript development skills including type safety and modern JavaScript features.",
        link: "https://example.com/typescript-certificate",
    },
    {
        id: "7",
        title: "Web Development Bootcamp",
        issuer: "Udemy",
        date: "2022",
        type: "certificate",
        description: "Comprehensive web development course covering HTML, CSS, JavaScript, and modern frameworks.",
        link: "https://example.com/udemy-certificate",
    },
    {
        id: "8",
        title: "Python Programming",
        issuer: "Coursera",
        date: "2022",
        type: "certificate",
        description: "Learned Python programming fundamentals and data science applications.",
        link: "https://example.com/coursera-python",
    },
    {
        id: "9",
        title: "High School Diploma",
        issuer: "High School Name",
        date: "2021",
        type: "graduation",
        description: "Graduated with honors from high school with focus on mathematics and sciences.",
        image: "/image/high-school-graduation.jpg",
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

// Example usage:
// addAchievement({
//     title: "New Certificate",
//     issuer: "Issuer Name",
//     date: "2024",
//     type: "certificate",
//     description: "Description here",
//     link: "https://example.com"
// })
