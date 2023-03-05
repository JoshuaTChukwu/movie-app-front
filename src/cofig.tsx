import { type } from "os";
import env from "react-dotenv";
console.log(process.env);

export const configs: configType={
    
 api : process.env.REACT_APP_API_URL??""
}
type configType ={
  api : string 
}