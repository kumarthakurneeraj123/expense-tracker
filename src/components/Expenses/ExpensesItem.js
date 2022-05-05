import {  useEffect, useState, useContext } from "react";
import { dataContext } from "../../store/data-context";


const ExpensesItem = (props) => {
  const dataCtx = useContext(dataContext);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(
      "https://expense-tracker-d574a-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "GET",
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Not able to fetch data";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const arr = [];
        console.log(data);
        for (const key in data) {
          arr.push({
            id:key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setList(arr);
      })
      .catch((err) => alert(err));
  }, []);
  
  return (
    <div>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", width: "110px" }}>
              Amount{" "}
            </th>
            <th style={{ border: "1px solid black", width: "110px" }}>
              Description
            </th>
            <th style={{ border: "1px solid black", width: "110px" }}>
              Category
            </th>
            <th style={{ border: "1px solid black", width: "110px" }}></th>
            <th style={{ border: "1px solid black", width: "110px" }}></th>
          </tr>
        </thead>
      </table>
      {list &&
        list.map((data) => (
          <table
            style={{ border: "1px solid black", width: "100%" }}
            key={data.id}
          >
            <tbody>
              <tr>
                <td style={{ border: "1px solid black", width: "110px" }}>
                  {data.amount}
                </td>
                <td style={{ border: "1px solid black", width: "110px" }}>
                  {data.description}
                </td>
                <td style={{ border: "1px solid black", width: "110px" }}>
                  {data.category}
                </td>
                <td style={{ border: "1px solid black", width: "110px" }}>
                  <button onClick={()=>{
                    
                    fetch(`https://expense-tracker-d574a-default-rtdb.firebaseio.com/expenses/${data.id}.json`,{
                      method:'DELETE',
                      headers:{
                        'Content-Type':'application/json'
                      }
                    }).then((res)=>{
                      if(res.ok){
                        alert('Deleted successfully!');
                        return res.json();
                      }else{
                        return res.json().then((data)=>{
                          let errorMessage ='Failed to delete! try again';
                          if(data && data.error && data.error.message){
                            errorMessage = data.error.message;
                          }
                          throw new Error(errorMessage);
                        })
                      }
                    }).then((data)=>{
                      window.location.reload(true);
                    }).catch(err=>alert(err));
                  }} style={{ backgroundColor: "red" }}>Delete</button>
                </td>
                <td style={{ border: "1px solid black", width: "110px" }}>
                  <button onClick={()=>{
                   props.ref1.current.value = data.amount;
                   props.ref2.current.value = data.description;
                   props.ref3.current.value = data.category;
                   dataCtx.setId(data.id);
                   props.isEdit(true);
                  }} style={{ backgroundColor: "Green" }}>Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  );
};
export default ExpensesItem;
