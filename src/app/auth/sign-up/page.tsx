"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompanyForm from './company-form';
import UserForm from './user-form';
import { useState } from 'react';

type Tabs = 'company' | 'user'

export default function SignUp() {
  const [tab, setTab] = useState<Tabs>('company')

  return (
    <div className="p-8" >
      <Button asChild className='absolute right-8 top-8' variant='ghost' >
        <Link href='/auth/sign-in'>
          Fazer login
        </Link>
      </Button>

      <div className="w-[350px] flex flex-col justify-center gap-6" >
        <div className="flex flex-col gap-2 text-center" >
          <h1 className="text-2xl font-semibold tracking-tight" >
            Criar conta
          </h1>
          <p className="text-sm text-muted-foreground" >
            Acompanhe os seus serviços pela plataforma!
          </p>
        </div>

        <Tabs defaultValue="company" value={tab} className="w-full">
          <TabsList className="w-full" >
            <TabsTrigger value="company" onClick={() => setTab('company')} >Empresa</TabsTrigger>
            <TabsTrigger value="user" onClick={() => setTab('user')} >Usuário</TabsTrigger>
          </TabsList>
          <TabsContent value="company" >
            <CompanyForm onCreateCompany={() => {
              setTab('user')
            }} />
          </TabsContent>
          <TabsContent value="user" >
            <UserForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


