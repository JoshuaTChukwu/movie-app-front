import React, { Component, FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './Home.module.css';

interface HomeNavProps {}
interface HomeState {
 
}

class HomeNav extends Component<HomeNavProps, HomeState>{ 
  profileName :string= localStorage.getItem("name")??""
 
  constructor(props: HomeNavProps) {
    super(props);
 
    
  }
  home(){
    window.location.href="dashboard"
  }
  
  render(){
    return(
  
 
     
        <nav className={styles.navbar}>
          <div className={styles.logo} onClick={this.home}>Vee Movies</div>
          <ul className={styles.navLinks}>
          
            <li>Welcome {(this.profileName)}</li>
         
          </ul>
        </nav>
       
     

)}};

export default HomeNav;
