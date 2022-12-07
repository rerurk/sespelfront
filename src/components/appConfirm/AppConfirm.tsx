import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./AppConfirm.module.css"

let accF: Function | null
let canF: Function | null
let confirmText:string

export function SetConfirmText(t:string) {
confirmText=t
    ShowAppConfirm()
}
export function SetAccept(f: Function) {
    accF = f
}

export function SetCancelFunc(f: Function) {
    canF = f
}



let showF:(s:boolean)=>void|null
let v:boolean

export function ShowAppConfirm(){

    if (showF){
        console.log("ShowAppConfirm")
        showF(true)
    }
}


const AppConfirm: FC = () => {
    let showClass: string
    const [visible, setVisible] = useState<boolean>(true)
    showF=setVisible
    v=visible
    if (visible) {
        if (accF) {
            accF()

        }
        showClass = cl.wrapper
    } else {
        if (canF) {
            canF()
        }
        showClass = cl.wrapper_hidden
    }

    function onAcceptClick() {

        setVisible(() => !visible)
    }

    function onCancelClick() {
        setVisible(() => !visible)

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