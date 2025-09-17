"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Copy, Check, RotateCcw } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodePlaygroundProps {
    code: string
    language: string
    title?: string
    description?: string
    isDark?: boolean
    executable?: boolean
    onRun?: (code: string) => void
}

export function CodePlayground({ 
    code, 
    language, 
    title, 
    description, 
    isDark = false,
    executable = false,
    onRun 
}: CodePlaygroundProps) {
    const [copied, setCopied] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [output, setOutput] = useState<string>('')
    const [currentCode, setCurrentCode] = useState(code)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    const runCode = async () => {
        if (!executable || !onRun) return
        
        setIsRunning(true)
        try {
            // Simulate code execution
            await new Promise(resolve => setTimeout(resolve, 1000))
            onRun(currentCode)
            setOutput('Code executed successfully!')
        } catch (error) {
            setOutput('Error executing code: ' + error)
        } finally {
            setIsRunning(false)
        }
    }

    const resetCode = () => {
        setCurrentCode(code)
        setOutput('')
    }

    return (
        <motion.div
            className="my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            {(title || description) && (
                <div className="mb-4">
                    {title && (
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            {title}
                        </h4>
                    )}
                    {description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Code Block */}
            <div className="relative group">
                {/* Toolbar */}
                <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-t-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            {language}
                        </span>
                        {executable && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                                Runnable
                            </span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {executable && (
                            <motion.button
                                onClick={runCode}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-md transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play size={14} className={isRunning ? 'animate-spin' : ''} />
                                {isRunning ? 'Running...' : 'Run'}
                            </motion.button>
                        )}
                        
                        <motion.button
                            onClick={resetCode}
                            className="flex items-center gap-2 px-3 py-1 text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RotateCcw size={14} />
                            Reset
                        </motion.button>
                        
                        <motion.button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-3 py-1 text-xs bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {copied ? (
                                <>
                                    <Check size={14} className="text-green-500" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    Copy
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
                
                {/* Code Content */}
                <div className="rounded-b-lg overflow-hidden border-x border-b border-slate-200 dark:border-slate-700">
                    <SyntaxHighlighter
                        language={language}
                        style={isDark ? oneDark : oneLight}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.6',
                            background: isDark ? '#1e293b' : '#f8fafc'
                        }}
                        showLineNumbers={currentCode.split('\n').length > 5}
                        wrapLines={true}
                    >
                        {currentCode}
                    </SyntaxHighlighter>
                </div>
            </div>

            {/* Output */}
            <AnimatePresence>
                {output && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-green-700 dark:text-green-400">
                                Output
                            </span>
                        </div>
                        <pre className="text-sm text-green-800 dark:text-green-300 whitespace-pre-wrap">
                            {output}
                        </pre>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
