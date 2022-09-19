import Button from "components/Button";
import { TableContent } from "helpers/data";
import SearchFilter from "components/SearchFilter";
import Filter from "components/Filters";
import { TableColumn, TableHeader } from "components/Table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dispatchStore, formatDate } from "helpers/utils";
import { get_community_members } from "store/actions/communityMembers";
import img from "assets/images/AccountPhoto.png";

const Members = () => {
  const headers = [
    "User name",
    "User Type",
    "Validity end date",
    "Phone Number",
    "Reg. Date",
    "Status",
    "More",
  ];

  const [ members, setMembers ] = useState([])

  const communityMembers = useSelector((state:any) => state.members)

  useEffect(()=>{
    if(communityMembers){
      setMembers(communityMembers)
    }
  },[communityMembers])

  useEffect(()=> {
    dispatchStore(get_community_members())
  },[])

  return (
    <div>
      <div className="mt-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4>
            Members{" "}
            <span className="text-white bg-primary rounded-full px-3 text-xs">
              {members.length}
            </span>{" "}
          </h4>
          <div className="flex gap-4 ">
            <div>
              <SearchFilter />
            </div>
            <div className="max-w-3xl -mt-10">
              <Button title="Show user PIN" other />
            </div>
          </div>
        </div>
      </div>
      {/* <Filter /> */}
      <div className=" py-5">
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {(members.length > 0) && members.map((data:any) => (
              <tr key={data.id} className="border-b border-[#C3C9DA] align-vertical">
                <TableColumn
                  td={
                    <span>
                      {data?.myuser?.first_name +
                              " " +
                              data?.myuser?.last_name}{" "} <br />
                      <span className="text-grey_text text-xs">{data?.myuser?.email}</span>
                    </span>
                  }
                  type="user"
                  image={ data.myuser?.profile_picture || img}
                />

                <TableColumn td={data?.occupancy_type?.name} type="userType" />
                <TableColumn td={ data.tenancy_end_date ? formatDate(data.tenancy_end_date) : 'N/A'} />
                <TableColumn td={data?.myuser?.phone_number} />
                <TableColumn td={formatDate(data?.date_joined)} />
                <TableColumn  td={data?.is_active ? "enabled" : "disabled"} type="status" />
                <TableColumn
                  td="Manage Access"
                  type="button"
                  buttonType="tertiary"
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
