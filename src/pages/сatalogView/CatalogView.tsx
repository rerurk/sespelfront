import React from 'react';
import CatalogTreeRoot from "../../components/catalogTree/CatalogTreeRoot";

// @ts-ignore
import  cl from "./CatalogView.module.css"
import AtalogItemsShow from "../../components/catalogItemsShow/СatalogItemsShow";
import CatalogItemsShow from "../../components/catalogItemsShow/СatalogItemsShow";


const CatalogView = () => {

    return (
        <div className={cl.wrapper}>
             <CatalogTreeRoot/>
             <CatalogItemsShow/>

        </div>
    );
};

export default CatalogView;