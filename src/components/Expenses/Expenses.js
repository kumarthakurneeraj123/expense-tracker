import { useRef, Fragment, useState, useContext } from "react";
import { dataContext } from "../../store/data-context";
import ExpensesItem from "./ExpensesItem";

const Expenses = () => {
  const dataCtx = useContext(dataContext);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
 // const [data1, setData1] = useState();
  const [inEdit, setInEdit] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    fetch(
      "https://expense-tracker-d574a-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({
          amount: enteredAmount,
          description: enteredDescription,
          category: enteredCategory,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Adding failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        
        window.location.reload();
      })
      .catch((err) => alert(err));
  };
  
  

  const editHandler = (event)=>{
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    fetch(`https://expense-tracker-d574a-default-rtdb.firebaseio.com/expenses/${dataCtx.id}.json`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
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
          let errorMessage = 'Failed to edit! try again';
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      }
    }).then((data)=>{
      alert('Updated Succesfully!');
      setInEdit(false);
      window.location.reload(true);
    }).catch(err => alert(err));
  }

  return (
    <Fragment>
      <form >
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
        { inEdit ? <button  onClick={editHandler}>Update</button >:<button onClick={submitHandler}>Add</button>}
      </form>
      {<ExpensesItem isEdit={setInEdit} ref1={amountRef} ref2={descriptionRef} ref3={categoryRef} />}
      
    </Fragment>
  );
};
export default Expenses;
