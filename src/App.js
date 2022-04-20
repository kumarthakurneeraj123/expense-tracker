import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import {authContext} from './store/Auth-Context';

import './App.css';

import LoginPage from './Pages/LoginPage';

import SignUpPage from './Pages/SignUpPage';
import WelcomePage from './Pages/WelcomePage';
import ProfilePage from './Pages/ProfilePage';




function App() {
  
  const authCtx = useContext(authContext);
  return (
    <div>
    
    <div className="app">
    <Switch>
      {!authCtx.isSignUp && <SignUpPage />}
     
      {authCtx.isSignUp && !authCtx.isLogIn&& <Route path='/login' exact>
          <LoginPage />
    </Route>}
    </Switch>
    </div>
     {authCtx.isLogIn && <Route path='/' ><WelcomePage /></Route>}
     {authCtx.isLogIn && <Route path='/profile' ><ProfilePage /></Route>}
    </div>
  );
}

export default App;
