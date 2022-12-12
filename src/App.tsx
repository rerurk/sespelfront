import React, {useEffect, useState} from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import Route from "./router/route/Route";
import ChangeFontSize from "./components/UI/cahngeFontSize/ChangeFontSize";

import {Fetches} from "./fetches/Fetches";
import {ItemMasks} from "./structs/Masks";
import {
    SetCatalogRootState,
    SetCurrentCatalogState,
    SetAssetsStore
} from "./store/action_creator/CatalogStoreActions";
import {useDispatch} from "react-redux";

export let AppItemMasks: ItemMasks


function App() {
    const dispatch=useDispatch()
    useEffect(() => {
        // получим все нужные данные с сервера
        Fetches.FetchAllData().then(r => {

            let [appM, catalogRoot,mainAssetsStorage] = r
            // проверим являетсья ли что то ошибкой
            if (!((appM instanceof Error)||(catalogRoot instanceof Error)||(mainAssetsStorage instanceof Error))){
                AppItemMasks=appM
                // @ts-ignore
                dispatch(SetCatalogRootState(catalogRoot))
                // @ts-ignore
                dispatch(SetCurrentCatalogState(catalogRoot))


                setIsAllConsist(()=>true)
            }

        })

    }, [])
    const [isAllConsist, setIsAllConsist] = useState<boolean>(false)
    if (isAllConsist) {
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
    return (<div>

        <h1>Загрузка....</h1>
    </div>)
}

export default App;
