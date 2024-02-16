import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "./ProductPage.css";
import AddNotification from "./AddNotification";

export default function NotificationPage() {
  const navigate = useNavigate();

  const [NotificationList, setNotificationList] = useState([]);

  const [updateNotification, setUpdateNotification] = useState({});
  const [isUpdate, setIsUpdate] = useState("");

  const getNotifications = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:1920/notification");
      setNotificationList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    console.log("delete : ", notificationId);
    const deletedRecords = await axios.delete(
      `http://127.0.0.1:1920/notification/${notificationId}`
    );
    getNotifications();
    alert(`${deletedRecords.data} Notification deleted successfully`);
  };

  const handleUpdateNotification = (notification) => {
    console.log(notification);
    
    setIsUpdate(notification.id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/notification", {});

    getNotifications();

    // try {
    //   const response = await axios.get("http://127.0.0.1:1920/products");
    //   setProductList(response.data);
    // } catch (err) {
    //   console.log(err);
    // }

    /* setProductList([
      {
        id: 1,
        name: "iPhone 9",
        price: 789,
        category: "smartphones",
        qty: 12,
      },
      {
        id: 2,
        name: "iPhone X",
        price: 899,
        category: "smartphones",
        qty: 15,
      },
      {
        id: 3,
        name: "Samsung Universe 9",
        price: 1249,
        category: "smartphones",
        qty: 30,
      },
      {
        id: 4,
        name: "iPhone 7",
        price: 439,
        category: "smartphones",
        qty: 10,
      },
      {
        id: 5,
        name: "iPhone 8",
        price: 469,
        category: "smartphones",
        qty: 20,
      },
      {
        id: 6,
        name: "iPhone 11",
        price: 1189,
        category: "smartphones",
        qty: 500,
      },
    ]);  */
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
          <button className="btn btn-info" onClick={handleLogOff}>
            Log Off
          </button>
        </div>
        <AddNotification
          updateNotificationList={() => {
            getNotifications();
            setUpdateNotification({});
          }}
          notification={updateNotification}
        />
        <table className="table table-bordered table-strip">
          <thead>
            <tr>
              <th>Notification ID</th>
              <th>Server Id</th>
              <th>Notification Date</th>
            </tr>
          </thead>
          <tbody>
            {NotificationList.map((NotificationItem) => { 
              return (
                <tr key={NotificationItem.id}>
                  <td>
                    <input
                      className="input-disabled"
                      type="text"
                      id="NotifId" 
                      value={NotificationItem.id}
                      disabled={
                        isUpdate === NotificationItem.id ? undefined : "true"
                      }
                    />
                  </td>
                  <td>
                  {" "}
                    <input
                      className="input-disabled"
                      type="text"
                      id="ServerId"
                      value={NotificationItem.name}
                      disabled={
                        isUpdate === NotificationItem.id ? undefined : "true"
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input-disabled"
                      type="text"
                      id="NotifDate"
                      value={NotificationItem.oid} 
                      disabled={
                        isUpdate === NotificationItem.id ? undefined : "true"
                      }
                    />
                  </td>                  
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleUpdateNotification(NotificationItem)}
                    >
                      {isUpdate === NotificationItem.id ? "Save" : "Update"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteNotification(NotificationItem.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
