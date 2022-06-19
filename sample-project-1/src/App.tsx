import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Routes
import Pages from "./pages/pages";

// components
import Navbar from "./components/navbar/navbar";
import { ToastContainer } from "react-toastify";

function App() {
   return (
      <div className="flex flex-col justify-between items-center relative min-h-screen text-white">
         <Router>
            <Navbar />
            <Pages />
         </Router>
         <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            bodyClassName={() =>
               "text-sm font-white font-med flex justify-between items-center p-3 font-shabnam"
            }
         />
      </div>
   );
}

export default App;
