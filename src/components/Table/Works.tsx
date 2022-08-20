import React, { useState } from 'react'
import { IWork } from 'interfaces'
import { Pagination } from './shared/Pagination'
import { getComparator, stableSort } from './shared/helpers'
import { useStyles } from './shared/styles'
import { HeadCell, Order } from './shared/interfaces'
import { EnhancedTableToolbar } from './shared/TableToolBar'
import { EnhancedTableHead } from './shared/TableHead'
import { useDispatch } from 'react-redux'
import { deleteWork, setCurrentWork } from 'store/work/work.actions'
import { EmptyMessage } from './shared/EmptyMessage'
import DoneIcon from '@material-ui/icons/Done';
import WaitingIcon from '@material-ui/icons/AccessTime';

import { 
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Chip,
} from '@material-ui/core'

interface TableProps {
  works: IWork[]
}

type Status = 'Pendente' | 'Concluído'

interface Data {
  id: string
  type: string
  equipment: string
  quantity: number
  customer: string
  deadline: string
  status: Status
}

const headCells: HeadCell[] = [
  { id: 'customer', numeric: false, disablePadding: true, label: 'Cliente' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Tipo' },
  { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantidade' },
  { id: 'equipment', numeric: false, disablePadding: false, label: 'Equipamento' },
  { id: 'deadline', numeric: false, disablePadding: false, label: 'Retirada' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Situação' },
]

const Table: React.FC<TableProps> = ({ works }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('type')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [currentSelected, setCurrentSelected] = useState<string>('')

  const dispatch = useDispatch()
  
  if (!works.length) {
    return <EmptyMessage tableName='serviços' />
  }

  function createData(
    id: string,
    customer: string,
    type: string,
    quantity: number,
    equipment: string,
    deadline: string,   
    status: Status,
  ): Data {
    return { id, customer, type, quantity, equipment, deadline, status }
  }
  
  const rows = works.map(work => {
    const customerName = work.customer.person_type === 'F'
      ? work.customer.name
      : work.customer.fantasy_name

    const endDate = new Date(work.end_date)

    // I can create a new status "Em Atraso" based on the date
    const status = work.is_done ? 'Concluído' : 'Pendente'

    return createData(
      work.id,
      customerName as string, 
      work.work_type.name,
      work.quantity,
      work.equipment.name,
      endDate.toDateString(),
      status
    )
  })

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    setCurrentSelected(id)

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  function renderStatus (status: Status) {
    switch (status) {
      case 'Pendente':
        return (
          <Chip
            variant="outlined"
            icon={<WaitingIcon />}
            color='secondary'
            label={status}
          />
        )
      case 'Concluído':
        return  (
          <Chip
            variant="outlined"
            icon={<DoneIcon />}
            color='primary'
            label={status}
          />
        )
      default:
        return (
          <Chip
            variant="outlined"
            icon={<WaitingIcon />}
            color='secondary'
            label={status}
          />
        ) 
    }
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          path='works'
          title='Serviços'
          numSelected={selected.length}
          currentSelected={currentSelected}
          selected={selected}
          setSelected={setSelected}
          onDelete={id => dispatch(deleteWork(id))}
          onAccess={work => dispatch(setCurrentWork(work))}
        />

        <TableContainer>
          <MuiTable
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = isSelected(row.id);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.customer}
                      </TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">{row.equipment}</TableCell>
                      <TableCell align="left">{row.deadline}</TableCell>
                      <TableCell align="left">{renderStatus(row.status)}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        
        <Pagination 
          page={page}
          rows={rows}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default Table