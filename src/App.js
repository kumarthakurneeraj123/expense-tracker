import React,{useContext} from 'react';
import { Route, Switch } from 'react-router-dom';
import {authContext} from './store/Auth-Context';

import './App.css';

import LoginPage from './Pages/LoginPage';

import SignUpPage from './Pages/SignUpPage';
import WelcomePage from './Pages/WelcomePage';


function App() {
  const authCtx = useContext(authContext);
  return (
    <div className="app">
      {!authCtx.isSignUp && <SignUpPage />}
      <Switch>
      {authCtx.isSignUp && !authCtx.isLogIn&& <Route path='/login' exact>
          <LoginPage />
    </Route>}
    {
      authCtx.isLogIn && <Route path='/'><WelcomePage /></Route>
    }
    </Switch>
    </div>
  );
}

export default App;
