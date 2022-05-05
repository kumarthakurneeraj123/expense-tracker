import React,{useState} from 'react';
export const dataContext = React.createContext({
    name:'',
    image:'',
    expenses:[],
    id :'',
    dataHandler:(displayName, imgUrl)=>{},
    expensesHandler:(amount, description, category)=>{},
    setId:(id)=>{}
});

const DataProvider =(props)=>{
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();
    const [id, setId] = useState('');
   const expenses = [];
   const setUserId = (userId)=>{
    setId(userId);
   }
    const userExpensesHandler = (amount, description, category) => {
            expenses.push({amount,description,category});
    };
    function dataFun(displayName, imgUrl){
        setUserName(displayName) ;
        setUserImage(imgUrl);
    }
    const contextValue = {
        name:userName,
        image:userImage,
        expenses:expenses,
        id:id,
        dataHandler:dataFun,
        expensesHandler:userExpensesHandler,
        setId:setUserId
    }
    return (
        <dataContext.Provider value={contextValue}>
            {props.children}
        </dataContext.Provider>
    );
}
export default DataProvider;