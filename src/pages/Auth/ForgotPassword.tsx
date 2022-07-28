/* eslint-disable no-useless-escape */
import Button from "components/Button";
import Input from "components/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import authentication from "services/authentication";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState("");
  const [notif, setNotif] = useState("");

  const successCB = (data: any) => {
    setLoading(false);
    console.log(data.message);
    setNotif(data.message);
  };
  const failedCB = (data: any) => {
    setLoading(false);
    setErr(data);
  };

  const onSubmit = (data: any) => {
    data.email = (data.email).toLowerCase()
    setErr("");
    setLoading(true);
    authentication.ForgetPassword(data, successCB, failedCB);
  };

  return (
    <div className="login text-center mt-24 lg:mt-20">
      <Helmet>
        <title>Forgotten your password? | Jasper</title>
        <meta name="description" content="Have you forgotten your password?" />
      </Helmet>

      <h3>Forgot password</h3>
      <p className="text-grey_text my-4">
        Enter the email address associated with you account.
      </p>
      <hr className="w-2/3 mx-auto my-12" />

      {(!!err || !!notif) && (
        <div
          className={` ${!!notif && "bg-faded_yellow text-yellow"} ${
            !!err && "bg-faded_red text-red "
          }   w-full text-center p-4 mb-4 rounded-md`}
        >
          <p
            className={` ${!!notif && "text-yellow"} ${
              !!err && "text-red "
            }   text-xs`}
          >
            {err || notif}
          </p>
        </div>
      )}

      {!!!notif && (
        <form
          className="text-left mt-14 max-w-[450px] mx-auto relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Enter your email"
            name="email"
            label="Email"
            register={register}
            options={{
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            }}
            error={errors.email && "Please enter a correct email address"}
          />

          <Button title="Continue" loading={loading} />
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
