import ModalLarge from "components/ModalLarge";
import { TableHeader, TableColumn } from "components/Table";
import { useState } from "react";
import img from "assets/images/AccountPhoto.png";
import Button from "components/Button";

import { markPaymentComplete, sendPaymentReminder } from "services/payment";
import Loader from "components/Loader";
import useToggle from "hooks/useToggle";
import Toaster from "components/Toaster";



const PaymentProgressModal = ({ show, toggleClose, paymentRequest }: any) => {
  const headers = [
    "Member",
    "User Type",
    "Status",
    "Amount",
    "Date Paid",
    "...",
  ];
  const [loading, setLoading] = useState(false);
  const [ showToast, toggleToast ] = useToggle(false)
  const [ toast, setToast ] = useState<NotificationType>({type: undefined, message: '', title: ''})

  const markComplete = (id: string) => {
    setLoading(true);
    const data = {
      recipient_id: id,
      payment_request_id: paymentRequest.id,
    };
    markPaymentComplete(data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toggleToast(true)
        setToast({
          type: 'success',
          title: 'Payment Progress',
          message: res.data.message
        })
      })
      .catch((err) => {
        console.log(err);
        toggleToast(true)
        setToast({
          type: 'success',
          title: 'Payment Progress',
          message: err.response.data.message
        })
        setLoading(false);
      });
  };
  const sendReminder = (id: string) => {
    setLoading(true);
    const data = {
      recipient_id: id,
      payment_request_id: paymentRequest.id,
    };
    sendPaymentReminder(data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toggleToast(true)
        setToast({
          type: 'success',
          title: 'Payment Progress',
          message: res.data.message
        })
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toggleToast(true)
        setToast({
          type: 'success',
          title: 'Payment Progress',
          message: err.response.data.message
        })
      });
  };

  console.log(paymentRequest);
  return (
    <ModalLarge show={show} toggleClose={toggleClose}>
      {loading && <Loader />}
      { showToast && <Toaster type={toast.type} title={toast.title} message={toast.message} />}
      <div className="p-8">
        <h4>Payment Progress</h4>
        <hr className="my-6 absolute w-full left-0" />

        <div className=" mt-12 mb-8 flex justify-between items-center">
          <h5 className="w-80">{paymentRequest.name}</h5>
          {/* <div>
            <SearchFilter
              handleSearch={() => {}}
              toggleFilter={() => {
                setShowFilter(!showFilter);
              }}
            />
          </div> */}
        </div>
        {/* {showFilter && <Filter />} */}
        <div className="overflow-auto h-[350px] border-b border-faded">
          <table className="w-full ">
            <thead className="">
              <TableHeader headers={headers} />
            </thead>
            <tbody>
              {paymentRequest?.recipients_to_pay?.map((data: any) => (
                <tr
                  key={data.id}
                  className="border-b w-full border-[#C3C9DA] align-vertical"
                >
                  <TableColumn
                    td={
                      <span>
                        {data.member.first_name + " " + data.member.last_name}
                      </span>
                    }
                    type="user"
                    image={img}
                  />

                  <TableColumn td={data.member.user_type} type="userType" />
                  <TableColumn td={data.status} type="status" />
                  <TableColumn td={"₦ " + paymentRequest.amount} />
                  <TableColumn td={data.data_paid || "--"} />
                  <TableColumn
                    td={"..."}
                    list={[
                      {
                        title: "Mark as Completed",
                        action: () => {
                          markComplete(data.id);
                        },
                      },
                      {
                        title: "Send Reminder",
                        action: () => {
                          sendReminder(data.id);
                        },
                      },
                    ]}
                    type="dropdown"
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-40 flex mt-5 float-right mb-8">
          <Button type="submit" title="Done" onClick={toggleClose} />
        </div>
      </div>
    </ModalLarge>
  );
};

export default PaymentProgressModal;
