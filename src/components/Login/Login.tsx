import React, { Component, FC, useEffect } from 'react';
import logo from '../../assets/logo.png'
import styles from './Login.module.css';
import {authCall} from '../../endpoints/authCall'
import { LoginType } from '../../types/AuthType';
import call from '../../endpoints/calls';
import Swal from 'sweetalert2';
import {  NavigateFunction, useNavigate  } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoginProps   {
  navigate: NavigateFunction;
}
interface LoginState{
  email : string,
  password : string,
  loading : boolean,
  isAuthenticated: boolean,
  shouldVerify : boolean,
  color :string
}

class Login extends Component<LoginProps,LoginState>  {
  
  constructor(props : LoginProps, private apiCall : authCall) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      isAuthenticated: false,
      shouldVerify: false,
      color :"#ffffff"
    };
     
    this.apiCall = new authCall(new call())
      
  }
  handleChange = (e:any) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

   handleSignIn = async() => {
    this.setState({
      ...this.state,
      loading :true
    })
    const { password , email } = this.state;
    const request : LoginType ={
      userName :email,
      password : password
    }

    
    
    const sendCall =await this.apiCall.signIn(request);
    if(sendCall.isSuccess == false){
      this.setState({
        ...this.state,
        loading :false
      })
      Swal.fire("Error",sendCall.friendlyMessage,"error")
    }
    this.setState({
      ...this.state,
      loading :false
    })
    this.props.navigate("/dashboard")
  
  
  };
  render(){
    console.log(this.state);
    
  return (

      <div className={styles.signInContainer}>
      <div className={styles.signInLogoContainer}>
        <img src={logo} alt="Logo" className={styles.signInLogo} />
        <div className={styles.signInLogoText}>Your Cinema aid</div>
      </div>
      <div className={styles.signInFormContainer}>
        <div className={styles.signInFormHeader}>Sign In</div>
        <div className={styles.signInFormInputContainer}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => this.handleChange(e)}
            className={styles.signInFormInput}
          />
        </div>
        <div className={styles.signInFormInputContainer}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => this.handleChange(e)}
            className={styles.signInFormInput}
          />
        </div>
        <button onClick={this.handleSignIn}  className={styles.signInFormButton}>
          Sign In
        </button>
      </div>
      <div className={styles.signInWatermarkContainer}>
        <div className={styles.signInWatermarkText}>Watermark Text</div>
      </div>
      <ClipLoader
        color={this.state.color}
        loading={this.state.loading}
        
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>

)
}};

function WithLoginNavigate(props: LoginProps): JSX.Element {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}


export default WithLoginNavigate;

