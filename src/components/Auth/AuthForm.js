import { useState,useRef ,useContext } from 'react';
import {useHistory} from 'react-router-dom'
import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../Layout/LoadingSpinner'
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoged,setIsLoged] = useState(false)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) =>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoged(true)
    let url;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBihE81Q9lm7myKupD4egbB80oqBxdET6M'
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBihE81Q9lm7myKupD4egbB80oqBxdET6M'
    }
    fetch(url,{
      method:'POST',
      body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) =>{
      setIsLoged(false)
      if(res.ok){
        return res.json();
      }else{
        return res.json().then((data) =>{
          let errorMessage = 'authinticated failed'
          // if(data && data.error && data.error.message){
          //   errorMessage = data.error.message
          // }

          throw new Error(errorMessage)
        })
      }
    }).then((data) =>{
      authCtx.login(data.idToken);
      history.replace('/');
    }).catch((err)=>{
      alert(err.message);
    })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoged && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoged && <LoadingSpinner/>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;