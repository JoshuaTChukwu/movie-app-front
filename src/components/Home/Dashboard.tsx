import React, { Component, useEffect } from 'react';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import HomeNav from './Home';
import styles from './Home.module.css';

interface DasboardProps {}
interface DashboardState{
    boxes: string[] 
}

class Dashboard extends Component<DasboardProps, DashboardState>{ 
 
  constructor(props: DasboardProps, private apiCall : MovieCall) {
    super(props);
    this.state ={
        boxes :[]
    }
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
    this.setState({... this.state,boxes:call.queries})
   

    
    return

  }
  handleClick(search:string){

  }
  
  render(){
    return(
        <div>
          <HomeNav></HomeNav>
        <div className={styles.container}>

        <div className={styles.headerDashboard}>    
        <h1>Search History</h1>
        <a href="movies" className={styles.button}> search new movie</a>
        </div>
        <div className={styles.boxContainer}>
          { this.state.boxes.map((box) => (
            <div
              key={box}
              className={styles.box}
              onClick={() => this.handleClick(box)}
            >
              {box}
            </div>
          ))}
        </div>
      </div>
      </div>
    

)}};

export default Dashboard;
