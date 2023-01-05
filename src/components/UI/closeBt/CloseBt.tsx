import React, {FC} from 'react';
// @ts-ignore
import cl from "./CloseBt.module.css"
interface CloseBtProps {
    close:()=>void

}
const CloseBt:FC<CloseBtProps> = ({close}) => {
    return (
        <div onClick={()=>close()} className={cl.wrapper}>
            &#215;
        </div>
    );
};

export default CloseBt;