import { Fragment, useRef, useContext } from "react";
import { authContext } from "../../store/Auth-Context";
const CompleteProfile = (props)=>{
    const authCtx = useContext(authContext);
    const nameInputRef = useRef();
    const photoURLRef = useRef();
    const updateHandler = (event)=>{
        event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPhotoURL = photoURLRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
        method:'POST',
        'Content-Type':'application/json',
        body:JSON.stringify({
            idToken:authCtx.token,
            displayName:enteredName,
            photoUrl:enteredPhotoURL,
        }),
        returnSecureToken:true
    }).then((res)=>{
        if(res.ok){
            alert('Updated Successfully!');
            console.log(res);
            return res.json();
        }
        else{
            return res.json().then((data)=>{
                console.log(data);
                let errorMessage = 'Not updated! Try again';
                if(data && data.error && data.error.message){
                    errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
            })
        }
    }).then((data)=>{
        console.log(data);
    }).catch(err =>alert(err));
}
return <Fragment>
    <form onSubmit={updateHandler}>
        <h2>Contact Details</h2><br/>
        <label>Full Name</label>
        <input ref={nameInputRef} type='text' required/>
        <label>Photo URL</label>
        <input ref={photoURLRef} type='text' required/><br />
        <button>Update</button>
    </form>
    </Fragment>
}
export default CompleteProfile;