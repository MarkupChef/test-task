import { DataItem } from '../store/commonSlice';

function toSearch(array: DataItem[], search: string): DataItem[] {
  return array.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );
}

export default toSearch;
