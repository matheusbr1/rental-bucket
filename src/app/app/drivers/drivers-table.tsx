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
import { DriverDetails } from "./driver-details";
import { Driver } from "@/app/api/get-drivers";
import { findFilledContact } from "@/app/helpers/find-filled-contact";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/lib/react-query";
import { deleteDriver } from "@/app/api/delete-driver";
import { toast } from "sonner";
import { copyToClipboard } from "@/app/helpers/copy-to-clipboard";
import { LIMIT_ITEMS_ON_RESPONSE } from "@/app/api/shared/configs";

interface Props {
  isLoading: boolean
  drivers?: Driver[]
  page: number
  total: number
  onPaginate(page: number): void
}

export function DriversTable({ drivers = [], isLoading, page, total, onPaginate }: Props) {
  const [openId, setOpenId] = useState('')

  const { mutateAsync, isPending: isDeleting } = useMutation({
    mutationFn: deleteDriver,
    onSuccess: () => {
      toast.success('Motorista deletado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['drivers']
      })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o motorista!')
    }
  })

  return (
    <div className="w-full p-4 flex flex-col justify-between h-full" >
      <Table className="mb-4" >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]" ></TableHead>
            <TableHead>Motorista</TableHead>
            <TableHead>Contato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoading) && <TableSkeleton columns={2} />}
          {!(isLoading) && drivers.map(driver => (
            <TableRow key={driver.id}>
              <TableCell>
                <Sheet open={driver.id === openId} onOpenChange={() => setOpenId('')} >
                  <DriverDetails driver={driver} toggle={() => setOpenId('')} />
                  <Button variant='outline' size='xs' onClick={() => setOpenId(driver.id)} >
                    <Search className="h-3 w-3" />
                    <span className="sr-only" >Detalhes do motorista</span>
                  </Button>
                </Sheet>
              </TableCell>
              <TableCell>{driver.name}</TableCell>
              <TableCell>
                {findFilledContact(driver.contacts)}
                <Button variant='ghost' size='xs' className="ml-2" onClick={async () => {
                  copyToClipboard(findFilledContact(driver.contacts))
                }} >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only" >Copiar Contato</span>
                </Button>
              </TableCell>
              <TableCell>
                <Button variant='outline' size='xs' disabled={isDeleting} >
                  <Trash className="h-3 w-3" onClick={() => mutateAsync(driver.id)} />
                  <span className="sr-only" >Deletar Motorista</span>
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