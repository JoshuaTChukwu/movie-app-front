import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { Component, useEffect } from 'react';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import HomeNav from './Home';
import styles from './Home.module.css';
import { MovieSingle } from '../../types/MovieType';

interface MovieProps {}
interface MovieState{
    movie : MovieSingle
}

class Movie extends Component<MovieProps, MovieState>{ 
  
  constructor(props: MovieProps, private apiCall : MovieCall) {
  
    super(props);
    this.state ={
      movie : {
        title: '',
    year: '',
    rated: '',
    released: '',
    runtime: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    poster: '',
    ratings: [],
    metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    type: '',
    dvd: '',
    boxOffice: '',
    production: '',
    website: '',
    response: ''
      }
    
     }
    this.apiCall = new MovieCall(new call());

 
  }
  componentDidMount() {
   
    const fetchData = async () => {
     const id = (new URLSearchParams(window.location.search)).get("omdb")??''
      await this.callList(id);
    }
    fetchData()
  }
  
  async callList(id:string){
    var call = await this.apiCall.getSingleMovie(id);
    if(call.status.isSuccess == false){
        Swal.fire("Error",call.status.friendlyMessage,"error")
        return
    }
    this.setState({... this.state,movie:call.response})
   

    
    return

  }
   
  
  
  render(){
    
    
      function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
          throw new Error('Function not implemented.');
      }

    return(
      <div>
        <HomeNav></HomeNav>
        <section>
      <img className="movie-poster" src={this.state.movie.poster} alt="Movie Poster"/>
      <div className={styles.movieInfo}>
        <h2>Movie Details</h2>
        <ul>
          <li><strong>Release Date:</strong> {this.state.movie.released}</li>
          <li><strong>Runtime:</strong> {this.state.movie.runtime}</li>
          <li><strong>Genres:</strong> {this.state.movie.genre}</li>
          <li><strong>Director:</strong> {this.state.movie.director}h</li>
          <li><strong>Writers:</strong> {this.state.movie.writer}</li>
          <li><strong>Stars:</strong> {this.state.movie.actors}</li>
          <li><strong>Plot:</strong> {this.state.movie.plot}</li>
        </ul>
      </div>
    </section>


      </div>
    

)}};


export default Movie;
