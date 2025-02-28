import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Testimonials />
    <FAQ />
  </>
);

const App = () => {
  return (
    <Router>
      {/* Navbar is visible on all pages */}
      <Navbar />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<OurProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/marble" element={<MarbleProduct />} />
        <Route path="/Tile" element={<Tile />} />
        <Route path="/granite" element={<GranitePage />} />
      </Routes>

      {/* WhatsApp button visible on all pages */}
      <WhatsApp />

      {/* Footer is visible on all pages */}
      <Footer />
    </Router>
  );
};

export default App;