import React from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import Route from "./router/route/Route";
import ChangeFontSize from "./components/UI/cahngeFontSize/ChangeFontSize";

function App() {
    return (
        <div className="App">


            <BrowserRouter>
                <div id="header">
                    Сеспель
                    <Route/>
                    <ChangeFontSize/>
                </div>

                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
