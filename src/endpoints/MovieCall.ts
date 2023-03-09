import { StatusFormat } from "../types/AuthType";
import { QueriesSearched } from "../types/MovieType";
import Call from "./calls"
export default class MovieCall {


    constructor(private api :Call) {
     
        
    }
    async getSearchedMovie() : Promise<QueriesSearched>{
        const queries = await this.api.getWithAuth("users/latest/searched/get");
        const status :StatusFormat = {
            isSuccess : queries.status.isSuccess,
            friendlyMessage : queries.status.friendlyMessage
        } 
        var queryList : string[] = [];
        if(status.isSuccess){
           queryList = queries.queries
        }
        const response: QueriesSearched ={
            queries : queryList,
            status : status
            
        }
        return response;

    }
}