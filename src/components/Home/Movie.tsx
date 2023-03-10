import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { Component, CSSProperties, useEffect } from 'react';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import HomeNav from './Home';
import styles from './Home.module.css';
import { MovieSingle } from '../../types/MovieType';
import ClipLoader from 'react-spinners/ClipLoader';

interface MovieProps {}
interface MovieState{
    movie : MovieSingle,
    loading :boolean
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
      },
      loading:true
    
    
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
   override: CSSProperties = {
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",
    color: "white",background: "#666666", opacity: ".8",
    zIndex: 1000,
  };
  
  async callList(id:string){
    var call = await this.apiCall.getSingleMovie(id);
    if(call.status.isSuccess == false){
        Swal.fire("Error",call.status.friendlyMessage,"error")
        return
    }
    this.setState({... this.state,movie:call.response, loading:false})
   

    
    return

  }
   
  
  
  render(){
    
    
      function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
          throw new Error('Function not implemented.');
      }

    return(
      <div className={this.state.loading ? styles.parentDisable : ''}>
        <HomeNav></HomeNav>
        <header>
    <h1>{this.state.movie.title}</h1>
  </header>
        <main>
        <div className={styles.section}>
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
    </div>
    </main>
    <ClipLoader
       
        loading={this.state.loading}
        color="#white"
        cssOverride={this.override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      </div>
    

)}};


export default Movie;
