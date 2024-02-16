// src/components/AdminLoginPage.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AdminLogin.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [adminId, setAdminId] = useState('');
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
 
const navigate = useNavigate(); 

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      adminId: adminId,
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


// ... (rest of the component)


const handleRegistration = async () => {
  try {
    const response = await axios.post('http://localhost:5000/register', {
      adminId: adminId,
      adminName: adminName,
      password: password,
      email: email,
      contact: contact,
    });

    toast.success(response.data.message);
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
    } else if (error.request) {
      toast.error('No response received from the server');
    } else {
      toast.error('Registration error: ' + error.message);
    }
  }
};

return (
    <div className="admin-login-container">
      <div className="admin-form-container">
        {showLoginForm ? (
          <>
            <h2> Login </h2>
            <label>Admin ID:</label>
            <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => setShowLoginForm(false)}>Registration</button>
          </>
        ) : (
          <>
            <h2> Registration </h2>
            <label>Admin ID:</label>
            <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
            <label>Admin Name:</label>
            <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Admin Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Admin Contact:</label>
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
            <button onClick={handleRegistration}>Register</button>
            <button onClick={() => setShowLoginForm(true)}>Go Back</button>
          </>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AdminLogin;