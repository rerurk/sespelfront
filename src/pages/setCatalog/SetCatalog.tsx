import React from 'react';
import CatalogTree from "../../components/catalogTree/CatalogTree";


import ShowCatalogNode from "../../components/showCatalogNode/ShowCatalogNode";
// @ts-ignore
import  cl from"./SetCatalog.module.css"


const SetCatalog = () => {

    return (
        <div className={cl.wrapper}>
            <CatalogTree/>
            <ShowCatalogNode/>

        </div>
    );
};

export default SetCatalog;