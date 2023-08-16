import { Box, CssBaseline } from '@mui/material';
import Typography from '@mui/material/Typography';
import DataTable from '../../components/DataTable';

const ProductsPage = () => {
  return (
    <div>
      <CssBaseline />
      <Box className={'mt-2.5 text-center'}>
        <Typography component={'h1'} variant={'h2'}>
          Product list
        </Typography>
      </Box>
      <DataTable />
    </div>
  );
};

export default ProductsPage;
