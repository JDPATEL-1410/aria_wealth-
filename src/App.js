import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InvestmentSolutions from "./components/services/InvestmentSolutions";
import GoalBasedSolutions from "./components/services/GoalBasedSolutions";
import InsuranceProtection from "./components/services/InsuranceProtection";
import EstatePlanning from "./components/services/EstatePlanning";
import OtherSolutions from "./components/services/OtherSolutions";


// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Calculators from "./pages/Calculators";
import FinancialWisdom from "./pages/FinancialWisdom";
import Contact from "./pages/Contact";
import Compliance from "./pages/Compliance";
import CommissionDisclosure from "./pages/CommissionDisclosure";
import PrivacyPolicy from "./pages/PrivacyPolicy";
 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  // Test backend connection on app load
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log("Backend connected:", response.data.message);
      } catch (e) {
        console.log("Backend not connected yet - using mock data");
      }
    };
    
    testBackendConnection();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <AnimatePresence mode="wait">
            <motion.main
              className="flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/investment-solutions" element={<InvestmentSolutions />} />
                <Route path="/services/goal-based-solutions" element={<GoalBasedSolutions />} />
                <Route path="/services/insurance-protection" element={<InsuranceProtection />} />
                <Route path="/services/estate-planning" element={<EstatePlanning />} />
                <Route path="/services/other-solutions" element={<OtherSolutions />} />
                <Route path="/calculators/*" element={<Calculators />} />
                <Route path="/financial-wisdom" element={<FinancialWisdom />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/commission-disclosure" element={<CommissionDisclosure />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                
              </Routes>
            </motion.main>
          </AnimatePresence>
          
          <Footer />
          <ScrollToTop />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
