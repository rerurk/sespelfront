import {Requests} from "../fetches/Requests";


export class DataLoader {
   public static async getItems():Promise<any> {
       let response = await fetch(Requests.GET_STORE_GROUP_ROOT,{
           method: 'get',
           headers: {
               'Content-Type': 'application/json;charset=utf-8',
           },


       });


        // скачиваем как Blob-объект
       return await response.arrayBuffer()

   }
}