import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { faUser, faObjectGroup } from "@fortawesome/free-regular-svg-icons";

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faBorderAll} />
         </header>
      </div>
   );
}

export default App;
