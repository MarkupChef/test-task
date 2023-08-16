import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
  return (
    <Box>
      <Header />
      <Container maxWidth={'xl'} className={'my-5'}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
