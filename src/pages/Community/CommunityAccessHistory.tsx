import AccessCodeModal from "components/AccessCodeModal";
import Filter from "components/Filters";
import SearchFilter from "components/SearchFilter";
import { TableColumn, TableFooter, TableHeader } from "components/Table";

import { formatDateTime } from "helpers/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { accessHistorySearchFilter } from "services/access";

import { getCommunityAccessHistory } from "services/community";

const CommunityAccessHistory = () => {
  const [communityHistory, setCommunityHistory] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [activeAllList, setActiveAllList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [ tableData, setTableData ] = useState<any>({})

  const { register } = useForm();
  const [params, setParams] = useState<any>({});

  const getHistory = async () => {
    await getCommunityAccessHistory().then((res) => {
      setLoading(false);
      console.log(res.data.results);
      setCommunityHistory(res.data.results);
      setTableData(res.data)
      // const all = communityHistory.filter(
      //   (el: any) => el.access_type !== "multiple"
      // );
      setActiveAllList(res.data.results);
    });
  };

  useEffect(() => {
    getHistory();
  }, []);

  const headersAll = [
    "Visitor's Name",
    "Event Name",
    "Status",
    "Access Type",
    "Gate",
    "Code",
    "Phone Number",
    "Date/Time Generated",
  ];

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSearch = (text: string) => {
    setShowFilter(false);
    const data = {
      search_text: text,
    };
    accessHistorySearchFilter(data).then((res) => {
      const data = res.data.results;
      setActiveAllList(data);
    });
  };

  const handleChange = (event: any) => {
    setActiveAllList([]);
    setLoading(true);
    const { name, value } = event.target;

    const temp = { ...params };

    if (value === "All") {
      temp[name] = "";
    } else {
      temp[name] = value;
    }

    setParams(temp);

    accessHistorySearchFilter(temp).then((res) => {
      setLoading(false);
      const data = res.data.results;
      setActiveAllList(data);
    });
  };

  return (
    <div className="mt-10 pb-40">
      <div className="flex justify-between items-center mb-10">
        <h4>
          Access History{" "}
          <span className="text-white bg-primary rounded-full px-3 text-xs">
            {activeAllList.length}
          </span>{" "}
        </h4>
        <SearchFilter handleSearch={handleSearch} toggleFilter={toggleFilter} />
      </div>

      {showFilter && <Filter handleChange={handleChange} />}

      <table className="w-full">
        <thead className="">
          <TableHeader headers={headersAll} />
        </thead>
        <tbody>
          {loading && "Loading..."}
          {!loading && activeAllList.length === 0 && "No Access History"}
          {activeAllList?.map((data: any) => (
            <tr key={data.id} className="border-b capitalize border-[#C3C9DA]">
              <TableColumn td={data.visitors[0]?.name || "N/A"} />
              <TableColumn td={data?.event_name || "N/A"} />
              <TableColumn
                td={
                  data?.status +
                  (data?.access_type === "event"
                    ? " - " +
                      data?.number_of_visitors_countdown +
                      "/" +
                      data?.number_of_visitors
                    : "")
                }
                type="status"
                status_type={data?.status === "generated" ? true : false}
              />
              <TableColumn td={data?.access_type} />
              <TableColumn td={data?.gate[0]?.name} />
              <TableColumn td={data?.code || data.visitors[0]?.code || "N/A"} />
              <TableColumn td={data.visitors[0]?.phone_number || "N/A"} />
              <TableColumn td={formatDateTime(data?.created)} />
            </tr>
          ))}
        </tbody>
        <TableFooter count={tableData?.count} previous={tableData.previous} next={tableData.next} />
      </table>
    </div>
  );
};

export default CommunityAccessHistory;
