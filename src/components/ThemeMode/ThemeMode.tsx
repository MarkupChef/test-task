import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { FC, ReactNode, useMemo } from 'react';
import useAppSelector from '../../hooks/useAppSelector';

interface ThemeModeProps {
  children: ReactNode;
}
const ThemeMode: FC<ThemeModeProps> = ({ children }) => {
  const { themeMode } = useAppSelector((state) => state.common);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeMode;
