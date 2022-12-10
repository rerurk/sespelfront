import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetsStorages.module.css"
import CreateNewStorage from "./CreateNewStorage";
const AssetsStorages:FC = () => {
    return (
        <div className={cl.wrapper}>

            <CreateNewStorage/>
        </div>
    );
};

export default AssetsStorages;