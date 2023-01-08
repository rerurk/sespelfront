import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./assetsList.module.css"
import {NomenclItemAndHisUUIDS, uuid_time} from "../../structs/Asset";
import CloseBt from "../UI/closeBt/CloseBt";
import AssetListView, {TAssetListView} from "./assetListView";
import {ExtendedItem} from "../../structs/App";


interface AssetsListProps {
    n: NomenclItemAndHisUUIDS[]
    store: ExtendedItem;
    close: () => void
}


const AssetsList: FC<AssetsListProps> = ({n, store, close}) => {
    const [list, setList] = useState<TAssetListView[] | null>(null)

    useEffect(() => {
        if (!list) {
            setList(makeList())
        }
    })

    function makeList(): TAssetListView[] {
        let tempList: TAssetListView[] = []
        n.forEach((niu: NomenclItemAndHisUUIDS) => {
            niu.uuid_times.forEach((v: uuid_time) => {
                let list_item: TAssetListView = {
                    nomenclatureName: niu.nomencl_item.name,
                    uuid: v.uuid,
                    time: v.time,

                }
                tempList.push(list_item)
            })
        })

        return tempList

    }

    function sortListByDate() {
        if (list) {
            var tList: TAssetListView[] = [...list]
            tList.sort((a, b) => {
                if (a.time > b.time) {
                    return -1
                } else {
                    return 1
                }
            })
            setList(() => tList)
        }

    }

    function sortListByName() {
        if (list) {
            var tList: TAssetListView[] = [...list]
            tList.sort((a, b) => {
                if (a.nomenclatureName > b.nomenclatureName) {
                    return 1
                } else {
                    return -1
                }
            })
            setList(() => tList)
        }
    }


    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
            <div className={cl.wrapper_list}>
                <div className={cl.wrapper_storeName}>
                    <span>Склад: {store.name}</span>
                    {
                        n.length == 1 ? <span>Наименование: {n[0].nomencl_item.name}</span> : false
                    }
                    <CloseBt close={() => close()}/>
                </div>
                <div className={cl.wrapper_list_head}>
                    <div className={cl.wrapper_list_head_n}>
                        №
                    </div>
                    <div className={cl.wrapper_list_head_name} onClick={() => sortListByName()}>
                        наименование
                    </div>
                    <div className={cl.wrapper_list_head_time} onClick={() => sortListByDate()}>
                        дата перемещения (гггг.мм.чч)
                    </div>
                    <div className={cl.wrapper_printing}>
                        на печать
                    </div>

                </div>
                <div className={cl.wrapper_list_assets}>
                    {list
                        ? list.map((v: TAssetListView, ind: number) =>
                            <div key={"AssetListView_wrapper" + v.uuid}>
                                <AssetListView a={v} ind={ind + 1} key={"AssetListView_" + v.uuid}/>
                            </div>
                        )
                        : false

                    }
                </div>

            </div>

        </div>
    );
};

export default AssetsList;