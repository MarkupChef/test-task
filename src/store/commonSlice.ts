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
  name: string;
  text: string;
}

export interface NewDataItem {
  categoryId: number;
  category: string;
  name: string;
  text: string;
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
    { id: 1, categoryId: 1, category: 'Phones', name: 'Iphone 12', text: 'Some text 1' },
    { id: 2, categoryId: 1, category: 'Phones', name: 'Iphone 13', text: 'Some text 2' },
    { id: 3, categoryId: 3, category: 'Audio', name: 'GBL Partybox', text: 'Some text 3' },
    { id: 4, categoryId: 3, category: 'Audio', name: 'Sony', text: 'Some text 4' },
    { id: 5, categoryId: 4, category: 'Video', name: 'Samsung', text: 'Some text 5' },
    { id: 6, categoryId: 4, category: 'Video', name: 'LG', text: 'Some text 6' },
    { id: 7, categoryId: 2, category: 'Computers', name: 'Macbook', text: 'Some text 7' },
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
      state.dataList.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    saveDataItem(state, action: PayloadAction<DataItem>) {
      state.dataList = state.dataList.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }

        return item;
      });
    },
    removeDataItem(state, action: PayloadAction<{ id: number }>) {
      state.dataList = state.dataList.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { switchTheme, addDataItem, saveDataItem, removeDataItem } = commonSlice.actions;

export default commonSlice.reducer;
