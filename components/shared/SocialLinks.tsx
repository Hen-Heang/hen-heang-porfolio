import { Github, Linkedin, Mail } from 'lucide-react'

export function SocialLinks() {
    return (
        <div className="flex gap-4">
            <a
                href="https://github.com/Hen-Heang"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
                <Github size={20} />
            </a>
            <a
                href="https://www.linkedin.com/in/hen-heang"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
                <Linkedin size={20} />
            </a>
            <a
                href="https://t.me/henheang"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                <Mail />
            </a>
        </div>
    )
}
