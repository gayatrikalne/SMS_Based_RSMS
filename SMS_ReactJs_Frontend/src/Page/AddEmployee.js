import { useEffect, useState } from "react";
import axios from "axios";

export default function AddEmployee(props) {
  const [EmpId, setEmpId] = useState();
  const [EmpName, setEmpName] = useState();
  const [OrgId, setOrgId] = useState();
  const [EmpEmailId, setEmpEmailId] = useState();
  const [EmpContact, setEmpContact] = useState();
  const [EmpAddress, setEmpAddress] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.employee.id) {
        setEmpId(props.employee.id);
        setEmpName(props.employee.name);
        setOrgId(props.employee.oid);
        setEmpEmailId(props.employee.EmailId);
        setEmpContact(props.employee.Contact);
        setEmpAddress(props.employee.Address);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

  const updateEmployee = async () => {
    const updatedData = {
      id: EmpId,
      name: EmpName,
      oid: OrgId,
      EmailId: EmpEmailId,
      Contact: EmpContact,
      Address: EmpAddress,
    };
    const udpatedRecord = await axios.put(
      "http://127.0.0.1:1920/employee",
      updatedData
    );
    props.updateEmployeeList();
    resetForm();
    alert("Employee updated successfully!");
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "EmpId":
        setEmpId(e.target.value);
        break;
      case "EmpName":
        setEmpName(e.target.value);
        break;
      case "OrgId":
        setOrgId(e.target.value);
        break;
      case "EmpEmailId":
        setEmpEmailId(e.target.value);
        break;
      case "EmpContact":
        setEmpContact(e.target.value);
        break;
      case "EmpAddress":
        setEmpAddress(e.target.value);
        break;
    }
  };

  const saveEmployee = async (employee) => {
    const response = await axios.post(
      "http://127.0.0.1:1920/employee",
      employee
    );
    if (response.data) {
      props.updateEmployeeList();
      resetForm();
    }
  };

  const resetForm = () => {
    setEmpId("");
    setEmpName("");
    setOrgId("");
    setEmpEmailId("");
    setEmpContact("");
    setEmpAddress("");
    setIsUpdateButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const object = {
        id: EmpId,
        name: EmpName,
        oid: OrgId,
        EmailId: EmpEmailId,
        Contact: EmpContact,
        Address: EmpAddress,
    };

    console.log(object);

    // call api to save product
    if (isUpdateButton) {
      updateEmployee(object);
    } else {
      saveEmployee(object);
    }
    // const response = await axios.post("http://127.0.0.1:1920/products", object);
    // console.log(response.data);
  };

  return (
    <form className="row employee-form">
      <div className="form-group col-4">
        <label htmlFor="EmpId">Employee Id: </label>
        <input
          className="form-control"
          type="text"
          id="EmpId"
          value={EmpId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="EmpName">Employee Name: </label>
        <input
          className="form-control"
          type="text"
          id="EmpName"
          value={EmpName}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="OrgId">Organization ID: </label>
        <input
          className="form-control"
          type="text"
          id="OrgId"
          value={OrgId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="EmpEmailId">Employee Email ID: </label>
        <input
          className="form-control"
          type="text"
          id="EmpEmailId"
          value={EmpEmailId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="EmpContact">Employee Contact: </label>
        <input
          className="form-control"
          type="text"
          id="EmpContact"
          value={EmpContact}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4 product-btn">
        <button className="btn btn-success" onClick={handleSubmit}>
          {isUpdateButton ? "Update Employee" : "Save Employee"}
        </button>
      </div>
    </form>
  );
}
