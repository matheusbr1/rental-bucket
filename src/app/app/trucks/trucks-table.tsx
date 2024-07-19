import { Pagination } from "@/app/components/pagination";
import { TableSkeleton } from "@/app/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Copy, Trash } from "lucide-react";
import { TruckDetails } from "./truck-details";
import { Truck } from "@/app/api/get-trucks";
import { copyToClipboard } from "@/app/helpers/copy-to-clipboard";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteTruck } from "@/app/api/delete-truck";
import { queryClient } from "@/app/lib/react-query";
import { LIMIT_ITEMS_ON_RESPONSE } from "@/app/api/shared/configs";

interface Props {
  isLoading: boolean
  trucks?: Truck[]
  page: number
  total: number
  onPaginate(page: number): void
}

export function TrucksTable({ trucks = [], isLoading, page, total, onPaginate }: Props) {
  const [openId, setOpenId] = useState('')

  const { mutateAsync, isPending: isDeleting } = useMutation({
    mutationFn: deleteTruck,
    onSuccess: () => {
      toast.success('Caminhão deletado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['trucks']
      })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o caminhão!')
    }
  })

  return (
    <div className="w-full p-4 flex flex-col justify-between h-full" >
      <Table className="mb-4" >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]" ></TableHead>
            <TableHead>Placa</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Renavam</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableSkeleton columns={4} />}
          {!isLoading && trucks.map(truck => (
            <TableRow key={truck.id} >
              <TableCell>
                <Sheet open={truck.id === openId} onOpenChange={() => setOpenId('')} >
                  <TruckDetails truck={truck} toggle={() => setOpenId('')} />
                  <Button variant='outline' size='xs' onClick={() => setOpenId(truck.id)} >
                    <Search className="h-3 w-3" />
                    <span className="sr-only" >Detalhes do caminhão</span>
                  </Button>
                </Sheet>
              </TableCell>
              <TableCell>
                {truck.plate}
                <Button variant='ghost' size='xs' className="ml-2" onClick={async () => {
                  await copyToClipboard(truck.plate)
                }} >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only" >Copiar Placa</span>
                </Button>
              </TableCell>
              <TableCell>
                {truck.model_year}/{truck.manufacture_year}
                <Button variant='ghost' size='xs' className="ml-2" onClick={async () => {
                  await copyToClipboard(`${truck.model_year}/${truck.manufacture_year}`)
                }} >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only" >Copiar Ano</span>
                </Button>
              </TableCell>
              <TableCell>
                {truck.renavam}
                <Button variant='ghost' size='xs' className="ml-2" onClick={async () => {
                  await copyToClipboard(String(truck.renavam))
                }}>
                  <Copy className="h-3 w-3" />
                  <span className="sr-only" >Copiar Renavam</span>
                </Button>
              </TableCell>
              <TableCell>
                <Button variant='outline' size='xs' disabled={isDeleting} >
                  <Trash className="h-3 w-3" onClick={() => mutateAsync(truck.id)} />
                  <span className="sr-only" >Deletar Caminhão</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {(total > LIMIT_ITEMS_ON_RESPONSE) && (
        <Pagination
          pageIndex={page - 1}
          totalCount={total}
          perPage={LIMIT_ITEMS_ON_RESPONSE}
          onPageChange={(pageIndex) => onPaginate(pageIndex + 1)}
        />
      )}
    </div>
  )
}