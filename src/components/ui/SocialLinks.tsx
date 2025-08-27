import React from 'react';
import Github from '@/components/ICON/github';
import LinkIn from '@/components/ICON/linkIn';
import Telegram from '@/components/ICON/telegram';

export function SocialLinks() {
    return (
        <div className="flex gap-4">
            <a
                href="https://github.com/Hen-Heang"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
                <Github />
                <span className="sr-only">GitHub</span>
            </a>
            <a
                href="https://www.linkedin.com/in/hen-heang"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                <LinkIn />
                <span className="sr-only">LinkedIn</span>
            </a>
            <a
                href="https://t.me/henheang"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
                <Telegram />
                <span className="sr-only">Telegram</span>
            </a>
        </div>
    );
}