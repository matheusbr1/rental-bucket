import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

type SignUpForm = z.infer<typeof signUpForm>

export default function UserForm() {
  const searhParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: searhParams.get('email') ?? '',
      password: ''
    }
  })

  async function handleSignUp({ name, email }: SignUpForm) {
    try {
      console.log({ name, email })

      await new Promise((resolve, _) => {
        setTimeout(() => resolve(true), 5000)
      })

      toast.success('Usuário criado com sucesso.')
    } catch (error) {
      toast.error('Não foi possível criar o usuário, tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} >
      <div className="my-4" >
        <Input
          disabled={isSubmitting}
          id='name'
          placeholder='Nome'
          {...register('name')}
        />
      </div>

      <div className="my-4" >
        <Input
          disabled={isSubmitting}
          id='email'
          type='email'
          placeholder='E-mail'
          {...register('email')}
        />
      </div>

      <div className="my-4" >
        <Input
          disabled={isSubmitting}
          id='password'
          type='password'
          placeholder='Senha'
          {...register('password')}
        />
      </div>

      <Button
        type='submit'
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting && 'Criando...'}
        {!isSubmitting && 'Criar Usuário'}
      </Button>
    </form>
  )
}