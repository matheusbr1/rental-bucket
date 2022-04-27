import React, { useState } from 'react'
import { IDriver } from 'interfaces'
import { Pagination } from './shared/Pagination'
import { EnhancedTableToolbar } from './shared/TableToolBar'
import { getComparator, stableSort } from './shared/helpers'
import { useStyles } from './shared/styles'
import { HeadCell, Order } from './shared/interfaces'
import { EnhancedTableHead } from './shared/TableHead'

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
  drivers: IDriver[]
}

interface Data {
  id: number
  name: string
  contact: string
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'contact', numeric: false, disablePadding: false, label: 'Contato' },
]

const Table: React.FC<TableProps> = ({ title, drivers }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [selectedList, setSelectedList] = useState<number[]>([])
  const [currentSelected, setCurrentSelected] = useState<number>()

  function createData(
    id: number | any,
    name: string,
    contact: string,
  ): Data {
    return { id, name, contact }
  }
  
  const rows = drivers.map(driver => createData(
    driver?.id,
    driver.name, 
    driver.contacts[0]?.contact
  ))

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string, id: number) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []

    setCurrentSelected(id)

    setSelectedList((otherSelecteds: number[]) => {
      const isSelected = otherSelecteds.filter(driverID => driverID === id)[0]

      if (isSelected) {
        return otherSelecteds.filter(driverID => driverID !== id)
      } else {
        return [
          ...otherSelecteds,
          id
        ]
      }
    })    

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
          path='drivers'
          title={title}
          numSelected={selected.length}
          currentSelected={currentSelected}
          selectedList={selectedList}
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
                .map(row => {
                  const isItemSelected = isSelected(row.name);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th"  scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.contact}</TableCell>
                    </TableRow>
                  )
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