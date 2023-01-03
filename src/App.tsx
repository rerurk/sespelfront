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
    SetSelectedAssetsStoreState, SetStoreGroupRoot, SetSelectedStoreGroupState
} from "./store/action_creator/AppStoreActions";
import {useDispatch} from "react-redux";
import Authorization from "./pages/authorization/Authorization";
import {useTypeSelector} from "./hooks/useTypeSelector";
import {DataLoader} from "./dataLoader/DataLoader";

export let AppItemTYPES: ItemTypes


function App() {
    const dispatch=useDispatch()
    const {isAuth}=useTypeSelector(state => state.appReducer)
    useEffect(() => {
        // получим все нужные данные с сервера
        if(isAuth) {
            Fetches.FetchAllData().then(r => {

                let [itemTYPES, catalogRoot, storeGroupRoot] = r
                // проверим являетсья ли что то ошибкой
                if (!((itemTYPES instanceof Error) || (catalogRoot instanceof Error) || (storeGroupRoot instanceof Error))) {
                    AppItemTYPES = itemTYPES

                    // @ts-ignore
                    dispatch(SetNomenclatureRootState(catalogRoot))
                    // @ts-ignore
                    dispatch(SetSelectedNomenclatureGroupState(catalogRoot))
                    // @ts-ignore
                    dispatch(SetStoreGroupRoot(storeGroupRoot))
                    // @ts-ignore
                    dispatch(SetSelectedStoreGroupState(storeGroupRoot))
                    setIsAllConsist(() => true)
                }

            })

        }
    },[isAuth] )
    const [isAllConsist, setIsAllConsist] = useState<boolean>(false)
    if (isAllConsist&&isAuth) {
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

    if(!isAuth){
        return (<Authorization/>)
    }
    return (<div>

        <h1>Загрузка....</h1>
    </div>)
}

export default App;
