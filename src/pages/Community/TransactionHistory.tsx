import Button from "components/Button";
import { TableContent } from "helpers/data";
import img from "assets/images/AccountPhoto.png";
import SearchFilter from "components/SearchFilter";
import Filter from "components/Filters";
import { TableColumn, TableHeader } from "components/Table";
import { useNavigate } from "react-router-dom";
import SVGs from "helpers/SVGs";
import { Select } from "components/Input";
import ModalLarge from "components/ModalLarge";
import { useState } from "react";
import useFetch from "hooks/useFetch";
import { getTransactionHistory } from "services/payment";
import Loader from "components/Loader";
import { formatDate } from "helpers/utils";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [transactions, requestLoading, requestError] = useFetch(
    getTransactionHistory
  );

  console.log(transactions);

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
                {!!transactions && transactions.length}
              </span>
            </h5>
          </div>
        </div>
      </div>

      <div className=" py-5">
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {!!transactions &&
              transactions.map((data: any) => (
                <tr className="border-b border-[#C3C9DA] align-vertical">
                  <TableColumn td={data?.payment?.name} />
                  <TableColumn td="Chidnma Ukaegbu" />
                  <TableColumn td={"$ " + data?.payment?.amount} />
                  <TableColumn td={formatDate(data?.payment?.due_date)} />
                  <TableColumn td={data?.ref_number} />
                  <TableColumn
                    td="View Payment Request"
                    type="button"
                    buttonType="tertiary"
                    onClick={()=>navigate('/community/collect_payments/new_payment_request/'+data?.payment?.id)}
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
