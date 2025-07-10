import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [allExpense, setAllExpense] = useState([]);

  const AddForm = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);

    const handlePost = async(e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/post", {title: title, value: value, })
    setAllExpense(prev => [...prev, response.data]);
    }

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

  const AllExpenseList = () => {
    const [editCurr, setEditCurr] = useState(false);
    const [editId, setEditId] = useState("");

    const deleteExpense = async (id) => {
      const response = await axios.delete(`http://localhost:8080/${id}`);
      setAllExpense(prev => prev.filter(exp => exp.id !== id));
    }

    const EditForm = (props) => {
      const [editExpense, setEditExpense] = useState({Title: "", Value: ""});

      const sendEditRequest = async (id, editVal) => {
        const response  = await axios.put(`http://localhost:8080/${id}`, {
          title: editVal.Title, value: editVal.value
        });
        setAllExpense(prev => prev.map(exp => exp.id === id ? response.data : exp))
      }
      return (
        <div className = "fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
          <div className = "border rounded bg-gradient-to-bl from-slate-500 to-slate- border-amber-500">
            <form className="flex flex-col m-[5px]" onSubmit={(e) => e.preventDefault()}>
              <label  className = "text-amber-500">Title</label>
              <input 
                className="w-[200px] border rounded h-[30px] text-xl" 
                value={editExpense.Title}
                onChange={(e) => setEditExpense({...editExpense, Title: e.target.value})}
                type="text"
              />

              <label className = "text-amber-500">Amount</label>
              <input 
                className="w-[200px] border rounded h-[30px] text-xl"
                value={editExpense.Value}
                onChange={(e) => setEditExpense({...editExpense, Value: e.target.value})}
                type='text'
              />

              <div className = "flex flex-row m-[5px]">
                <button 
                  className=" border w-1/2 m-[1px] rounded h-[50px] bg-green-700"
                  type="button"
                  onClick = {() => {sendEditRequest(props.id, editExpense); setEditCurr(false)}}
                > 
                  Save
                </button>

                <button 
                  className="w-1/2 border m-[1px] h-[50px] bg-slate-600 text-white hover:bg-slate-700 px-4 py-2 rounded"
                  type="button"
                  onClick={() => {setEditCurr(false)}}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    const TransUI = () => {
      return(
        <div>
          {allExpense.map(expense => {
          return (
            <div className = "bg-slate-900 m-[10px] w-[400px] h-[120px] rounded flex flex-col justify-center border border-slate-600/50" key = {expense.id}>
              
              <div className = "flex flex-col m-[10px]">
                <div className = "flex flex-row justify-between items-start text-amber-400 m-[10px] font-bold text-[20px] ">
                  <p className ="">{expense.title}</p>
                  <p>{expense.value}</p>
                </div>

                <div className = "flex flex-row">
                  <button 
                    onClick = {() => {deleteExpense(expense.id)}} 
                    className = "border m-[2px] p-[2px] w-1/2 bg-slate-800 border-slate-600 h-[50px] rounded text-white font-semibold hover:bg-red-600 transition-colors duration-200"
                  >Delete</button>

                  <button 
                    onClick = {() => {setEditCurr(true); setEditId(expense.id)}} 
                    className = "border m-[2px] p-[2px] w-1/2 bg-slate-800 border-slate-600 h-[50px] rounded text-white font-semibold hover:bg-blue-600 transition-colors duration-200"
                  >Edit</button>
                </div>

              </div>
          
            </div>
          );})}

        {editCurr ?  <EditForm id={editId}/>: <p></p> }
      </div>
      );
    }

    return(<TransUI/>);
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

  useEffect(() => {handleGetAll();}, [])
 
  return (
    <div className = "flex flex-col bg-slate-800 w-dvw h-dvh">
      <AddForm/>
      <AllExpenseList/>
    </div>
  )
}

export default App
