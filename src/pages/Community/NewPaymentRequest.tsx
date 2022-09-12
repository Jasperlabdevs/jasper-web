import Button from "components/Button";
import Input, { DateInput } from "components/Input";
import SVGs from "helpers/SVGs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CommunityMembersModal from "components/CommunityMembersModal";
import { getPaymentRequestsDetails, makePaymentRequest } from "services/payment";
import { formatDate } from "helpers/utils";

const NewPaymentRequest = () => {
  const {
    register,
    formState: { errors },
    reset,
    getValues
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState<string>()
  const [ paymentDetails, setPaymentDetails ] = useState<any>({})

  const { request_id } = useParams()

  useEffect(()=>{
    const Tdate = new Date(paymentDetails.due_date)
    const defaultValue = Tdate.toLocaleDateString('en-CA');
    setDate(defaultValue)

  },[paymentDetails])
  
  useEffect(()=>{
      if(request_id){
        getPaymentRequestsDetails(request_id).then(
          res => {
            setPaymentDetails(res.data.results)
          }
        ).catch(err=> {
          console.error(err)
        })
      }
  },[request_id])

  const resetFields = () => {
    reset({});
  };

  const makePaymentReq = (data:any) =>(
    makePaymentRequest(data).then(
      res => {
        console.log(res.data.results)
      }
    ).catch(err=> {
      console.log(err)
    }).then(()=> setLoading(false))
  )

  const createPayment = () => {
    setLoading(true)
    let data = getValues()
    data.state = 'create'
    data.amount = parseInt(data.amount)
    
    makePaymentReq(data)
  };
  
  const saveDraft = () => {
    setLoading(true)
    let data = getValues()
    data.amount = parseInt(data.amount)
    data.state = 'draft'

   makePaymentReq(data)
  }

  return (
    <div className="mt-10 max-w-6xl">
      <CommunityMembersModal
          show={showModal}
          toggleClose={() => {
            setShowModal(!showModal);
          }}
      />

      <div className="flex gap-4">
        <p
          onClick={() => navigate(-1)}
          className="text-red gap-2 text-xs cursor-pointer flex items-center"
        >
          <span>{SVGs.arrow_left}</span>
          {"  "}
        </p>
        <h5 className="my-6"> New Payment Request</h5>
      </div>

      <div className="flex flex-col md:flex-row gap-[5rem] w-full items-center">
        <form className="w-full">
          <Input
            name="name"
            value={paymentDetails.name || ''}
            label="Payment Name*"
            placeholder="Please enter Payment name"
            options={{ require: true }}
            register={register}
            error={errors.name && "Please enter a payment name"}
            />
          <Input
            name="amount"
            value={ paymentDetails.amount || ''}
            label="Amount*"
            type={'number'}
            placeholder="Enter Amount"
            options={{require: true, min: 1, }}
            register={register}
            error={errors.amount && "Please enter an amount"}
            />
          <Input
            name="description"
            value={paymentDetails.description || ''}
            label="Payment Description"
            placeholder="Enter payment Description"
            options={{}}
            register={register}
            error={errors.description && "Please enter a description"}
            />
          <DateInput
            name="due_date"
            value={date}
            label="Due Date*"
            placeholder="Enter Due Date"
            options={{ require: true }}
            register={register}
            error={errors.due_date && "Please Choose a payment due date"}
          />
        </form>
        <div className="border rounded-lg w-fit md:w-[500px] min-h-80 text-center p-8">
          <div className="mx-auto">
            {SVGs.add_receipients}
          </div>
          <h5>Receipients</h5>
          <p>Who do you want to send this payment request to?</p>
          <div className="w-fit mx-auto">
            <Button
              other
              onClick={() => setShowModal(!showModal)}
              title={
                <span className="flex items-center justify-center gap-4 text-primary">
                  {SVGs.add_blue} Add Receipient
                </span>
              }
            />
          </div>
        </div>
      </div>

      <hr className="relative -left-10 w-screen mt-16 " />
      <div className="flex gap-4 lg:max-w-lg mb-20 ">
        <div className="lg:max-w-lg w-full">
          <Button title={ !!request_id ? "Edit" : "Create"} loading={loading}  onClick={createPayment} />
        </div>
        <Button title="Save as draft" type="button" loading={loading} onClick={saveDraft}  other />
        <Button title="Clear" type="button" onClick={resetFields} secondary />
      </div>
    </div>
  );
};

export default NewPaymentRequest;
