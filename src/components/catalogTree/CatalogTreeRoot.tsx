import React, {FC} from 'react';
// @ts-ignore
import cl from "./TreeRoot.module.css"
import CatalogTree from "./CatalogTree";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import AtalogItemsShow from "../nomenclatureItemsShow/NomenclatureRoot";

const CatalogTreeRoot: FC = () => {


    const {nomenclatureRoot} = useTypeSelector(state => state.showCatalogNode)

    return (
        <div className={cl.wrapper}>{
            (nomenclatureRoot)
                ? <CatalogTree item={nomenclatureRoot} key={"CatalogTree"+nomenclatureRoot.uuid} />
                : false
        }

        </div>
    );
};

export default CatalogTreeRoot;