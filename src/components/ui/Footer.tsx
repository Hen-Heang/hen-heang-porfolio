
import LinkIn from "@/components/ICON/linkIn";
import { motion } from "framer-motion";
import Telegram from "@/components/ICON/telegram";
import Github from "@/components/ICON/github";

export function Footer() {
    return (
        <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                      
                    </div>

                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} . All rights reserved.
                    </div>

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
                </div>
            </div>
        </footer>
    )
}
