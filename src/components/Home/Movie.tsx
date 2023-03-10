import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { Component, useEffect } from 'react';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import HomeNav from './Home';
import styles from './Home.module.css';

interface MovieProps {}
interface MovieState{
    
}

class Movie extends Component<MovieProps, MovieState>{ 
  
  constructor(props: MovieProps, private apiCall : MovieCall) {
    let title = (new URLSearchParams(window.location.search)).get("t")??'';
    super(props);
    this.state ={
    
     }
    this.apiCall = new MovieCall(new call());

 
  }
  componentDidMount() {
   
    const fetchData = async () => {
       
      
    }
    fetchData()
  }
  

   
  
  
  render(){
    
    
      function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
          throw new Error('Function not implemented.');
      }

    return(
      <div>
        <HomeNav></HomeNav>
        <section>
      <img className="movie-poster" src="https://example.com/poster.jpg" alt="Movie Poster"/>
      <div className={styles.movieInfo}>
        <h2>Movie Details</h2>
        <ul>
          <li><strong>Release Date:</strong> January 1, 2023</li>
          <li><strong>Runtime:</strong> 120 minutes</li>
          <li><strong>Genres:</strong> Action, Adventure</li>
          <li><strong>Director:</strong> John Smith</li>
          <li><strong>Writers:</strong> Jane Doe, Tom Johnson</li>
          <li><strong>Stars:</strong> John Doe, Jane Smith, Tom Johnson</li>
          <li><strong>Plot:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
        </ul>
      </div>
    </section>


      </div>
    

)}};


export default Movie;
