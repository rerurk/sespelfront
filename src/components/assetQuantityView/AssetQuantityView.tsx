import React, {FC} from 'react';
import {NomenclItemAndHisUUIDS} from "../../structs/Asset";
// @ts-ignore
import cl from "./AssetQuantityView.module.css"
interface AssetQuantityViewProps{
    nomenclItemAndHisUUIDS:NomenclItemAndHisUUIDS
    ind:number
}

const AssetQuantityView:FC<AssetQuantityViewProps> = ({nomenclItemAndHisUUIDS,ind}) => {

    return (
        <div className={ind%2==0?cl.wrapper:[cl.wrapper,cl.wrapper_nMod2].join(" ")}>
            <div className={cl.wrapper_ind}> <span>{ind}.</span></div>
            <div className={cl.wrapper_name}> <span>{nomenclItemAndHisUUIDS.nomencl_item.name}</span></div>
            <div className={cl.wrapper_quantity}> <span>{nomenclItemAndHisUUIDS.uuid_times.length}</span></div>
        </div>
    );
};

export default AssetQuantityView;