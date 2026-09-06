"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import {
  Home,
  Eye,
  Pencil,
  Users,
  Share2,
  HelpCircle,
  Settings,
  RefreshCw,
  Search,
  Plus,
  Copy,
  Inbox,
  ListChecks,
  Flag,
  UserCheck,
  Building2,
  Target,
  BarChart3,
  Mail,
  FileText,
  User as UserIcon,
} from "lucide-react"
import { ProjectViewSidebar, type ProjectNavGroup } from "./project-view-sidebar"
import { cn } from "@/lib/utils"

const DEFAULT_NAV_GROUPS: ProjectNavGroup[] = [
  {
    title: "Doctor",
    items: [
      { icon: ListChecks, label: "All records" },
      { icon: Flag, label: "Follow-up status" },
      { icon: UserCheck, label: "Follow-up needed" },
      { icon: Building2, label: "All patients info" },
    ],
  },
  {
    title: "Patient",
    items: [
      { icon: Target, label: "My submissions" },
      { icon: BarChart3, label: "Charts & insights" },
      { icon: Mail, label: "Email & PDF template" },
      { icon: FileText, label: "Getting started & resources" },
    ],
  },
]

export interface ProjectViewColumn {
  key: string
  label: string
}

const DEFAULT_COLUMNS: ProjectViewColumn[] = [
  { key: "profile", label: "Profile field" },
  { key: "full_name", label: "Full name" },
  { key: "dob", label: "What is your date of birth?" },
  { key: "gender", label: "What is your gender?" },
  { key: "phone", label: "What is your phone number?" },
  { key: "address", label: "What is your home address?" },
]

const DEFAULT_ROWS: Record<string, string>[] = Array.from({ length: 4 }, () => ({
  profile: "None",
  full_name: "-",
  dob: "-",
  gender: "-",
  phone: "-",
  address: "-",
}))

interface ProjectViewProps {
  breadcrumb?: string[]
  pageTitle?: string
  navGroups?: ProjectNavGroup[]
  activeNavLabel?: string
  formTitle?: string
  formShortId?: string
  formUrl?: string
  columns?: ProjectViewColumn[]
  rows?: Record<string, string>[]
  /** Overrides the default editorial tips block. */
  tips?: ReactNode
  /** Rendered pinned to the bottom of the sidebar, e.g. a BackButton out of the prototype. */
  sidebarFooter?: ReactNode
}

/**
 * The Formaloo "app/board" project view — a data-block page with a grouped nav sidebar,
 * a hero banner, editorial tips, and a form's response table. Configurable via props;
 * ships with the "Doctor / Patient" example so it's demoable as-is.
 */
export function ProjectView({
  breadcrumb = ["2. Test templates", "All records"],
  pageTitle = "All records",
  navGroups = DEFAULT_NAV_GROUPS,
  activeNavLabel = "All records",
  formTitle = "Post-treatment follow-up & recovery check",
  formShortId = "8TO8c32j",
  formUrl = "alisinafakhraei.formaloo.me/new-title",
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  tips,
  sidebarFooter,
}: ProjectViewProps) {
  const [view, setView] = useState<"view" | "edit">("view")

  return (
    <div className="flex h-svh bg-background">
      <ProjectViewSidebar groups={navGroups} activeLabel={activeNavLabel} footer={sidebarFooter} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-2.5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            {breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                <span>/</span>
                <span className={i === breadcrumb.length - 1 ? "font-medium text-foreground" : ""}>{crumb}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-[var(--radius)] border border-border p-0.5">
              <button
                onClick={() => setView("view")}
                className={cn(
                  "flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium transition-colors",
                  view === "view" ? "bg-secondary" : "text-muted-foreground"
                )}
              >
                <Eye className="h-3.5 w-3.5" /> View
              </button>
              <button
                onClick={() => setView("edit")}
                className={cn(
                  "flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium transition-colors",
                  view === "edit" ? "bg-secondary" : "text-muted-foreground"
                )}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
            <span className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground sm:flex">
              <Users className="h-3.5 w-3.5" /> User Directory
            </span>
            <span className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground sm:flex">
              <Share2 className="h-3.5 w-3.5" /> Share
            </span>
            <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Settings className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="h-6 w-6 shrink-0 rounded-full bg-secondary" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            className="flex h-40 items-center px-10"
            style={{ background: "linear-gradient(120deg, hsl(217 79% 55%), hsl(200 80% 65%))" }}
          >
            <h1 className="text-5xl font-extrabold text-white">{pageTitle}</h1>
          </div>

          <div className="px-10 py-6">
            <div className="mb-5 rounded-[var(--radius)] p-4" style={{ background: "hsl(48 92% 95%)" }}>
              {tips ?? (
                <>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    ✏️ Click <strong>Edit Form</strong> to customize your form&apos;s{" "}
                    <span className="underline decoration-primary/50">layout and design</span>, and{" "}
                    <span className="underline decoration-primary/50">tweak the logic</span> to fit your use case
                    and align with your brand. For more resources and setup tips, check out the{" "}
                    <strong className="underline decoration-primary/50">Getting started &amp; resources</strong>{" "}
                    page.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                    💡 <strong>Pro Tip:</strong> You can use the <strong>{formTitle}</strong> form to submit new
                    recovery updates, and the <strong>All Records</strong> table data block to view all
                    submissions in one place.
                  </p>
                </>
              )}
            </div>

            <div className="mb-4 flex items-center justify-end gap-4 text-xs font-medium text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="cursor-pointer hover:text-foreground">Embed</span>
              <span className="cursor-pointer hover:text-foreground">Options</span>
            </div>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-secondary">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{formTitle}</span>
                    <span className="text-xs text-muted-foreground">{formShortId}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--primary)" }}>
                    {formUrl}
                    <Copy className="h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  className="flex items-center gap-1.5 rounded-[var(--radius)] px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--primary)" }}
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button className="flex items-center gap-1.5 rounded-[var(--radius)] border border-border px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary">
                  Responses
                </button>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold">{formTitle}</h2>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-[var(--radius)] border border-border text-muted-foreground transition-colors hover:bg-secondary">
                  <Search className="h-4 w-4" />
                </button>
                <button
                  className="flex items-center gap-1 rounded-[var(--radius)] px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--primary)" }}
                >
                  <Plus className="h-3.5 w-3.5" /> New
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[var(--radius)] border border-border">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          className="whitespace-nowrap px-4 py-2.5 text-xs font-medium text-muted-foreground"
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {rows.length > 0 && (
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          {columns.map((col) => (
                            <td key={col.key} className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                              {col.key === "profile" ? (
                                <span className="flex items-center gap-1.5">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
                                    <UserIcon className="h-3 w-3 text-muted-foreground" />
                                  </span>
                                  {row[col.key]}
                                </span>
                              ) : (
                                row[col.key]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>

              {rows.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-12 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                    <Inbox className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">No responses found</p>
                  <p className="max-w-xs text-xs text-muted-foreground">
                    Responses will show up here once people start filling out your form.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
