import React, { Component, CSSProperties, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import call from '../../endpoints/calls';
import MovieCall from '../../endpoints/MovieCall';
import HomeNav from './Home';
import styles from './Home.module.css';

interface DasboardProps {}
interface DashboardState{
    boxes: string[],
    loading:boolean 
}

class Dashboard extends Component<DasboardProps, DashboardState>{ 
 
  constructor(props: DasboardProps, private apiCall : MovieCall) {
    super(props);
    this.state ={
        boxes :[],
        loading:true
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
    this.setState({... this.state,boxes:call.queries,loading:false})
   

    
    return

  }
  handleClick(search:string){
    window.location.href =`movies?t=${search}`

  }
  override: CSSProperties = {
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",
    color: "white",background: "#666666", opacity: ".8",
    zIndex: 1000,
  };
  
  render(){
    return(
        <div className={this.state.loading ? styles.parentDisable : ''}>
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

export default Dashboard;
