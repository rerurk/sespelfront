import React, {FC, useState} from 'react';
// @ts-ignore
import cl from"./SelectAction.module.css"
interface action {
    name: string
    func: () => void

}
interface SelectActionProps {
    actions:action[];
    showSelect:(arg: boolean)=>void
}

const SelectAction:FC<SelectActionProps> = ({actions,showSelect}) => {
    const [isShow,setIsShow]=useState<boolean>(false)
    showSelect=()=>setIsShow
    if(isShow) {
        return (
            <div className={cl.wrapper}>

            </div>
        );
    }
    return (<></>)
};

export default SelectAction;