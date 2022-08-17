import React from 'react'
import { ITruck } from 'interfaces'
import { Pagination } from './shared/Pagination'
import { getComparator, stableSort } from './shared/helpers'
import { HeadCell, Order } from './shared/interfaces'
import { EnhancedTableHead } from './shared/TableHead'
import { useStyles } from './shared/styles'
import { EnhancedTableToolbar } from './shared/TableToolBar'
import { deleteTruck, setCurrentTruck } from 'store/truck/truck.actions'
import { useDispatch } from 'react-redux'

import { 
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Box,
} from '@material-ui/core'
import { EmptyMessage } from './shared/EmptyMessage'

interface TableProps {
  trucks: ITruck[]
}

interface Data {
  id: string
  plate: string
  equipment: string
}

const headCells: HeadCell[] = [
  { id: 'plate', numeric: false, disablePadding: true, label: 'Placa' },
  { id: 'equipment', numeric: false, disablePadding: false, label: 'Equipamento' },
]

const Table: React.FC<TableProps> = ({ trucks }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('plate')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [currentSelected, setCurrentSelected] = React.useState<string>('')

  const dispatch = useDispatch()

  if (!trucks.length) {
    return <EmptyMessage tableName='caminhões' />
  }

  function createData(
    id: string,
    plate: string,
    equipment: string
  ): Data {
    return { id, plate, equipment }
  }
  
  const rows = trucks.map(truck => createData(
    truck.id,
    truck.plate,
    truck?.type?.name || ''
  ))

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

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        
        <EnhancedTableToolbar 
          path='trucks'
          title='Caminhões'
          numSelected={selected.length}
          currentSelected={currentSelected}
          selected={selected}
          setSelected={setSelected}
          onDelete={id => dispatch(deleteTruck(id))}
          onAccess={truck => dispatch(setCurrentTruck(truck))}
        />
        
        <TableContainer>
          <MuiTable
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              headCells={headCells}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

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
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.plate}
                      </TableCell>
                      <TableCell align="left">{row.equipment}</TableCell>
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