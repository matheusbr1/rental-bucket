import React from 'react'
import {  TablePagination } from '@material-ui/core'

interface PaginationProps {
  rows: unknown[]
  page: number
  setPage: (newPage: number) => void
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ 
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage
 }) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage='Quantidade por Página'
      page={page}
      onPageChange={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

export { Pagination }