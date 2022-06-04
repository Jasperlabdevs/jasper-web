import Button from "components/Button";
import Input from "components/Input";
import SuccessPage from "components/SuccessPage";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="login text-center mt-24 lg:mt-20">
      <h3>Change Password</h3>
      <p className="text-grey_text my-4">
        You can create a new password, <br /> please don't forget it too{" "}
      </p>
      <hr className="w-2/3 mx-auto my-12" />

      <form
        className="text-left mt-14 max-w-[450px] mx-auto relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="password"
          placeholder="Enter your password"
          type="password"
          label="New Password"
          register={register}
          options={[]}
        />

        <Input
          name="confirm_password"
          placeholder="Confirm your password"
          type="password"
          label="Confirm Password"
          register={register}
          options={[]}
        />

        <Button title="Create Password" loading={loading} />
      </form>
    </div>
  );
};

export default ResetPassword;
