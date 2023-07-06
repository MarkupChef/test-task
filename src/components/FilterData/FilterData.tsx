import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import useAppSelector from '../../hooks/useAppSelector';

interface FilterDataProps {
  currentCategoryId: number;
  setCurrentCategoryId: Dispatch<SetStateAction<number>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const FilterData: FC<FilterDataProps> = ({ currentCategoryId, setCurrentCategoryId, setSearchTerm }) => {
  const { categoryList } = useAppSelector((state) => state.common);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCurrentCategoryId(+event.target.value);
  };

  const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className={'flex gap-2 py-8'}>
      <div className={'flex-grow'}>
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
      <div className={'flex-grow'}>
        <TextField
          fullWidth
          size="medium"
          variant="outlined"
          placeholder="Name"
          label={'Name'}
          onChange={handleSearch}
        />
      </div>
    </header>
  );
};

export default FilterData;
