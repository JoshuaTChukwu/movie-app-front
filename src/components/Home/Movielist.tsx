import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { Component, useEffect } from 'react';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import { AllMovieList, SearchQuery } from '../../types/MovieType';
import HomeNav from './Home';
import styles from './Home.module.css';

interface MovieListProps {}
interface MovieListState{
    title: string,
    list:AllMovieList[],
    hasPrev : boolean,
    hasNext : boolean,
    pageNumber :number,
}

class MovieList extends Component<MovieListProps, MovieListState>{ 
  
  constructor(props: MovieListProps, private apiCall : MovieCall) {
    let title = (new URLSearchParams(window.location.search)).get("t")??'';
    super(props);
    this.state ={
     title :title,
     list :[],
     hasNext:false,
     pageNumber:1,
     hasPrev :false
     }
    this.apiCall = new MovieCall(new call());

 
  }
  componentDidMount() {
   
    const fetchData = async () => {
        if(this.state.title != ''){
            this.handleSubmit()
        }
      
    }
    fetchData()
  }
  

   handleInputChange = (event: any) => {
    this.setState({... this.setState, title : event.target.value})
  };
   handleSubmit = async () => {
    const request : SearchQuery = {
        Page : this.state.pageNumber,
        SearchValue : this.state.title
    }
    var movies = await this.apiCall.searchMovies(request);
    if(movies.status.isSuccess == false){
        Swal.fire("Error",movies.status.friendlyMessage,"error")
        return
    }
    this.setState({
        ...this.state,
        hasPrev : movies.response.hasPrev,
        hasNext: movies.response.hasNext,
        list : movies.response.search
    })

    return
  };
  
  render(){
    
    
      function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
          throw new Error('Function not implemented.');
      }

    return(
      <div>
        <HomeNav></HomeNav>
        <h1>Movie Search</h1>

        <div className={styles.searchContainer}>
  <input type="text" placeholder="Search..." onChange={(e) => this.handleInputChange(e)}/>
  <button className={styles.button} onClick={this.handleSubmit}><FontAwesomeIcon icon={faSearch} /></button>
</div>
<ul>
    {
        this.state.list.map((movie)=>(
            <li key={movie.imdbID} className={styles.movieItem}>
  <img className={styles.moviePoster} src={movie.poster} alt="Movie Poster"/>
  <div className={styles.movieDetails}>
    <h2 className={styles.movieTitle}>{movie.title}</h2>
    <p className={styles.movieOverview}>{movie.type} - {movie.year}</p>
  </div>
</li>
        )
        )
    }
</ul>


      </div>
    

)}};


export default MovieList;
