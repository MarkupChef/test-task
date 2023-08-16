import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';

interface FilterDataProps {
  currentCategoryId: number;
  setCurrentCategoryId: Dispatch<SetStateAction<number>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const FilterData: FC<FilterDataProps> = ({ currentCategoryId, setCurrentCategoryId, setSearchTerm }) => {
  const { categoryList } = useAppSelector((state) => state.common);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, 300]);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCurrentCategoryId(+event.target.value);
  };

  const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <header className={'py-8'}>
      <div className={'mb-6'}>
        <TextField
          fullWidth
          size="medium"
          variant="outlined"
          placeholder="Category or product name"
          label={'Search'}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="category-select"
            value={`${currentCategoryId}`}
            label="Category"
            onChange={handleChangeCategory}
          >
            <MenuItem value={0}>All</MenuItem>
            {categoryList.map(({ id, name }) => (
              <MenuItem key={`category-${id}`} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </header>
  );
};

export default FilterData;
