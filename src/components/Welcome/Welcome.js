import { useHistory } from 'react-router-dom';
import React,{Fragment, useContext} from 'react';
import classes from './welcome.module.css';
import { authContext } from '../../store/Auth-Context';
import Expenses from '../Expenses/Expenses';





const Welcome = (props)=>{
    const authCtx = useContext(authContext);
   
    const history = useHistory();
    const logoutHandler = ()=>{
        authCtx.logout();
        history.replace('/login');
    }
    const clickHandler=()=>{
     history.replace('/profile');
    }
    return<Fragment>
        <div className={classes.div}>
    <h1>Welcome to expense tracker!!!</h1>
    <span>Your profile is incomplete<button onClick={clickHandler}>Complete Now</button></span>
    <button onClick={logoutHandler} >Logout</button>
    </div>
    {<Expenses/>}
    </Fragment>
}
export default Welcome;