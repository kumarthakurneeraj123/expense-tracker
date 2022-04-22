
import {useContext, Fragment} from 'react';
import { authContext } from '../../store/Auth-Context';
import { dataContext } from '../../store/data-context';


const GetData = ()=>{
    const authCtx = useContext(authContext);
    const dataCt = useContext(dataContext);
    
    const getData = ()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDD2IuTibFJhBibT1y05IRxNLOkicES1ZA',{
            method:'POST',
            'Content-Type':'application/json',
            body:JSON.stringify({
                idToken:authCtx.token
            })
        }).then((res)=>{
            if(res.ok){
                alert('Getting data');
                console.log(res);
                return res.json();
            }else{
                return res.json().then((data)=>{
                    let errorMessage = 'Data fetching failed';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then((data)=>{
            console.log(data);
            dataCt.dataHandler(data.users[0].displayName, data.users[0].photoUrl);
          
        }).catch(err=>alert(err));
    }
    getData();
    return <Fragment><ul> 
        <li>
       <div>{dataCt.name}</div>
       <div ><img width='200' height='200' src={dataCt.image} alt='Myself'/></div>
       </li>
       </ul>
    </Fragment>
}
export default GetData;