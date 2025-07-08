import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [allExpense, setAllExpense] = useState([])


  const handlePost = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/post", {
      title: title, 
      value: value, 
    });
    handleGetAll()
  }

  const handleGetAll = async () => {
    try {
      const response = await fetch('http://localhost:8080/get');
      const data = await response.json();
      setAllExpense(data);
    } catch {
      console.log("Failed handle");
    }
  }

  useEffect(() => {
    handleGetAll();
  }, [])

 
  return (
    <div className = "flex flex-col m-[5px]">
      <form className  = "flex flex-col">
        <label>Expense title</label>
        <input 
          className = "border w-[200px]"
          value = {title}
          type = "text"
          onChange = {(e) => setTitle(e.target.value)}
        />

        <label>Expense value</label>
        <input 
          className = "border w-[200px]"
          value = {value}
          type = "number"
          onChange = {(e) => setValue(Number(e.target.value))}
        />

        <button 
          className = "border w-[100px] hover:bg-amber-100"
          onClick = {handlePost}
          type = "submit"
        >Submit</button>
      </form>


      <div>
        <h1>All Expenses</h1>
        {allExpense.map(expense => {
          return (
          <div className = "border bg-red-500 m-[10px] w-[200px] rounded">
            
            <div key = {expense.id}>
              <p>{expense.title}</p>
              <p>{expense.value}</p>
            </div>
          
            <button className = "border m-[2px]">Delete</button>
          </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
