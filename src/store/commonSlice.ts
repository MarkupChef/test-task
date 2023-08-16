import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: number;
  name: string;
}

export interface DataItem {
  id: number;
  categoryId: number;
  category: string;
  author: string;
  name: string;
  text: string;
  price: number;
  photo?: string;
  rating: number;
  stock: number | null;
  publicationYear: number;
  created: number;
  updated: number | null;
}

export interface NewDataItem {
  categoryId: number;
  author: string;
  name: string;
  text: string;
  price: number;
  photo?: string;
  rating: number;
  stock: number | null;
  publicationYear: number;
}

export interface EditDataItem {
  id: number;
  categoryId: number;
  author: string;
  name: string;
  text: string;
  price: number;
  photo?: string;
  rating: number;
  stock: number | null;
  publicationYear: number;
}

export interface InitialState {
  themeMode: PaletteMode;
  categoryList: Category[];
  dataList: DataItem[];
}

const initialState: InitialState = {
  themeMode: 'light',
  categoryList: [
    { id: 1, name: 'Phones' },
    { id: 2, name: 'Computers' },
    { id: 3, name: 'Audio' },
    { id: 4, name: 'Video' },
  ],
  dataList: [
    {
      id: 1691655272793,
      categoryId: 1,
      category: 'Phones',
      author: '-',
      name: 'Iphone 12',
      text: 'Some text 1',
      price: 399,
      photo: './iphone-12.png',
      rating: 4.5,
      stock: 2,
      publicationYear: 2010,
      created: 1691655272793,
      updated: null,
    },
    {
      id: 1691655272794,
      categoryId: 1,
      category: 'Phones',
      author: '-',
      name: 'Iphone 13',
      text: 'Some text 2',
      price: 650,
      photo: './iphone-13.png',
      rating: 5,
      stock: 3,
      publicationYear: 2011,
      created: 1691655272794,
      updated: null,
    },
    {
      id: 1691655272795,
      categoryId: 3,
      category: 'Audio',
      author: '-',
      name: 'GBL Partybox',
      text: 'Some text 3',
      price: 345,
      photo: './jbl.png',
      rating: 2.5,
      stock: 0,
      publicationYear: 2012,
      created: 1691655272795,
      updated: null,
    },
    {
      id: 1691655272796,
      categoryId: 3,
      category: 'Audio',
      author: '-',
      name: 'Sony',
      text: 'Some text 4',
      price: 145,
      photo: './sony.png',
      rating: 5,
      stock: 0,
      publicationYear: 2013,
      created: 1691655272796,
      updated: null,
    },
    {
      id: 1691655272797,
      categoryId: 4,
      category: 'Video',
      author: '-',
      name: 'Samsung',
      text: 'Some text 5',
      price: 200,
      photo: './Samsung.webp',
      rating: 3,
      stock: 1,
      publicationYear: 2014,
      created: 1691655272797,
      updated: null,
    },
    {
      id: 1691655272798,
      categoryId: 4,
      category: 'Video',
      author: '-',
      name: 'LG',
      text: 'Some text 6',
      price: 150,
      photo: './LG-TV.webp',
      rating: 3.7,
      stock: 3,
      publicationYear: 2015,
      created: 1691655272798,
      updated: null,
    },
    {
      id: 1691655272799,
      categoryId: 2,
      category: 'Computers',
      author: '-',
      name: 'Macbook',
      text: 'Some text 7',
      price: 2000,
      photo: './macbook.webp',
      rating: 4.2,
      stock: 0,
      publicationYear: 2016,
      created: 1691655272799,
      updated: null,
    },
  ],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    switchTheme(state, action: PayloadAction<PaletteMode>) {
      state.themeMode = action.payload;
    },
    addDataItem(state, action: PayloadAction<NewDataItem>) {
      const category = state.categoryList.find((item) => {
        if (item.id === action.payload.categoryId) {
          return item;
        }
      });

      state.dataList.push({
        id: Date.now(),
        ...action.payload,
        category: category ? category.name : 'No category name',
        created: Date.now(),
        updated: null,
      });
    },
    saveDataItem(state, action: PayloadAction<EditDataItem>) {
      state.dataList = state.dataList.map((item) => {
        if (item.id === action.payload.id) {
          const category = state.categoryList.find((item) => {
            if (item.id === action.payload.categoryId) {
              return item;
            }
          });

          return {
            ...action.payload,
            category: category ? category.name : 'No category name',
            created: item.created,
            updated: Date.now(),
          };
        }

        return item;
      });
    },
    removeDataItem(state, action: PayloadAction<{ idList: number[] }>) {
      state.dataList = state.dataList.filter((item) => !action.payload.idList.includes(item.id));
    },
  },
});

export const { switchTheme, addDataItem, saveDataItem, removeDataItem } = commonSlice.actions;

export default commonSlice.reducer;
