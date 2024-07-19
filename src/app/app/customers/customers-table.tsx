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
import { CustomerDetails } from "./customer-details";
import { Customer } from "@/app/api/get-customers";
import { copyToClipboard } from "@/app/helpers/copy-to-clipboard";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteCustomer } from "@/app/api/delete-customer";
import { toast } from "sonner";
import { queryClient } from "@/app/lib/react-query";
import { LIMIT_ITEMS_ON_RESPONSE } from "@/app/api/shared/configs";

interface Props {
  isLoading: boolean
  customers?: Customer[]
  page: number
  total: number
  onPaginate(page: number): void
}

export function CustomersTable({ customers, isLoading, page, total, onPaginate }: Props) {
  const [openId, setOpenId] = useState('')

  const { mutateAsync, isPending: isDeleting } = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      toast.success('Cliente deletado com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['customers']
      })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o cliente!')
    }
  })

  return (
    <div className="w-full p-4 flex flex-col justify-between h-full" >
      <Table className="mb-4" >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]" ></TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Contato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableSkeleton rows={5} columns={2} />}
          {!isLoading && customers?.map(customer => (
            <TableRow key={customer.id} >
              <TableCell>
                <Sheet open={customer.id === openId} onOpenChange={() => setOpenId('')} >
                  <CustomerDetails customer={customer} toggle={() => setOpenId('')} />
                  <Button variant='outline' size='xs' onClick={() => setOpenId(customer.id!)}>
                    <Search className="h-3 w-3" />
                    <span className="sr-only" >Detalhes do cliente</span>
                  </Button>
                </Sheet>
              </TableCell>
              <TableCell>{findName(customer)}</TableCell>
              <TableCell>
                {findContact(customer)}
                <Button variant='ghost' size='xs' className="ml-2" onClick={async () => {
                  copyToClipboard(findContact(customer))
                }} >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only" >Copiar Contato</span>
                </Button>
              </TableCell>
              <TableCell>
                <Button variant='outline' size='xs' disabled={isDeleting} >
                  <Trash className="h-3 w-3" onClick={() => mutateAsync(customer.id!)} />
                  <span className="sr-only" >Deletar Cliente</span>
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

function findName(customer: Customer) {
  if (customer.person_type === 'J') {
    return customer?.fantasy_name
  }
  return customer.name
}

function findContact(customer: Customer) {
  if (customer.contacts.length) {
    return customer.contacts[0].contact
  }
  return ''
}