import {GuiTextTitle} from "../../structs/App";

type texts={
    MAKE_SUB_GROUP:GuiTextTitle
    MAKE_GROUP_ITEM:GuiTextTitle
    MODIFY_NOMENCLATURE_GROUP:GuiTextTitle
    CURRENT_SELECTED_GROUP:GuiTextTitle
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
    CURRENT_SELECTED_GROUP:{
        text:"Текущая группа",
        title:"Текущая выбранная группа"
    }

}