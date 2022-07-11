import Filter from "components/Filters";
import SearchFilter from "components/SearchFilter";
import { TableColumn, TableHeader } from "components/Table";
import SVGs from "helpers/SVGs";
import { formatDate, formatDateTime } from "helpers/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCommunityAccessHistory } from "services/access";

const AccessHistory = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [communityHistory, setCommunityHistory] = useState<any>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCommunityAccessHistory().then((res) => {
      setLoading(false);
      console.log(res.data.results);
      setCommunityHistory(res.data.results);
    });
  }, []);

  const multipleAccessHistory = communityHistory.filter(
    (el: any) => el.access_type === "multiple"
  );
  const allAccessHistory = communityHistory.filter(
    (el: any) => el.access_type !== "multiple"
  );

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
    "Visitor's Name",
    "Event Name",
    "Status",
    "Access Type",
    "Gate",
    "Code",
    "Phone Number",
    "Date/Time Generated",
    "More",
  ];
  const headersMultiple = [
    "Event Name",
    "Visitor Type",
    "Gate",
    "Access Type",
    "Date/Time Generated",
    "Valid From",
    "Valid To",
    "More",
  ];

  const view = ({ id }: any) => {
    navigate(`/grant_access/access_history/visitor_details/${id}`);
  };
  return (
    <div className="mt-10 ">
      <div className="flex justify-between items-center">
        <h4>
          Members{" "}
          <span className="text-white bg-primary rounded-full px-3 text-xs">
            {communityHistory.length}
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
            {loading && "Loading..."}
            {!loading && allAccessHistory.length === 0 && "No Access History"}
            {allAccessHistory?.map((data: any, index: number) => (
              <tr key={index} className="border-b capitalize border-[#C3C9DA]">
                <TableColumn td={data.visitors[0]?.name || "N/A"} />
                <TableColumn td={data?.event_name || "N/A"} />
                <TableColumn
                  td={data?.status}
                  type="status"
                  status_type={true}
                />
                <TableColumn td={data?.access_type} />
                <TableColumn td={data?.gate[0]?.name} />
                <TableColumn
                  td={data?.code || data.visitors[0]?.code || "N/A"}
                />
                <TableColumn td={data.visitors[0]?.phone_number || "N/A"} />
                <TableColumn td={formatDateTime(data?.created)} />
                <TableColumn
                  td={SVGs.dots}
                  list={["Reshare Code", "Disable"]}
                  type="dropdown"
                />
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
              {!loading &&
                multipleAccessHistory.length === 0 &&
                "No Multiple Access History"}
              {multipleAccessHistory?.map((data: any, index: number) => (
                <tr
                  key={index}
                  className="border-b capitalize py-2 border-[#C3C9DA]"
                >
                  <TableColumn td={data.event_name} />
                  <TableColumn td={data.visitor_type} />
                  <TableColumn td={data.gate[0]?.name} />
                  <TableColumn td={data.access_type} />
                  <TableColumn td={formatDate(data?.created)} />
                  <TableColumn td={formatDate(data?.valid_from)} />
                  <TableColumn td={formatDate(data?.valid_to)} />
                  <TableColumn
                    td="View"
                    buttonType="tertiary"
                    type="button"
                    onClick={() => view(data.id)}
                  />
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
