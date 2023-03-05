import React, { FC, useState } from 'react';
import logo from '../../assets/logo.png'
import styles from './Login.module.css';

interface LoginProps {
  onLogin : (email: string, password: string)=> void;
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    onLogin(email, password);
  };
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.signInFormInput}
          />
        </div>
        <div className={styles.signInFormInputContainer}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.signInFormInput}
          />
        </div>
        <button  className={styles.signInFormButton}>
          Sign In
        </button>
      </div>
      <div className={styles.signInWatermarkContainer}>
        <div className={styles.signInWatermarkText}>Watermark Text</div>
      </div>
    </div>

)
};

export default Login;
