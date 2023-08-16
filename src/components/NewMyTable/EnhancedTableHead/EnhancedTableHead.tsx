import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { Order } from '../../../types';

export interface Data {
  id: string;
  author: string;
  name: string;
  text: string;
  price: number;
  photo?: string;
  rating: number;
  stock: number;
  publicationYear: number;
  categoryId: number;
  category: string;
  created: number;
  updated: number;
}

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  sorted: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
    sorted: false,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    sorted: true,
  },
  {
    id: 'photo',
    numeric: false,
    disablePadding: false,
    label: 'Photo',
    sorted: false,
  },
  {
    id: 'text',
    numeric: true,
    disablePadding: false,
    label: 'Description',
    sorted: true,
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
    sorted: true,
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
    sorted: true,
  },
  {
    id: 'stock',
    numeric: true,
    disablePadding: false,
    label: 'Stock',
    sorted: true,
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Category',
    sorted: true,
  },
  {
    id: 'author',
    numeric: true,
    disablePadding: false,
    label: 'Author',
    sorted: true,
  },
];

const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sorted ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
        <TableCell align="right">
          <span className={'font-black'}>Actions</span>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
