import { useState } from 'react';
import FilterData from '../FilterData';
import MyTable from '../MyTable';

const DataTable = () => {
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={'container m-auto'}>
      <FilterData
        currentCategoryId={currentCategoryId}
        setCurrentCategoryId={setCurrentCategoryId}
        setSearchTerm={setSearchTerm}
      />
      <MyTable currentCategoryId={currentCategoryId} searchTerm={searchTerm} />
    </div>
  );
};

export default DataTable;
