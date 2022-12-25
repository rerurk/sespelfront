import {GuiTextTitle} from "../../structs/App";

type texts={
    MAKE_SUB_GROUP:GuiTextTitle
    MAKE_GROUP_ITEM:GuiTextTitle
    MODIFY_NOMENCLATURE_GROUP:GuiTextTitle
    NOMENCLATURE_SELECTED_GROUP:GuiTextTitle
    NOMENCLATURE_SELECTED_ITEM:GuiTextTitle
}

export const NomenclatureGui:texts={
    MAKE_GROUP_ITEM: {
        text:"создать наименование",
        title:"создать наименование для ТМЦ"
    },
    MAKE_SUB_GROUP: {
        text:"создать подгруппу",
        title:"создать подгруппу в текущей группе"

    },
    MODIFY_NOMENCLATURE_GROUP:{
        text:"",
        title:"Изменить"
    },
    NOMENCLATURE_SELECTED_GROUP:{
        text:"Текущая группа",
        title:"Текущая выбранная группа"
    },
    NOMENCLATURE_SELECTED_ITEM:{
        text:"Выбранный товар",
        title:""
    }

}