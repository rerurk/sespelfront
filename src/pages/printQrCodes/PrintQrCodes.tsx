import React, {FC, useState} from 'react';
// @ts-ignore
import cl from './PrintQrCodes.module.css'

import {TAsset} from "../../structs/Asset";
import AssetQRCode from "../../components/assetQRCodeView/AssetQRCode";

interface PrintQrCodesProps {
    assetsToPrint: TAsset[]
    close: () => void
}


const PrintQrCodes: FC<PrintQrCodesProps> = ({assetsToPrint, close}) => {

    const [assetsForPrint, setAssetsForPrint] = useState<TAsset[]>(assetsToPrint)
    const [step, setStep] = useState<number>(assetsToPrint.length)
    const [curInd,setCurInd]=useState<number>(0)
    console.log("curInd:",curInd)
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let quantity: number
        if (e.target.value == "") {
            quantity = assetsToPrint.length
        } else {
            quantity = Number(e.target.value)
            if (quantity > assetsToPrint.length) {
                quantity = assetsToPrint.length
            }
        }

        setAssetsForPrint(() => assetsToPrint.slice(0, quantity))
        setStep(() => quantity)
        setCurInd(()=>0)
        console.log(e.target.value)
    }
    const onNextPress=()=>{
        let ind:number=curInd+step
        if (ind>assetsToPrint.length){
            ind=assetsToPrint.length

        }
        setAssetsForPrint(()=>assetsToPrint.slice(ind, ind+step))
        setCurInd(()=>ind)
        console.log(assetsToPrint.slice(ind, ind+step))

    }
    const onPrevPress=()=>{
        let ind:number=curInd-step
        console.log("onPrevPress:",ind)
        if(curInd-step<1){

            setAssetsForPrint(()=>assetsToPrint.slice(0, step))
            console.log(assetsToPrint.slice(0, step))
            setCurInd(()=>0)
        }else {
        setAssetsForPrint(()=>assetsToPrint.slice(ind-step, ind))
        setCurInd(()=>ind)
        console.log(assetsToPrint.slice(ind, ind+step))
        }
    }

    return (
        <div className={cl.wrapper}>

            <div className={cl.wrapper_printPage} id="qrCodePrint">
                {
                    assetsForPrint.map((as: TAsset) => <AssetQRCode asset={as} key={"wrCodePrint_" + as.asset.uuid}/>)
                }

            </div>
            <div className={cl.wrapper_bts}>
                <button onClick={() => window.print()}>печать</button>
                <button onClick={() => close()}>назад</button>
                <button onClick={onPrevPress} className={curInd-step<0?cl.bt_hide:cl.bt_show} key={"PrintQrCodes_bt_prev"}>&laquo; пред {step}</button>
                <input defaultValue={assetsToPrint.length} key={"PrintQrCodes_q"} onChange={onInputChange}
                       type={"number"}/>
                <button onClick={onNextPress} className={curInd+step>assetsToPrint.length?cl.bt_hide:cl.bt_show} key={"PrintQrCodes_bt_next"}>&raquo; след {step}</button>


            </div>
        </div>
    );
};

export default PrintQrCodes;