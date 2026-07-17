const languageFlags: Record<string, string> = {
    khmer: "🇰🇭",
    english: "🇬🇧",
    korean: "🇰🇷",
}

export function getLanguageFlag(language: string): string {
    return languageFlags[language.trim().toLowerCase()] ?? "🌐"
}
