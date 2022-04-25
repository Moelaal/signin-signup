import {useRef ,useContext} from 'react'
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
const ProfileForm = () => {
  const history = useHistory()
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) =>{
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBihE81Q9lm7myKupD4egbB80oqBxdET6M',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredPassword,
        returnSecureToken: false
      }
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    ).then(res =>{
      /// succeded 
      history.replace('/')
    })
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="8" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
