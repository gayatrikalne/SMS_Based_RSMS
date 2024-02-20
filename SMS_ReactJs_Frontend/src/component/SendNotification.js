import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SendNotification(props) {

    const [NotifId, setNotifId] = useState();
    const [Id, setId] = useState();
    const [NDate, setNDate] = useState();

  useEffect(() => {
    if (props.notification.NotificationId) {
      setNotifId(props.notification.NotificationId);
      setId(props.notification.id);
      setNDate(props.notification.Date);
    } 
  },[props]);

  const handleInput = (e) => {
    switch (e.target.id) { 
      case "NotifId":
        setNotifId(e.target.value);
        break;
      case "Id":
        setId(e.target.value);
        break;
      case "NDate":
        setNDate(e.target.value);
        break;
      default:
        break;
    }
  };
  
  const sendNotification = async (notification) => {
    const response = await axios.post(
      "http://127.0.0.1:5000/notifications",
      notification
    );
    if (response.data) {
      props.updateNotificationList();
      resetForm();
    }
  };

  const resetForm = () => {
    setNotifId("");
    setId("");
    setNDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const object = {
      NotificationId : NotifId,
      id: Id,
      Date: NDate,
    };

    console.log(object);
    sendNotification(object);
  };

  return (
    <form className="row notification-form">
        <div className="form-group col-4">
        <label htmlFor="NotifId">Notification ID: </label>
        <input
          className="form-control"
          type="text"
          id="NotifId"
          value={NotifId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="Id">Id</label>
        <input
          className="form-control"
          type="text"
          id="Id"
          value={Id}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="NDate">Notification Date: </label>
        <input
          className="form-control"
          type="text"
          id="NDate"
          value={NDate}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4 notification-btn">
        <button className="btn btn-success" onClick={handleSubmit}>
           Send SMS
        </button>
      </div>
    </form>
  );
}

