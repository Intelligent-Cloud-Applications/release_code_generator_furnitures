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
import Product1 from "./Components/Product1";
import Product2 from "./Components/Product2";
import Product3 from "./Components/Product3";
import { DataProvider } from './context/context';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './Components/ErrorPage';
import { useData } from './context/context';

const HomePage = () => {
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
  return <OurProducts />;
};

const ProductPage1 = () => {
  return <Product1 />;
};

const ProductPage2 = () => {
  return <Product2 />;
};

const ProductPage3 = () => {
  return <Product3 />;
};

const AboutPage = () => {
  return <About />;
};

const ContactPage = () => {
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
  const { data } = useData();
  
  // Get product links from categories
  const product1Link = data?.products?.categories?.[0]?.link || '/marble';
  const product2Link = data?.products?.categories?.[1]?.link || '/granite';
  const product3Link = data?.products?.categories?.[2]?.link || '/tile';

  return (
    <Router>
      <Toaster position="top-center" />
      <DataProviderWrapper>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path={product1Link} element={<ProductPage1 />} />
          <Route path={product2Link} element={<ProductPage2 />} />
          <Route path={product3Link} element={<ProductPage3 />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>

        <WhatsApp />
        <Footer />
      </DataProviderWrapper>
    </Router>
  );
};

export default App;