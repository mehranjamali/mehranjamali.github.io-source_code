import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// components
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
// Routes
import Pages from "./pages/pages";

function App() {
   return (
      <div className="flex flex-col justify-between items-center relative min-h-screen text-white">
         <Router>
            <Navbar />
            <Pages />
            <Footer />
         </Router>
      </div>
   );
}

export default App;
