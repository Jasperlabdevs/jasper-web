import Button from "components/Button";
import check from "assets/images/check.png";
import messages from "assets/images/messages.png";
import wallet from "assets/images/wallet-add.png";
import user from "assets/images/user-circle-add.png";

type NotificationType = {
  type?: "warning" | "notif" | "user";
};

const NotificationCard = ({ type }: NotificationType) => {
  let icon_image = check;

  if (type === "warning") {
    icon_image = wallet;
  } else if (type === "notif") {
    icon_image = messages;
  } else if (type === "user") {
    icon_image = user;
  }

  return (
    <div className="flex lg:flex-row flex-col items-start lg:items-center gap-10 lg:justify-between w-full border-[#EFF1F5] border-b py-8 px-10">
      <div className="flex gap-4 w-full">
        <div
          className={`rounded-xl flex justify-center items-center bg-faded w-14 h-14  ${
            type === "warning" && "bg-faded_red"
          } ${type === "notif" && "bg-faded_yellow"} `}
        >
          <img src={icon_image} alt="icon" />
        </div>
        <div>
          <p className="font-medium !text-black">Multiple Access Request</p>
          <p className="!text-black py-1 text-sm truncate">
            For 20 guests; 2nd to Fed. 3rd and the
          </p>
          <div className="pt-1.5 flex  gap-2 text-grey_text items-center">
            <div className="h-6 w-6 rounded-full bg-icon_background text-xs"></div>
            <p className="text-sm">Emmanuel Willimas • 3:15</p>
          </div>
        </div>
      </div>
      <div className="w-fit lg:mt-2">
        <Button title={"Review"} tertiary />
      </div>
    </div>
  );
};

export default NotificationCard;
