import { AuthResponse, LoginType, StatusFormat } from "../types/AuthType";
import Call from "./calls"

export  class authCall{
   
    constructor(private apiCall:Call) {
   

    }

 async signIn(body: LoginType):Promise<StatusFormat>{
    console.log("chk");
    
    const login = await this.apiCall.postWithoutAuth("users/login",body);
    const  status:StatusFormat = {
        isSuccess : login.status.isSuccess,
        friendlyMessage :login.status.friendlyMessage
    }
    console.log(status);
    
      if(status.isSuccess){
this.setLocalStorage("token",login.token)
      } 
   
    return status;
    

}

setLocalStorage(key: string, value:string){
    localStorage.setItem(key,value) 
}
}