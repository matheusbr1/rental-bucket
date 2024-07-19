'use client'

import { Button } from '@/components/ui/button';
import { CustomersEmpty } from './customers-empty';
import { CustomersTable } from './customers-table';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@/app/api/get-customers';
import { useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { CustomerDetails } from './customer-details';

export default function Customers() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(open => !open)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const { data: customers = [], isFetching } = useQuery({
    queryKey: ['customers', page],
    queryFn: async () => {
      const res = await getCustomers(page)
      setTotal(res.data.total)
      return res.data.customers
    }
  })
  const hasCustomers = Boolean(isFetching || customers.length)
  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <h1 className="text-lg font-semibold md:text-xl">Clientes</h1>
        <Sheet open={open} onOpenChange={toggle} >
          <Button onClick={toggle} >Adicionar Cliente</Button>
          <CustomerDetails toggle={toggle} />
        </Sheet>
      </div>
      <div
        x-chunk="dashboard-02-chunk-1"
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        {!hasCustomers && <CustomersEmpty />}
        {!!hasCustomers &&
          <CustomersTable
            customers={customers}
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
