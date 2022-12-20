import React, {FC} from 'react';
// @ts-ignore
import cl from "./ModifyNomenclatureGroup.module.css"
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";

const ModifyNomenclatureGroup: FC = () => {
    const navigate = useNavigate();
    const {selectedNomenclatureGroup} = useTypeSelector(state => state.showCatalogNode)
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_fields}>
                <label>Группа:{selectedNomenclatureGroup?.name}</label>
                <label>Называние: </label>
                <input defaultValue={""} key={"MakeNomenclatureGroup_input"}/>
            </div>
            <div className={cl.wrapper_bts}>
                <button onClick={() => navigate(RouterPath.NOMENCLATURE)}>ОТМЕНА</button>
                <button>СОХРАНИТЬ</button>
            </div>
        </div>
    );
};

export default ModifyNomenclatureGroup;