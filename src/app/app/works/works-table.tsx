'use client'
import { Pagination } from "@/app/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TableSkeleton } from "@/app/components/table-skeleton";
import { Work } from "@/app/api/get-works";
import { LIMIT_ITEMS_ON_RESPONSE } from "@/app/api/shared/configs";
import { api } from "@/app/lib/axios";
import { queryClient } from "@/app/lib/react-query";
import { toast } from "sonner";
import { WorkRow } from "./work-row";

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
  async function handleRemoveBucket(work_id: string, quantity: number) {
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
            <WorkRow
              key={work.id}
              work={work}
              onCancel={handleCancelWork}
              onPlace={handlePlaceBucket}
              onRemove={handleRemoveBucket}
            />
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