import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";




const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
let h = document.getElementsByTagName('html')[0]
h.style.fontSize = Math.floor(window.innerHeight / 70) + 'px'



root.render(
    <Provider store={store}>
        <App/>
    </Provider>

);
