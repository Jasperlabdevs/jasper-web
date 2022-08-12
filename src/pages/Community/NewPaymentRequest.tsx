import Button from "components/Button"
import Input, { DateInput, Select } from "components/Input"
import ModalLarge from "components/ModalLarge"
import { TableHeader, TableColumn } from "components/Table"
import { TableContent } from "helpers/data"
import SVGs from "helpers/SVGs"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import img from "assets/images/AccountPhoto.png";

const NewPaymentRequest = () => {
    const { register, reset } = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState()
    const [showModal, setShowModal] = useState(false)

    const resetFields = () => {
      reset({
      });
    };

    const headers = [
      <input type='checkbox' />,
      "Member",
      "User Type",
      "Phone Number",
      "Status",
    ];
  

    return(
        <div className="mt-10 max-w-6xl">

          <ModalLarge show={showModal} toggleClose={()=>{setShowModal(!showModal)}} >

            <div className="p-8" >

                <h4>Add Members</h4>
                <hr className="my-6 absolute w-full left-0" />

                <div className=" mt-12 mb-8 flex justify-between " >
                  <div className="w-80" >
                  <Select name={undefined} list={[]} label={""} placeholder="Select Member Type" register={()=>{}}                    
                  />

                  </div>
                  <form className="bg-[#F9F9FB] flex w-3xl h-fit py-2 px-4 rounded-lg">
                    <button type="button" onClick={()=>{}} >{SVGs.search}</button>
                    <input
                      type="text"
                      className="outline-none px-2 w-3xl bg-[#F9F9FB] py-3"
                      placeholder="Search"
                     
                    />
                  </form>
                  
                </div>

                <div className="overflow-auto h-[350px] border-b border-faded" >
                  <table className="w-full ">
                      <thead className="">
                        <TableHeader headers={headers} />
                      </thead>
                      <tbody >
                        {TableContent.map((data) => (
                          <tr className="border-b w-full border-[#C3C9DA] align-vertical">
                            <TableColumn td="" type="check" />
                            <TableColumn
                              td={
                                <span>
                                  Entry <br />
                                  <span className="text-grey_text text-xs">Block 10</span>
                                </span>
                              }
                              type="user"
                              image={img}
                            />

                            <TableColumn td="Landlord" type="userType" />
                            <TableColumn td="02454342534" />
                            <TableColumn td="enable" type="status" />

                          </tr>
                        ))}
                      </tbody>
                </table>

                </div>
                <div className="w-80 flex mt-5 float-right mb-8">
                <Button type="submit" title="Save" />
                <Button type="submit" title="Cancel" secondary />
              </div>
            </div>
          </ModalLarge>

          <div className="flex gap-4" >
            <p
              onClick={() => navigate(-1)}
              className="text-red gap-2 text-xs cursor-pointer flex items-center"
            >
              <span>{SVGs.arrow_left}</span>
              {"  "}
            </p>
            <h5 className="my-6"> New Payment Request</h5>

          </div>
  
        <div className="flex flex-col md:flex-row gap-[5rem] w-full items-center" >
          <form className="w-full" >
                <Input
                  name="payment_name"
                  label="Payment Name*"
                  placeholder="Please enter Payment name"
                  options={{}}
                  register={register}
                />
                <Input
                  name="amount"
                  label="Amount*"
                  placeholder="Enter Amount"
                  options={{}}
                  register={register}
                />
                <Input
                  name="payment_description"
                  label="Payment Description"
                  placeholder="Enter payment Description"
                  options={{}}
                  register={register}
                />
                <DateInput
                  name="due_date"
                  label="Due Date*"
                  placeholder="Enter Due Date"
                  options={{}}
                  register={register}
                />
          
          </form>
          <div className="border rounded-lg w-fit md:w-[500px] min-h-80 text-center p-8" >
            <div className="mx-auto" >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
                    <path d="M58.5867 6.21268C56.6667 4.02602 53.8133 2.66602 50.6667 2.66602C47.68 2.66602 44.96 3.89268 43.0133 5.89268C41.8933 7.03935 41.04 8.42602 40.5333 9.97268C40.1867 11.0393 40 12.1593 40 13.3327C40 15.3327 40.56 17.226 41.5467 18.826C42.08 19.7327 42.7733 20.5593 43.5733 21.2527C45.44 22.9593 47.92 23.9993 50.6667 23.9993C51.84 23.9993 52.96 23.8127 54 23.4393C56.4533 22.666 58.5067 20.986 59.7867 18.826C60.3467 17.9193 60.7733 16.8793 61.0133 15.8127C61.2267 15.0127 61.3333 14.186 61.3333 13.3327C61.3333 10.6127 60.2933 8.10602 58.5867 6.21268ZM54.64 15.2793H52.6667V17.3594C52.6667 18.4527 51.76 19.3594 50.6667 19.3594C49.5733 19.3594 48.6667 18.4527 48.6667 17.3594V15.2793H46.6933C45.6 15.2793 44.6933 14.3727 44.6933 13.2793C44.6933 12.186 45.6 11.2793 46.6933 11.2793H48.6667V9.38602C48.6667 8.29268 49.5733 7.38602 50.6667 7.38602C51.76 7.38602 52.6667 8.29268 52.6667 9.38602V11.2793H54.64C55.7333 11.2793 56.64 12.186 56.64 13.2793C56.64 14.3727 55.76 15.2793 54.64 15.2793Z" fill="#66B5FF"/>
                    <path d="M58.6668 32.0007C58.6668 28.5073 58.0002 25.1473 56.7468 22.0807C55.9202 22.6673 54.9868 23.1207 54.0002 23.4407C53.7068 23.5473 53.4135 23.6273 53.0935 23.7073C54.1068 26.2673 54.6668 29.0673 54.6668 32.0007C54.6668 38.1873 52.1602 43.814 48.1068 47.9207C47.3335 46.934 46.3468 46.0273 45.1735 45.254C37.9468 40.4007 26.1068 40.4007 18.8268 45.254C17.6535 46.0273 16.6935 46.934 15.8935 47.9207C11.8402 43.814 9.3335 38.1873 9.3335 32.0007C9.3335 19.494 19.4935 9.33398 32.0002 9.33398C34.9068 9.33398 37.7068 9.89398 40.2668 10.9073C40.3468 10.5873 40.4268 10.294 40.5335 9.97398C40.8535 8.98732 41.3068 8.08065 41.9202 7.25398C38.8535 6.00065 35.4935 5.33398 32.0002 5.33398C17.3068 5.33398 5.3335 17.3073 5.3335 32.0007C5.3335 39.734 8.66683 46.694 13.9468 51.574C13.9468 51.6007 13.9468 51.6007 13.9202 51.6273C14.1868 51.894 14.5068 52.1073 14.7735 52.3473C14.9335 52.4807 15.0668 52.614 15.2268 52.7207C15.7068 53.1207 16.2402 53.494 16.7468 53.8673C16.9335 54.0007 17.0935 54.1073 17.2802 54.2407C17.7868 54.5873 18.3202 54.9073 18.8802 55.2007C19.0668 55.3073 19.2802 55.4407 19.4668 55.5473C20.0002 55.8407 20.5602 56.1073 21.1468 56.3473C21.3602 56.454 21.5735 56.5607 21.7868 56.6407C22.3735 56.8807 22.9602 57.094 23.5468 57.2807C23.7602 57.3607 23.9735 57.4407 24.1868 57.494C24.8268 57.6807 25.4668 57.8407 26.1068 58.0007C26.2935 58.054 26.4802 58.1073 26.6935 58.134C27.4402 58.294 28.1868 58.4007 28.9602 58.4807C29.0668 58.4807 29.1735 58.5073 29.2802 58.534C30.1868 58.614 31.0935 58.6673 32.0002 58.6673C32.9068 58.6673 33.8135 58.614 34.6935 58.534C34.8002 58.534 34.9068 58.5073 35.0135 58.4807C35.7868 58.4007 36.5335 58.294 37.2802 58.134C37.4668 58.1073 37.6535 58.0273 37.8668 58.0007C38.5068 57.8407 39.1735 57.7073 39.7868 57.494C40.0002 57.414 40.2135 57.334 40.4268 57.2807C41.0135 57.0673 41.6268 56.8807 42.1868 56.6407C42.4002 56.5607 42.6135 56.454 42.8268 56.3473C43.3868 56.1073 43.9468 55.8407 44.5068 55.5473C44.7202 55.4407 44.9068 55.3073 45.0935 55.2007C45.6268 54.8807 46.1602 54.5873 46.6935 54.2407C46.8802 54.134 47.0402 54.0007 47.2268 53.8673C47.7602 53.494 48.2668 53.1207 48.7468 52.7207C48.9068 52.5873 49.0402 52.454 49.2002 52.3473C49.4935 52.1073 49.7868 51.8673 50.0535 51.6273C50.0535 51.6007 50.0535 51.6007 50.0268 51.574C55.3335 46.694 58.6668 39.734 58.6668 32.0007Z" fill="#66B5FF"/>
                    <path d="M32 18.4805C26.48 18.4805 22 22.9605 22 28.4805C22 33.8938 26.24 38.2938 31.8667 38.4538C31.9467 38.4538 32.0533 38.4538 32.1067 38.4538C32.16 38.4538 32.24 38.4538 32.2933 38.4538C32.32 38.4538 32.3467 38.4538 32.3467 38.4538C37.7333 38.2671 41.9733 33.8938 42 28.4805C42 22.9605 37.52 18.4805 32 18.4805Z" fill="#66B5FF"/>
                </svg>
            </div>
            <h5>Receipients</h5>
            <p>Who do you want to send this payment request to?</p>
            <div className="w-fit mx-auto" >
              <Button other onClick={()=>setShowModal(!showModal)} title={<span className="flex items-center justify-center gap-4 text-primary">{SVGs.add_blue}  Add Receipient</span>} />
            </div>
          </div>

        </div>

        <hr className="relative -left-10 w-screen mt-16 " />
        <div className="flex gap-4 lg:max-w-lg mb-20 ">
          <div className="lg:max-w-lg w-full">
            <Button title="Create" loading={loading} type="submit" />
          </div>
          <Button title="Save as draft" other/>
          <Button
            title="Cancel"
            type="button"
            onClick={resetFields}
            secondary
          />
        </div>
      </div>
    )
}


export default NewPaymentRequest