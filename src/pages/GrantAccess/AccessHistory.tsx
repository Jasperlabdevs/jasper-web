import Button from "components/Button";
import Filter from "components/Filters";
import SearchFilter from "components/SearchFilter";
import { TableColumn, TableHeader } from "components/Table";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccessHistory = () => {
  const [activeTab, setActiveTab] = useState(1);

  const navigate = useNavigate();

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
    "Access Name",
    "Gate",
    "Code",
    "Phone Number",
    "Date/Time Generated",
    "More",
  ];
  const headersMultiple = [
    "Visitor's Name",
    "Phone Number",
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
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA]">
                <TableColumn td="Kofi Emma" />
                <TableColumn td="N/A" />
                <TableColumn td="Generated" type="status" />
                <TableColumn td="One-Time Access" />
                <TableColumn td="3123" />
                <TableColumn td="3123" />
                <TableColumn td="088090809" />
                <TableColumn td="15th Feb, 2022 - 12:00pm" />
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
              {TableContent.map((data) => (
                <tr className="border-b border-[#C3C9DA]">
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
