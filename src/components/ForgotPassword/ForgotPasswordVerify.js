import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../store/Auth-Context";

const ForgotPasswordVerify = ()=>{
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const history = useHistory();
    const authCtx = useContext(authContext);
    const submitHandler =(event)=>{
        event.preventDefault();
        const enteredNewPassword = passwordRef.current.value;
        const enteredConfirmPassword  = confirmPasswordRef.current.value;
        if(enteredNewPassword !== enteredConfirmPassword){
            alert('New password and confirm new password did not match!');
        }else{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
            method:'POST',
            'Content-Type':'application/json',
            body:JSON.stringify({
                oobCode:authCtx.oobCode,
                newPassword:enteredNewPassword
            })
        }).then((res)=>{
            if(res.ok){
                console.log(res);
                return res.json();
            }else{
                return res.json().then((data)=>{
                    let errorMessage ='Failed to reset password';
                    if(data && data.error && data.error.message ){
                        errorMessage = data.error.message;
                    }
                   throw new Error(errorMessage);

                })
            }

        }).then((data)=>{
            console.log(data);
            history.replace('/login');

        }).catch(err=>alert(err));
    }

    }

    return(
        <form onSubmit={submitHandler}>
            <input ref={passwordRef} type='password' placeholder="New Password" required /><br/><br/>
            <input ref={confirmPasswordRef} type='password' placeholder="Confirm New Password" required />
            <input type='submit' />
        </form>
    );
}
export default ForgotPasswordVerify;