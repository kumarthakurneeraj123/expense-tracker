import React,{Fragment, useRef, useContext} from 'react';
import { authContext } from '../../store/Auth-Context';
import classes from './login.module.css';
import { useHistory } from 'react-router-dom';

const LogIn = ()=>{
    const history = useHistory();
    const authCtx = useContext(authContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
        method:'POST',
        headers:{
        'Content-Type':'application/json',
    },
        body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword
        }),
        returnSecureToken:true
        }).then((res)=>{
            if(res.ok){
                alert('Log in successfully!');
                return res.json();
            }else{
                return res.json().then((data)=>{
                    let errorMessage = 'Authentication failed';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then((data)=>{
            authCtx.login(data.idToken);
            history.replace('/');
        }).catch(err=>alert(err));
        
    }
    return (
        <Fragment>
            <form className={classes.login} onSubmit={submitHandler}>
            <div className={classes['login--div']}>
                Login
            </div>
            <div className={classes.control}>
                <label>Email</label>
                <input ref={emailRef} type ='email' placeholder='email' required />
            </div>
            <div className={classes.control}>
                <label>Password</label>
                <input ref={passwordRef} type ='password' placeholder='password' required />
            </div>
            <div className={classes.button}>
                <button>Login</button>
            </div >
            <a href='/'>Forgot Password</a>
            </form>
            
        </Fragment>
    );
}

export default LogIn;