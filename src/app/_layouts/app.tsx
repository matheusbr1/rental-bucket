"use client"
import Link from "next/link"
import {
  CircleUser,
  Menu,
  Users,
  Map,
  Building2,
  Truck,
  ClipboardPenLine,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/axios"
import { AxiosResponse } from "axios"
import { APP_NAME } from "../constants/app-infos"

type Company = {
  id: string
  name: string
  hasSubscription: boolean
  address: object
}

const MENU_ITEMS = [
  {
    href: '/app/works/map',
    label: 'Mapa',
    icon: <Map className="h-4 w-4" />
  },
  {
    href: '/app/works',
    label: 'Serviços',
    icon: <ClipboardPenLine className="h-4 w-4" />
  },
  {
    href: '/app/customers',
    label: 'Clientes',
    icon: <Building2 className="h-4 w-4" />
  },
  {
    href: '/app/drivers',
    label: 'Motoristas',
    icon: <Users className="h-4 w-4" />
  },
  {
    href: '/app/trucks',
    label: 'Caminhões',
    icon: <Truck className="h-4 w-4" />
  },
  {
    href: '/app/settings',
    label: 'Configurações',
    icon: <Settings className="h-4 w-4" />
  },
]

export function AppLayout({ children }: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: companyResponse } = useQuery<AxiosResponse<Company>>({
    queryKey: ['company'],
    queryFn: async () => {
      const user = JSON.parse(sessionStorage.getItem(`${APP_NAME}:user`)!)
      return await api.get(`/companies/${user.company_id}`)
    }
  })
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[275px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block" >
        <div className="flex h-full max-h-screen flex-col gap-2 relative">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/app/works" className="flex items-center gap-2 font-semibold">
              <Truck className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {MENU_ITEMS.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  data-current={pathname === item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[current=true]:bg-muted data-[current=true]:text-primary"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          {!companyResponse?.data.hasSubscription && (
            <div className="mt-auto p-4">
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Assinar o Pro</CardTitle>
                  <CardDescription>
                    Desbloqueie todos os recursos e tenha acesso ilimitado à nossa equipe de suporte.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Assinar
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-2"
                >
                  <Truck className="h-6 w-6" />
                  <span className="sr-only">Gerenciador</span>
                </Link>
                {MENU_ITEMS.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-current={pathname === item.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground data-[current=true]:bg-muted data-[current=true]:text-foreground"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Assinar o Pro</CardTitle>
                    <CardDescription>
                      Desbloqueie todos os recursos e tenha acesso ilimitado à nossa equipe de suporte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Assinar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 font-semibold">
            <span>{companyResponse?.data.name}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                router.push('/auth/sign-in')
              }} >Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
