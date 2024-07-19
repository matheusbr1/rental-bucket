'use client'

import { Button } from '@/components/ui/button';
import { TrucksEmpty } from './trucks-empty';
import { TrucksTable } from './trucks-table';
import { useQuery } from '@tanstack/react-query';
import { getTrucks } from '@/app/api/get-trucks';
import { useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { TruckDetails } from './truck-details';

export default function Trucks() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(open => !open)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const { data: trucks = [], isFetching } = useQuery({
    queryKey: ['trucks'],
    queryFn: async () => {
      const res = await getTrucks(page)
      setTotal(res.data.total)
      return res.data.trucks
    }
  })
  const hasTrucks = Boolean(isFetching || trucks)
  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <h1 className="text-lg font-semibold md:text-xl">Caminhões</h1>
        <Sheet open={open} onOpenChange={toggle} >
          <Button onClick={toggle} > Adicionar Caminhão </Button>
          <TruckDetails toggle={toggle} />
        </Sheet>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" >
        {!hasTrucks && <TrucksEmpty />}
        {!!hasTrucks &&
          <TrucksTable
            trucks={trucks}
            isLoading={isFetching}
            page={page}
            total={total}
            onPaginate={setPage}
          />
        }
      </div>
    </>
  );
}
