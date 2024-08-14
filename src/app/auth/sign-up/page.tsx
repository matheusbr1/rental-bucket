"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react';

import { CompanyCard } from './cards/company';
import { UserCard } from './cards/user';
import { api } from '@/app/lib/axios';
import { toast } from 'sonner';
import { User } from '../sign-in/page';
import { APP_NAME } from '@/app/constants/app-infos';
import { useRouter } from 'next/navigation';

type Tabs = 'company' | 'user'

export default function SignUp() {
  const [tab, setTab] = useState<Tabs>('company')
  const [companyId, setCompanyId] = useState('')
  const router = useRouter()

  async function signIn({ email, password }: {
    email: string
    password: string
  }) {
    try {
      const signInResponse = await api.post<{
        user: User,
        token: string,
        refresh_token: string,
      }>('/sessions', {
        email,
        password,
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${signInResponse.data.token}`
      sessionStorage.setItem(`${APP_NAME}:token`, String(signInResponse.data.token))
      sessionStorage.setItem(`${APP_NAME}:user`, JSON.stringify(signInResponse.data.user))

      toast.success('Bem vindo.')

      router.push('/app/works')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao logar novo usuário.')
    }
  }

  async function signUp({ name, email, password }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      await api.post('/users', {
        name,
        email,
        password,
        company_id: companyId
      })

      toast.success('Usuário criado com sucesso.')

      await signIn({ email, password })
    } catch (error) {
      toast.error('Não foi possível criar o usuário, tente novamente.')
    }
  }

  return (
    <div className="p-8" >
      <Button asChild className='absolute right-8 top-8' variant='ghost' >
        <Link href='/auth/sign-in'>
          Fazer login
        </Link>
      </Button>

      <Tabs defaultValue="company" value={tab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="company"
            onClick={() => setTab('company')}
            disabled={!!companyId}
          >
            Empresa
          </TabsTrigger>
          <TabsTrigger
            value="user"
            onClick={() => setTab('user')}
            disabled={!companyId}
          >
            Usuário
          </TabsTrigger>
        </TabsList>
        <TabsContent value="company">
          <CompanyCard onCreateCompany={(company_id) => {
            setCompanyId(company_id)
            setTab('user')
          }} />
        </TabsContent>
        <TabsContent value="user">
          <UserCard OnCreateUser={signUp} />
        </TabsContent>
      </Tabs>
    </div>
  );
}


