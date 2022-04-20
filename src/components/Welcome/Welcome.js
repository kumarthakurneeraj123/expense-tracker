import { useHistory } from 'react-router-dom';
import React,{Fragment} from 'react';
import classes from './welcome.module.css';





const Welcome = (props)=>{
   
    const history = useHistory();
    const clickHandler=()=>{
        console.log('In clickHandler');
     history.replace('/profile');
    }
    return<Fragment>
        <div className={classes.div}>
    <h1>Welcome to expense tracker!!!</h1>
    <span>Your profile is incomplete<button onClick={clickHandler}>Complete Now</button></span>
    </div>
   
    </Fragment>
}
export default Welcome;