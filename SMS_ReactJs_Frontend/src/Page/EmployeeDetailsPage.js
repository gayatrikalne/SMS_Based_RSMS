import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeDetailsPage.css";
import AddEmployee from "../component/AddEmployee";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmployeeDetailsPage() {
  const navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState([]);

  const [updateEmployee, setUpdateEmployee] = useState({});

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/employee");
      setEmployeeList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (Id) => {
    console.log("delete : ", typeof Id);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:5000/employee/${Id}`
    );
    console.log("delete : ", Id);

    getEmployees();
    console.log("delete : ", Id);

    //alert(`Employee deleted successfully`);
    toast.success('Employee deleted successfully');
  };

  const handleUpdateEmployee = (employee) => {
    console.log(employee);
    setUpdateEmployee(employee);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleLogOff = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  
  return (
    <>
      <div className="container">
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <button className="btn btn-secondary" onClick={handleLogOff}>
            Log Off
          </button>
        </div>
        <AddEmployee
          updateEmployeeList={() => {
            getEmployees();
            setUpdateEmployee({});
          }}
          employee={updateEmployee}
        />
        <table className="table table-bordered table-strip">
          <thead>
            <tr>
              <th>Id</th>
              <th>Employee Id</th>
              <th>Organization Id</th>
              <th>Employee Name</th>
              <th>Password</th>
              <th>Email Id</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{backgroundColor:"white"}}>
            {employeeList.map((employeeItem) => {
              return (
                <tr key={employeeItem.id}>
                  <td>{employeeItem.id}</td>
                  <td>{employeeItem.EmpId}</td>
                  <td>{employeeItem.OrgId}</td>
                  <td>{employeeItem.EmpName}</td>
                  <td>{employeeItem.Password}</td>
                  <td>{employeeItem.EmailId}</td>
                  <td>{employeeItem.Contact}</td>
                  <td>{employeeItem.Address}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateEmployee(employeeItem)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(employeeItem.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ToastContainer/>
      </div>
    </>
  );
}
