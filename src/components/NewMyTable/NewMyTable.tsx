import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { DataItem, removeDataItem } from '../../store/commonSlice';
import { Order } from '../../types';
import getComparator from '../../utils/getComparator';
import stableSort from '../../utils/stableSort';
import toSearch from '../../utils/toSearch';
import PopupForm from '../PopupForm';
import EnhancedTableHead from './EnhancedTableHead';
import { Data } from './EnhancedTableHead/EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

interface EditItem {
  id: number;
  categoryId: string;
  author: string;
  name: string;
  text: string;
  price: number;
  photo?: string;
  rating: number;
  stock: number;
  publicationYear: string;
}

interface EnhancedTableProps {
  currentCategoryId: number;
  searchTerm?: string;
}

const EnhancedTable: FC<EnhancedTableProps> = ({ currentCategoryId, searchTerm }) => {
  const dispatch = useAppDispatch();
  const { dataList } = useAppSelector((state) => state.common);

  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('created');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [editItem, setEditItem] = useState<null | EditItem>(null);
  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState<DataItem[]>(dataList);

  useEffect(() => {
    setRows(currentCategoryId > 0 ? dataList.filter((item) => item.categoryId === currentCategoryId) : dataList);
    setPage(0);
  }, [currentCategoryId]);

  useEffect(() => {
    if (searchTerm) {
      setRows(toSearch(dataList, searchTerm));
    } else {
      setRows(currentCategoryId > 0 ? dataList.filter((item) => item.categoryId === currentCategoryId) : dataList);
    }

    setPage(0);
  }, [searchTerm, dataList]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, dataList, rows]
  );

  const handleEdit = ({
    id,
    categoryId,
    author,
    name,
    text,
    price,
    photo,
    rating,
    stock,
    publicationYear,
  }: EditItem) => {
    setEditItem({
      id,
      categoryId,
      author,
      name,
      text,
      price,
      rating,
      stock,
      publicationYear,
    });

    setOpen(true);
  };

  const handleRemove = (idList: number[]) => {
    if (emptyRows + 1 === rowsPerPage) {
      setPage(page > 0 ? page - 1 : 0);
    }

    dispatch(removeDataItem({ idList }));
    setSelected([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditItem(null);
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {visibleRows.length > 0 ? (
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              selectedItemIds={selected}
              numSelected={selected.length}
              handleRemove={handleRemove}
            />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id as number);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${row.name}-${index}`}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={(event) => handleClick(event, row.id as number)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.id}
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {row.name}
                        </TableCell>

                        <TableCell align="right">
                          <Box sx={{ textAlign: 'center' }} className={dense ? 'max-w-[3rem]' : 'max-w-[4rem]'}>
                            {row.photo ? (
                              <img src={row.photo as string} alt={row.name as string} loading="lazy" />
                            ) : (
                              '-'
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row.text}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.rating}</TableCell>
                        <TableCell align="right">{row.stock !== 0 ? 'Available' : 'Not Available'}</TableCell>
                        <TableCell align="right">{row.category}</TableCell>
                        <TableCell align="right">{row.author}</TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              handleEdit({
                                id: row.id as number,
                                categoryId: row.categoryId as string,
                                author: row.author as string,
                                name: row.name as string,
                                text: row.text as string,
                                price: row.price as number,
                                rating: row.rating as number,
                                stock: row.stock as number,
                                publicationYear: row.publicationYear as string,
                              })
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => handleRemove([row.id as number])}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        </>
      ) : (
        <h3>No result</h3>
      )}

      <footer className={'mt-8'}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add product
        </Button>
        <PopupForm
          open={open}
          id={editItem?.id}
          author={editItem?.author}
          name={editItem?.name}
          text={editItem?.text}
          price={editItem?.price}
          rating={editItem?.rating}
          stock={editItem?.stock}
          publicationYear={editItem?.publicationYear.toString()}
          categoryId={editItem?.categoryId.toString()}
          handleClose={handleClose}
        />
      </footer>
    </Box>
  );
};

export default EnhancedTable;
