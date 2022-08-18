import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Dialog Import
import ViewExpenseDetails from './ViewExpenseDetails'

const columns = [
  { id: 'id', label: 'Expense Id', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 170 },
  { id: 'expense_type', label: 'Expense Type', minWidth: 170 },
  { id: 'purchase_source', label: 'Purchase Source', minWidth: 170 },
];

function createData(id, name, price, expense_type, purchase_source) {
  return { id, name, price, expense_type, purchase_source };
}

const ViewExpenses = ({address, data, setData}) => {
  // Table State
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = convertDataToRows(data);
  
  // Dialog State
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState('');
  const [rowId, setRowId] = React.useState(null);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (index) => {
    setRowId(index);
    setDialog(data[index]);
    setOpen(true);
  };

  return (
    <div>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                <h1 style={{ textAlign: 'center' }}>🧾 List of Expenses</h1>
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={`Row: ${index}`} onClick={() => handleClick(index)}>
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
      {/* Dialog Component */}
      { open && <ViewExpenseDetails address={address} expenseOld={dialog} index={rowId} data={data} setData={setData} open={open} setOpen={setOpen}/> }
    </div>
  );
}

export default ViewExpenses;