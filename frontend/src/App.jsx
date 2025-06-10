import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/post", {Name: "Jashan"});
  }


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
          onClick = {handleSubmit}
          type = "submit"
        >Submit</button>
      </form>
    </div>
  )
}

export default App
