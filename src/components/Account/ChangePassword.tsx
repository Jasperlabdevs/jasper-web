import Button from "components/Button";
import ErrorModal from "components/ErrorModal";
import Input from "components/Input";
import SuccessModal from "components/SuccessModal";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { changePassword } from "services/gates";

type ChangePasswordProps = {
  onHide: () => void;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ onHide }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changePasswordErrors, setChangePasswordErrors] = useState<
    string | null
  >(null);

  const handlePasswordChange = ({
    old_password,
    new_password,
  }: FieldValues) => {
    setLoading(true);
    changePassword({ old_password, new_password }).then(
      () => {
        setLoading(false);
        setSuccess(true);
      },
      (e: any) => {
        setLoading(false);
        setChangePasswordErrors(e.response.data.message);
      }
    );
  };

  if (changePasswordErrors)
    return (
      <ErrorModal
        onHide={() => setChangePasswordErrors(null)}
        body={changePasswordErrors}
      />
    );

  if (success)
    return (
      <SuccessModal
        onHide={() => {
          onHide();
        }}
        body={"Your password has been changed successfully"}
      />
    );

  return (
    <div className="p-8">
      <p className="text-black mb-10">Update Password</p>
      <form onSubmit={handleSubmit(handlePasswordChange)}>
        <Input
          placeholder="Enter your old password"
          name="old_password"
          label="Old Password"
          register={register}
          error={errors.old_password?.message}
          options={{
            minLength: 8,
            required: true,
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message:
                "Minimum six characters, at least one uppercase letter, one number and one special character:",
            },
          }}
        />
        <Input
          placeholder="Enter your New Password"
          name="new_password"
          label="New password"
          register={register}
          error={errors.new_password?.message}
          options={{
            minLength: 8,
            validate: (val: string) => {
              if (watch("old_password") === val) {
                return "Your passwords can not match";
              }
            },
            required: true,
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message:
                "Minimum six characters, at least one uppercase letter, one number and one special character:",
            },
          }}
        />
        <Input
          placeholder="Repeat your new password"
          name="repeat_new_password"
          label="Repeat new Password"
          register={register}
          error={errors.repeat_new_password?.message}
          options={{
            minLength: 8,
            required: true,
            validate: (val: string) => {
              if (watch("new_password") !== val) {
                return "Your passwords do no match";
              }
            },
          }}
        />
        <div className="w-fit float-right mb-8">
          <Button title="Save Password" type="submit" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
