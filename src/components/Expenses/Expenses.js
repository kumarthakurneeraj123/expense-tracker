import { useRef, Fragment, useContext, useState } from "react";
import { dataContext } from "../../store/data-context";
import ExpensesItem from "./ExpensesItem";

const Expenses = () => {
  const [isInput, setIsInput] = useState(false);
  const dataCtx = useContext(dataContext);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    
    
    dataCtx.expensesHandler(enteredAmount, enteredDescription, enteredCategory);
    console.log(dataCtx.expenses);
    setIsInput(prev=>!prev);
    
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
    {isInput && <ExpensesItem amount={amountRef.current.value} description = {descriptionRef} category={categoryRef} /> }
    
    </Fragment>
  );
};
export default Expenses;
