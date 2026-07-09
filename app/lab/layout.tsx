import type React from "react"
import { LabShell } from "@/src/components/lab/shell/LabShell"

export default function LabLayout({ children }: { children: React.ReactNode }) {
    return <LabShell>{children}</LabShell>
}
