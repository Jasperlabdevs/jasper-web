import Header from "components/Header";
import SubHeader from "components/SubHeader";
import { accessHeaderData } from "helpers/data";
import { dispatchStore } from "helpers/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { get_gate } from "store/actions/gates";

const GrantAccess = () => {

  const stateGates = useSelector((state:any)=> state.gates)
  const stateCommunity = useSelector((state:any)=> state.community)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stateGates.length === 0) {
      dispatchStore(get_gate(stateCommunity.id, setLoading));
    }
  }, []);


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
