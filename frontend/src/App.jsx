//attempting to integrate plaid API

import { useState, useEffect, useCallback } from 'react';
import {usePlaidLink} from 'react-plaid-link';
import axios from 'axios';
import './App.css';

function App() {
  const PlaidConnector = ({userId}) => {
    const [linkToken, setLinkToken] = useState(null);

    //get the link token from the backend
    useEffect(() => {
      const fetchToken = async () => {
        const response = await fetch('/api/plaid/create-link-token', { method: 'POST' });
        const data = await response.json();
        setLinkToken(data.link_token);
      };
      fetchToken();
    }, []);
  }

  const [allExpense, setAllExpense] = useState([]);

  useEffect(() => {handleGetAll();}, [])
 
  return (
    <div className = "flex flex-col bg-slate-800 w-dvw h-dvh">
      <button onClick={GetLinkToken} className = "border bg-red-500 w-[100px]">Click Me</button>
    </div>
  )
}

export default App
