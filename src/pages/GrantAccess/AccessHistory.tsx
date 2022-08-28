import AccessCodeModal from "components/AccessCodeModal";
import Filter from "components/Filters";
import SearchFilter from "components/SearchFilter";
import { TableColumn, TableHeader } from "components/Table";
import SVGs from "helpers/SVGs";
import { formatDate, formatDateTime } from "helpers/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  accessHistorySearchHistory,
  disableAccessCode,
  getCommunityAccessHistory,
} from "services/access";

const AccessHistory = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [communityHistory, setCommunityHistory] = useState<any>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeAllList, setActiveAllList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [showCodeGenerated, setShowCodeGenerated] = useState(false);

  const { register } = useForm();
  const [params, setParams] = useState<any>({});

  const getHistory = async () => {
    await getCommunityAccessHistory().then((res) => {
      setLoading(false);
      console.log(res.data.results);
      setCommunityHistory(res.data.results);
      // const all = communityHistory.filter(
      //   (el: any) => el.access_type !== "multiple"
      // );
      setActiveAllList(res.data.results);
    });
  };

  const reshare = (code: any) => {
    setAccessCode(code);
    setShowCodeGenerated(true);
  };

  const disable = (id: string) => {
    const data = { access_id: id };
    setLoading(true);
    setActiveAllList([]);
    disableAccessCode(data).then((res) => {
      console.log(res);
      getHistory();
    });
  };

  useEffect(() => {
    getHistory();
  }, []);

  const multipleAccessHistory = communityHistory.filter(
    (el: any) => el.access_type === "multiple"
  );
  // let allAccessHistory = communityHistory.filter(
  //   (el: any) => el.access_type !== "multiple"
  // );

  const tabs = [
    {
      id: 1,
      name: "All Access",
    },
    // {
    //   id: 2,
    //   name: "Multiple Access",
    // },
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

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSearch = (text: string) => {
    setShowFilter(false);
    const data = {
      search_text: text,
    };
    accessHistorySearchHistory(data).then((res) => {
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

    accessHistorySearchHistory(temp).then((res) => {
      setLoading(false);
      const data = res.data.results;
      setActiveAllList(data);
    });
  };

  const view = ({ id }: any) => {
    navigate(`/grant_access/access_history/visitor_details/${id}`);
  };
  return (
    <div className="mt-10 pb-40">
      <AccessCodeModal
        showCodeGenerated={showCodeGenerated}
        setShowCodeGenerated={setShowCodeGenerated}
        register={register}
        accessCode={accessCode}
        reshare={true}
      />
      <div className="flex justify-between items-center">
        <h4>
          Access History{" "}
          <span className="text-white bg-primary rounded-full px-3 text-xs">
            {activeAllList.length}
          </span>{" "}
        </h4>
        <SearchFilter handleSearch={handleSearch} toggleFilter={toggleFilter} />
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

      {showFilter && <Filter handleChange={handleChange} />}
      {activeTab === 1 && (
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headersAll} />
          </thead>
          <tbody>
            {loading && "Loading..."}
            {!loading && activeAllList.length === 0 && "No Access History"}
            {activeAllList?.map((data: any) => (
              <tr
                key={data.id}
                className="border-b capitalize border-[#C3C9DA]"
              >
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
                <TableColumn
                  td={data?.code || data.visitors[0]?.code || "N/A"}
                />
                <TableColumn td={data.visitors[0]?.phone_number || "N/A"} />
                <TableColumn td={formatDateTime(data?.created)} />
                <TableColumn
                  td={SVGs.dots}
                  list={[
                    {
                      title: "Reshare Code",
                      action: () => {
                        reshare(data?.code || data?.visitors[0]?.code);
                      },
                    },
                    {
                      title: data?.status !== "disabled" ? "Disable" : "Enable",
                      action: () => {
                        disable(data?.id);
                      },
                    },
                  ]}
                  type="dropdown"
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {activeTab === 2 && (
        <>
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
