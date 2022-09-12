import Button from "components/Button";
import { useEffect, useState } from "react";
import SVGs from "helpers/SVGs";
import BankImage from "assets/images/bank.svg";
import PaymentImage from "assets/images/payment.svg";
import SetupBankModal from "components/SetupBankModal";
import { useNavigate } from "react-router-dom";
import ErrorModal from "components/ErrorModal";
import Modal from "components/Modal";
import SuccessModal from "components/SuccessModal";
import useToggle from "hooks/useToggle";
import { useSelector } from "react-redux";
import { getPaymentRequests } from "services/payment";
import useFetch from "hooks/useFetch";
import { TableHeader, TableColumn } from "components/Table";
import { formatDate, formatDateTime } from "helpers/utils";

const CollectPayment = () => {
  const headers = [
    "Payment Request Name",
    "Amount requested",
    "Created By",
    "Date Created",
    "% Completion",
    "Num of users",
    "Status",
    "Due Date",
    "Action",
  ];

  const [showSetupBankModal, toggleSetUpBankModal] = useToggle(false);
  const [bankCreationStatus, setBankCreationStatus] = useState("");
  const [noBankExits, setBankCondition] = useState(true);
  const navigate = useNavigate();

  const stateCommunity = useSelector((state:any) => state.community)
    const [ paymentRequests, requestLoading, requestError ] = useFetch(getPaymentRequests)

    console.log(paymentRequests)

  useEffect(()=>{
    if(stateCommunity.account_name){
      setBankCondition(false)
    }
  },[stateCommunity])

  return (
    <div>
      <div className="mt-10 overflow-x-hidden">
        {showSetupBankModal && (
          <SetupBankModal
            creationCondition={setBankCreationStatus}
            show={showSetupBankModal}
            toggleClose={() => toggleSetUpBankModal(false)}
          />
        )}
        {bankCreationStatus === "successful" && (
          <Modal
            show={bankCreationStatus === "successful"}
            toggleClose={() => setBankCreationStatus("")}
          >
            <SuccessModal
              body="Your bank details has been successfully validated"
              onHide={() => setBankCreationStatus("")}
            />
          </Modal>
        )}
        {bankCreationStatus === "edited" && (
          <Modal
            show={bankCreationStatus === "edited"}
            toggleClose={() => setBankCreationStatus("")}
          >
            <SuccessModal
              body="Your bank details has been updated successfully"
              onHide={() => setBankCreationStatus("")}
            />
          </Modal>
        )}
        {bankCreationStatus === "failed" && (
          <Modal
            show={bankCreationStatus === "failed"}
            toggleClose={() => setBankCreationStatus("")}
          >
            <ErrorModal
              body="Your bank details has not been successfully validated"
              onHide={() => setBankCreationStatus("")}
            />
          </Modal>
        )}
        <div className="flex justify-between items-center">
          <h4>Collect Payments</h4>
          { !noBankExits && 
          <div className="flex gap-4 items-center">
            <div className="fit -mt-10">
              <Button
                onClick={() => {
                  navigate("new_payment_request");
                }}
                title={
                  <span className="flex items-center justify-center gap-4 text-[#fff]">
                    {SVGs.add_white} New payment Request
                  </span>
                }
              />
            </div>
            <div className="relative">
              <div className="dropdown absolute">
                <button className="border-primary border rounded-lg px-4 dropbtn">
                  ...
                </button>
                <div className="dropdown-content absolute z-[1000]">
                  <p
                    className="cursor-pointer text-black hover:bg-faded"
                    onClick={() => toggleSetUpBankModal(true)}
                  >
                    {"Update Bank Details"}
                  </p>
                  <p
                    className="cursor-pointer text-black hover:bg-faded"
                    onClick={() => {}}
                  >
                    {"View Transaction History"}
                  </p>
                </div>
              </div>
            </div>
          </div> }
        </div>

        {noBankExits && 
          <div className="text-center mt-20">
            <img
              src={BankImage}
              className="w-80 mx-auto lg:max-w-[300px] lg:w-auto"
              alt="bank"
            />

            <h3 className="my-6">
              Activate your bank account to start <br /> collecting payments
            </h3>

            <div className="md:w-80 mx-auto ">
              <Button
                title="Set Up your bank account"
                onClick={toggleSetUpBankModal}
              />
            </div>
          </div>
          }

          { !paymentRequests &&
          <div className="text-center mt-20">
            <img
              src={PaymentImage}
              className="w-80 mx-auto lg:max-w-[300px] lg:w-auto"
              alt="payment"
            />

            <h3 className="my-6">
              Click the button below to create your <br /> first payment request
            </h3>

            <div className="md:w-80 mx-auto ">
              <Button
                onClick={() => {
                  navigate("new_payment_request");
                }}
                title={
                  <span className="flex items-center justify-center gap-4 text-[#fff]">
                    {SVGs.add_white} New payment Request
                  </span>
                }
              />
            </div>
          </div>
        }
      </div>

      { !!paymentRequests && 
      <div className=" py-10 pb-80" >
        <table className="w-full py-20">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {paymentRequests.map((data:any) => (
              <tr className="border-b border-[#C3C9DA] align-vertical">
                <TableColumn td={data.name}/>

                <TableColumn td={"₦ "+Intl.NumberFormat('en-US').format(data.amount)} />
                <TableColumn td={data.created_by?.first_name + " " +data.created_by?.last_name} />
                <TableColumn td={formatDateTime(data.created)} />
                <TableColumn td={data.completion_percent+"%"} />
                <TableColumn td={data.number_of_users} />
                <TableColumn
                  td={data.status}
                  type="status"
                />
                <TableColumn td={formatDate(data.due_date)} />
                <TableColumn td="More" type="dropdown" list={[
                    {title: 'Edit', action:()=>{ navigate('new_payment_request/'+data.id)} },
                    {title: 'View Payment Progress', action:()=>{}},
                    {title: 'Mark as Completed', action:()=>{}},
                    {title: 'Send Reminder', action:()=>{}},
                ]} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

    </div>
  );
};

export default CollectPayment;
