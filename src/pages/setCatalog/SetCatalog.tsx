import React from 'react';
import CatalogTree from "../../components/catalogTree/CatalogTree";

// @ts-ignore
import  cl from"./SetCatalog.module.css"
import ShowCatalogNode from "../../components/showCatalogNode/ShowCatalogNode";


const SetCatalog = () => {

    return (
        <div className={cl.wrapper}>
            <CatalogTree/>
            <ShowCatalogNode/>

        </div>
    );
};

export default SetCatalog;