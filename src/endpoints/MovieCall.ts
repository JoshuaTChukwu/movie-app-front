import { StatusFormat } from "../types/AuthType";
import { AllMovieRes, AllMovieResObj, MovieSingleObj, QueriesSearched, SearchQuery } from "../types/MovieType";
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

    async searchMovies(request :SearchQuery) : Promise<AllMovieResObj>{
        const url = `users/search/movie/get?SearchValue=${request.SearchValue}&Page=${request.Page}`
        const movies = await this.api.getWithAuth(url);
        const status :StatusFormat = {
            isSuccess : movies.status.isSuccess,
            friendlyMessage : movies.status.friendlyMessage
        }
        var result: AllMovieResObj = {
            response : {
                hasNext :false,
                hasPrev: false,
                page: request.Page,
                search :[]
            },
            status :status
        }
        if(status.isSuccess){
            const list :AllMovieRes = {
               search : movies.response.search,
               hasNext: movies.response.hasNext,
               hasPrev : movies.response.hasPrev,
               page : movies.response.page, 
            } 
            result.response = list
        }
        return result;
        
    }
    async getSingleMovie(request:string) : Promise<MovieSingleObj> {
        const url = `users/single/movie/get?OmdbId=${request}`
        const movies = await this.api.getWithAuth(url);
        
        const status :StatusFormat = {
            isSuccess : movies.status.isSuccess,
            friendlyMessage : movies.status.friendlyMessage
        }
        const response: MovieSingleObj = {
            response : movies.response,
            status : status
        }
        return response
        
    }
}