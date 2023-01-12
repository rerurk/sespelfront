import {TMakeNewAsset} from "../structs/Asset";
export type TestFields ={
   IsOk:boolean,
   Msg:string
}
export class TestItems {
    public static TestNewAsset(asset:TMakeNewAsset):TestFields{
        let test:TestFields={
           IsOk:true,
            Msg:""
        }

        if((!(asset.init_fields.serial_number==null)&&asset.init_fields.serial_number.length<6)||asset.asset_store==null||asset.asset_nomenclature_item==null){
            test.IsOk=false
            test.Msg=''
        }
        return test
    }
}
export default TestItems