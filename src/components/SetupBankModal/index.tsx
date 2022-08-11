import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import { useForm } from "react-hook-form";


const SetupBankModal = ({show, toggleClose}:any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const onSubmit = (data: any) => {
    console.log(data);

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
            error={errors.name && "Please enter a bank"}
            placeholder="Please enter your bank name"
            register={register}
            options={{ required: true, minLenght: 1 }}
            />
          
          <Input
            name="account_name"
            placeholder="Please enter your account name"
            label="Account Name*"
            register={register}
            error={errors.name && "Please enter an account Name"}
            options={{ required: true, minLenght: 1 }}
            />
          
          <Input
            name="account_number"
            placeholder="Please enter your account number"
            label="Account Number*"
            register={register}
            type="number"
            error={errors.name && "Please enter a correct account number"}
            options={{ required: true, minLenght: 5 }}
          />
          
          <Input
            name="bank_verification_number"
            placeholder="Please enter your BVN"
            label="Bank Verification Number (BVN)*"
            register={register}
            type="number"
            error={errors.name && "Please enter a correct account number"}
            options={{ required: true, minLenght: 4 }}
          />

          <div className="w-80 float-right pb-8 gap-4 flex">
            <Button type="submit" title="Save" />
            <Button type="submit" title="Cancel" other />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SetupBankModal;
