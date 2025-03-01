import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import About from "./Components/AboutUs";
import Contact from "./Components/Contact";
import FAQ from "./Components/FAQ";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Navbar from "./Components/Navbar";
import OurProducts from "./Components/Our-Products";
import Testimonials from "./Components/Testimonial";
import WhatsApp from "./Components/WhatsApp";
import MarbleProduct from "./Components/MarbleProduct";
import Tile from "./Components/TileProduct";
import GranitePage from "./Components/GraniteProduct";
import { DataProvider } from './context/context';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './Components/ErrorPage';
import { useEffect } from 'react';
import { useData } from './context/context';

const HomePage = () => {
  const { checkSectionAndNavigate } = useData();

  useEffect(() => {
    // Check all sections required for homepage
    const requiredSections = ['hero', 'services', 'testimonials', 'faq'];
    requiredSections.forEach(section => {
      checkSectionAndNavigate(section);
    });
  }, [checkSectionAndNavigate]);

  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <FAQ />
    </>
  );
};

const ProductsPage = () => {
  const { checkSectionAndNavigate } = useData();

  useEffect(() => {
    checkSectionAndNavigate('products');
  }, [checkSectionAndNavigate]);

  return <OurProducts />;
};

const MarblePage = () => {
  const { checkSectionAndNavigate } = useData();

  useEffect(() => {
    checkSectionAndNavigate('marble');
  }, [checkSectionAndNavigate]);

  return <MarbleProduct />;
};

const TilePage = () => {
  const { checkSectionAndNavigate } = useData();

  useEffect(() => {
    checkSectionAndNavigate('tile');
  }, [checkSectionAndNavigate]);

  return <Tile />;
};

const GranitePageWrapper = () => {
  const { checkSectionAndNavigate } = useData();

  useEffect(() => {
    checkSectionAndNavigate('granite');
  }, [checkSectionAndNavigate]);

  return <GranitePage />;
};

const AboutPage = () => {
  const { checkSectionAndNavigate } = useData();

  useEffect(() => {
    checkSectionAndNavigate('aboutUs');
  }, [checkSectionAndNavigate]);

  return <About />;
};

const ContactPage = () => {
  const { checkSectionAndNavigate } = useData();

  useEffect(() => {
    checkSectionAndNavigate('contact');
  }, [checkSectionAndNavigate]);

  return <Contact />;
};

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
  return (
    <Router>
      <Toaster position="top-center" />
      <DataProviderWrapper>
        {/* Navbar is visible on all pages */}
        <Navbar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/marble" element={<MarblePage />} />
          <Route path="/Tile" element={<TilePage />} />
          <Route path="/granite" element={<GranitePageWrapper />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>

        {/* WhatsApp button visible on all pages */}
        <WhatsApp />

        {/* Footer is visible on all pages */}
        <Footer />
      </DataProviderWrapper>
    </Router>
  );
};

export default App;