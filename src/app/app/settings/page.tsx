'use client'
import Link from "next/link"
import { ThemeForm } from "./theme"
import { CompanyForm } from "./company"
import { useState } from "react"

export default function SettingsPage() {
  const [tab, setTab] = useState('company')
  return (
    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <nav
        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
      >
        <Link
          href="#"
          onClick={() => setTab('company')}
          data-current={tab === 'company'}
          className="data-[current=true]:font-semibold data-[current=true]:text-primary"
        >
          Empresa
        </Link>
        <Link
          href="#"
          onClick={() => setTab('theme')}
          data-current={tab === 'theme'}
          className="data-[current=true]:font-semibold data-[current=true]:text-primary"
        >
          Aparência
        </Link>
      </nav>
      <div className="grid gap-6">
        {tab === 'company' && <CompanyForm />}
        {tab === 'theme' && <ThemeForm />}
      </div>
    </div>
  )
}