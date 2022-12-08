import {Asset} from "./Asset";
// она нужна что бы отправить с картинкой
export type NewAsset={
    NewAsset:Asset,
    Image:Array<any>
}