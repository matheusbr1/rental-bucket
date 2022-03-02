import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import OpenIcon from '@material-ui/icons/Launch'
import { useHistory } from 'react-router'
import { IWork } from 'interfaces'
import { 
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Box,
  TablePagination
} from '@material-ui/core'

interface TableProps {
  title: string
  works: IWork[]
}

interface Data {
  id: number
  type: string
  equipment: string
  quantity: number
  customer: string
  deadline: string
  status: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  { id: 'customer', numeric: false, disablePadding: true, label: 'Cliente' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Tipo' },
  { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantidade' },
  { id: 'equipment', numeric: false, disablePadding: false, label: 'Equipamento' },
  { id: 'deadline', numeric: false, disablePadding: false, label: 'Retirada' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Situação' },
]

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
      fontWeight: 500
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: '25px 0',
    },
    paper: {
      width: '100%',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
)

const Table: React.FC<TableProps> = ({ title, works }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('type')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  function createData(
    id: number,
    customer: string,
    type: string,
    quantity: number,
    equipment: string,
    deadline: string,
    status: string,
  ): Data {
    return { id, customer, type, quantity, equipment, deadline, status }
  }
  
  const rows = works.map(work => createData(
    work.id,
    work.customer, 
    work.type, 
    work.quantity,
    work.equipment, 
    work.endDate.toDateString(), 
    'Pendente'
  ))

  const [selectedList, setSelectedList] = useState<number[]>([])
  const [currentSeleted, setCurrentSelected] = useState<number>()

  const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles()
    const { numSelected } = props;

    const history = useHistory()
  
    const handleEdit = useCallback(() => {
      history.push(`/work/${currentSeleted}`)
    }, [history])
  
    const handleOpen = useCallback(() => {
      history.push(`/work/${currentSeleted}`)
    }, [history])

    const handleDelete = useCallback(() => {
      console.log('Deletar: ', selectedList)
    },[])
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography 
            className={classes.title} 
            color="inherit" 
            variant="subtitle1" 
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography 
            className={classes.title} 
            variant="h3"
            id="tableTitle" 
          >
            {title}
          </Typography>
        )}
        {numSelected === 1 && (
          <Tooltip title="Abrir">
            <IconButton onClick={handleOpen} >
              <OpenIcon />
            </IconButton>
          </Tooltip>
        )}
        {numSelected === 1 && (
          <Tooltip title="Editar">
            <IconButton onClick={handleEdit} >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {numSelected > 0 && (
          <Tooltip title="Deletar">
            <IconButton onClick={handleDelete} >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    )
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.customer)
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
      const isSelected = otherSelecteds.filter(serviceID => serviceID === id)[0]

      if (isSelected) {
        return otherSelecteds.filter(serviceID => serviceID !== id)
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <MaterialTable
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
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.customer);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.customer, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.customer}
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
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MaterialTable>
        </TableContainer>
        
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
      </Paper>
    </Box>
  )
}

export default Table