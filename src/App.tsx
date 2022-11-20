import React from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";

function App() {
  return (
      <div className="App">
          <h1>Сеспель</h1>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </div>
  );
}

export default App;
