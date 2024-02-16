import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ServerDetailsPage.css";
import AddServer from "../component/AddServer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ServerDetailsPage() {
  const navigate = useNavigate();

  const [serverList, setServerList] = useState([]);

  const [updateServer, setUpdateServer] = useState({});

  const getServers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/server");
      setServerList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (Id) => {
    console.log("delete : ", typeof Id);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:5000/server/${Id}`
    );
    console.log("delete : ", Id);

    getServers();
    console.log("delete : ", Id);

    toast.success('Server deleted successfully');
    
  };

  const handleUpdateServer = (server) => {
    console.log(server);
    setUpdateServer(server);
  };

  useEffect(() => {
    getServers();
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
        <AddServer
          updateServerList={() => {
            getServers();
            setUpdateServer({});
          }}
          server={updateServer}
        />
        <table className="table table-bordered table-strip">
          <thead>
            <tr>
              <th>Id</th>
              <th>Server Id</th>
              <th>Employee Id</th>
              <th>Organization Id</th>
              <th>Server Name</th>
              <th>IPAddress</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{backgroundColor:"white"}}>
            {serverList.map((serverItem) => {
              return (
                <tr key={serverItem.id}>
                  <td>{serverItem.id}</td>
                  <td>{serverItem.ServerId}</td>
                  <td>{serverItem.EmpId}</td>
                  <td>{serverItem.OrgId}</td>
                  <td>{serverItem.ServerName}</td>
                  <td>{serverItem.IPAddress}</td>
                  <td>{serverItem.Status}</td>
                  <td>{serverItem.Reason}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateServer(serverItem)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(serverItem.id)}
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
