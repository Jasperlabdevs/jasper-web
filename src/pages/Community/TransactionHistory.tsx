import { TableColumn, TableHeader } from "components/Table";
import { useNavigate } from "react-router-dom";
import SVGs from "helpers/SVGs";
import { useEffect, useState } from "react";
import useFetch from "hooks/useFetch";
import { getTransactionHistory, getTransactionHistorySearch } from "services/payment";
import Loader from "components/Loader";
import { formatDate } from "helpers/utils";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [ searchText, setSearchText ] = useState('')
  const [transactions, requestLoading, ] = useFetch(
    getTransactionHistory
  );

  const [ transactionList, setTransactionList ] = useState(transactions)

  const handleSearch = (searchText:string) => {
      const data = {
        search_text: searchText,
      };
      getTransactionHistorySearch(data).then((res) => {
        const data = res.data.results;
        setTransactionList(data);
      });
  }

  useEffect(()=>{
    setTransactionList(transactions)
  },[transactions])

  const headers = [
    "Payment Request Name",
    "User",
    "Amount Paid",
    "Date Due",
    "Reference Number",
    "Action",
  ];

  return (
    <div>
      <div className="mt-10 overflow-x-hidden">
        {requestLoading && <Loader />}

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <p
              onClick={() => navigate(-1)}
              className="text-red gap-2 text-xs cursor-pointer flex items-center"
            >
              <span>{SVGs.arrow_left}</span>
              {"  "}
            </p>
            <h5 className="my-6">
              {" "}
              Transaction History{" "}
              <span className="text-white bg-primary rounded-full px-3 text-xs">
                {!!transactionList && transactionList.length}
              </span>
            </h5>
          </div>
          <div>
          <form className="bg-[#F9F9FB] flex w-5xl py-2 px-4 rounded-lg">
          <button type="button" onClick={() => handleSearch(searchText)}>
            {SVGs.search}
          </button>
          <input
            type="text"
            className="ml-2 outline-none px-2 w-5xl bg-[#F9F9FB] py-3"
            placeholder="Search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </form>
          </div>
        </div>
      </div>

      <div className=" py-5">
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {!!transactionList &&
              transactionList.map((data: any) => (
                <tr className="border-b border-[#C3C9DA] align-vertical">
                  <TableColumn td={data?.payment?.name} />
                  <TableColumn td={data?.member?.first_name + ' ' + data?.member?.last_name} />
                  <TableColumn td={"₦" + data?.payment?.amount} />
                  <TableColumn td={formatDate(data?.payment?.due_date)} />
                  <TableColumn td={data?.ref_number} />
                  <TableColumn
                    td="View Payment Request"
                    type="button"
                    buttonType="tertiary"
                    onClick={() =>
                      navigate(
                        "/community/collect_payments/new_payment_request/" +
                          data?.payment?.id
                      )
                    }
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
