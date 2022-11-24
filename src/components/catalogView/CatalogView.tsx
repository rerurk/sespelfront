import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./CatalogView.module.css"


import {CatalogItem} from "../../structs/catalog";


interface CatalogViewProps {
    item: CatalogItem
    keyVal: number
}

const CatalogView: FC<CatalogViewProps> = ({item, keyVal}) => {
    console.log("CatalogView:", item)
    const [hisItem, setHisItem] = useState<CatalogItem>(item)


    const onNameClick = (item: CatalogItem) => {
        console.log(item)
    }
    const [nodesClName, setNodesClName] = useState<string>(cl.wrapper__nodes_hidden)
    console.log(hisItem)
    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
            {hisItem.is_table
                ? <div className={cl.wrapper__name_table} onClick={() => onNameClick(hisItem)}>
                    {hisItem.name}
                    {
                        hisItem.items
                            ? hisItem.items.map((item: CatalogItem) => <CatalogView item={item} keyVal={keyVal + 1}/>)
                            :false
                    }

                </div>
                : <span className={cl.wrapper__name_end_point}>{hisItem.name}</span>

            }
        </div>
    );
};

export default CatalogView;