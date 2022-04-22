import React,{useState} from 'react';

export const authContext = React.createContext({
    token:'',
    isSignUp : false,
    isLogIn : false,
    signup:()=>{},
    login:(token)=>{},
    logout:()=>{}
});

const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('token');
    const initialSignUp = localStorage.getItem('signUp');
    const [userIsSignUp, setUserIsSignUp] = useState(initialSignUp);
    const [token, setToken] = useState(initialToken);
    const userIsLogIn = !!token;
    const signUpHandler = (value)=>{
        localStorage.setItem('signUp',value);
        setUserIsSignUp(value);
    }
    const loginHandler = (idToken)=>{
        localStorage.setItem('token',idToken);
            setToken(idToken);
    }
    const logoutHandler = ()=>{
        setToken(null);
    }
    const contextValue ={
        token:token,
        isSignUp:userIsSignUp,
        isLogIn:userIsLogIn,
        signup:signUpHandler,
        login:loginHandler,
        logout:logoutHandler
    }
return (
    <authContext.Provider value={contextValue} >
        {props.children}
    </authContext.Provider>
);
}
export default AuthContextProvider;