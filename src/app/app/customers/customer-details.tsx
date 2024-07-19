import { Customer } from "@/app/api/get-customers"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet"
import { Minus, Plus } from "lucide-react"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import { addressFactory, contactFactory, customerFactory } from "./customer-factory"
import { InputWithMask } from "@/app/components/input-with-mask"
import { queryClient } from "@/app/lib/react-query"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { updateCustomer } from "@/app/api/update-customer"
import { createCustomer } from "@/app/api/create-customer"
import { unmask } from "@/app/helpers/unmask"
import { z } from "zod"
import { ErrorMessage } from "@/app/components/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent } from "react"

interface Props {
  customer?: Customer
  toggle(): void
}

const CONTACT_TYPE = {
  email: 'E-mail',
  phone: 'Telefone',
  cellphone: 'Celular',
}

interface Address_API {
  logradouro: string
  uf: string
  localidade: string
  bairro: string
}

export type Contact_Type = keyof typeof CONTACT_TYPE

const customerSchema = z.object({
  id: z.string().optional(),
  person_type: z.enum(['F', 'J']),
  name: z.string().optional(),
  CPF_CNPJ: z.string().optional(),
  company_name: z.string().optional(),
  fantasy_name: z.string().optional(),
  adresses: z.array(z.object({
    CEP: z.string().transform(unmask).refine(v => v.length === 8, { message: 'Requerido' }),
    street: z.string().min(1, { message: 'Requerido' }),
    number: z.string().min(1, { message: 'Requerido' }),
    state: z.string().min(1, { message: 'Requerido' }),
    city: z.string().min(1, { message: 'Requerido' }),
    neighborhood: z.string().min(1, { message: 'Requerido' }),
    complement: z.string().optional(),
  })),
  contacts: z.array(z.object({
    contact_type: z.enum(['email', 'phone', 'cellphone']),
    contact: z.string().min(1, { message: 'Requerido' }),
  }).superRefine((data, ctx) => {
    if (data.contact_type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(data.contact)) {
        ctx.addIssue({
          path: ['contact'],
          message: 'Formato de e-mail inválido',
          code: 'custom'
        });
      }
    } else if (data.contact_type === 'phone' || data.contact_type === 'cellphone') {
      const phonePattern = /^\d{10,11}$/;
      if (!phonePattern.test(data.contact)) {
        ctx.addIssue({
          path: ['contact'],
          message: 'Número de telefone/celular inválido',
          code: 'custom'
        });
      }
    }
  }))
}).superRefine((data, ctx) => {
  if (data.person_type === 'F' && unmask(data.CPF_CNPJ!).length < 11) {
    ctx.addIssue({ path: ['CPF_CNPJ'], message: 'Requerido', code: 'custom' });
  }
  if (data.person_type === 'J' && unmask(data.CPF_CNPJ!).length < 14) {
    ctx.addIssue({ path: ['CPF_CNPJ'], message: 'Requerido', code: 'custom' });
  }
  if (data.person_type === 'F' && !data.name) {
    ctx.addIssue({ path: ['name'], message: 'Requerido', code: 'custom' });
  }
  if (data.person_type === 'J' && !data.company_name) {
    ctx.addIssue({ path: ['company_name'], message: 'Requerido', code: 'custom' });
  }
  if (data.person_type === 'J' && !data.fantasy_name) {
    ctx.addIssue({ path: ['fantasy_name'], message: 'Requerido', code: 'custom' });
  }
})

