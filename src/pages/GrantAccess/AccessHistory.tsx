import Button from "components/Button";
import Filter from "components/Filters";
import SearchFilter from "components/SearchFilter";
import { TableColumn, TableHeader } from "components/Table";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import { formatDate } from "helpers/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAccessHistory } from "services/access";

const AccessHistory = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [ userHistory, setUserHistory ] = useState([])
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(true)

  useEffect(()=> {
    getUserAccessHistory().then(
      res => {
        setLoading(false)
        console.log(res.data.results)
        setUserHistory(res.data.results)
      }
    )
  },[])

  const tabs = [
    {
      id: 1,
      name: "All Access",
    },
    {
      id: 2,
      name: "Multiple Access",
    },
  ];

  const headersAll = [
    "Event Name",
    "Status",
    "Access Type",
    "Gate",
    "Code",
    "Date/Time Generated",
    "More",
  ];
  const headersMultiple = [
    "Status",
    "Access Type",
    "Gate",
    "Event",
    "Date/Time Generated",
    "More",
  ];

  const view = () => {
    navigate("/grant_access/access_history/visitor_details");
  };
  return (
    <div className="mt-10 ">
      <div className="flex justify-between items-center">
        <h4>
          Members{" "}
          <span className="text-white bg-primary rounded-full px-3 text-xs">
            30
          </span>{" "}
        </h4>
        <SearchFilter />
      </div>

      <div className="my-6 flex w-fit border-b border-[#EFF1F5]">
        {tabs.map((data: any) => (
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

      {activeTab === 1 && (
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headersAll} />
          </thead>
          <tbody>
            { loading && "Loading..." }
            {/* { (!loading && userHistory.length === 0) && "Loading..." } */}
            {userHistory?.map((data:any, index:number) => (
              <tr key={index} className="border-b border-[#C3C9DA]">
                <TableColumn td={data?.event_name} />
                <TableColumn td={data?.status} type="status" status_type={true} />
                <TableColumn td={data?.access_type} />
                <TableColumn td={data?.gate[0]?.name} />
                <TableColumn td={data?.code} />
                <TableColumn td={formatDate(data?.created)} />
                <TableColumn td={SVGs.dots} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {activeTab === 2 && (
        <>
          <Filter />
          <table className="w-full ">
            <thead className="">
              <TableHeader headers={headersMultiple} />
            </thead>
            <tbody>
              {TableContent?.map((data, index) => (
                <tr key={index} className="border-b border-[#C3C9DA]">
                  <TableColumn td="Kofi Emma" />
                  <TableColumn td="N/A" />
                  <TableColumn td="Generated" type="status" />
                  <TableColumn td="One-Time Access" />
                  <TableColumn td="3123" />
                  <TableColumn td="088090809" />
                  <TableColumn td="15th Feb, 2022 - 12:00pm" />
                  <TableColumn td="View" buttonType="tertiary" type="button" />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AccessHistory;
