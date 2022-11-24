import React from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import Route from "./router/route/Route";

function App() {
    return (
        <div className="App">
            <h1>Сеспель</h1>
            <BrowserRouter>
                <Route/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