export function CustomerDetails({ customer, toggle }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: customer ?? customerFactory(),
    resolver: zodResolver(customerSchema)
  })

  const person_type = watch('person_type')

  const contacts = useFieldArray({
    control,
    name: "contacts",
  });

  const adresses = useFieldArray({
    control,
    name: "adresses",
  });

  const { mutateAsync: saveCustomer } = useMutation({
    mutationFn: customer ? updateCustomer : createCustomer
  })

  async function handleSaveCustomer(data: Customer) {
    try {
      await saveCustomer({ ...data, CPF_CNPJ: unmask(data.CPF_CNPJ) })
      queryClient.invalidateQueries({
        queryKey: ['customers']
      })
      toast.success('Cliente salvo com sucesso.')
      reset()
      toggle()
    } catch (error) {
      const axiosError = error as AxiosError<{ context: string }, any>
      if (axiosError.response?.data.context === 'plan') {
        toast.error('Limite de clientes atingido! Para cadastrar mais clientes atualize para o premium.')
      } else {
        toast.error('Ocorreu um erro ao salvar o cliente.')
      }
      console.error(error)
    }
  }

  return (
    <SheetContent className="min-w-[80%] max-w-[1400px] min-h-full flex flex-col overflow-y-scroll">
      <form onSubmit={handleSubmit(handleSaveCustomer)}>
        <h3>
          <strong>Dados Pessoais</strong>
        </h3>
        <div className="grid grid-cols-4 gap-4 py-4">
          <Controller
            control={control}
            name="person_type"
            render={({ field }) => (
              <RadioGroup className="flex gap-4 items-center" value={field.value} onValueChange={value => {
                field.onChange(value)
                setValue('CPF_CNPJ', '')
                setValue('name', '')
                setValue('company_name', '')
                setValue('fantasy_name', '')
              }} >
                Tipo:
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="F" id="F" />
                  <Label htmlFor="F">PF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="J" id="J" />
                  <Label htmlFor="J">PJ</Label>
                </div>
              </RadioGroup>
            )}
          />

          {person_type === 'F' && (
            <>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name')} />
                <ErrorMessage>{errors?.name?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="CPF">CPF</Label>
                <Controller
                  name="CPF_CNPJ"
                  control={control}
                  render={({ field }) =>
                    <InputWithMask id="CPF" mask="999.999.999-99" {...field} />
                  }
                />
                <ErrorMessage>{errors?.CPF_CNPJ?.message}</ErrorMessage>
              </div>
            </>
          )}
          {person_type === 'J' && (
            <>
              <div className="flex flex-col gap-2">
                <Label htmlFor="company_name">Razão Social</Label>
                <Input id="company_name" {...register('company_name')} />
                <ErrorMessage>{errors?.company_name?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="fantasy_name">Nome Fantasia</Label>
                <Input id="fantasy_name" {...register('fantasy_name')} />
                <ErrorMessage>{errors?.fantasy_name?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="CNPJ">CNPJ</Label>
                <Controller
                  name="CPF_CNPJ"
                  control={control}
                  render={({ field }) =>
                    <InputWithMask id="CNPJ" mask="99.999.999/9999-99" {...field} />
                  }
                />
                <ErrorMessage>{errors?.CPF_CNPJ?.message}</ErrorMessage>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 justify-between" >
          <h3>
            <strong>Endereço</strong>
          </h3>
          <Button variant='ghost' size='xs' className="text-xs" type="button" onClick={() => adresses.append(addressFactory())}>
            Novo
            <Plus className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="py-4" >
          {adresses.fields.map((field, index) => (
            <div className="grid grid-cols-12 gap-4 p-4 rounded-lg border border-dashed relative" key={field.id}>
              {adresses.fields.length > 1 && (
                <Button variant='ghost' size='xs' className="absolute top-0 right-0" type="button">
                  <Minus className="h-4 w-4" onClick={() => adresses.remove(index)} />
                </Button>
              )}

              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="CEP">CEP</Label>
                <Controller
                  name={`adresses.${index}.CEP`}
                  control={control}
                  render={({ field }) =>
                    <InputWithMask id="CEP" mask="99999-999" {...field} onBlur={async (e: ChangeEvent<HTMLInputElement>) => {
                      try {
                        const CEP = unmask(e.target.value)
                        // console.log(CEP)
                        if (CEP.length === 8) {
                          const { data } = await axios.get<Address_API>(`https://viacep.com.br/ws/${CEP}/json`)
                          adresses.update(index, {
                            CEP,
                            city: data.localidade,
                            street: data.logradouro,
                            state: data.uf,
                            neighborhood: data.bairro,
                          })
                        }
                      } catch (error) {
                        toast.error('Falha ao buscar CEP.')
                      }
                    }} />
                  }
                />
                <ErrorMessage>{errors?.adresses && errors?.adresses[index]?.CEP?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2 col-span-4">
                <Label htmlFor="street">Logradouro</Label>
                <Input id="street" {...register(`adresses.${index}.street`)} />
                <ErrorMessage>{errors?.adresses && errors?.adresses[index]?.street?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="number">N</Label>
                <Input id="number" {...register(`adresses.${index}.number`)} />
                <ErrorMessage>{errors?.adresses && errors?.adresses[index]?.number?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" {...register(`adresses.${index}.neighborhood`)} />
                <ErrorMessage>{errors?.adresses && errors?.adresses[index]?.neighborhood?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="state">UF</Label>
                <Input id="state" {...register(`adresses.${index}.state`)} />
                <ErrorMessage>{errors?.adresses && errors?.adresses[index]?.state?.message}</ErrorMessage>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" {...register(`adresses.${index}.city`)} />
                <ErrorMessage>{errors?.adresses && errors?.adresses[index]?.city?.message}</ErrorMessage>
              </div>
              {/* <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" {...register(`adresses.${index}.complement`)} />
                <ErrorMessage>{errors?.adresses && errors?.adresses[index]?.complement?.message}</ErrorMessage>
              </div> */}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 justify-between" >
          <h3>
            <strong>Contato</strong>
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='xs' className="text-xs" >
                Novo
                <Plus className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-xs"
                  onSelect={() => contacts.append(contactFactory('cellphone'))}
                >
                  Celular
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-xs"
                  onSelect={() => contacts.append(contactFactory('phone'))}
                >
                  Telefone
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-xs"
                  onSelect={() => contacts.append(contactFactory('email'))}
                >
                  E-mail
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-3 gap-4 py-4">
          {contacts.fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2 p-4 rounded-lg border border-dashed relative">
              {contacts.fields.length > 1 && (
                <Button variant='ghost' size='xs' className="absolute top-0 right-0" type="button" onClick={() => contacts.remove(index)}>
                  <Minus className="h-4 w-4" />
                </Button>
              )}
              <Label htmlFor="contact">{CONTACT_TYPE[field.contact_type]}</Label>
              <Input id="contact" {...register(`contacts.${index}.contact`)} />
              <ErrorMessage>{errors?.contacts && errors?.contacts[index]?.contact?.message}</ErrorMessage>
            </div>
          ))}
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
