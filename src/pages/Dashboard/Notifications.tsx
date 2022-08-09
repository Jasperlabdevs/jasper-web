import { useEffect, useState } from "react";
import { getAllNotifications } from "services/notifications";
import NotificationCard from "./NotificationCard";

const Notifications = () => {

  const [allNotifications, setAllNotifications] = useState([])
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading ] = useState(true)
  const notifTabs = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Access Requests",
    },
    {
      id: 3,
      name: "Payment",
    },
    {
      id: 4,
      name: "Issues",
    },
    {
      id: 5,
      name: "Post Requests",
    },
  ];
  useEffect(()=>{
    getAllNotifications().then(
      res => {
        setLoading(false)
        setAllNotifications(res.data.results)
      }
      ).catch(err => {
      setLoading(false)
      console.log(err)
    })
  },[])

  return (
    <aside className="min-w-[450px] border-l border-[#EFF1F5] py-10 hidden lg:block">
          <h4 className="px-10 mb-6">Notifications</h4>
          <div className="flex px-10 border-b border-[#EFF1F5]">
            {notifTabs.map((data: any) => (
              <div
                key={data.id}
                onClick={() => setActiveTab(data.id)}
                className={`text-grey_text px-2 py-1.5 cursor-pointer ${
                  data.id === activeTab && "text-black border-b border-primary"
                } `}
              >
                {data.name}
              </div>
            ))}
          </div>

          <div className=" py-5">
            {allNotifications.length === 0 && !loading && <div className="px-4">No Notification</div>}
            {loading && <div className="px-4">Loading...</div>}
            {
              allNotifications.map(data => (
                <NotificationCard />
              ))
            }
          
          </div>
        </aside>
  );
};

export default Notifications;
