import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { switchTheme } from '../../store/commonSlice';

const ThemeSwitcher: FC = () => {
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.common);
  const theme = useTheme();

  const toggleColorMode = () => {
    const mode = themeMode === 'light' ? 'dark' : 'light';
    dispatch(switchTheme(mode));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        p: 3,
        color: '#fff',
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default ThemeSwitcher;
