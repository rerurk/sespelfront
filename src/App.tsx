import React, {useEffect, useState} from 'react';

import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";
import Route from "./router/route/Route";
import {Fetches} from "./fetches/Fetches";
import {ItemTypes} from "./structs/ItemTypes";
import {
    SetNomenclatureRootState,
    SetSelectedNomenclatureGroupState,
    SetAssetsStore, SetStoreGroupRoot
} from "./store/action_creator/AppStoreActions";
import {useDispatch} from "react-redux";

export let AppItemTYPES: ItemTypes


function App() {
    const dispatch=useDispatch()
    useEffect(() => {
        // получим все нужные данные с сервера
        Fetches.FetchAllData().then(r => {

            let [itemTYPES, catalogRoot,storeGroupRoot] = r
            // проверим являетсья ли что то ошибкой
            if (!((itemTYPES instanceof Error)||(catalogRoot instanceof Error)||(storeGroupRoot instanceof Error))){
                AppItemTYPES=itemTYPES

                // @ts-ignore
                dispatch(SetNomenclatureRootState(catalogRoot))
                // @ts-ignore
                dispatch(SetSelectedNomenclatureGroupState(catalogRoot))

                // @ts-ignore
                dispatch(SetStoreGroupRoot(storeGroupRoot))
                setIsAllConsist(()=>true)
            }

        })

    }, )
    const [isAllConsist, setIsAllConsist] = useState<boolean>(false)
    if (isAllConsist) {
        return (
            <div className="App">

                <BrowserRouter>
                    <div id="header">

                    </div>
                    <Route/>

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
