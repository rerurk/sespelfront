import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {SelectRotes} from "./router";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

SelectRotes()
root.render(
    <Provider store={store}>
        <App/>
    </Provider>

);
