import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

export default function StickyHeadTable(props) {
  const title = props.title
  const columns = ["DateTime", "Symptons"]
  const rows = props.records

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#4CAF50",
      color: theme.palette.common.white,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "1.15rem",
    },
  }))(TableCell);

  // Table Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper style={{
      maxWidth: "90%",
      margin: "auto",
    }}>
      <h2>{title}</h2>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell
                key={"header-"+index}
              >
                {column}
              </StyledTableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={"record-"+row.id}>
                  <TableCell>
                    {row.datetime}
                  </TableCell>
                  <TableCell>
                    {row.sympton}
                  </TableCell>
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
