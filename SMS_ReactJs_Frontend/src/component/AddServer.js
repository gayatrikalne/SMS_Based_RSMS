import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddServer(props) {
    const [Id, setId] = useState();
    const [serverId, setServerId] = useState();
    const [employeeId, setEmployeeId] = useState();
    const [organizationId, setOrganizationId] = useState();
    const [serverName, setServerName] = useState();
    const [serverIPAddress, setIPAddress] = useState();
    const [serverStatus, setStatus] = useState();
    const [serverReason, setReason] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.server.id) {
        setId(props.server.id)
        setServerId(props.server.ServerId);
        setEmployeeId(props.server.EmpId);
        setOrganizationId(props.server.OrgId);
        setServerName(props.server.ServerName);
        setIPAddress(props.server.IPAddress);
        setStatus(props.server.Status);
        setReason(props.server.Reason);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

  const updateServer = async () => {
    const updatedData = {
        id: Id,
        ServerId: serverId,
        EmpId: employeeId,
        OrgId: organizationId,
        ServerName: serverName,
        IPAddress: serverIPAddress,
        Status: serverStatus,
        Reason: serverReason,
    };
    const udpatedRecord = await axios.put(
      "http://127.0.0.1:5000/server",
      updatedData
    );
    props.updateServerList();
    resetForm();
    toast.success('Server updated successfully!');
  };

  const handleInput = (e) => {
    switch (e.target.id) {
        case "Id":
            setId(e.target.value);
            break;
        case "serverId":
            setServerId(e.target.value);
            break;
        case "employeeId":
            setEmployeeId(e.target.value);
            break;
        case "organizationId":
            setOrganizationId(e.target.value);
            break;
        case "serverName":
            setServerName(e.target.value);
            break;
        case "serverIPAddress":
            setIPAddress(e.target.value);
            break;
        case "serverStatus":
            setStatus(e.target.value);
            break;
        case "serverReason":
            setReason(e.target.value);
            break;
    }
  };

  const saveServer = async (server) => {
    const response = await axios.post(
      "http://127.0.0.1:5000/server",
      server
    );
    if (response.data) {
      props.updateServerList();
      resetForm();
    }
  };

  const resetForm = () => {
    setId("");
    setServerId("");
    setEmployeeId("");
    setOrganizationId("");
    setServerName("");
    setIPAddress("");
    setStatus("");
    setReason("");
    setIsUpdateButton(false);
  };

  const handleSubmit = async (s) => {
    s.preventDefault();
    const object = {
        id: Id,
        ServerId: serverId,
        EmpId: employeeId,
        OrgId: organizationId,
        ServerName: serverName,
        IPAddress: serverIPAddress,
        Status: serverStatus,
        Reason: serverReason,
    };

    console.log(object);

    // call api to save product
    if (isUpdateButton) {
      updateServer(object);
    } else {
      saveServer(object);
    }
  };

  return (
    <form className="row server-form">
      <div className="form-group col-4">
        <label htmlFor="serverId">Server Id: </label>
        <input
          className="form-control"
          type="text"
          id="serverId"
          value={serverId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="employeeId">Employee ID: </label>
        <input
          className="form-control"
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="organizationId">Organization ID: </label>
        <input
          className="form-control"
          type="text"
          id="organizationId"
          value={organizationId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="serverName">Server Name: </label>
        <input
          className="form-control"
          type="text"
          id="serverName"
          value={serverName}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="serverIPAddress">Server IPAddress: </label>
        <input
          className="form-control"
          type="text"
          id="serverIPAddress"
          value={serverIPAddress}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="serverStatus">Status: </label>
        <input
          className="form-control"
          type="text"
          id="serverStatus"
          value={serverStatus}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="serverReason">Reason: </label>
        <input
          className="form-control"
          type="text"
          id="serverReason"
          value={serverReason}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4 server-btn">
        <button className="btn btn-success" onClick={handleSubmit}>
          {isUpdateButton ? "Update Server" : "Save Server"}
        </button>
      </div>
      <ToastContainer/>
    </form>
  );
}
