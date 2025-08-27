# Achievements Data Structure

This file explains how to manage achievements in your portfolio.

## Structure Overview

Achievements are now organized by **Year** and **Issuer** for better organization and cleaner presentation.

### Data Organization

1. **Grouped by Year** (newest first)
2. **Grouped by Issuer** (alphabetically within each year)
3. **Sorted by Title** (alphabetically within each issuer)

## How to Add New Achievements

### Method 1: Direct Array Addition (Recommended)

Add your achievement to the `rawAchievements` array in `data/achievements.ts`:

```typescript
{
    id: "10", // Use the next available ID
    title: "Your Certificate Title",
    issuer: "Issuing Organization",
    date: "2024", // Year only
    type: "certificate", // "certificate", "graduation", or "award"
    description: "Brief description of what you learned/achieved",
    link: "https://example.com/certificate-link", // Optional
    image: "/image/your-image.jpg" // Optional - for graduation photos
}
```

### Method 2: Using the Utility Function

```typescript
import { addAchievement } from "@/data/achievements"

// Add a new achievement
addAchievement({
    title: "New Certificate",
    issuer: "Issuer Name",
    date: "2024",
    type: "certificate",
    description: "Description here",
    link: "https://example.com"
})
```

## Achievement Types

- **certificate**: Professional certifications, online courses
- **graduation**: Academic degrees, diplomas
- **award**: Honors, prizes, recognitions

## File Structure

```
data/
├── achievements.ts          # Main data file
└── README-achievements.md   # This documentation
```

## Automatic Grouping

The system automatically:
- Groups achievements by year (newest first)
- Groups by issuer within each year
- Sorts alphabetically within each group
- Displays with clean headers showing issuer and year

## Example Output Structure

```
2023
├── freeCodeCamp
│   ├── Front End Development Libraries
│   ├── JavaScript Algorithms and Data Structures
│   └── Responsive Web Design
├── Meta
│   └── React Developer Certification
├── Microsoft
│   └── TypeScript Developer
└── University Name
    └── Bachelor's Degree in Computer Science

2022
├── Coursera
│   └── Python Programming
└── Udemy
    └── Web Development Bootcamp

2021
└── High School Name
    └── High School Diploma
```

## Tips

1. **Use consistent naming** for issuers (e.g., always "freeCodeCamp" not "FreeCodeCamp")
2. **Keep descriptions concise** but informative
3. **Add images** for graduation photos in `/public/image/`
4. **Include links** for certificates when available
5. **Use the current year** for recent achievements

## Maintenance

- The grouping is automatic - just add achievements to the array
- No need to manually organize or sort
- Easy to add, remove, or modify achievements
- Clean, maintainable code structure
