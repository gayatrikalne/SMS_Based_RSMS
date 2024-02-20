import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NotificationDetailsPage.css";
import SendNotification from "../component/SendNotification";

export default function NotificationPage() {

  const navigate = useNavigate();
  const [showServerTable , setShowServerTable] = useState();
  const [notificationList, setNotificationList] = useState([]);
  const [serverList, setServerList] = useState([]);
  const [updateServer, setUpdateServer] = useState({});

  const [updateNotification, setUpdateNotification] = useState({});

  const getNotifications = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/join-tables");
      console.log(response.data); // Log the response data
      setNotificationList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const getFailedInactiveServer = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:5000/serverFailedInactive");
  //     console.log(response.data); // Log the response data
  //     setServerList(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getFailedInactiveServer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/serverFailedInactive");
      setServerList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleUpdateNotification = (notification) => {
    console.log(notification);
    setUpdateNotification(notification);
  };

  const handleUpdateServer = (server) => {
    console.log(server);
    setUpdateServer(server);
  };

  useEffect(() => {
    getFailedInactiveServer();
    getNotifications();
  }, []);

  return (
    <>
      <div className="container">
        <SendNotification
          updateNotificationList={() => {
            getNotifications();
            setUpdateNotification({});
          }}
          notification={updateNotification}
        />

        <div className="row "> {/* Row to center the buttons */}
          <div className="col-3"></div>
          <div className="col-3"> {/* Use a column width of 4 */}
            <div className="form-group notification-btn">
              <button className="btn btn-success" onClick={() => setShowServerTable(true)}>
                Server List
              </button>
            </div>
          </div>
          <div className="col-3"> {/* Use another column width of 4 */}
            <div className="form-group notification-btn">
              <button className="btn btn-success" onClick={() => setShowServerTable(false)}>
                Notification List
              </button>
            </div>
          </div>
        </div>

        {showServerTable ? (
        //   <>
        //   {/* <div className="form-group col-4 notification-btn">
        //     <button className="btn btn-success" onClick={() => setShowServerTable(false)}>
        //         Server List
        //     </button>
        //   </div> */}
        //   <table className="table table-bordered table-strip">
        //   <thead>
        //     <tr>
        //       <th>Id</th>
        //       <th>Server Id</th>
        //       <th>Employee Id</th>
        //       <th>Organization Id</th>
        //       <th>Server Name</th>
        //       <th>IPAddress</th>
        //       <th>Status</th>
        //       <th>Reason</th>
        //     </tr>
        //   </thead>
        //   <tbody style={{backgroundColor:"white"}}>
        //     {serverList.map((serverItem) => {
        //       return (
        //         <tr key={serverItem.id}>
        //           <td>{serverItem.id}</td>
        //           <td>{serverItem.ServerId}</td>
        //           <td>{serverItem.EmpId}</td>
        //           <td>{serverItem.OrgId}</td>
        //           <td>{serverItem.ServerName}</td>
        //           <td>{serverItem.IPAddress}</td>
        //           <td>{serverItem.Status}</td>
        //           <td>{serverItem.Reason}</td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
        //   </>
        <>
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
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "white" }}>
        {serverList
          .filter((serverItem) => !notificationList.find((notificationItem) => notificationItem.id === serverItem.id))
          .map((serverItem) => {
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
              </tr>
            );
          })}
      </tbody>
    </table>
  </>

        ):(
          <>
          {/* <div className="form-group col-4 notification-btn">
            <button className="btn btn-success" onClick={() => setShowServerTable(true)}>
                Notification List
            </button>
          </div> */}
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
              <th>Notification ID</th>
              <th>Notification Date</th>
            </tr>
          </thead>
          <tbody style={{backgroundColor:"white"}}>
            {notificationList.map((notificationItem) => {
              return (
                <tr key={notificationItem.id}>
                  <td>{notificationItem.id}</td>
                  <td>{notificationItem.ServerId}</td>
                  <td>{notificationItem.EmpId}</td>
                  <td>{notificationItem.OrgId}</td>
                  <td>{notificationItem.ServerName}</td>
                  <td>{notificationItem.IPAddress}</td>
                  <td>{notificationItem.Status}</td>
                  <td>{notificationItem.Reason}</td>
                  <td>{notificationItem.NotificationId}</td>
                  <td>{notificationItem.Date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
          </>
        )}
      </div>
    </>
  );
}
