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
    const [userIsSignUp, setUserIsSignUp] = useState(false);
    const [token, setToken] = useState(null);
    const userIsLogIn = !!token;
    const signUpHandler = (value)=>{
        setUserIsSignUp(value);
    }
    const loginHandler = (idToken)=>{
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