import React, {useEffect, useState} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css"
import {StoresText} from "../../texts/Texts";
import {Fetches} from "../../fetches/Fetches";
import {StoreAssets} from "../../structs/StoreAssets";
import {useDispatch} from "react-redux";
import {SetAssetsStore} from "../../store/action_creator/CatalogStoreActions";

const AllStores = () => {
    const dispatch=useDispatch()
    const [assetStores, setAssetStores] = useState<StoreAssets[] | null>(null)
    useEffect(() => {
        Fetches.GetAllAssetsStores().then(sts => {
            if (!(sts instanceof Error) &&sts.length>0) {

                setAssetStores(() => sts)
                // @ts-ignore
                dispatch(SetAssetsStore(sts[0]))
            }
        })
    }, [])

    const onClickStoreName=(asSt:StoreAssets)=>{
        console.log(asSt)
        // @ts-ignore
        dispatch(SetAssetsStore(asSt))

    }

    return (
        <div className={cl.wrapper_allStores}>
            <label>{StoresText.AllStoresLabel}</label>
            {assetStores
                ?assetStores.map((st:StoreAssets)=><span onClick={()=>onClickStoreName(st)} key={"asst_"+st.item.uuid}>{st.item.name}</span>)
                :false

            }

        </div>
    );
};

export default AllStores;