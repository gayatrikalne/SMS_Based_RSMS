// src/components/AdminLoginPage.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AdminLogin.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
 
const navigate = useNavigate(); 

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/emplogin', {
      empId: empId,
      password: password,
    });

    if (response.status === 200) {
      toast.success('Login successful');
      navigate("/AdminPage");
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error('Invalid credentials. Please check your adminId and password.');
    } else {
      console.error('Error during login:', error);
      toast.error('An error occurred during login.');
    }
  }
};

return (
    <div className="admin-login-container">
      <div className="admin-form-container">
            <h2> Login </h2>
            <label>Employee ID:</label>
            <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EmployeeLogin;