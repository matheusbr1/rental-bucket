'use client'
import { Pagination } from "@/app/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRight, SendHorizonal, X } from "lucide-react";
import { WorkStatus } from "./work-status";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/app/components/table-skeleton";
import { Work } from "@/app/api/get-works";
import { LIMIT_ITEMS_ON_RESPONSE } from "@/app/api/shared/configs";
import { api } from "@/app/lib/axios";
import { queryClient } from "@/app/lib/react-query";
import { toast } from "sonner";

interface Props {
  isLoading: boolean
  works?: Work[]
  page: number
  total: number
  onPaginate(page: number): void
}

export function WorksTable({ works = [], isLoading, page, total, onPaginate }: Props) {
  async function handlePlaceBucket(work_id: string) {
    try {
      await api.post(`works/place-bucket/${work_id}`)
      queryClient.invalidateQueries({
        queryKey: ['works', page]
      })
    } catch (error) {
      toast.error('Erro ao atualizar o serviço')
    }
  }
  async function handleRemoveBucket(work_id: string, quantity: string) {
    try {
      await api.post(`works/remove-bucket/${work_id}`, null, {
        params: {
          quantity
        }
      })
      queryClient.invalidateQueries({
        queryKey: ['works', page]
      })
    } catch (error) {
      toast.error('Erro ao atualizar o serviço')
    }
  }
  async function handleCancelWork(work_id: string) {
    try {
      await api.post(`works/cancel/${work_id}`)
      queryClient.invalidateQueries({
        queryKey: ['works', page]
      })
    } catch (error) {
      toast.error('Erro ao atualizar o serviço')
    }
  }

  return (
    <div className="w-full p-4 flex flex-col justify-between h-full" >
      <Table className="mb-4" >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]" >Situação</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="w-[86px]">Quant.</TableHead>
            <TableHead className="w-[120px]">Equipamento</TableHead>
            <TableHead className="w-[86px]" ></TableHead>
            <TableHead className="w-[48px]" ></TableHead>
            <TableHead className="w-[48px]" ></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableSkeleton columns={7} hasSearchColumn={false} />}
          {!isLoading && works.map(work => (
            <TableRow key={work.id} >
              <TableCell className="font-medium">
                <WorkStatus status={work.status} />
              </TableCell>
              <TableCell>{work.customer.name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  defaultValue={Number(work.quantity)}
                  max={Number(work.quantity)}
                  min={1}
                  disabled={
                    work.status === 'canceled' ||
                    work.status === 'partial-removed' ||
                    work.status === 'removed' ||
                    work.status === 'pending'
                  }
                />
              </TableCell>
              <TableCell>{work.equipment.name}</TableCell>
              <TableCell>
                {work.status === 'pending' && (
                  <Button
                    variant='outline'
                    size='xs'
                    disabled={false}
                    onClick={() => handlePlaceBucket(work.id!)}
                    className="w-full"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Colocar
                  </Button>
                )}
                {work.status === 'placed' && (
                  <Button
                    variant='outline'
                    size='xs'
                    disabled={false}
                    onClick={() => handleRemoveBucket(work.id!, work.quantity)}
                    className="w-full"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Retirar
                  </Button>
                )}
              </TableCell>
              <TableCell className="text-center" >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild >
                      <Button variant='outline' size='xs' disabled={
                        work.status === 'canceled' ||
                        work.status === 'partial-removed' ||
                        work.status === 'removed'
                      } >
                        <SendHorizonal className="h-3 w-3 text-[#25D366]" />
                        <span className="sr-only" >Enviar por whatsapp</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enviar para o motorista</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-center" >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild >
                      <Button variant='outline' size='xs' disabled={
                        work.status === 'canceled' ||
                        work.status === 'partial-removed' ||
                        work.status === 'removed'
                      } onClick={() => handleCancelWork(work.id!)} >
                        <X className="h-3 w-3" />
                        <span className="sr-only" >Cancelar Serviço</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cancelar Serviço</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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