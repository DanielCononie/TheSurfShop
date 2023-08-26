import React from "react";
import {useState} from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './admin-styles/Admin.css'


function Admin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = 'admin'
    const pass = 'admin'
    const navigate = useNavigate();


    function handleLogin(event) {
        event.preventDefault();
        if (username === user && password === pass) {
          // If credentials are correct, redirect to AdminDashboard
          navigate('/AdminDashboard');
        } else {
          navigate('/')
        }
      }
    

    return (
        <div className="Admin">
            <div className="admin-form-container">
            
                <form className="admin-form">
                <h2>Admin Dashboard Login</h2>
                    <label>Username</label>
                    <input onChange={(event) => {
                        setUsername(event.target.value)
                    }}/>
                    <label>Password</label>
                    <input  onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                    <button onClick={handleLogin}>Log in</button>
                </form>
            </div>
            <Link to='/' className="back-home">Back Home</Link>
        </div>
    )
}

export default Admin;