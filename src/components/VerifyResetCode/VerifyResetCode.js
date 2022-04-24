import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../store/Auth-Context";

const VerifyResetCode = () => {
    const authCtx = useContext(authContext);
    const history = useHistory();
    const passwordResetLinkInputRef = useRef();
    const submitHandler = (event) => {
    event.preventDefault();
    const enteredCode = passwordResetLinkInputRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
        method:'POST',
       'Content-Type':'application/json',
        body:JSON.stringify({
           oobCode:enteredCode
       }) 
    }).then((res)=>{
        if(res.ok){
            alert('Processing...');
            console.log(res);
            return res.json();
        }else{
            return res.json().then((data)=>{
                let errorMessage = 'Try again!';
                if(data && data.error && data.error.message){
                    errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
            })
        }
    }).then((data)=>{
        authCtx.oobCodeHandler(enteredCode);
        console.log(data);
        history.replace('/new-password');
    }).catch(err=>alert(err));
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Enter OobCode Sent to your mail  </label>
      <br />
      <br />
      <input ref={passwordResetLinkInputRef} type="text" placeholder="Oob Code" required />
      <input type="submit" />
    </form>
  );
};
export default VerifyResetCode;
