'use client'

import { Button } from '@/components/ui/button';
import { WorksEmpty } from './works-empty';
import { WorksTable } from './works-table';
import { useState } from 'react';
import { getWorks } from '@/app/api/get-works';
import { useQuery } from '@tanstack/react-query';
import { WorkDetails } from './work-details';
import { Sheet } from '@/components/ui/sheet';

export default function Works() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(open => !open)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const { data: works = [], isFetching } = useQuery({
    queryKey: ['works', page],
    queryFn: async () => {
      const res = await getWorks(page)
      setTotal(res.data.total)
      return res.data.works.sort()
    }
  })
  const hasWorks = Boolean(isFetching || works.length)
  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <h1 className="text-md font-semibold md:text-xl">Serviços</h1>
        <Sheet open={open} onOpenChange={toggle} >
          <Button onClick={toggle} > Adicionar Serviço </Button>
          <WorkDetails toggle={toggle} />
        </Sheet>
      </div>
      <div
        x-chunk="dashboard-02-chunk-1"
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        {!hasWorks && <WorksEmpty />}
        {hasWorks &&
          <WorksTable
            works={works}
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
