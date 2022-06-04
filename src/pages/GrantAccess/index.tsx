import Header from "components/Header";
import SubHeader from "components/SubHeader";
import { accessHeaderData } from "helpers/data";
import { Outlet } from "react-router-dom";

const GrantAccess = () => {
  return (
    <div>
      <Header />
      <SubHeader headerData={accessHeaderData} head="Grant Access" />
      <div className="px-10 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default GrantAccess;
