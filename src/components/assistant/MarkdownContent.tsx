"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/**
 * Markdown renderer tuned for compact chat bubbles: tight spacing, accent
 * links that open in a new tab, and horizontally scrollable code blocks.
 * Kept dependency-light (no syntax highlighter) so the lazy-loaded widget
 * stays small.
 */
export function MarkdownContent({ text }: { text: string }) {
    return (
        <div className="text-sm leading-relaxed text-slate-200 space-y-2 break-words">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ children }) => <p>{children}</p>,
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-300 underline underline-offset-2 decoration-indigo-300/40 hover:text-indigo-200 hover:decoration-indigo-200"
                        >
                            {children}
                        </a>
                    ),
                    ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    h1: ({ children }) => <h3 className="text-sm font-semibold text-white mt-1">{children}</h3>,
                    h2: ({ children }) => <h3 className="text-sm font-semibold text-white mt-1">{children}</h3>,
                    h3: ({ children }) => <h4 className="text-sm font-semibold text-white mt-1">{children}</h4>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-indigo-400/40 pl-3 text-slate-300">{children}</blockquote>
                    ),
                    code: ({ className, children }) => {
                        const isBlock = /language-/.test(className ?? "") || String(children).includes("\n")
                        if (isBlock) {
                            return (
                                <code className={`${className ?? ""} block font-mono text-xs`}>{children}</code>
                            )
                        }
                        return (
                            <code className="font-mono text-xs px-1 py-0.5 rounded bg-white/10 text-indigo-200">
                                {children}
                            </code>
                        )
                    },
                    pre: ({ children }) => (
                        <pre className="p-3 rounded-lg bg-black/40 border border-white/10 overflow-x-auto">
                            {children}
                        </pre>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto">
                            <table className="text-xs border-collapse [&_th]:border [&_th]:border-white/10 [&_th]:px-2 [&_th]:py-1 [&_td]:border [&_td]:border-white/10 [&_td]:px-2 [&_td]:py-1">
                                {children}
                            </table>
                        </div>
                    ),
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    )
}
