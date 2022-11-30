import React from 'react';
import TreeRoot from "../../components/catalogTree/TreeRoot";

// @ts-ignore
import  cl from"./SetCatalog.module.css"
import CatalogNodeShow from "../../components/catalogNodeShow/CatalogNodeShow";


const SetCatalog = () => {

    return (
        <div className={cl.wrapper}>
            <TreeRoot/>
            <CatalogNodeShow/>

        </div>
    );
};

export default SetCatalog;