import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetsStorages.module.css"
import Address from "../UI/address/Address";

interface CreateNewStorageProps {
    classN:string
}

const CreateNewStorage:FC<CreateNewStorageProps> = ({classN}) => {

    return (
        <div className={classN}>
            <div className={cl.wrapper_CreateNewStorage_name}>
                <span>Название новго склада</span>
                <input/>
            </div>
            <Address/>
        </div>
    );
};

export default CreateNewStorage;