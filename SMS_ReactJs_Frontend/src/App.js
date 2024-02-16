import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Page/HomePage';
import SystemLogin from './Page/SystemLogin';
import SystemPage from './Page/SystemPage';
import AdminPage from './Page/AdminPage';
import AdminLogin from './Page/AdminLogin';
import OrganizationDetailsPage from './Page/OrganizationDetailsPage';
import EmployeeDetailsPage from './Page/EmployeeDetailsPage';
import EmployeeLogin from './Page/EmployeeLogin';
import ServerDetailsPage from './Page/ServerDetailsPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<HomePage />}></Route>
        <Route path='/SystemLogin' element = {<SystemLogin/>}></Route>
        <Route path='/SystemPage' element = {<SystemPage />}></Route>
        <Route path='/AdminPage' element = {<AdminPage />}></Route>
        <Route path='/AdminLogin' element = {<AdminLogin />}></Route>
        <Route path='/OrganizationDetailsPage' element = {<OrganizationDetailsPage />}></Route>
        <Route path='/EmployeeDetailsPage' element = {<EmployeeDetailsPage />}></Route>
        <Route path='/ServerDetailsPage' element = {<ServerDetailsPage />}></Route>
        <Route path='/EmployeeLogin' element = {<EmployeeLogin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;