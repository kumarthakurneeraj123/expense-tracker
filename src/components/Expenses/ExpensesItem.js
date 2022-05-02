import { useContext } from "react";
import { dataContext } from "../../store/data-context";

const ExpensesItem = () => {
  const dataCtx = useContext(dataContext);
  console.log(dataCtx.expenses);
  return (
    <div>
      {dataCtx.expenses.map((data) => (
        <li key={Math.random()} >
          Amount : {data.amount} Description: {data.description} Category:{" "}
          {data.category}
        </li>
      ))}
    </div>
  );
};
export default ExpensesItem;
