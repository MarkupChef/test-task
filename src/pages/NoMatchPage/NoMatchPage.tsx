import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const NoMatchPage: FC = () => {
  return (
    <Box className={'mt-2.5 text-center'}>
      <Typography component={'h1'} variant={'h2'}>
        Error 404
      </Typography>
    </Box>
  );
};

export default NoMatchPage;
