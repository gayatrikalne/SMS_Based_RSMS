import { useEffect, useState } from "react";
import axios from "axios";

export default function AddNotification(props) {
    const [NotifId, setNotifId] = useState();
    const [Id, setId] = useState();
    const [NotifDate, setNotifDate] = useState();

  const [isUpdateButton, setIsUpdateButton] = useState(false);

  useEffect(() => {
    if (props.notification.NotificationId) {
        setNotifId(props.notification.NotificationId);
        setId(props.notification.id);
        setNotifDate(props.notification.Date);
      setIsUpdateButton(true);
    } else setIsUpdateButton(false);
  }, [props]);

    const handleInput = (n) => {
        switch (n.target.id) {
            case "ServerId":
                setServerId(n.target.value);
                break;
            case "NotifId":
                setNotifId(n.target.value);
                break;
            case "NotifDate":
                setNotifDate(n.target.value);
                break;
        }
    };

  const saveNotification = async (notification) => {
    const response = await axios.post(
      "http://127.0.0.1:1920/notifications",
      notification
    );
    if (response.data) {
      props.updateNotificationList();
      resetForm();
    }
  };

  const resetForm = () => {
    setId("");
    setNotifId("");
    setNotifDate("");
   
    setIsUpdateButton(false);
  };

  const handleSubmit = async (n) => {
    n.preventDefault();
    const object = {
        id: Id,
        NotificationId: NotifId,
        Date: NotifDate,
    };

    console.log(object);

    // call api to save product
    if (isUpdateButton) {
      updateNotification(object);
    } else {
      saveNotification(object);
    }
    // const response = await axios.post("http://127.0.0.1:1920/products", object);
    // console.log(response.data);
  };

  return (
    <form className="row server-form">
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
        <label htmlFor="ServerId">Server Id: </label>
        <input
          className="form-control"
          type="text"
          id="ServerId"
          value={ServerId}
          onChange={handleInput}
        />
      </div>
      <div className="form-group col-4">
        <label htmlFor="NotifDate">Notification Date: </label>
        <input
          className="form-control"
          type="text"
          id="NotifDate"
          value={NotifDate}
          onChange={handleInput}
        />
      </div>
      
      <div className="form-group col-4 server-btn">
        <button className="btn btn-success" onClick={handleSubmit}>
          {isUpdateButton ? "Update Notification" : "Save Notification"}
        </button>
      </div>
    </form>
  );
}
