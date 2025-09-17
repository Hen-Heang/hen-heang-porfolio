"use client"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CodePlayground } from './CodePlayground'

interface BlogPostRendererProps {
    content: string
    isDark?: boolean
}

export function BlogPostRenderer({ content, isDark = false }: BlogPostRendererProps) {
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const copyToClipboard = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopiedCode(code)
            setTimeout(() => setCopiedCode(null), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    // Parse content and render with proper formatting
    const renderContent = (content: string) => {
        const lines = content.split('\n')
        const elements: JSX.Element[] = []
        let currentCodeBlock: string[] = []
        let currentLanguage = ''
        let inCodeBlock = false
        let key = 0

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]

            // Check for code block start
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    // End of code block
                    const codeContent = currentCodeBlock.join('\n')
                    const language = currentLanguage || 'text'
                    
                    // Use CodePlayground for better code blocks
                    elements.push(
                        <CodePlayground
                            key={key++}
                            code={codeContent}
                            language={language}
                            isDark={isDark}
                            executable={language === 'java' && codeContent.includes('public static void main')}
                        />
                    )
                    
                    currentCodeBlock = []
                    currentLanguage = ''
                    inCodeBlock = false
                } else {
                    // Start of code block
                    currentLanguage = line.replace('```', '').trim()
                    inCodeBlock = true
                }
            } else if (inCodeBlock) {
                // Inside code block
                currentCodeBlock.push(line)
            } else {
                // Regular content
                if (line.trim() === '') {
                    elements.push(<div key={key++} className="h-4" />)
                } else if (line.startsWith('# ')) {
                    // H1
                    elements.push(
                        <motion.h1
                            key={key++}
                            className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {line.replace('# ', '')}
                        </motion.h1>
                    )
                } else if (line.startsWith('## ')) {
                    // H2
                    elements.push(
                        <motion.h2
                            key={key++}
                            className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {line.replace('## ', '')}
                        </motion.h2>
                    )
                } else if (line.startsWith('### ')) {
                    // H3
                    elements.push(
                        <motion.h3
                            key={key++}
                            className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {line.replace('### ', '')}
                        </motion.h3>
                    )
                } else if (line.startsWith('- ')) {
                    // List item
                    elements.push(
                        <motion.li
                            key={key++}
                            className="text-slate-700 dark:text-slate-300 mb-2 ml-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-teal-500 mr-2">•</span>
                            {line.replace('- ', '')}
                        </motion.li>
                    )
                } else if (line.startsWith('1. ')) {
                    // Numbered list
                    elements.push(
                        <motion.li
                            key={key++}
                            className="text-slate-700 dark:text-slate-300 mb-2 ml-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {line}
                        </motion.li>
                    )
                } else if (line.includes('**') && line.includes('**')) {
                    // Bold text
                    const parts = line.split('**')
                    const boldElements = parts.map((part, index) => {
                        if (index % 2 === 1) {
                            return <strong key={index} className="font-semibold text-slate-900 dark:text-slate-100">{part}</strong>
                        }
                        return part
                    })
                    elements.push(
                        <motion.p
                            key={key++}
                            className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {boldElements}
                        </motion.p>
                    )
                } else {
                    // Regular paragraph
                    elements.push(
                        <motion.p
                            key={key++}
                            className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {line}
                        </motion.p>
                    )
                }
            }
        }

        return elements
    }

    return (
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            {renderContent(content)}
        </div>
    )
}
