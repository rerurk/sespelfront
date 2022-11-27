import {combineReducers} from "redux";
import {showCatalogNodeReducer} from "./showCatalogNode";


export const rootReducer =combineReducers({
 showCatalogNode:showCatalogNodeReducer

})
export type RootState = ReturnType<typeof rootReducer>