import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const signUpForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "A senha está diferente da digitada",
  path: ["passwordConfirmation"], // specify the path where the error should be reported
})

type SignUpForm = z.infer<typeof signUpForm>

interface Props {
  OnCreateUser(user: SignUpForm): void
}

export function UserCard({ OnCreateUser }: Props) {
  // const searhParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      // email: searhParams.get('email') ?? '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  })

  return (
    <form onSubmit={handleSubmit(OnCreateUser)} >
      <Card>
        <CardHeader>
          <CardTitle>Passo 2</CardTitle>
          <CardDescription>
            Cadastre o administrador para a sua empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4" >
            <Input
              disabled={isSubmitting}
              id='name'
              placeholder='Nome'
              {...register('name')}
            />
          </div>

          <div className="mb-4" >
            <Input
              disabled={isSubmitting}
              id='email'
              type='email'
              placeholder='E-mail'
              {...register('email')}
            />
          </div>

          <div className="mb-4" >
            <Input
              disabled={isSubmitting}
              id='password'
              type='password'
              placeholder='Senha'
              {...register('password')}
            />
          </div>

          <div>
            <Input
              disabled={isSubmitting}
              id='passwordConfirmation'
              type='password'
              placeholder='Confirmação da Senha'
              {...register('passwordConfirmation')}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && 'Cadastrando...'}
            {!isSubmitting && 'Cadastrar'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}