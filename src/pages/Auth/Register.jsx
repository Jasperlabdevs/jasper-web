/* eslint-disable no-useless-escape */
import Button from "components/Button";
import Input, { Checkbox, Select, PhoneInput } from "components/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import authentication from "services/authentication";
import PDF from "./../../assets/pdf/JASPER_TERMS_CONDITIONS_OF_SERVICE_AND_PRIVACY_POLICY.pdf";

const Register = () => {
  const communityTypes = useSelector((state) => state.communityTypes);

  const tabs = ["first", "second"];
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(tabs[0]);
  const [communityType, setCommunityType] = useState(communityTypes);

  const [notif, setNotif] = useState("");

  const [err, setErr] = useState("");

  const watchFields = watch([
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "agreement",
    "community_type",
  ]);

  const failedCB = (data) => {
    setLoading(false);

    if (!!data.detail) {
      return setErr(data.detail);
    }
    let error = "";
    Object.values(data).map((el) => (error = error + "\n" + el));

    setErr(error);
  };

  const successCB = (data) => {
    setNotif(`
      Registration Complete!! Kindly log into your email ${data.email} to verify your account.
    `);
  };

  const onSubmit = (data) => {
    setErr("");
    data.phone_number =
      "234" +
      (data.phone_number[0] === "0"
        ? data.phone_number.substring(1)
        : data.phone_number);
    if (data.password !== data.confirm_password) {
      setErr("Your Passwords do not match!!");
      return null;
    }

    data.email = data.email.toLowerCase();

    setLoading(true);

    authentication.Register(data, successCB, failedCB);
  };

  useEffect(() => {
    setCommunityType(communityTypes);
  }, [communityTypes]);

  const next = () => {
    setErr("");

    reset(
      {
        password: "",
        confirm_password: "",
      },
      { keepValues: true }
    );

    let res = true;
    setErr("");
    watchFields.forEach((el) => {
      if (el === undefined || el.length === 0 || el === false) {
        setErr("Please complete the form before you continue");
        res = false;
      }
    });

    return res ? setCurrentPage(tabs[1]) : null;
  };

  return (
    <div className="register text-center mt-20">
      <Helmet>
        <title>Join Jasper | Jasper</title>
        <meta name="description" content="Create an account with Jasper" />
      </Helmet>

      <h3>Welcome to Jasper</h3>
      <p className="text-grey_text my-4">
        Kindly fill in the following information <br /> to get started
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
          className="text-left mt-10 max-w-[450px] mx-auto relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          {currentPage === "first" ? (
            <>
              <Input
                placeholder="Enter your first name"
                name="first_name"
                label="First Name"
                register={register}
                error={errors.first_name && "Please Enter your first name"}
                options={{ required: true }}
              />
              <Input
                placeholder="Enter your last name"
                name="last_name"
                label="Last Name"
                register={register}
                error={errors.last_name && "Please enter your last name"}
                options={{ required: true }}
              />
              <PhoneInput
                placeholder="Enter your phone number"
                name="phone_number"
                label="Your Phone number"
                type="tel"
                register={register}
                error={
                  errors.phone_number && "Please enter a correct phone number"
                }
                options={{
                  required: true,
                  minLength: 6,
                  maxLenght: 11,
                  pattern: "/^(0?)([7|8|9]{1})[0-9]{9}$/",
                }}
              />

              <Input
                placeholder="Enter your community email"
                name="email"
                label="Community Email"
                register={register}
                error={
                  errors.community_email &&
                  "Please enter a correct email address"
                }
                options={{
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                }}
              />
              <Select
                name="community_type"
                register={register}
                options={{ required: true }}
                placeholder="Select your Community"
                label="Community Type"
                list={communityType}
              />
              <Checkbox
                name="agreement"
                register={register}
                label={
                  <>
                    I agree to the{" "}
                    <a href={PDF} target="blank" className="text-primary">
                      terms of service and privacy policy
                    </a>
                  </>
                }
                options={{ required: true }}
              />

              <Button onClick={next} title="Continue" type="button" />
            </>
          ) : (
            <>
              <Input
                name="password"
                placeholder="Enter your password"
                type="password"
                label="Create Password"
                register={register}
                value=""
                options={{
                  required: true,
                  minLength: 8,
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                }}
                error={
                  errors.password &&
                  "Password must be at least 8 characters; must contain 1 uppercase, 1 lowercase and 1 number"
                }
              />

              <Input
                name="confirm_password"
                placeholder="Confirm your password"
                type="password"
                label="Confirm Password"
                value=""
                register={register}
                options={{ required: true, minLength: 6 }}
                error={
                  errors.confirm_password &&
                  "Password must be at least 8 characters; must contain 1 uppercase, 1 lowercase and 1 number"
                }
              />

              <Button title="Create Account" loading={loading} />
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default Register;
