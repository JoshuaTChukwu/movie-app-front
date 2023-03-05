import axios from "axios";
import {configs} from "../cofig"
export default class call{
   async postWithoutAuth(url: string,body:any){
       
        
        var res = await axios.post(configs.api +url,body).then((response)=> response.data).catch(err=> err.response.data);
        console.log(res);
        return res;

    }
    async getWithAuth(url:string){
        const token = localStorage.getItem("token")??""
        var res = await axios.get(configs.api +url,{headers: {
            'Authorization': `Bearer ${token}` 
          }}).then((response)=> response.data).catch(err=>  err.response.data);
    }
    
}