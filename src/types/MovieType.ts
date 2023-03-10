import { type } from "os"
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
export type AllMovieRes ={
    search : AllMovieList[],
    page : number,
    hasPrev : boolean,
    hasNext : boolean,
}
export type AllMovieResObj ={
    response : AllMovieRes,
    status : StatusFormat
}
export type SearchQuery ={
    SearchValue:string,
    Page :number
}

export type MovieSingle = {
    title: string,
    year: string,
    rated: string,
    released: string,
    runtime: string,
    genre: string,
    director: string,
    writer: string,
    actors: string,
    plot: string,
    language: string,
    country: string,
    awards: string,
    poster: string,
    ratings: MovieRating[],
    metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    type: string,
    dvd: string,
    boxOffice: string,
    production: string,
    website: string,
    response: string
}
export type MovieRating = {
    source: string,
    value: string
  }

