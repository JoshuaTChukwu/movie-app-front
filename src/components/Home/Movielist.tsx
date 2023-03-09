import React, { Component, useEffect } from 'react';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import { AllMovieList } from '../../types/MovieType';
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
  handleClick(search:string){

  }
  
  render(){
    return(
      <div>
        <HomeNav></HomeNav>

      </div>
    

)}};

export default MovieList;
