import React ,{ useContext } from "react";
import { authContext } from "../../store/Auth-Context";

const EmailVerify=()=>{
    const authCtx = useContext(authContext);
    const emailVerifyHandler = ()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
            method:'POST',
            'Content-Type':'application/json',
            body:JSON.stringify({
                requestType:'VERIFY_EMAIL',
                idToken:authCtx.token
            })}).then((res)=>{
                if(res.ok){
                    console.log(res);
                    alert('Verified');
                    return res.json();
                }else{
                    return res.json().then((data)=>{
                        let errorMessage = 'Can not verified! try again';
                        if(data && data.error && data.error.message){
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    }
                    )
                }
            }).then((data)=>{
                console.log(data);
                authCtx.verifyMail();
            }).catch(err=>alert(err));
    }

    return (
        <button onClick={emailVerifyHandler}>Verify Email</button>
    );
}
export default EmailVerify;
