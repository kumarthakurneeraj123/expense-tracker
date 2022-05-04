import { useContext, useEffect,useState } from "react";
import { dataContext } from "../../store/data-context";

const ExpensesItem = (props) => {
  const dataCtx = useContext(dataContext);
  const [list, setList] = useState([]);
  useEffect(()=>{
  fetch('https://expense-tracker-d574a-default-rtdb.firebaseio.com/expenses.json',{
      method:'GET',
      'Content-Type':'application/json',
  }).then((res)=>{
      if(res.ok){
          return res.json();
      }else{
          return res.json().then((data)=>{
              let errorMessage = 'Not able to fetch data';
              if(data && data.error && data.error.message){
                  errorMessage=data.error.message;
              }
              throw new Error(errorMessage);
          })
      }
  }).then((data)=>{
    const arr = [];
      console.log(data);
      for(const key in data){
           arr.push({amount:data[key].amount, description:data[key].description, category:data[key].category});
      }
      setList(arr);
  }).catch(err=>alert(err));
},[]) ;
console.log(dataCtx.expenses); 
  return (
    <div>
      {list && list.map((data) => (
        <li key={Math.random()} >
          Amount : {data.amount} Description: {data.description} Category:{" "}
          {data.category}
        </li>
      ))}
      {props.ExpenseData &&
        <li >
          Amount : {props.ExpenseData.amount} Description: {props.ExpenseData.description} Category:{" "}
          {props.ExpenseData.category}
        </li>
      }
    </div>
  );
};
export default ExpensesItem;
