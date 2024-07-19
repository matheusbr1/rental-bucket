import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const signUpForm = z.object({
  name: z.string(),
  address: z.object({
    zipcode: z.string(),
    street: z.string(),
    number: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string()
  })
})

interface AddressProps {
  logradouro: string
  uf: string
  localidade: string
  bairro: string
}

type SignUpForm = z.infer<typeof signUpForm>

interface Props {
  onCreateCompany(company_id: string): void
}

export default function CompanyForm({ onCreateCompany }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      name: '',
      address: {
        zipcode: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    }
  })

  const { mutateAsync: getAddress, isPending: isAddressPending } = useMutation({
    mutationFn: async () => {
      await new Promise((resolve, _) => {
        setTimeout(() => resolve(true), 5000)
      })
      const zipcode = getValues('address.zipcode')
      if (!zipcode) return
      const response = await axios.get<AddressProps>(`https://viacep.com.br/ws/${zipcode}/json`)
      const { bairro, localidade, logradouro, uf } = response.data
      setValue('address.city', localidade)
      setValue('address.neighborhood', bairro)
      setValue('address.state', uf)
      setValue('address.street', logradouro)
    }
  })

  async function handleSignUp({ name, address }: SignUpForm) {
    try {
      console.log({ name, address })

      await new Promise((resolve, _) => {
        setTimeout(() => resolve(true), 5000)
      })

      const company_id = '123'

      toast.success('Empresa criado com sucesso.')

      onCreateCompany(company_id)
    } catch (error) {
      toast.error('Não foi possível criar o empresa, tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} >
      <div className="grid grid-cols-6 gap-4" >
        <div className="col-span-6" >
          <Input
            disabled={isSubmitting}
            id='name'
            type='name'
            placeholder='Nome'
            {...register('name')}
          />
        </div>
        <div className="col-span-2" >
          <Input
            disabled={isSubmitting ?? isAddressPending}
            id='address.zipcode'
            placeholder='Cep'
            {...register('address.zipcode')}
            onBlur={() => getAddress()}
          />
        </div>
        <div className="col-span-4" >
          <Input
            disabled={isSubmitting}
            id='address.street'
            placeholder='Logradouro'
            {...register('address.street')}
          />
        </div>
        <div className="col-span-2" >
          <Input
            disabled={isSubmitting}
            id='address.number'
            placeholder='№'
            {...register('address.number')}
          />
        </div>
        <div className="col-span-4" >
          <Input
            disabled={isSubmitting}
            id='address.neighborhood'
            placeholder='Bairro'
            {...register('address.neighborhood')}
          />
        </div>
        <div className="col-span-2" >
          <Input
            disabled={isSubmitting}
            id='address.state'
            placeholder='UF'
            {...register('address.state')}
          />
        </div>
        <div className="space-y-2 col-span-4" >
          <Input
            disabled={isSubmitting}
            id='address.city'
            placeholder='Cidade'
            {...register('address.city')}
          />
        </div>
      </div>

      <Button
        type='submit'
        className="w-full mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting && 'Criando...'}
        {!isSubmitting && 'Criar Empresa'}
      </Button>
    </form>
  )
}