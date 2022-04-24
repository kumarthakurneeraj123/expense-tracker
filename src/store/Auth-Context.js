import React,{useState} from 'react';

export const authContext = React.createContext({
    token:'',
    isSignUp : false,
    isLogIn : false,
    isEmailVerified : false,
    signup:()=>{},
    login:(token)=>{},
    logout:()=>{},
    verifyMail:()=>{}
});

const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('token');
    const initialSignUp = localStorage.getItem('signUp');
    const [mailVerified, setMailVerified] = useState(false);
    const [userIsSignUp, setUserIsSignUp] = useState(initialSignUp);
    const [token, setToken] = useState(initialToken);
    const userIsLogIn = !!token;
    const verifyMail =()=>{
        setMailVerified(true);
    }
    const signUpHandler = (value)=>{
        localStorage.setItem('signUp',value);
        setUserIsSignUp(value);
    }
    const loginHandler = (idToken)=>{
        setMailVerified(true);
        localStorage.setItem('token',idToken);
            setToken(idToken);
    }
    const logoutHandler = ()=>{
        setMailVerified(false);
        localStorage.removeItem('token');
        setToken(null);
    }
    const contextValue ={
        token:token,
        isSignUp:userIsSignUp,
        isLogIn:userIsLogIn,
        isEmailVerified:mailVerified,
        signup:signUpHandler,
        login:loginHandler,
        logout:logoutHandler,
        verifyMail:verifyMail
    }
return (
    <authContext.Provider value={contextValue} >
        {props.children}
    </authContext.Provider>
);
}
export default AuthContextProvider;