import React from "react";
import { HashRouter as Router } from "react-router-dom";

// Routes
import Pages from "./pages/pages";

// components
import Navbar from "./components/navbar/navbar";
import { Slide, ToastContainer } from "react-toastify";

// global modal context component
import GlobalModalProvider from "./context/globalModal/globalModalContext";

function App() {
   return (
      <div
         className="flex flex-col justify-between items-center relative min-h-screen 
                    text-white w-full scrollbar"
      >
         <Router>
            <Navbar />
            <GlobalModalProvider>
               <Pages />
            </GlobalModalProvider>
            <ToastContainer
               position="bottom-right"
               autoClose={1000}
               hideProgressBar={true}
               newestOnTop={false}
               closeOnClick
               rtl={true}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               transition={Slide}
               limit={4}
               bodyClassName={() =>
                  "text-sm text-right flex flex-row items-center font-white font-med p-3" +
                  "font-shabnam w-full text-slate-600 dark:text-slate-300 font-shabnam"
               }
            />
         </Router>
      </div>
   );
}

export default App;
