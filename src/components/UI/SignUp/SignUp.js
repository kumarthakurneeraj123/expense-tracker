import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import React,{Fragment, useRef,} from 'react';
import classes from './SignUp.module.css';
import { authContext } from '../../../store/Auth-Context';


const SignUp = (props)=>{
    const authCtx = useContext(authContext);
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        if(enteredPassword !== enteredConfirmPassword){
            alert('Password and confirm Password did not match!');
        }else{
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
                method:'POST',
                body:JSON.stringify({
                    email:enteredEmail,
                    password:enteredPassword,
                    returnSecureToken:true
                }),
                'Content-Type':'application/json'
            }).then((res)=>{
               if(res.ok){
                   authCtx.signup(true);
                   console.log('User has successfully registered !');
                   alert('User has successfully registered !');
                   history.replace('/login');
                   return res.json();
               }else{
                   return res.json().then((data)=>{
                       let errorMessage = 'Authentication Failed';
                       if(data && data.error && data.error.message)
                            errorMessage = data.error.message;
                       
                       throw new Error(errorMessage);
                   })
               }
            }).catch(err =>alert(err));
        }
    }
    return(
    <Fragment >
        <form className={classes.form} onSubmit={submitHandler}  >
        <div className={classes.signup} >SignUp</div>
        <div className={classes.control}>
        <label >Email</label>
        <input ref={emailInputRef} type='email' placeholder='email' autoComplete='on' required />
        </div>
        <div className={classes.control} >
        <label>Password</label>
        <input ref={passwordInputRef} type='password' placeholder='password' autoComplete='on' required />
        </div>
        <div className={classes.control}>
        <label>Confirm Password</label>
        <input ref={confirmPasswordInputRef} type='password' autoComplete='on' placeholder='Confirm Password' required />
        </div>
        <div className={classes.actions}>
        <button>Sign Up</button>
        </div>
        </form>
        <div className={classes.actions}  >
            <button className={classes.button}>Have an account? Log In</button>
        </div>
    </Fragment>);

}
export default SignUp;