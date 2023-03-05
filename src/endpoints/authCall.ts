import { AuthResponse, LoginType } from "../types/AuthType";
import Call from "./calls"

export  class authCall{
   
    constructor(private apiCall:Call) {
   

    }

 signIn(body: LoginType){
    console.log("chk");
    
    const login = this.apiCall.postWithoutAuth("",body);
    return;
    

}
}