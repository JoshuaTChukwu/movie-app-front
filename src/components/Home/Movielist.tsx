import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { Component, CSSProperties, useEffect } from 'react';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import { AllMovieList, SearchQuery } from '../../types/MovieType';
import HomeNav from './Home';
import styles from './Home.module.css';
import { ClipLoader } from 'react-spinners';

interface MovieListProps {}
interface MovieListState{
    title: string,
    list:AllMovieList[],
    hasPrev : boolean,
    hasNext : boolean,
    pageNumber :number,
    loading:boolean
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
     hasPrev :false,
     loading:false
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
    this.setState({...this.state, loading:true})
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
        list : movies.response.search,
        loading:false
    })

    return
  };
  override: CSSProperties = {
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",
    color: "white",background: "#666666", opacity: ".8",
    zIndex: 1000,
  };
  handleClick = (event: any)=>{
    window.location.href = `movie?omdb=${event}`
    

  }  
  render(){
    
    
      function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
          throw new Error('Function not implemented.');
      }

    return(
      <div className={this.state.loading ? styles.parentDisable : ''}>
        <HomeNav></HomeNav>
        <h1>Movie Search</h1>

        <div className={styles.searchContainer}>
  <input type="text" value={this.state.title} placeholder="Search..." onChange={(e) => this.handleInputChange(e)}/>
  <button className={styles.button} onClick={this.handleSubmit}><FontAwesomeIcon icon={faSearch} /></button>
</div>
<ul>
    {
        this.state.list.map((movie)=>(
            <li key={movie.imdbID} className={styles.movieItem} onClick={() =>this.handleClick(movie.imdbID)}>
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


export default MovieList;
