import {TMakeNewAsset} from "../structs/Asset";
export type TestFields ={
   IsOk:boolean,
   Msg:string
}
export class TestItems {
    public static TestNewAsset(asset:TMakeNewAsset):TestFields{
        console.log(asset)
        let test:TestFields={
           IsOk:true,
            Msg:""
        }
        if(asset.init_fields.serial_number==""){
            console.log(asset.init_fields.serial_number.length);
        }
        if(!(asset.init_fields.serial_number==null)&&asset.init_fields.serial_number.length<6){
            test.IsOk=false
            test.Msg='Короткий серийный номер. Номер должен иметь 6 символов'
        }
        return test
    }
}
export default TestItems