import React,{useState} from 'react';
export const dataContext = React.createContext({
    name:'',
    image:'',
    dataHandler:(displayName, imgUrl)=>{}
});

const DataProvider =(props)=>{
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();
    function dataFun(displayName, imgUrl){
        setUserName(displayName) ;
        setUserImage(imgUrl);
    }
    const contextValue = {
        name:userName,
        image:userImage,
        dataHandler:dataFun
    }
    return (
        <dataContext.Provider value={contextValue}>
            {props.children}
        </dataContext.Provider>
    );
}
export default DataProvider;