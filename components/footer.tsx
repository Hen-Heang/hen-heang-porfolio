"use client"

import {motion} from "framer-motion"
import Github from "@/components/ICON/github";
import LinkIn from "@/components/ICON/linkIn";
import Telegram from "@/components/ICON/telegram";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-[#080321] text-gray-800 dark:text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300">DevPortfolio</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Full-stack developer portfolio</p>
                    </div>

                    {/*<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">*/}
                    {/*    <Link*/}
                    {/*        href="/"*/}
                    {/*        className="text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-300"*/}
                    {/*    >*/}
                    {/*        Home*/}
                    {/*    </Link>*/}
                    {/*    <Link*/}
                    {/*        href="/projects"*/}
                    {/*        className="text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-300"*/}
                    {/*    >*/}
                    {/*        Projects*/}
                    {/*    </Link>*/}
                    {/*    <Link*/}
                    {/*        href="/blog"*/}
                    {/*        className="text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-300"*/}
                    {/*    >*/}
                    {/*        Blog*/}
                    {/*    </Link>*/}
                    {/*    <Link*/}
                    {/*        href="/contact"*/}
                    {/*        className="text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-300"*/}
                    {/*    >*/}
                    {/*        Contact*/}
                    {/*    </Link>*/}
                    {/*</div>*/}

                    <div className="mt-6 md:mt-0">
                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{y: -5}}
                                href="https://github.com/Hen-Heang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-300">
                                <Github/>
                                <span className="sr-only">GitHub</span>
                            </motion.a>
                            <motion.a
                                whileHover={{y: -5}}
                                href="https://www.linkedin.com/in/hen-heang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-300">
                                <LinkIn/>
                                <span className="sr-only">LinkedIn</span>
                            </motion.a>
                            <motion.a
                                whileHover={{y: -5}}
                                href="https://t.me/henheang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-300">
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
