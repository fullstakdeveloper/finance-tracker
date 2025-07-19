//attempting to integrate plaid API

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [allExpense, setAllExpense] = useState([]);
  
  const AddForm = () => {
    const [title, setTitle] = useState("Untitled");
    const [value, setValue] = useState(0);
    const [recurr, setRecurr] = useState(false);
    const [date, setDate] = useState(() => {return new Date().toISOString().split('T')[0];});

    const handlePost = async(e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/post", {title: title, value: value, recurr: recurr, date:date})
    setAllExpense(prev => [...prev, response.data]);
    console.log(allExpense)
    }

    return(
      <form className  = "flex flex-col border w-fit p-[10px] rounded m-[10px] text-white">
        <label className = "flex flex-col">
          Title:
          <input 
            className = "border w-[200px]"
            value = {title}
            type = "text"
            onChange = {(e) => setTitle(e.target.value)}
          />
        </label>

        <label className = "flex flex-col">
          Amount: 
          <input 
            className = "border w-[200px]"
            value = {value}
            type = "number"
            onChange = {(e) => setValue(Number(e.target.value))}
          />
        </label>

        <label className = "flex flex-col">
          Date: Click to Edit
          <input
            type="date"
            value={date}
            onChange={(e)=> setDate(e.target.value)}
            placeholder="Select date"
          />
        </label>

        
        <label className = "flex flex-row items-center">
          Recurring:
          <input
            type="checkbox"
            checked={recurr}
            onChange={(e) => setRecurr(e.target.checked)}
            className = "m-[5px]"
          />
        </label>

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
      const [editExpense, setEditExpense] = useState({
        title: props.expense.title, 
        value: props.expense.value, 
        recurr: props.expense.recurr, 
        date: props.expense.date
      });

      const sendEditRequest = async (id, editVal) => {
        const response  = await axios.put(`http://localhost:8080/${id}`, {
          title: editVal.title, value: editVal.value, recurr: editVal.recurr
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
                value={editExpense.title}
                onChange={(e) => setEditExpense({...editExpense, title: e.target.value})}
                type="text"
              />

              <label className = "text-amber-500">Amount</label>
              <input 
                className="w-[200px] border rounded h-[30px] text-xl"
                value={editExpense.value}
                onChange={(e) => setEditExpense({...editExpense, value: e.target.value})}
                type='text'
              />

              <label className = "flex flex-col">
                Date: Click to Edit
                <input
                  type="date"
                  value={editExpense.date}
                  onChange={(e)=> setDate(e.target.value)}
                  placeholder="Select date"
                />
              </label>

              <label className = "flex flex-row items-center">
                Recurring:
                <input
                  type="checkbox"
                  checked={editExpense.recurr}
                  onChange={(e) => setEditExpense({...editExpense, recurr: e.target.checked})}
                  className = "m-[5px]"
                />
              </label>

              <div className = "flex flex-row m-[5px]">
                <button 
                  className=" border w-1/2 m-[1px] rounded h-[50px] bg-green-700"
                  type="button"
                  onClick = {() => {sendEditRequest(props.expense.id, editExpense); setEditCurr(false)}}
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
        <div className = "flex  flex-col ">
          <h1 className="text-3xl text-white m-[10px]">Transactions:</h1>
        <div className = "flex flex-row flex-wrap justify-left">
          {allExpense.map(expense => {
          return (
            <div className = "bg-slate-900 m-[10px] w-[400px] h-fit rounded flex flex-col justify-center " key = {expense.id}>
              
              <div className = "flex flex-col m-[10px] ">
                <div className = "flex flex-row justify-between items-start text-amber-400 font-bold text-[18px] mb-[10px]">
                  <p className = "">{expense.title}</p>
                  <p className = "border rounded pr-[5px] pl-[5px] text-black bg-amber-400 font-normal text-[15px]">{expense.recurr ? "recurring": "non-recurring"}</p>
                </div>

                <div className = " mb-[10px]">
                  <table class="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                    <thead class="bg-gray-800 text-gray-400">
                      <tr>
                        <th class="py-2 px-4 text-left">Date</th>
                        <th class="py-2 px-4 text-left">Description</th>
                        <th class="py-2 px-4 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody class="bg-gray-800 text-gray-200">
                      <tr class="border-t border-gray-700">
                        <td class="py-2 px-4">{expense.date}</td>
                        <td class="py-2 px-4">Paycheck</td>
                        <td class="py-2 px-4">{expense.value}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className = "flex flex-row">
                  <button 
                    onClick = {() => {deleteExpense(expense.id)}} 
                    className = "border m-[2px] p-[2px] w-1/2 bg-slate-800 border-slate-600 h-[50px] rounded text-white font-semibold hover:bg-red-600 transition-colors duration-200"
                  >Delete</button>

                  <button 
                    onClick = {() => {setEditCurr(true); setEditId(expense)}} 
                    className = "border m-[2px] p-[2px] w-1/2 bg-slate-800 border-slate-600 h-[50px] rounded text-white font-semibold hover:bg-blue-600 transition-colors duration-200"
                  >Edit</button>
                </div>

              </div>
          
            </div>
          );})}

        {editCurr ?  <EditForm expense={editId}/>: <p></p> }
      </div>
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

  const GetLinkToken = async() => {
    try {
      const response = axios.get('http://localhost:8080/get/link_token')
      const data = await response.json()
    } catch {
      console.log("Link Token Fetch Failed")
    }
  }

  useEffect(() => {handleGetAll();}, [])
 
  return (
    <div className = "flex flex-col bg-slate-800 w-dvw h-dvh">
      {/* <AddForm/>
      <AllExpenseList/> */}
    </div>
  )
}

export default App
