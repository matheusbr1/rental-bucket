import { Truck } from "@/app/api/get-trucks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet"
import { Controller, useForm } from "react-hook-form"
import { truckFactory } from "./truck-factory"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { queryClient } from "@/app/lib/react-query"
import { createTruck } from "@/app/api/create-truck"
import { updateTruck } from "@/app/api/update-truck"

interface Props {
  truck?: Truck
  toggle(): void
}

export function TruckDetails({ truck, toggle }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
    reset,
    setValue
  } = useForm({
    defaultValues: truck ?? truckFactory()
  })

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await axios.get<{
        codigo: string
        nome: string
      }[]>('https://parallelum.com.br/fipe/api/v1/caminhoes/marcas')
      const brands = data.map(({ codigo, nome }) => ({
        id: codigo,
        name: nome
      }))
      return brands
    }
  })

  const brand_id = watch('brand_id')

  const { data: models = [] } = useQuery({
    queryKey: ['models', brand_id],
    queryFn: async () => {
      if (!brand_id) return []
      const { data } = await axios.get<{
        modelos: {
          codigo: string
          nome: string
        }[]
      }>(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brand_id}/modelos`)
      const models = data.modelos.map(({ codigo, nome }) => ({
        id: codigo,
        name: nome
      }))
      if (truck?.model_id) {
        const model = models.find(m => Number(m.id) === Number(truck.model_id))
        setValue('model_id', model?.name ?? '')
      }
      return models
    },
    enabled: !!brand_id,
  })

  const { mutateAsync: saveTruck } = useMutation({
    mutationFn: truck ? updateTruck : createTruck
  })

  async function handleSaveTruck(truck: Truck) {
    try {
      const model_id = models.find(m => m.name === truck.model_id)?.id
      const data = {
        ...truck,
        model_id: String(model_id)
      }
      await saveTruck(data)
      queryClient.invalidateQueries({
        queryKey: ['trucks']
      })
      toast.success('Caminhão salvo com sucesso.')
      reset()
      toggle()
    } catch (error) {
      const axiosError = error as AxiosError<{ context: string }, any>
      if (axiosError.response?.data.context === 'plan') {
        toast.error('Limite de caminhões atingido! Para cadastrar mais caminhões atualize para o premium.')
      } else {
        toast.error('Ocorreu um erro ao salvar o caminhão.')
      }
      console.error(error)
    }
  }

  return (
    <SheetContent className="min-w-[80%] max-w-[1400px] min-h-full flex flex-col overflow-y-scroll">
      <form onSubmit={handleSubmit(handleSaveTruck)}>
        <h3>
          <strong>Dados do caminhão</strong>
        </h3>
        <div className="grid grid-cols-12 gap-4 py-4">
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="plate">Placa</Label>
            <Input id="plate" {...register('plate')} />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="brand_id">Marca</Label>
            <Controller
              name="brand_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-4">
            <Label htmlFor="model_id">Modelo</Label>
            <Controller
              name="model_id"
              control={control}
              disabled={!models.length && !brand_id}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map(model => (
                      <SelectItem key={model.id} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 col-span-1">
            <Label htmlFor="manufacture_year" >Ano Fab</Label>
            <Input id="manufacture_year" {...register('manufacture_year')} />
          </div>
          <div className="flex flex-col gap-2 col-span-1">
            <Label htmlFor="model_year" >Ano Mod</Label>
            <Input id="model_year" {...register('model_year')} />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="renavam" >Renavam</Label>
            <Input id="renavam" {...register('renavam')} />
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
