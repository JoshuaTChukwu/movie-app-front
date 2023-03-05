import React, { Component, FC } from 'react';
import logo from '../../assets/logo.png'
import styles from './Login.module.css';
import {authCall} from '../../endpoints/authCall'
import { LoginType } from '../../types/AuthType';
import call from '../../endpoints/calls';
import Swal from 'sweetalert2';

interface LoginProps {

}
interface LoginState{
  email : string,
  password : string,
  loading : boolean,
  isAuthenticated: boolean,
  shouldVerify : boolean
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
    const { password , email } = this.state;
    const request : LoginType ={
      userName :email,
      password : password
    }

    
    
    const sendCall =await this.apiCall.signIn(request);
    if(sendCall.isSuccess == false){
      Swal.fire("Error",sendCall.friendlyMessage,"error")
    }
  };
  render(){
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
    </div>

)
}};

export default Login;

