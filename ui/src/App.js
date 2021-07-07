import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const apiUrl = `http://localhost:8080`;

const App = () => {
  const [users, setUsers] = useState([])

  const createUser = async () => {
    await axios.get(apiUrl + '/user-create');
    loadUsers();
  }

  const loadUsers = async () => {
    const res = await axios.get(apiUrl + '/users');
    setUsers(res.data)
  }

  useEffect(() => {
    loadUsers()
    return () => {

    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={createUser}>Create User</button>
        <p>Users list:</p>
        <ul>
          {users.map(user => (
            <li key={user._id}>id: {user._id}</li>
          ))}
        </ul>
      </header>
    </div>
  );

}

export default App;