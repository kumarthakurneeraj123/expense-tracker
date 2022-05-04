import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { authContext } from "./store/Auth-Context";

import "./App.css";

import LoginPage from "./Pages/LoginPage";

import SignUpPage from "./Pages/SignUpPage";
import WelcomePage from "./Pages/WelcomePage";
import ProfilePage from "./Pages/ProfilePage";
import EmailVerifyPage from "./Pages/EmailVerifyPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";
import ForgotPasswordVerify from "./components/ForgotPassword/ForgotPasswordVerify";


function App() {
  const authCtx = useContext(authContext);
  return (
    <div>
      <div className="app">
        <Switch>
          {!authCtx.isSignUp && !authCtx.isLogIn && <SignUpPage />}

          {authCtx.isSignUp && !authCtx.isLogIn && (
            <Route path="/login" exact>
              <LoginPage />
            </Route>
          )}
        </Switch>
      </div>
      {authCtx.isLogIn && !authCtx.isEmailVerified && (
        <Route path="/verify-email">
          <EmailVerifyPage />
        </Route>
      )}
      {authCtx.isLogIn && authCtx.isEmailVerified && (
        <Route path="/welcome">
          <WelcomePage />
        </Route>
      )}
      {authCtx.isLogIn && authCtx.isEmailVerified && (
        <Route path="/profile">
          <ProfilePage />
        </Route>
      )}
      {!authCtx.isLogIn && 
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>}
      {!authCtx.isLogIn && 
      <Route path="/reset-password-link">
        <VerifyResetCode />
      </Route>}
      {!authCtx.isLogIn && 
      <Route path="/new-password">
        <ForgotPasswordVerify />
      </Route>}
    </div>
  );
}

export default App;
