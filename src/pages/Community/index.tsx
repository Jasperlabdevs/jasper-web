import Header from "components/Header";
import SubHeader from "components/SubHeader";
import { communityHeaderData } from "helpers/data";
import { Outlet } from "react-router-dom";

const Community = () => {
  return (
    <div>
      <Header />
      <SubHeader headerData={communityHeaderData} head="Community" />
      <div className="px-10 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Community;
