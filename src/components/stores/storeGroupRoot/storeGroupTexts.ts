import {GuiTextTitle} from "../../../structs/App";


type storeGroupTexts={
    MAKE_SUB_GROUP:GuiTextTitle
    MAKE_GROUP_ITEM:GuiTextTitle
    MODIFY_STORE_GROUP:GuiTextTitle
    CURRENT_SELECTED_GROUP:GuiTextTitle
}

export const StoreGroupGui:storeGroupTexts={
    MAKE_GROUP_ITEM: {
        text:"создать подразделение",
        title:"создать наименование для ТМЦ"
    },
    MAKE_SUB_GROUP: {
        text:"создать подгруппу",
        title:"создать подгруппу в текущей группе"

    },
    MODIFY_STORE_GROUP:{
        text:"",
        title:"Изменить"
    },
    CURRENT_SELECTED_GROUP:{
        text:"Текущee подразделение",
        title:"Текущая выбранная группа"
    }

}