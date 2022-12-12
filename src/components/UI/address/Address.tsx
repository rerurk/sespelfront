import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./Adress.module.css"

export type TAddress = {
    index: number,
    region: string,
    district: string
    city: string,
    street: string,
    building: string,
    phone: string
}


interface AddressProps {
    address:TAddress
    getAddress:(address:TAddress)=>void
}

let emptyField:string="Не заданно"
const Address: FC<AddressProps> = ({address,getAddress}) => {


    const [add,setAdd]=useState<TAddress>(address)
    useEffect(()=>{
         checkAddressFields(address)
    },[])
    function checkAddressFields(add:TAddress) {
        let a:TAddress=JSON.parse(JSON.stringify(address))
      Object.keys(a).forEach((key:string)=>{
          // @ts-ignore
          if (a[key]=="" || a[key]===0){
                 // @ts-ignore
              a[key]=emptyField
              // @ts-ignore
              console.log(key,":",a[key])
          }
      }
      )
        setAdd(()=>a)
    }

    const onFieldClick=(e:React.MouseEvent<HTMLInputElement>)=>{

        if (e.currentTarget.value==emptyField){
            e.currentTarget.value=""
        }
    }

    const onFieldChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

        // @ts-ignore
        add[e.target.name]=e.target.value
        //эта фунеция придет из StoreView
        getAddress(add)
    }


    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_field}>
                <label>Индекс</label>
                <input type="text" name="index" defaultValue={add.index} onChange={event => onFieldChange(event)}/>
            </div>
            <div className={cl.wrapper_field} >
                <label>Регион</label>
                <input type="text" name="region" defaultValue={add.region}onChange={event => onFieldChange(event)} onClick={event => onFieldClick(event)}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Район</label>
                <input type="text" name="district" defaultValue={add.district}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Город</label>
                <input type="text" name="city" defaultValue={add.city}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Улица</label>
                <input type="text" name="street" defaultValue={add.street}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Дом</label>
                <input type="text" name="building" defaultValue={add.building}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Телефон</label>
                <input type="text" name="phone" defaultValue={add.phone}/>
            </div>


        </div>
    );
};

export default Address;