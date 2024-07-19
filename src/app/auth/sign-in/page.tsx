"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/app/lib/axios';
import { APP_NAME } from '@/app/constants/app-infos';

export type User = {
  id: string
  name: string
  email: string
  avatar: string
  company_id: string
}

const signInForm = z.object({
  email: z.string().email(),
  password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export default function SignIn() {
  const searhParams = useSearchParams()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searhParams.get('email') ?? '',
      password: ''
    }
  })

  async function handleSignIn({ email, password }: SignInForm) {
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
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <div className="p-8" >
      <Button asChild className='absolute right-8 top-8' variant='ghost' >
        <Link href='/auth/sign-up'>
          Cadastre-se
        </Link>
      </Button>

      <div className="w-[350px] flex flex-col justify-center gap-6" >
        <div className="flex flex-col gap-2 text-center" >
          <h1 className="text-2xl font-semibold tracking-tight" >
            Acessar plataforma
          </h1>
          <p className="text-sm text-muted-foreground" >
            Acompanhe os seus serviços pela plataforma!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)} >
          <div className="space-y-2" >
            {/* <Label htmlFor="email" >E-mail</Label> */}
            <Input id='email' type='email' placeholder='E-mail' {...register('email')} />
          </div>

          <div className="space-y-2" >
            {/* <Label htmlFor="password" >Senha</Label> */}
            <Input id='password' type='password' placeholder='Senha' {...register('password')} />
          </div>

          <Button
            type='submit'
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Acessando...' : 'Acessar plataforma'}
          </Button>
        </form>
      </div>
    </div>
  );
}


