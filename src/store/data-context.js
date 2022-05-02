import React,{useState} from 'react';
export const dataContext = React.createContext({
    name:'',
    image:'',
    expenses:[],
    dataHandler:(displayName, imgUrl)=>{},
    expensesHandler:(expenses)=>{}
});

const DataProvider =(props)=>{
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();
   const expenses = [];
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
        dataHandler:dataFun,
        expensesHandler:userExpensesHandler
    }
    return (
        <dataContext.Provider value={contextValue}>
            {props.children}
        </dataContext.Provider>
    );
}
export default DataProvider;