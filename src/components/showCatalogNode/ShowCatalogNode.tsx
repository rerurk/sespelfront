import React, {FC} from 'react';
// @ts-ignore
import cl from "./ShowCatalogNode.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";
import {SetShowCatalogState} from "../../store/action_creator/showCatalogNode";
import {CatalogItem} from "../../structs/catalog";
import ShowCatalogItem from "./ShowCatalogItem";
import CatalogMenu from "../catalogMenu/CatalogMenu";

interface ShowCatalogNodeProps {

}

const ShowCatalogNode: FC<ShowCatalogNodeProps> = () => {

    const {catalogNode} = useTypeSelector(state => state.showCatalogNode)

    const dispatch = useDispatch()
    if (catalogNode && !catalogNode.self.items ) {
        Fetches.GetCatalogItems(catalogNode.self).then(items => {
            if (!(items instanceof Error) && items != null && items.length > 0) {
                catalogNode.self.items = items
                // @ts-ignore
                dispatch(SetShowCatalogState(catalogNode))
            }
        })
    }

        return (
            <div className={cl.wrapper}>
                {/*Наименование каталога*/}
                <div className={cl.wrapper__self_name} >
                    <CatalogMenu catalogNode={catalogNode}/>
                    <strong>{catalogNode?.self.name}</strong>
                </div>
                {catalogNode.self.items
                    ?catalogNode.self.items.map((it:CatalogItem)=><ShowCatalogItem parentItem={catalogNode.self} item={it} key={it.ref}/>)
                    :<span>ПУСТОЙ КАТАЛОГ</span>
                }
            </div>
        );


};

export default ShowCatalogNode;