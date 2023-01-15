import React, {FC} from 'react';


// @ts-ignore
import  cl from "./Nomenclatures.module.css"

import NomenclatureRoot from "../../components/nomenclatureItemsShow/NomenclatureRoot";


const Nomenclatures:FC = () => {


    return (
        <div className={cl.wrapper}>
             <NomenclatureRoot/>
        </div>
    );
};

export default Nomenclatures;