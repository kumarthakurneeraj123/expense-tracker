import { useRef, Fragment, useState} from "react";
//import { dataContext } from "../../store/data-context";
import ExpensesItem from "./ExpensesItem";


const Expenses = () => {


  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [data1, setData1] = useState();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    fetch('https://expense-tracker-d574a-default-rtdb.firebaseio.com/expenses.json',{
      method:'POST',
      'Content-Type':'application/json',
      body:JSON.stringify({
        amount:enteredAmount,
        description:enteredDescription,
        category:enteredCategory
      })
    }).then((res)=>{
      if(res.ok){
        return res.json();
      }else{
        return res.json().then((data)=>{
          let errorMessage = 'Adding failed';
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      }
    }).then((data)=>{
        setData1({amount:enteredAmount, description:enteredDescription, category:enteredCategory});
    }).catch(err => alert(err))
  };
  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <h1>Expense Detail</h1>
        <label>Amount Spent </label>
        <br />
        <br />
        <input ref={amountRef} type="number" required />
        <br />
        <br />
        <label>Description </label>
        <br />
        <input
          ref={descriptionRef}
          type="text"
          placeholder="Description"
          required
        />
        <br />
        <br />
        <label>Category </label>
        <br />
        <select ref={categoryRef}>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </select>
        <br />
        <br />
        <button>Add</button>
      </form>
    {<ExpensesItem/> }
    {data1 &&
        <li >
          Amount : {data1.amount} Description: {data1.description} Category:{" "}
          {data1.category}
        </li>
      }
    
    </Fragment>
  );
};
export default Expenses;
