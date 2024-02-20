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
    const response = await axios.post('http://localhost:5000/auth/emplogin', {
      empId: empId,
      password: password,
    });

    if (response.status === 200) {
      toast.success('Login successful');
      navigate("/EmployeePage");
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

// const handleLogin = async (e) => {
//   e.preventDefault();

//   const reqBody = {
//     empId: empId,
//     password: password,
//   };
//   console.log(reqBody);

//   try {
//     const result = await axios.post(
//       "http://127.0.0.1:5000/auth/emplogin",
//       reqBody
//     );

//     if (result.data.token) {
//       // redirect to EmployeePage
//       localStorage.setItem("token", result.data.token);
//       navigate("/EmployeePage", { replace: true });
//     } else {
//       // show alert invalid username and password
//       toast.error('Login failed. Please check your credentials.');
//       throw "Invalid username and password";
//     }

//     console.log(result);
//   } catch (err) {
//     console.error(err);
//     if (err.response) {
//       alert(err.response.statusText);
//     } else {
//       // Handle other types of errors
//       console.error("An error occurred:", err);
//     }
//   }
// };



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