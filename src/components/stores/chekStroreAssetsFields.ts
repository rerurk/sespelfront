
import {EmptyField} from "./StoreView";
import {TAddress} from "../UI/address/Address";

export function CheckAddressFields(address:TAddress):boolean {
   return !(
       address.region==EmptyField
       ||address.reg_ind==EmptyField
       ||address.phone==EmptyField
       ||address.street==EmptyField
       ||address.city==EmptyField


   )

}