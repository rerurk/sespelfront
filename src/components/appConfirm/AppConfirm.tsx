import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./AppConfirm.module.css"


let confirmText:string




let showF:(s:boolean)=>void
let v:boolean


console.log("TEST")
export function ShowAppConfirm(t:string,acceptF:Function,cancelF:Function){
    confirmText=t
    if (showF){
        showF(true)
    }

}

function onAcceptClick():boolean {
    console.log("onAcceptClick")
    showF( false)
    return true
}

function onCancelClick():boolean {
    showF(false)
   return false
}


const AppConfirm: FC = () => {
    let showClass: string
    const [visible, setVisible] = useState<boolean>(false)
    showF=show
    v=visible

    if (visible) {

        showClass = cl.wrapper
    } else {

        showClass = cl.wrapper_hidden
    }

    function show(v:boolean) {
     setVisible(v)
    }



    return (
        <div className={showClass} onClick={e => e.stopPropagation()}>
            <div className={cl.wrapper_confirm}>
                <div className={cl.wrapper_confirm_text}>
                    <span>{confirmText}</span>
                </div>
                <div className={cl.wrapper_confirm_bts}>
                    <button onClick={onAcceptClick}>OK</button>
                    <button onClick={onCancelClick}>ОТМЕНА</button>
                </div>
            </div>

        </div>
    );
};

export default AppConfirm;