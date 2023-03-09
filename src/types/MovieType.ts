import { StatusFormat } from "./AuthType"

export type QueriesSearched ={
    queries : string[],
    status: StatusFormat
}
export type AllMovieList= {
    title: string,
    year: string,
    imdbID : string,
    type: string,
    poster:string
}