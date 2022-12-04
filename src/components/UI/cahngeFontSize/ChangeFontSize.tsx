import React, {FC, useEffect} from 'react';
// @ts-ignore
import cl from "./ChangeFontSize.module.css"
const step:number=5


const ChangeFontSize:FC = () => {

    let def:number=60
    let maxS:number=Math.max(window.innerHeight,window.innerWidth)
    useEffect(()=>{
        change(0)
    })
    function change(n:number) {
         def=def+n

        let h = document.getElementsByTagName('html')[0]

        h.style.fontSize = Math.floor(maxS/ (def)) + 'px'
    }
    return (
        <div className={cl.wrapper}>
            <button onClick={()=>change(+step)}>-</button>
            <button onClick={()=>change(-step)}>+</button>

        </div>
    );
};

export default ChangeFontSize;