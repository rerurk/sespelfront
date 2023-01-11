import {NewImageFile} from "../components/imageRedactor/ImageRedactor";

export type GuiTextTitle = {
    text: string,
    title: string
}

export type Item = {
    id: number
    name: string
    type: number
    uuid: string
    owner_uuid: string | null
    serial_number?: string
}

export interface ExtendedItem extends Item {
    id: number
    name: string
    type: number
    uuid: string
    owner_uuid: string | null

    ownerItem: ExtendedItem | null
    items: ExtendedItem[] | null
    callReBoot?: Function
    callShow?: Function
    isOpen?: boolean
}

export type  TransferItem = {
    from: Item
    to: Item
    item: Item
}

export type RenameItem = {
    new_item: Item
    renamed_item: Item,


}

export type RenameNomenclatureItem = {
    new_item: Item
    renamed_item: Item,
    new_img: NewImageFile | null


}

export type StrUUID = {
    uuid: string
}

export type RemoveItem = {
    remove_from_item: Item,
    removed_item: Item
}

export type AddToItem = {
    adding_item: Item,
    to_add_item: Item
}

export type AddNomenclatureItem = {
    adding_item: Item,
    to_add_item: Item,
    item_img: NewImageFile | null
}

export type USRAuth = {
    login: string,
    pass: string
}
export type AuthRes = {
    is_auth: boolean
}
