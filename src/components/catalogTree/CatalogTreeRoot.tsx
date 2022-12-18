import React, {FC} from 'react';
// @ts-ignore
import cl from "./TreeRoot.module.css"
import CatalogTree from "./CatalogTree";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import AtalogItemsShow from "../catalogItemsShow/СatalogItemsShow";

const CatalogTreeRoot: FC = () => {


    const {catalogRoot} = useTypeSelector(state => state.showCatalogNode)

    return (
        <div className={cl.wrapper}>{
            (catalogRoot)
                ? <CatalogTree item={catalogRoot} key={"CatalogTree"+catalogRoot.uuid} />
                : false
        }

        </div>
    );
};

export default CatalogTreeRoot;