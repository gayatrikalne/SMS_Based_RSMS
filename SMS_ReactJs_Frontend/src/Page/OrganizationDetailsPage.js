import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrganizationDetailsPage.css";
import AddOrganization from "../component/AddOrganization";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrganizationDetailsPage() {
  const navigate = useNavigate();

  const [organizationList, setOrganizationList] = useState([]);

  const [updateOrganization, setUpdateOrganization] = useState({});

  const getOrganizations = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/organization");
      setOrganizationList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (Id) => {
    console.log("delete : ", typeof Id);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:5000/organization/${Id}`
    );
    console.log("delete : ", Id);

    getOrganizations();
    console.log("delete : ", Id);

    //alert(`Organization deleted successfully`);
    toast.success('Organization deleted successfully');
  };

  const handleUpdateOrganization = (organization) => {
    console.log(organization);
    // pass product object to addProduct component
    setUpdateOrganization(organization);
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  const handleLogOff = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    // <React.Fragment>
    <>
      <div className="container">
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <button className="btn btn-secondary" onClick={handleLogOff}>
            Log Off
          </button>
        </div>
        <AddOrganization
          updateOrganizationList={() => {
            getOrganizations();
            setUpdateOrganization({});
          }}
          organization={updateOrganization}
        />
        <table className="table table-bordered table-strip">
          <thead>
            <tr>
              <th>Id</th>
              <th>Organization Id</th>
              <th>Organization Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{backgroundColor:"white"}}>
            {organizationList.map((organizationItem) => {
              return (
                <tr key={organizationItem.id}>
                  <td>{organizationItem.id}</td>
                  <td>{organizationItem.OrgId}</td>
                  <td>{organizationItem.OrgName}</td>
                  <td>{organizationItem.Address}</td>
                  <td>{organizationItem.Contact}</td>
                  <td>{organizationItem.Status}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateOrganization(organizationItem)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(organizationItem.id)}
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
