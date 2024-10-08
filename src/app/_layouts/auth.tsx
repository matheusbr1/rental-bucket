import { Truck } from 'lucide-react'
import { APP_DESCRIPTION, APP_NAME } from '../constants/app-infos'

export function AuthLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen grid-cols-1 grid antialised lg:grid-cols-2' >
      <div className='hidden h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground lg:flex flex-col justify-between' >
        <div className='flex items-center gap-3 text-lg font-medium text-foreground' >
          <Truck className='h-5 w-5' />
          <span className='font-semibold' >{APP_NAME}</span>
        </div>
        <footer className='text-sm' >
          {APP_DESCRIPTION}
        </footer>
      </div>
      <div className='relative flex flex-col items-center justify-center' >
        <div className='lg:hidden flex items-center gap-3 text-lg font-medium text-foreground absolute left-8 top-10' >
          <Truck className='h-5 w-5' />
          <span className='font-semibold text-sm' >{APP_NAME}</span>
        </div>
        {children}
      </div>
    </div>
  )
}