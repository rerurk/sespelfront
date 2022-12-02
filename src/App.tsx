import React from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import Route from "./router/route/Route";

function App() {
    return (
        <div className="App">
            <span>Сеспель</span>
            <BrowserRouter>
                <Route/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
