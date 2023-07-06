import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import DataTable from './components/DataTable';
import ThemeMode from './components/ThemeMode';
import ThemeSwitcher from './components/ThemeSwicher';
import store, { persistor } from './store/index';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeMode>
          <CssBaseline />
          <ThemeSwitcher />
          <DataTable />
        </ThemeMode>
      </PersistGate>
    </Provider>
  );
}

export default App;
