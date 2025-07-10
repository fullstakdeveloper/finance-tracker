import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [allExpense, setAllExpense] = useState([]);
  const [editCurr, setEditCurr] = useState(false);
  const [editId, setEditId] = useState("");


  const AddForm = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);

    return(
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
    );
  }

  const handlePost = async(e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/post", {
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

  const deleteExpense = async (id) => {
    const response = await axios.delete(`http://localhost:8080/${id}`);
    handleGetAll();
  }

  useEffect(() => {
    handleGetAll();
  }, [])

  const EditForm = (props) => {
    const [editExpense, setEditExpense] = useState({Title: "", Value: ""});

    const sendEditRequest = async (id, editVal) => {
      const response  = await axios.put(`http://localhost:8080/${id}`, {
        title: editVal.Title, value: editVal.value
      });
      handleGetAll();
    }

    return (
      <div className = "fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <label>Title</label>
        <input 
          className="w-[200px] border" 
          value={editExpense.Title}
          onChange={(e) => setEditExpense({...editExpense, Title: e.target.value})}
          type="text"
        />

        <label>Amount</label>
        <input 
          className="w-[200px] border"
          value={editExpense.Value}
          onChange={(e) => setEditExpense({...editExpense, Value: e.target.value})}
          type='text'
        />

        <button 
          className="w-[200px] border"
          type="button"
          onClick = {() => {sendEditRequest(props.id, editExpense); setEditCurr(false)}}
        >
          Save
        </button>
        <button 
          className="w-[200px] border"
          type="button"
          onClick={() => {setEditCurr(false)}}
        >
          Cancel
        </button>
      </form>
      </div>
    );
  };

 
  return (
    <div className = "flex flex-col m-[5px]">
      <AddForm/>


      <div>
        <h1>All Expenses</h1>
        {allExpense.map(expense => {
          return (
          <div className = "border bg-red-500 m-[10px] w-[200px] rounded" key = {expense.id}>
            
            <div >
              <p>{expense.title}</p>
              <p>{expense.value}</p>
            </div>
          
            <button onClick = {() => {deleteExpense(expense.id)}} className = "border m-[2px]">Delete</button>
            <button onClick = {() => {setEditCurr(true); setEditId(expense.id)}} className = "border m-[2px] p-[2px]">Edit</button>
          </div>
          );
        })}

        {editCurr ?  <EditForm id={editId}/>: <p>Not Editing</p> }

      </div>
    </div>
  )
}

export default App
