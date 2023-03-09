import React, { Component, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
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
    super(props);
    // this.state ={
    //     boxes :[]
    // }
    this.apiCall = new MovieCall(new call());

 
  }
  componentDidMount() {
    // This is equivalent to the useEffect with an empty array as a dependency
    // It only runs once, after the component has mounted
    const fetchData = async () => {
      await this.callList(); 
    }
    fetchData()
  }
  async callList(){
    var call = await this.apiCall.getSearchedMovie();
    if(call.status.isSuccess == false){
        Swal.fire("Error",call.status.friendlyMessage,"error")
        return
    }
    
   

    
    return

  }

   handleInputChange = (event: any) => {
    this.setState({... this.setState, title : event.target.value})
  };
   handleSubmit = async () => {
    const request : SearchQuery = {
        Page : this.state.pageNumber,
        SearchValue : this.state.title
    }
    
    
  };
  
  render(){
    
    
    return(
      <div>
        <HomeNav></HomeNav>
        <h1>Movie Search</h1>

        <div className={styles.searchContainer}>
  <input type="text" placeholder="Search..." onChange={(e) => this.handleInputChange(e)}/>
  <button type="submit"><i className="fas fa-search"></i></button>
</div>

      </div>
    

)}};

export default MovieList;
