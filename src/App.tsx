import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './components/Layout';
import ThemeMode from './components/ThemeMode';
import { ROUTES } from './constant/routes';
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import PolicyPage from './pages/PolicyPage';
import ProductsPage from './pages/ProductsPage';
import store, { persistor } from './store/index';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeMode>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path={ROUTES.root} element={<HomePage />} />
                <Route path={ROUTES.home} element={<HomePage />} />
                <Route path={ROUTES.productList} element={<ProductsPage />} />
                <Route path={ROUTES.privacy} element={<PolicyPage />} />
                <Route path={'*'} element={<NoMatchPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeMode>
      </PersistGate>
    </Provider>
  );
}

export default App;
