import { lazy } from 'react';
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import Testimonials from '../Components/Testimonial';
import FAQ from '../Components/FAQ';
import OurProducts from '../Components/Our-Products';
import Product1 from '../Components/Product1';
import Product2 from '../Components/Product2';
import Product3 from '../Components/Product3';
import About from '../Components/AboutUs';
import Contact from '../Components/Contact';
import ErrorPage from '../Components/ErrorPage';

// Define page components
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

// Define routes configuration
export const routes = (data) => [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: data?.products?.categories?.[0]?.link || '/marble',
    element: <ProductPage1 />,
  },
  {
    path: data?.products?.categories?.[1]?.link || '/granite',
    element: <ProductPage2 />,
  },
  {
    path: data?.products?.categories?.[2]?.link || '/tile',
    element: <ProductPage3 />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]; 