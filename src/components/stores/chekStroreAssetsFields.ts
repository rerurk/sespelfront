import {StoreAssets} from "../../structs/StoreAssets";
import {EmptyField} from "./StoreView";

export function CheckStoreFields(store:StoreAssets):boolean {
   return !(store.item.name==EmptyField
       ||store.address.region==EmptyField
       ||store.address.reg_ind==EmptyField
       ||store.address.phone==EmptyField
       ||store.address.building==EmptyField
       ||store.address.street==EmptyField
       ||store.address.city==EmptyField


   )

}