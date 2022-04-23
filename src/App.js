import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import {authContext} from './store/Auth-Context';

import './App.css';

import LoginPage from './Pages/LoginPage';

import SignUpPage from './Pages/SignUpPage';
import WelcomePage from './Pages/WelcomePage';
import ProfilePage from './Pages/ProfilePage';
import EmailVerifyPage from './Pages/EmailVerifyPage';




function App() {
  
  const authCtx = useContext(authContext);
  return (
    <div>
    
    <div className="app">
    <Switch>
      {!authCtx.isSignUp && !authCtx.isLogIn && <SignUpPage />}
     
      {authCtx.isSignUp && !authCtx.isLogIn&& <Route path='/login' exact>
          <LoginPage />
    </Route>}
    </Switch>
    </div>
      {authCtx.isLogIn && !authCtx.isEmailVerified && <Route path='/verify-email'> <EmailVerifyPage /></Route>}
     {authCtx.isLogIn && authCtx.isEmailVerified && <Route path='/' ><WelcomePage /></Route>}
     {authCtx.isLogIn && authCtx.isEmailVerified && <Route path='/profile' ><ProfilePage /></Route>}
    </div>
  );
}

export default App;
