"use client"
import { Truck } from "lucide-react";
import { APP_NAME } from "./constants/app-infos";
import { useTypewriter } from 'react-simple-typewriter'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const [text] = useTypewriter({
    words: ['caminhões', 'motoristas', 'clientes', 'serviços'],
    loop: true,
    delaySpeed: 2000
  })
  return (
    <div className='min-h-screen antialised' >
      <div className='min-h-screen bg-[#030712] p-10 text-white flex flex-col' >
        <div className='flex items-center gap-3 text-lg font-medium text-white' >
          <Truck className='h-5 w-5' />
          <span className='font-semibold' >{APP_NAME}</span>
        </div>
        <Button asChild className='absolute right-8 top-8' variant='ghost' >
          <Link href='/auth/sign-in'>
            Entrar
          </Link>
        </Button>
        <div className="flex items-center justify-center flex-1 flex-col gap-2" >
          <h1 className='text-3xl lg:text-4xl font-semibold px-10' >
            Gerencie <span className="text-green-400 font-light" >{text}</span>
          </h1>
          <h3>
            Administre Seu Negócio de Transporte de Forma Eficiente e Simples
          </h3>
          <Button asChild variant='secondary' className="mt-2" >
            <Link href='/auth/sign-up'>
              Experimente Gratuitamente
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
