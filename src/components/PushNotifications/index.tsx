import Configuration from "components/Configuration";
import { useForm } from "react-hook-form";

const PushNotifications = () => {

  const { register } = useForm()

  const notificationData = [
    {
      notification: "Access Request Notifications",
      description:
        "By turning on this toggle, you agree to receive notifications for access requests",
    },
    {
      notification: "Payment Notifications",
      description:
        "By turning on this toggle, you aggree to recieve payment notifications",
    },
    {
      notification: "Issue Notifications",
      description:
        "By turning on this toggle, you aggree to recieve issue notifications",
    },
    {
      notification: "Post request Notifications",
      description:
        "By turning on this toggle, you aggree to recieve post request notifications",
    },
    {
      notification: "Chat Notifications",
      description:
        "By turning on this toggle, you aggree to recieve chat notifications",
    },
    {
      notification: "New Member Notifications",
      description:
        "By turning on this toggle, you aggree to recieve new member notifications",
    },
  ];

  return (
    <div className="mt-14 max-w-4xl">
      <h4>Push Notifications</h4>

      <div className="flex flex-col gap-1">
        {notificationData.map((data) => (
          <div key={data.notification}>
            <Configuration
              name={data.notification}
              register={register}
              title={data.notification}
              description={data.description}
              hasCheckList={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PushNotifications;
