import Button from "components/Button"
import { useState } from "react"
import SVGs from "helpers/SVGs"
import BankImage from "assets/images/bank.svg"
import PaymentImage from "assets/images/payment.svg"
import SetupBankModal from "components/SetupBankModal"
import { TableHeader, TableColumn } from "components/Table"
import { TableContent } from "helpers/data"
import { useNavigate } from "react-router-dom"
import ErrorModal from "components/ErrorModal"
import Modal from "components/Modal"
import SuccessModal from "components/SuccessModal"

const CollectPayment = () => {

    const headers = [
        "Payment Request Name",
        "Totla Amount requested",
        "Created By",
        "Date Created",
        "% Completion",
        "Num of users",
        "Status",
        "Due Date",
        "Action",
      ];
    const [ condition, setCondition ] = useState(true)
      const navigate = useNavigate()
    const [ setupBank, setBank ] = useState(false)

    return(
        <div>
        <div className="mt-10 overflow-x-hidden">
            {setupBank && <SetupBankModal show={setupBank} toggleClose={()=>setBank(!setupBank)} />}
            {/* {condition ? 
                <Modal show={condition} toggleClose={()=>setCondition(!condition)} >
                    <SuccessModal body='Your bank details has been successfully validated' onHide={()=>setCondition(!condition)} />
                </Modal> :
                <Modal show={!condition} toggleClose={()=>setCondition(!condition)} >
                    <ErrorModal body='Your bank details has not been successfully validated' onHide={()=>setCondition(!condition)} />
                </Modal> 
            } */}
            <div className="flex justify-between items-center">
          <h4>Collect Payments</h4>
          <div className="flex gap-4 items-center">
            <div className="fit -mt-10" >
              <Button onClick={()=>{navigate('new_payment_request')}} title={<span className="flex items-center justify-center gap-4 text-[#fff]">{SVGs.add_white}  New payment Request</span>} />
            </div>
            <div className="relative">
                <div className="dropdown absolute">
                    <button className="border-primary border rounded-lg px-4 dropbtn">
                        ...
                    </button>
                    <div className="dropdown-content absolute z-[1000]">
                        <p className="cursor-pointer hover:bg-faded" onClick={()=>{}} >{'Update Bank Details'}</p>
                        <p className="cursor-pointer hover:bg-faded" onClick={()=>{}} >{'View Transaction History'}</p>
                    </div>
                    </div>          
                </div>
            </div>
        </div>

            {
                condition ? 
                <div className="text-center mt-20">
                    <img src={BankImage} className="w-80 mx-auto lg:max-w-[300px] lg:w-auto" alt="bank" />

                    <h3 className="my-6" >Activate your bank account to start <br /> collecting payments</h3>

                    <div className="md:w-80 mx-auto " >
                        <Button title="Set Up your bank account" />
                    </div>
                </div> :
                <div className="text-center mt-20">
                    <img src={PaymentImage} className="w-80 mx-auto lg:max-w-[300px] lg:w-auto" alt="payment" />

                    <h3 className="my-6" >Click the button below to create your <br /> first payment request</h3>

                    <div className="md:w-80 mx-auto " >
                        <Button onClick={()=>{navigate('new_payment_request')}} title={<span className="flex items-center justify-center gap-4 text-[#fff]">{SVGs.add_white}  New payment Request</span>} />
                    </div>
                </div>
            }
        </div>

      {/* <div className=" py-10 pb-80" >
        <table className="w-full py-20">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA] align-vertical">
                <TableColumn td="Electrticity"/>

                <TableColumn td="$200,000" />
                <TableColumn td="Chidnma Ukaegbu" />
                <TableColumn td="2nd March, 2022" />
                <TableColumn td="10%" />
                <TableColumn td="12" />
                <TableColumn
                  td="in progress"
                  type="status"
                />
                <TableColumn td="2nd March, 2022" />
                <TableColumn td="More" type="dropdown" list={[
                    {title: 'Edit', action:()=>{}},
                    {title: 'View Payment Progress', action:()=>{}},
                    {title: 'Mark as Completed', action:()=>{}},
                    {title: 'Send Reminder', action:()=>{}},
                ]} />
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      </div>
    )
}

export default CollectPayment