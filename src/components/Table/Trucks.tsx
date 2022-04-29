import React from 'react'
import { ITruck } from 'interfaces'
import { Pagination } from './shared/Pagination'
import { getComparator, stableSort } from './shared/helpers'
import { HeadCell, Order } from './shared/interfaces'
import { EnhancedTableHead } from './shared/TableHead'
import { useStyles } from './shared/styles'
import { EnhancedTableToolbar } from './shared/TableToolBar'

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

interface TableProps {
  title: string
  trucks: ITruck[]
}

interface Data {
  id: number
  plate: string
  equipment: string
}

const headCells: HeadCell[] = [
  { id: 'plate', numeric: false, disablePadding: true, label: 'Placa' },
  { id: 'equipment', numeric: false, disablePadding: false, label: 'Equipamento' },
]

const Table: React.FC<TableProps> = ({ title, trucks }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('plate')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [currentSelected, setCurrentSelected] = React.useState<number>()

  function createData(
    id: number,
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
      const newSelecteds = rows.map((n) => n.plate)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string, id: number) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []

    setCurrentSelected(id)

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        
        <EnhancedTableToolbar 
          path='trucks'
          title={title}
          numSelected={selected.length}
          currentSelected={currentSelected as any}
          selected={selected as  any}
          setSelected={setSelected}
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
                  const isItemSelected = isSelected(row.plate);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.plate, row.id)}
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