import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet"
import { Driver } from "@/app/api/get-drivers"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createDriver } from '@/app/api/create-driver'
import { driverFactory } from "./driver-factory"
import { queryClient } from "@/app/lib/react-query"
import axios, { AxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "@/app/components/error-message"
import { unmask } from "@/app/helpers/unmask"
import { updateDriver } from "@/app/api/update-driver"
import { InputWithMask } from "@/app/components/input-with-mask"

interface Props {
  driver?: Driver
  toggle(): void
}

interface Address_API {
  logradouro: string
  uf: string
  localidade: string
  bairro: string
}

const driverSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Requerido' }),
  CPF: z.string().transform(unmask).refine(v => v.length === 11, { message: 'Requerido' }),
  RG: z.string().min(1, { message: 'Requerido' }),
  CNH: z.string().min(1, { message: 'Requerido' }),
  birthday: z.string().transform(v => {
    const [day, month, year] = v.split('/')
    return `${month}/${day}/${year}`
  }).refine(v => unmask(v).length === 8, { message: 'Requerido' }),
  address: z.object({
    CEP: z.string().transform(unmask).refine(v => v.length === 8, { message: 'Requerido' }),
    street: z.string().min(1, { message: 'Requerido' }),
    number: z.string().min(1, { message: 'Requerido' }),
    state: z.string().min(1, { message: 'Requerido' }),
    city: z.string().min(1, { message: 'Requerido' }),
    neighborhood: z.string().min(1, { message: 'Requerido' }),
  }),
  contacts: z.object({
    email: z.string().optional().refine((val) => {
      if (val !== undefined && val !== "") {
        return z.string().email().safeParse(val).success
      }
      return true;
    }, { message: 'E-mail inválido' }),
    phone: z.string().transform(unmask),
    cellphone: z.string().transform(unmask)
  }).refine((data) => data.email || data.phone || data.cellphone, {
    message: 'Pelo menos um contato (email, telefone ou celular) deve ser fornecido'
  })
})

export function DriverDetails({ driver, toggle }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: driver ?? driverFactory(),
    resolver: zodResolver(driverSchema)
  })

  const CEP = watch('address.CEP')

  const { isFetching: isFechingAddress } = useQuery({
    queryKey: ['address', CEP],
    queryFn: async () => {
      const { data } = await axios.get<Address_API>(`https://viacep.com.br/ws/${CEP}/json`)
      setValue('address.city', data.localidade)
      setValue('address.street', data.logradouro)
      setValue('address.state', data.uf)
      setValue('address.neighborhood', data.bairro)
      return data
    },
    enabled: unmask(CEP).length === 8
  })

  const { mutateAsync: saveDriver } = useMutation({
    mutationFn: driver ? updateDriver : createDriver
  })

  async function handleSaveDriver(data: Driver) {
    try {
      await saveDriver(data)
      queryClient.invalidateQueries({
        queryKey: ['drivers']
      })
      toast.success('Motorista salvo com sucesso.')
      reset()
      toggle()
    } catch (error) {
      const axiosError = error as AxiosError<{ context: string }, any>
      if (axiosError.response?.data.context === 'plan') {
        toast.error('Limite de motoristas atingido! Para cadastrar mais motoristas atualize para o premium.')
      } else {
        toast.error('Ocorreu um erro ao salvar o motorista.')
      }
      console.error(error)
    }
  }

  return (
    <SheetContent className="min-w-[80%] max-w-[1400px] min-h-full flex flex-col overflow-y-scroll" >
      <form onSubmit={handleSubmit(handleSaveDriver)} >
        <h3>
          <strong>Dados Pessoais</strong>
        </h3>
        <div className="grid grid-cols-5 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="CPF">CPF</Label>
            <Controller
              name="CPF"
              control={control}
              render={({ field }) =>
                <InputWithMask id="CPF" mask="999.999.999-99" {...field} />
              }
            />
            <ErrorMessage>{errors.CPF?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="RG">RG</Label>
            <Input id="RG" {...register('RG')} />
            <ErrorMessage>{errors.RG?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="CNH" >CNH</Label>
            <Input id="CNH" {...register('CNH')} />
            <ErrorMessage>{errors.CNH?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="birthday">Data de Nascimento</Label>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) =>
                <InputWithMask id="birthday" mask="99/99/9999" {...field} />
              }
            />
            <ErrorMessage>{errors.birthday?.message}</ErrorMessage>
          </div>
        </div>
        <h3>
          <strong>Endereço</strong>
        </h3>
        <div className="grid grid-cols-12 gap-4 py-4">
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="CEP">CEP</Label>
            <Controller
              name="address.CEP"
              control={control}
              render={({ field }) =>
                <InputWithMask id="CEP" mask="99999-999" {...field} />
              }
            />
            <ErrorMessage>{errors.address?.CEP?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2 col-span-4">
            <Label htmlFor="street">Logradouro</Label>
            <Input id="street" disabled={isFechingAddress}{...register('address.street')} />
            <ErrorMessage>{errors.address?.street?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="number">N</Label>
            <Input id="number" disabled={isFechingAddress} {...register('address.number')} />
            <ErrorMessage>{errors.address?.number?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input id="neighborhood" disabled={isFechingAddress} {...register('address.neighborhood')} />
            <ErrorMessage>{errors.address?.neighborhood?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="state">UF</Label>
            <Input id="state" disabled={isFechingAddress} maxLength={2} {...register('address.state')} />
            <ErrorMessage>{errors.address?.state?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input id="complement" disabled={isFechingAddress} {...register('address.complement')} />
          </div>
        </div>
        <h3>
          <strong>Contato</strong>
          <ErrorMessage>{errors.contacts?.root?.message}</ErrorMessage>
        </h3>
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cellphone">Celular</Label>
            <Controller
              name="contacts.cellphone"
              control={control}
              render={({ field }) =>
                <InputWithMask id="cellphone" mask="(99) 99999-9999" {...field} />
              }
            />
            <ErrorMessage>{errors.contacts?.cellphone?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Controller
              name="contacts.phone"
              control={control}
              render={({ field }) =>
                <InputWithMask id="cellphone" mask="(99) 9999-9999" {...field} />
              }
            />
            <ErrorMessage>{errors.contacts?.phone?.message}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" {...register('contacts.email')} />
            <ErrorMessage>{errors.contacts?.email?.message}</ErrorMessage>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" disabled={isSubmitting} >
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  )
}
