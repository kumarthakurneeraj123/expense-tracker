import { Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
    const emailInputRef = useRef();
    const history = useHistory();
    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
            method:'POST',
            'Content-Type':'application/json',
            body:JSON.stringify({
                requestType:'PASSWORD_RESET',
                email:enteredEmail
            })
        }).then((res)=>{
            if(res.ok){
                alert('Password reset link sent successfully to your mail id!');
                console.log(res);
                return res.json();
            }
            else{
                return res.json().then((data)=>{
                    let errorMessage = 'Try again';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then((data)=>{
            console.log(data);
            history.replace('/reset-password-link');
        }).catch(err=>alert(err));
    }

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        {" "}
        <label>Email</label>
        <br />
        <br />
        <input ref={emailInputRef} type="email" required />
        <br />
        <br />
        <button>Send Link</button>
      </form>
      <div>
        Already a user?<button>Login</button>
      </div>
    </Fragment>
  );
};
export default ForgotPassword;
