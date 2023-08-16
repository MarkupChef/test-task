import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const PolicyPage: FC = () => {
  return (
    <Box className={'mt-2.5 text-center'}>
      <Typography component={'h1'} variant={'h2'}>
        Privacy policy
      </Typography>
    </Box>
  );
};

export default PolicyPage;
