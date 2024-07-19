'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TableCell,
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
import { Work } from "@/app/api/get-works";

interface Props {
  work: Work
  onPlace: (id: string) => Promise<void>
  onRemove: (id: string, quantity: number) => Promise<void>
  onCancel: (id: string) => Promise<void>
}

export function WorkRow({ work, onCancel, onPlace, onRemove }: Props) {
  const [quantity, setQuantity] = useState<number>(Number(work.quantity))
  return (
    <TableRow key={work.id} >
      <TableCell className="font-medium">
        <WorkStatus status={work.status} />
      </TableCell>
      <TableCell>{work.customer.name}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={quantity}
          onChange={e => setQuantity(Number(e.currentTarget.value))}
          max={Number(work.quantity)}
          min={1}
          disabled={
            work.status === 'canceled' ||
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
            onClick={() => onPlace(work.id!)}
            className="w-full"
          >
            <ArrowRight className="h-3 w-3 mr-2" />
            Colocar
          </Button>
        )}
        {
          (
            work.status === 'placed' ||
            work.status === 'partial-removed'
          ) && (
            <Button
              variant='outline'
              size='xs'
              disabled={false}
              onClick={() => onRemove(work.id!, quantity)}
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
              } onClick={() => onCancel(work.id!)} >
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
  )
}