import { type } from "os";
import config from "dotenv"

export const configs: configType={
    
 api : process.env.API_URL??""
}
type configType ={
  api : string 
}