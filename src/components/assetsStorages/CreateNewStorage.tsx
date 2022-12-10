import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetsStorages.module.css"
const CreateNewStorage:FC = () => {
    const onBtCreateNewClick=()=>{
        let res:string|null=window.prompt("Введите наименование склада")
        if (res){

        }
    }
    return (
        <div className={cl.wrapper_CreateNewStorage}>
            <button onClick={()=>onBtCreateNewClick()}>Создать склад</button>
        </div>
    );
};

export default CreateNewStorage;