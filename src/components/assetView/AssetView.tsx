import React, {FC, useEffect, useLayoutEffect, useState} from 'react';

// @ts-ignore
import cl from "./AssetView.module.css"

import {Asset} from "../../structs/Asset";
import {json} from "stream/consumers";


interface AssetViewProps {
    asset:Asset
    keyVal: number
}

const AssetView: FC<AssetViewProps> = ({asset, keyVal}) => {
    console.log("AssetView:",asset)
    const [hisAsset,setHisAsset]=useState<Asset>(asset)


    const onNameClick=(asset:Asset)=>{
        console.log(asset)
    }
    const [nodesClName, setNodesClName] = useState<string>(cl.wrapper__nodes_hidden)
    console.log(hisAsset)
    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
            {hisAsset.is_table
                ?<div className={cl.wrapper__name_table} onClick={()=>onNameClick(hisAsset)}>{hisAsset.name}</div>
                :<span className={cl.wrapper__name_end_point}>{hisAsset.name}</span>

            }
        </div>
    );
};

export default AssetView;