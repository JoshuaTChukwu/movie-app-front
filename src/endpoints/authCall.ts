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
this.setLocalStorage("token",login.token);
var profile = await this.apiCall.getWithAuth("users/profile/get");
   const peofileStatus : StatusFormat = {
        isSuccess : profile.status.isSuccess,
        friendlyMessage :profile.status.friendlyMessage 
        }
        if(peofileStatus.isSuccess){
            this.setLocalStorage("name",profile.profile.fullName);
            this.setLocalStorage("email",profile.profile.email);
            this.setLocalStorage("gender",profile.profile.gender)
        }
      } 
   
    return status;
    

}

setLocalStorage(key: string, value:string){
    localStorage.setItem(key,value) 
}
}