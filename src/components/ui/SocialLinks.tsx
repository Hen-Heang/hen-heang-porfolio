import { motion } from 'framer-motion';
import Github from '@/src/components/icons/github';
import LinkIn from '@/src/components/icons/linkIn';
import Telegram from '@/src/components/icons/telegram';
import { personalInfo } from "@/data/personal-info";

export function SocialLinks() {
    const socialLinks = [
        {
            href: personalInfo.socialLinks.github,
            icon: Github,
            label: "GitHub",
            color: "hover:text-gray-900 dark:hover:text-gray-100",
            bgColor: "hover:bg-gray-200 dark:hover:bg-gray-700"
        },
        {
            href: personalInfo.socialLinks.linkedin,
            icon: LinkIn,
            label: "LinkedIn",
            color: "hover:text-blue-600 dark:hover:text-blue-400",
            bgColor: "hover:bg-blue-100 dark:hover:bg-blue-900/30"
        },
        {
            href: personalInfo.socialLinks.telegram,
            icon: Telegram,
            label: "Telegram",
            color: "hover:text-teal-500 dark:hover:text-teal-400",
            bgColor: "hover:bg-teal-100 dark:hover:bg-teal-900/30"
        }
    ];

    return (
        <div className="flex gap-4">
            {socialLinks.map((link, index) => (
                <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 transition-all duration-300 ${link.color} ${link.bgColor} hover:shadow-lg hover:scale-110`}
                    whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <link.icon />
                    </motion.div>
                    <span className="sr-only">{link.label}</span>
                </motion.a>
            ))}
        </div>
    );
}
