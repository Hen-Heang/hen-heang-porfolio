"use client"

import { useCallback, useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react"
import { createClient } from "@/src/lib/supabase/client"
import type { EntityConfig, FieldConfig } from "@/src/lib/admin/entities"

type Row = Record<string, unknown> & { id: string }
type SelectOptions = Record<string, { value: string; label: string }[]>

function emptyForm(fields: FieldConfig[]): Record<string, string> {
    return Object.fromEntries(
        fields.map((f) => [f.name, f.type === "boolean" ? "false" : f.type === "json" ? "[]" : ""])
    )
}

function rowToForm(row: Row, fields: FieldConfig[]): Record<string, string> {
    return Object.fromEntries(
        fields.map((f) => {
            const v = row[f.name]
            if (v === null || v === undefined) return [f.name, f.type === "boolean" ? "false" : ""]
            if (f.type === "lines") return [f.name, (v as string[]).join("\n")]
            if (f.type === "json") return [f.name, JSON.stringify(v, null, 2)]
            return [f.name, String(v)]
        })
    )
}

/** Throws a plain Error with a field-specific message on invalid JSON, caught by the caller. */
function formToPayload(form: Record<string, string>, fields: FieldConfig[]) {
    const payload: Record<string, unknown> = {}
    for (const f of fields) {
        const raw = form[f.name]?.trim() ?? ""
        if (f.type === "lines") {
            payload[f.name] = raw ? raw.split("\n").map((s) => s.trim()).filter(Boolean) : []
        } else if (f.type === "number") {
            payload[f.name] = raw === "" ? null : Number(raw)
        } else if (f.type === "boolean") {
            payload[f.name] = raw === "true"
        } else if (f.type === "json") {
            try {
                payload[f.name] = raw === "" ? [] : JSON.parse(raw)
            } catch {
                throw new Error(`"${f.label}" is not valid JSON`)
            }
        } else {
            payload[f.name] = raw === "" ? null : raw
        }
    }
    return payload
}

export function EntityEditor({ config }: { config: EntityConfig }) {
    const [rows, setRows] = useState<Row[]>([])
    const [options, setOptions] = useState<SelectOptions>({})
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<Row | "new" | null>(null)
    const [form, setForm] = useState<Record<string, string>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const load = useCallback(async () => {
        const supabase = createClient()
        const { data, error: loadError } = await supabase
            .from(config.table)
            .select("*")
            .order("sort_order")
        if (loadError) setError(loadError.message)
        else setRows((data as Row[]) ?? [])

        for (const f of config.fields) {
            if (!f.optionsFrom) continue
            const { data: opts } = await supabase
                .from(f.optionsFrom.table)
                .select(`${f.optionsFrom.value}, ${f.optionsFrom.label}`)
                .order("sort_order")
            setOptions((prev) => ({
                ...prev,
                [f.name]: ((opts as Row[] | null) ?? []).map((o) => ({
                    value: String(o[f.optionsFrom!.value]),
                    label: String(o[f.optionsFrom!.label]),
                })),
            }))
        }
        setLoading(false)
    }, [config])

    useEffect(() => {
        // Remote data is intentionally loaded when this client-only editor mounts.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void load()
    }, [load])

    function startEdit(row: Row | "new") {
        setError(null)
        setEditing(row)
        setForm(row === "new" ? emptyForm(config.fields) : rowToForm(row, config.fields))
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        let payload: Record<string, unknown>
        try {
            payload = formToPayload(form, config.fields)
        } catch (parseError) {
            setError(parseError instanceof Error ? parseError.message : "Invalid form data")
            return
        }

        setSaving(true)
        const supabase = createClient()

        const { error: saveError } =
            editing === "new"
                ? await supabase.from(config.table).insert(payload)
                : await supabase.from(config.table).update(payload).eq("id", (editing as Row).id)

        setSaving(false)
        if (saveError) {
            setError(saveError.message)
            return
        }
        setEditing(null)
        await load()
    }

    async function handleDelete(row: Row) {
        const label = String(row[config.listFields[0]] ?? row.id)
        if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return
        setError(null)
        const { error: deleteError } = await createClient()
            .from(config.table)
            .delete()
            .eq("id", row.id)
        if (deleteError) {
            setError(deleteError.message)
            return
        }
        await load()
    }

    function optionLabel(field: FieldConfig, value: unknown): string {
        const opts = options[field.name]
        return opts?.find((o) => o.value === String(value))?.label ?? String(value ?? "")
    }

    return (
        <section className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272a]">
                <h2 className="text-[#fafafa] text-sm font-semibold">
                    {config.title}
                    <span className="ml-2 text-[#52525b] text-xs font-normal">{rows.length}</span>
                </h2>
                <button
                    onClick={() => startEdit("new")}
                    className="flex items-center gap-1.5 bg-[#6366f1] hover:bg-[#5558e6] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                    <Plus size={12} />
                    New
                </button>
            </div>

            {error && !editing && (
                <p className="mx-5 mt-4 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            {editing && (
                <form onSubmit={handleSave} className="px-5 py-4 border-b border-[#27272a] bg-[#0c0c0e]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#fafafa] text-xs font-semibold uppercase tracking-wider">
                            {editing === "new" ? `New ${config.title.replace(/s$/, "").toLowerCase()}` : "Edit"}
                        </h3>
                        <button
                            type="button"
                            onClick={() => setEditing(null)}
                            className="text-[#52525b] hover:text-[#fafafa] transition-colors"
                            aria-label="Cancel"
                        >
                            <X size={14} />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {config.fields.map((f) => (
                            <div
                                key={f.name}
                                className={f.type === "textarea" || f.type === "lines" || f.type === "json" ? "md:col-span-2" : ""}
                            >
                                <label htmlFor={`${config.table}-${f.name}`} className="block text-[#a1a1aa] text-xs font-medium mb-1.5">
                                    {f.label}
                                    {f.required && <span className="text-[#6366f1] ml-0.5">*</span>}
                                </label>
                                {f.type === "textarea" || f.type === "lines" ? (
                                    <textarea
                                        id={`${config.table}-${f.name}`}
                                        rows={f.type === "lines" ? 4 : 3}
                                        required={f.required}
                                        value={form[f.name] ?? ""}
                                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-sm text-[#fafafa] placeholder-[#3f3f46] outline-none focus:border-[#6366f1] transition-colors resize-y"
                                        placeholder={f.placeholder}
                                    />
                                ) : f.type === "json" ? (
                                    <textarea
                                        id={`${config.table}-${f.name}`}
                                        rows={16}
                                        required={f.required}
                                        value={form[f.name] ?? ""}
                                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#fafafa] placeholder-[#3f3f46] outline-none focus:border-[#6366f1] transition-colors resize-y"
                                        placeholder={f.placeholder}
                                        spellCheck={false}
                                    />
                                ) : f.type === "boolean" ? (
                                    <label className="flex items-center gap-2 pt-1">
                                        <input
                                            id={`${config.table}-${f.name}`}
                                            type="checkbox"
                                            checked={form[f.name] === "true"}
                                            onChange={(e) => setForm({ ...form, [f.name]: e.target.checked ? "true" : "false" })}
                                            className="h-4 w-4 rounded border-[#27272a] bg-[#09090b] accent-[#6366f1]"
                                        />
                                        <span className="text-xs text-[#71717a]">{form[f.name] === "true" ? "Yes" : "No"}</span>
                                    </label>
                                ) : f.type === "select" ? (
                                    <select
                                        id={`${config.table}-${f.name}`}
                                        required={f.required}
                                        value={form[f.name] ?? ""}
                                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-sm text-[#fafafa] outline-none focus:border-[#6366f1] transition-colors"
                                    >
                                        <option value="">— select —</option>
                                        {(f.options?.map((o) => ({ value: o, label: o })) ?? options[f.name] ?? []).map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={`${config.table}-${f.name}`}
                                        type={f.type === "number" ? "number" : "text"}
                                        required={f.required}
                                        min={f.min}
                                        max={f.max}
                                        value={form[f.name] ?? ""}
                                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                                        className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-3.5 py-2.5 text-sm text-[#fafafa] placeholder-[#3f3f46] outline-none focus:border-[#6366f1] transition-colors"
                                        placeholder={f.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {error && (
                        <p className="mt-4 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-1.5 bg-[#6366f1] hover:bg-[#5558e6] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            {saving && <Loader2 size={12} className="animate-spin" />}
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(null)}
                            className="text-[#71717a] hover:text-[#fafafa] text-xs font-medium px-3 py-2 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12 text-[#52525b]">
                    <Loader2 size={16} className="animate-spin" />
                </div>
            ) : rows.length === 0 ? (
                <p className="text-center py-12 text-[#52525b] text-sm">Nothing here yet.</p>
            ) : (
                <ul className="divide-y divide-[#27272a]">
                    {rows.map((row) => (
                        <li key={row.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#1c1c1f] transition-colors">
                            <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                                <span className="text-[#fafafa] text-sm font-medium truncate">
                                    {optionLabel(
                                        config.fields.find((f) => f.name === config.listFields[0]) ?? config.fields[0],
                                        row[config.listFields[0]]
                                    )}
                                </span>
                                {config.listFields.slice(1).map((c) => (
                                    <span key={c} className="text-[#52525b] text-xs truncate">
                                        {String(row[c] ?? "")}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => startEdit(row)}
                                className="text-[#71717a] hover:text-[#fafafa] transition-colors p-1.5"
                                aria-label="Edit"
                            >
                                <Pencil size={13} />
                            </button>
                            <button
                                onClick={() => handleDelete(row)}
                                className="text-[#71717a] hover:text-red-400 transition-colors p-1.5"
                                aria-label="Delete"
                            >
                                <Trash2 size={13} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
