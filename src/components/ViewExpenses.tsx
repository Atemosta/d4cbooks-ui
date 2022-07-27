import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from "../styles/ViewExpenses.css";

// Dialog Import
import ViewExpenseDetails from './ViewExpenseDetails'

interface Column {
  id: 'id' | 'name' | 'price' | 'expense_type' | 'purchase_source' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 170 },
  {
    id: 'expense_type',
    label: 'Expense Type',
    minWidth: 170,
  },
  {
    id: 'purchase_source',
    label: 'Purchase Source',
    minWidth: 170,
  },
];

interface Data {
  id: string;
  name: string;
  price: string;
  expense_type: string;
  purchase_source: string;
}

function createData(
  id: string,
  name: string,
  price: string,
  expense_type: string,
  purchase_source: string,
): Data {
  return {
    id,
    name,
    price,
    expense_type,
    purchase_source,
  };
}


const ViewExpenses = ({data, setData}) => {
  // Table State
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = convertDataToRows(data);

  // Dialog State
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState('');

  function convertDataToRows(data) {
    const rows = [];
    for (const expense of data) {
      rows.push(
        createData(
          expense.id,
          expense.name,
          expense.price,
          expense.expense_type,
          expense.purchase_source,
        )
      )
    }
    return rows;
  }

  const handleClick = (row) => {
    console.log("Ohaiyooo");
    console.log(row)
    setDialog(row);
    setOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <header className={styles.header_list}>
        <h1 style={{ textAlign: 'center' }}>🧾 List of Expenses</h1>
      </header>
      <center>
      <Paper sx={{ width: '95%', overflow: 'hidden'}}>
        <TableContainer sx={{ maxHeight: 800}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => handleClick(row)}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </center>
      {/* Dialog Component */}
      { open && <ViewExpenseDetails data={dialog} setData={setData} open={open} setOpen={setOpen} /> }
    </div>
  );
}

export default ViewExpenses;