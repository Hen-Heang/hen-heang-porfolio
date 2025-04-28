"use client"

import {motion} from "framer-motion"
import Github from "@/components/ICON/github";
import LinkIn from "@/components/ICON/linkIn";
import Telegram from "@/components/ICON/telegram";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-github-bg-darker text-gray-800 dark:text-white py-8 border-t border-gray-200 dark:border-github-border">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-github-purple dark:text-github-purple-light">DevPortfolio</h2>
                        <p className="text-gray-600 dark:text-github-text-secondary mt-2">Full-stack developer portfolio</p>
                    </div>

                    <div className="mt-6 md:mt-0">
                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{y: -5}}
                                href="https://github.com/Hen-Heang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-github-purple dark:text-github-text-secondary dark:hover:text-github-purple-light transition-colors">
                                <Github/>
                                <span className="sr-only">GitHub</span>
                            </motion.a>
                            <motion.a
                                whileHover={{y: -5}}
                                href="https://www.linkedin.com/in/hen-heang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-github-purple dark:text-github-text-secondary dark:hover:text-github-purple-light transition-colors">
                                <LinkIn/>
                                <span className="sr-only">LinkedIn</span>
                            </motion.a>
                            <motion.a
                                whileHover={{y: -5}}
                                href="https://t.me/henheang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-github-purple dark:text-github-text-secondary dark:hover:text-github-purple-light transition-colors">
                                <Telegram/>
                                <span className="sr-only">Telegram</span>
                            </motion.a>
                        </div>
                        <p className="mt-4 text-gray-500 dark:text-gray-500">
                            © {new Date().getFullYear()} DevPortfolio. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}