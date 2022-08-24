import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import useFetch from "hooks/useFetch";
import { useForm } from "react-hook-form";
import { getBanks, submitBank } from "services/payment";


const SetupBankModal = ({show, toggleClose, creationCondition}:any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const [ banks, loadingBanks, bankError ] = useFetch(getBanks)

  // console.log(banks)

  const onSubmit = (data: any) => {
    console.log(data);
    toggleClose()
    creationCondition('successful')

    // submitBank(data).then(
    //   (res:any) => {
    //     console.log(res.data.results)
    //   }
    // ).catch(err => {
    //   console.log('failed')
    // })

  };

  return (
    <Modal show={show} toggleClose={toggleClose}>
      <div className="p-8 mb-4 relative">
        <h4>Set up your bank account</h4>
        <hr className="my-6 absolute w-full left-0" />

        <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="bank"
            label="Bank*"
            error={errors.bank && "Please enter a bank"}
            placeholder="Please enter your bank name"
            register={register}
            options={{ required: true, minLenght: 1 }}
            />
          
          <Input
            name="account_name"
            placeholder="Please enter your account name"
            label="Account Name*"
            register={register}
            error={errors.account_name && "Please enter an account name"}
            options={{ required: true, minLenght: 1 }}
            />
          
          <Input
            name="account_number"
            placeholder="Please enter your account number"
            label="Account Number*"
            register={register}
            type="number"
            error={errors.account_number && "Please enter a correct account number"}
            options={{ required: true, minLength: 10, maxLength: 10 }}
          />
          
          <Input
            name="bank_verification_number"
            placeholder="Please enter your BVN"
            label="Bank Verification Number (BVN)*"
            register={register}
            type="number"
            error={errors.bank_verification_number && "Please enter a correct BVN"}
            options={{ required: true, minLenght: 3 }}
          />

          <div className="w-80 float-right pb-8 gap-4 flex">
            <Button type="submit" title="Save" />
            <Button onClick={toggleClose} title="Cancel" other />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SetupBankModal;
