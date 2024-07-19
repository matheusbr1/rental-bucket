import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet"
import { Work } from "@/app/api/get-works"
import { useForm, Controller } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { getCustomers } from "@/app/api/get-customers"
import { driverAdapter, getDrivers } from "@/app/api/get-drivers"
import { add } from "date-fns"
import { getTrucks } from "@/app/api/get-trucks"
import { getWorkTypes } from "@/app/api/get-work-types"
import { getEquipments } from "@/app/api/get-equipments"
import { getUserFromSession } from "@/app/helpers/get-user-from-session"
import { api } from "@/app/lib/axios"
import { toast } from "sonner"
import { queryClient } from "@/app/lib/react-query"

interface Props {
  toggle(): void
}

export function WorkDetails({ toggle }: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
    watch,
    reset,
    control
  } = useForm({
    defaultValues: {
      company_id: '',
      customer_id: '',
      address_id: '',
      driver_id: '',
      truck_id: '',
      work_type_id: '',
      quantity: 1,
      equipment_id: '',
      status: 'pending',
      start_date: new Date().toISOString(),
      end_date: add(new Date(), { weeks: 1 }).toISOString(),
    }
  })

  const customer_id = watch('customer_id')

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await getCustomers()
      return response.data.customers
    }
  })

  const { data: drivers = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      const res = await getDrivers()
      return res.data.drivers.map(driverAdapter)
    }
  })

  const { data: work_types = [] } = useQuery({
    queryKey: ['work_types'],
    queryFn: async () => {
      const res = await getWorkTypes()
      return res.data
    }
  })

  const { data: equipments = [] } = useQuery({
    queryKey: ['equipments'],
    queryFn: async () => {
      const res = await getEquipments()
      return res.data
    }
  })

  const { data: trucks = [] } = useQuery({
    queryKey: ['trucks'],
    queryFn: async () => {
      const res = await getTrucks()
      return res.data.trucks
    }
  })

  async function handleSaveWork(work: any) {
    try {
      const user = getUserFromSession()
      await api.post('works', {
        ...work,
        quantity: Number(work.quantity),
        company_id: user.company_id,
        work_type_id: work_types.find(w => w.name === 'Coloca')?.id,
        equipment_id: equipments.find(w => w.name === 'Caçamba 4m³')?.id,
      })
      queryClient.invalidateQueries({
        queryKey: ['works']
      })
      toast.success('Serviço criado com sucesso')
      reset()
      toggle()
    } catch (error) {
      toast.error('Não foi possível criar o serviço')
    }
  }

  return (
    <SheetContent className="min-w-[80%] max-w-[1400px] min-h-full flex flex-col overflow-y-scroll">
      <form onSubmit={handleSubmit(handleSaveWork)} >
        <h3>
          <strong>Dados do serviço</strong>
        </h3>
        <div className="grid grid-cols-6 gap-4 py-4">
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="customer_id">Cliente</Label>
            <Controller
              name="customer_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={String(customer.id)}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="customer_address_id">Endereço</Label>
            <Controller
              name="address_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={!customer_id} >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.find(c => c.id === customer_id)?.adresses?.map(address => (
                      <SelectItem key={address.id} value={String(address.id)}>
                        {`${address.CEP} - ${address.street} ${address?.number} - ${address?.city}, ${address?.state}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="driver_id">Motorista</Label>
            <Controller
              name="driver_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map(driver => (
                      <SelectItem key={driver.id} value={String(driver.id)}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="driver_id">Caminhão</Label>
            <Controller
              name="truck_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {trucks.map(truck => (
                      <SelectItem key={truck.id} value={String(truck.id)}>
                        {truck.plate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="quantity" >Quantidade</Label>
            <Input id="quantity" type="number" {...register('quantity')} />
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
