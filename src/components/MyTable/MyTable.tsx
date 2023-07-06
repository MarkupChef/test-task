import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableHead } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { FC, useState } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { DataItem, removeDataItem } from '../../store/commonSlice';
import PopupForm from '../PopupForm';
import TablePaginationActions from './TablePaginationActions';

interface CustomPaginationActionsTableProps {
  currentCategoryId: number;
  searchTerm?: string;
}

interface EditItem {
  id: number;
  categoryId: number;
  name: string;
  text: string;
}

const CustomPaginationActionsTable: FC<CustomPaginationActionsTableProps> = ({ currentCategoryId, searchTerm }) => {
  const dispatch = useAppDispatch();
  const { dataList } = useAppSelector((state) => state.common);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<null | EditItem>(null);

  let rows: DataItem[] = [];
  let emptyRows = 0;

  if (dataList) {
    rows = currentCategoryId > 0 ? dataList.filter((item) => item.categoryId === currentCategoryId) : dataList;

    if (searchTerm) {
      rows = rows.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (page > 0) {
      emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditItem(null);
    setOpen(false);
  };

  const handleEdit = (id: number, categoryId: number, name: string, text: string) => {
    setEditItem({
      id,
      categoryId,
      name,
      text,
    });
    setOpen(true);
  };

  const handleRemove = (id: number) => {
    if (emptyRows + 1 === rowsPerPage) {
      setPage(0);
    }
    dispatch(removeDataItem({ id }));
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span className={'font-black'}>Category</span>
              </TableCell>
              <TableCell align="right">
                <span className={'font-black'}>Name</span>
              </TableCell>
              <TableCell align="right">
                <span className={'font-black'}>Text</span>
              </TableCell>
              <TableCell align="right">
                <span className={'font-black'}>Actions</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              (rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                (row, index) => (
                  <TableRow key={`${row.name}-${index}`}>
                    <TableCell component="th" scope="row">
                      {row.category}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.text}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleEdit(row.id, row.categoryId, row.name, row.text)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleRemove(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <footer className={'mt-8'}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add
        </Button>
        <PopupForm
          open={open}
          handleClose={handleClose}
          id={editItem?.id}
          categoryId={editItem?.categoryId}
          name={editItem?.name}
          text={editItem?.text}
        />
      </footer>
    </>
  );
};

export default CustomPaginationActionsTable;
