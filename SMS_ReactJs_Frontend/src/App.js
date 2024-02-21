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
import About from './Page/About';
import Contact from './Page/Contact';
import NotificationDetailsPage from './Page/NotificationDetailsPage';
import EmployeePage from './Page/EmployeePage';





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
        <Route path='/EmployeeLogin' element = {<EmployeeLogin />}></Route>
        <Route path='/About' element = {<About />}></Route>
        <Route path='/HomePage' element = {<HomePage />}></Route>
        <Route path='/Contact' element = {<Contact />}></Route>
        <Route path='/NotificationDetailsPage' element = {<NotificationDetailsPage />}></Route>
        <Route path='/EmployeePage' element = {<EmployeePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
