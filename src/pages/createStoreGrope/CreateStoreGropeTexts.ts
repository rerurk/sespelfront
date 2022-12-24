import {GuiTextTitle} from "../../structs/App";

type texts={
    BT_MAKE:GuiTextTitle
    BT_CANCEL:GuiTextTitle
    GROUP_LABEL:GuiTextTitle
    SUB_GROUP_LABEL:GuiTextTitle
}
export const CreateStoreGropeTexts:texts={
    GROUP_LABEL:{
      text:"ГРУППА",
      title:""
    },
    SUB_GROUP_LABEL:{
        text:"наименование создоваемой подгруппы",
        title:""
    },
    BT_MAKE:{
        text:"создать",
        title:"создать ТМЦ"
    },
    BT_CANCEL:{
        text:"отмена",
        title:"вернуться"
    }
}