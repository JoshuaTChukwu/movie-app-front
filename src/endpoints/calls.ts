import axios from "axios";
import {configs} from "../cofig"
export default class call{
    postWithoutAuth(url: string,body:any){
        console.log(configs.api);
        
        var res = axios.post(configs.api +url,body);
        console.log(res);
        return res;

    }
    
}