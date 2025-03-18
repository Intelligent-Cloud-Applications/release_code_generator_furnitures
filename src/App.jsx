import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./Development/Components/Footer";
import Navbar from "./Development/Components/Navbar";
import WhatsApp from "./Development/Components/WhatsApp";
import { DataProvider } from './Development/context/context';
import { Toaster } from 'react-hot-toast';
import { useData } from './Development/context/context';
import DocumentHead from './Development/Components/DocumentHead';
import { routes } from './Development/routes/routes';

const DataProviderWrapper = ({ children }) => {
  const navigate = useNavigate();
  
  const handleError = (error) => {
    navigate('/error', { state: error });
  };
  
  return (
    <DataProvider onError={handleError}>
      {children}
    </DataProvider>
  );
};

const App = () => {
  const { data } = useData();
  const appRoutes = routes(data);

  return (
    <Router>
      <Toaster position="top-center" />
      <DataProviderWrapper>
        <DocumentHead />
        <Navbar />

        <Routes>
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>

        <WhatsApp />
        <Footer />
      </DataProviderWrapper>
    </Router>
  );
};

export default App;