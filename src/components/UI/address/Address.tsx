import React, {FC} from 'react';
// @ts-ignore
import cl from "./Adress.module.css"
export type TAddress={
    state:string,

}

const Address:FC = () => {
    return (
        <div className={cl.wrapper}>
            <span>Адрес склада</span>

        </div>
    );
};

export default Address;