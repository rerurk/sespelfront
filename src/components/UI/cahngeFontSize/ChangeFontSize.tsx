import React, {FC, useEffect} from 'react';
// @ts-ignore
import cl from "./ChangeFontSize.module.css"
import {Tools} from "../../../tools/Tools";

const step: number = 2


const ChangeFontSize: FC = () => {

    let def: number = 60
    let maxS: number = Math.max(window.innerHeight, window.innerWidth)
    useEffect(() => {
        let tempN:number|null=loadFontSize()
    
        if (tempN){
            def=tempN
            change(0)
        }else{
            saveFrontSize(def)
        }
        return saveFrontSize(def)
    },[])

    function saveFrontSize(n: number) {
        localStorage.setItem("fontSize", String(n))
    }

    function loadFontSize(): number | null {
        let nstr: string | null = localStorage.getItem("fontSize")
        if (nstr) {
            let n: number = Number(nstr)
            return n
        }
        return null

    }

    function change(n: number) {
        def = def + n


        let h = document.getElementsByTagName('html')[0]
        h.style.fontSize = Math.floor(maxS / (def)) + 'px'
        saveFrontSize(def)
    }

    return (
        <div className={cl.wrapper}>
            <button onClick={() => change(+step)}>-</button>
            <button onClick={() => change(-step)}>+</button>

        </div>
    );
};

export default ChangeFontSize;