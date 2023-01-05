import React, {FC} from 'react';
// @ts-ignore
import cl from "./BtImg.module.css"


interface BtImgProps {
    onBtClick:()=>void
    classN?:string
    imgURL:string
    text:string
}
let clN:string
const BtImg:FC<BtImgProps> = ({onBtClick,imgURL,text,classN}) => {
    if(classN){
        clN=classN
    }else {
        clN=cl.wrapper
    }
    return (
        <div className={clN}
        onClick={()=>onBtClick()}
        >
            <img alt={""} src={imgURL}/>
            <span>{text}</span>
        </div>
    );
};

export default BtImg;