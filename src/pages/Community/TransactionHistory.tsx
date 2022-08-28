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

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const headers = [
    "Payment Request Name",
    "User",
    "Amount Paid",
    "Date Due",
    "Reference Number",
    "Action",
  ];
  const headersTwo = [
    <input type="checkbox" />,
    "Member",
    "User Type",
    "Status",
    "Amount Paid",
    "Date Paid",
    "Options",
  ];

  return (
    <div>
      <div className="mt-10 overflow-x-hidden">
        <ModalLarge
          show={showModal}
          toggleClose={() => {
            setShowModal(!showModal);
          }}
        >
          <div className="p-8">
            <h4>Payment Progress</h4>
            <hr className="my-6 absolute w-full left-0" />

            <div className=" mt-12 mb-8 flex justify-between items-center">
              <h5 className="w-80">Electricity</h5>
              <div>
                <SearchFilter
                  handleSearch={() => {}}
                  toggleFilter={() => {
                    setShowFilter(!showFilter);
                  }}
                />
              </div>
            </div>
            {showFilter && <Filter />}
            <div className="overflow-auto h-[350px] border-b border-faded">
              <table className="w-full ">
                <thead className="">
                  <TableHeader headers={headersTwo} />
                </thead>
                <tbody>
                  {TableContent.map((data) => (
                    <tr className="border-b w-full border-[#C3C9DA] align-vertical">
                      <TableColumn td="" type="check" />
                      <TableColumn
                        td={<span>Kianna Durant</span>}
                        type="user"
                        image={img}
                      />

                      <TableColumn td="Landlord" type="userType" />
                      <TableColumn td="paid" type="status" />
                      <TableColumn td="$200,000" />
                      <TableColumn td="2nd January, 2015" />
                      <TableColumn td="..." list={[]} type="dropdown" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-40 flex mt-5 float-right mb-8">
              <Button type="submit" title="Done" />
            </div>
          </div>
        </ModalLarge>

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
              New Payment Request{" "}
              <span className="text-white bg-primary rounded-full px-3 text-xs">
                30
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
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA] align-vertical">
                <TableColumn td="Electricity" />
                <TableColumn td="Chidnma Ukaegbu" />
                <TableColumn td="$200,000" />
                <TableColumn td="2nd March, 2022" />
                <TableColumn td=" 0122" />
                <TableColumn
                  td="View Payment Request"
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

export default TransactionHistory;
