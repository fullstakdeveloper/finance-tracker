import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault();
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
          className = "border w-[100px]"
          onClick = {handleSubmit}
          type = "submit"
        >Submit</button>
      </form>
    </div>
  )
}

export default App
