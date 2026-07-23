"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/** Only http(s)/mailto links are ever rendered as clickable — blocks `javascript:`/`data:` and any other scheme a prompt-injected answer might try to slip in. */
const SAFE_HREF = /^(https?:|mailto:)/i

/**
 * Markdown renderer tuned for compact chat bubbles: tight spacing, accent
 * links that open in a new tab, and horizontally scrollable code blocks.
 * Kept dependency-light (no syntax highlighter) so the lazy-loaded widget
 * stays small.
 */
export function MarkdownContent({ text }: { text: string }) {
    return (
        <div className="text-sm leading-relaxed text-fg-secondary space-y-2 break-words">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ children }) => <p>{children}</p>,
                    a: ({ href, children }) => {
                        if (!href || !SAFE_HREF.test(href)) return <span>{children}</span>
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand underline underline-offset-2 decoration-brand/40 hover:decoration-brand"
                            >
                                {children}
                            </a>
                        )
                    },
                    ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
                    h1: ({ children }) => <h3 className="text-sm font-semibold text-fg mt-1">{children}</h3>,
                    h2: ({ children }) => <h3 className="text-sm font-semibold text-fg mt-1">{children}</h3>,
                    h3: ({ children }) => <h4 className="text-sm font-semibold text-fg mt-1">{children}</h4>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-brand/40 pl-3 text-fg-secondary">{children}</blockquote>
                    ),
                    code: ({ className, children }) => {
                        const isBlock = /language-/.test(className ?? "") || String(children).includes("\n")
                        if (isBlock) {
                            return (
                                <code className={`${className ?? ""} block font-mono text-xs`}>{children}</code>
                            )
                        }
                        return (
                            <code className="font-mono text-xs px-1 py-0.5 rounded bg-surface-hover text-brand">
                                {children}
                            </code>
                        )
                    },
                    pre: ({ children }) => (
                        <pre className="p-3 rounded-lg bg-background/60 border border-border overflow-x-auto">
                            {children}
                        </pre>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto">
                            <table className="text-xs border-collapse [&_th]:border [&_th]:border-border [&_th]:px-2 [&_th]:py-1 [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1">
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
