'use client'

import { Button } from '@/components/ui/button';
import { DriversEmpty } from './drivers-empty';
import { DriversTable } from './drivers-table';
import { useQuery } from '@tanstack/react-query';
import { driverAdapter, getDrivers } from '@/app/api/get-drivers';
import { Sheet } from "@/components/ui/sheet";
import { DriverDetails } from './driver-details';
import { useState } from 'react';

export default function Drivers() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(open => !open)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const { data: drivers = [], isFetching } = useQuery({
    queryKey: ['drivers', page],
    queryFn: async () => {
      const res = await getDrivers(page)
      setTotal(res.data.total)
      return res.data.drivers.map(driverAdapter)
    }
  })
  const hasDrivers = Boolean(isFetching || drivers.length)
  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <h1 className="text-lg font-semibold md:text-xl">Motoristas</h1>
        <Sheet open={open} onOpenChange={toggle} >
          <Button onClick={toggle} > Adicionar Motorista </Button>
          <DriverDetails toggle={toggle} />
        </Sheet>
      </div>
      <div className="flex flex-1 items-center justify-between rounded-lg border border-dashed shadow-sm">
        {!hasDrivers && <DriversEmpty />}
        {hasDrivers &&
          <DriversTable
            drivers={drivers}
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
