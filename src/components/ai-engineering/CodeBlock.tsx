"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CopyButton } from "@/src/components/ai-engineering/CopyButton"

export function CodeBlock({ code, language, filename }: { code: string; language: string; filename?: string }) {
    return (
        <div className="my-6 overflow-hidden rounded-xl border border-border bg-surface-code">
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
                <span className="text-[11px] font-medium text-fg-muted">{filename || language}</span>
                <CopyButton text={code} />
            </div>
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: "1.25rem",
                    fontSize: "0.8125rem",
                    lineHeight: 1.65,
                    background: "transparent",
                    maxWidth: "100%",
                }}
                codeTagProps={{
                    style: {
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    },
                }}
                wrapLongLines
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
