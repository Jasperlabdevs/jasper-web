import { AxiosResponse } from "axios";
import ErrorModal from "components/ErrorModal";
import Modal from "components/Modal";
import { ChangeEvent, useEffect, useState } from "react";
import {
  changeUserNotificationSettings,
  getUserNotificationSettings,
} from "services/helperServices";

const notificationData: any = {
  manager_access: {
    notification: "Access Request Notifications",
    description:
      "By turning on this toggle, you agree to receive notifications for access requests",
    value: false,
  },
  manager_payment: {
    notification: "Payment Notifications",
    description:
      "By turning on this toggle, you aggree to recieve payment notifications",
    value: false,
  },
  manager_issue: {
    notification: "Issue Notifications",
    description:
      "By turning on this toggle, you aggree to recieve issue notifications",
    value: false,
  },
  manager_post: {
    notification: "Post request Notifications",
    description:
      "By turning on this toggle, you aggree to recieve post request notifications",
    value: false,
  },
  manager_chat: {
    notification: "Chat Notifications",
    description:
      "By turning on this toggle, you aggree to recieve chat notifications",
    value: false,
  },
  manager_new_member: {
    notification: "New Member Notifications",
    description:
      "By turning on this toggle, you aggree to recieve new member notifications",
    value: false,
  },
};

const PushNotifications = () => {
  const [defaults, setDefaults] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserNotificationSettings().then((res: AxiosResponse) =>
      setDefaults(res.data)
    );
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newSettings = { ...defaults, [value]: checked };
    changeUserNotificationSettings(newSettings).then(
      (res: AxiosResponse) => setDefaults(res.data),
      (e: any) => setError(JSON.stringify(e.response.data))
    );
  };

  return (
    <div className="mt-14 max-w-4xl">
      <h4>Push Notifications</h4>

      <div className="flex flex-col gap-1">
        {Object.entries(defaults).map(([key, value]) => (
          <div key={key}>
            <div className="config my-10 max-w-5xl ">
              <div className="texts ">
                <p className="!text-black mb-2 text-base">
                  {notificationData[key]?.notification}
                </p>
                <p className="text-sm">{notificationData[key].description}</p>
              </div>
              <label className="switch mt-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  value={key}
                  checked={value}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <Modal show={error} toggleClose={() => setError(null)}>
        <ErrorModal onHide={() => setError(null)} body={error} />
      </Modal>
    </div>
  );
};

export default PushNotifications;
