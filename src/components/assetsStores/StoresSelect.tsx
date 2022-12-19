import React, {useEffect, useState} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css"
import {StoresText} from "../../texts/Texts";
import {Fetches} from "../../fetches/Fetches";
import {StoreAssets} from "../../structs/StoreAssets";
import {useDispatch} from "react-redux";
import {SetAssetsStore} from "../../store/action_creator/AppStoreActions";

let selectStore: StoreAssets

const StoresSelect = () => {
    const dispatch = useDispatch()
    const [assetStores, setAssetStores] = useState<StoreAssets[] | null>(null)
    useEffect(() => {
        Fetches.GetAllAssetsStores().then(sts => {
            if (!(sts instanceof Error) && sts.length > 0) {

                setAssetStores(() => sts)
                // @ts-ignore
                dispatch(SetAssetsStore(sts[0]))
            }
        })
    }, [])

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value)
        if (assetStores) {

        let asSt: StoreAssets | undefined = assetStores.find((store:StoreAssets)=>store.item.name==event.currentTarget.value)
            if (asSt){
                // @ts-ignore
                dispatch(SetAssetsStore(asSt))
            }
    }
    }

    const onClickStoreName = (asSt: StoreAssets) => {
        console.log(asSt)


    }
    if (assetStores) {
        return (

            <div className={cl.wrapper_allStores}>
                <label>{StoresText.SelectStoreLabel}</label>
                <select onChange={event => onSelectChange(event)}>

                    {
                        assetStores.map((st: StoreAssets) =>
                            <option
                                value={st.item.name}

                                key={"asst_" + st.item.uuid}>
                                {st.item.name}
                            </option>)


                    }
                </select>

            </div>
        );
    }
    return (<></>)
};

export default StoresSelect;