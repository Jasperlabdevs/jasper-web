import Button from "components/Button";
import Input from "components/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Verification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    setLoading(true);
    console.log(data);
  };

  const digits = [0, 0, 0, 0, 0, 0];

  return (
    <div className="login text-center mt-24 lg:mt-20">
      <Helmet>
        <title>Verify your account | Jasper</title>
        <meta name="description" content="Verify to join Jasper" />
      </Helmet>

      <h3>Verification</h3>
      <p className="text-grey_text my-4">
        Enter the 4-degit OTP code sent to <br />{" "}
        <span className="text-primary"> email@email.com</span>
      </p>
      <hr className="w-2/3 mx-auto my-10" />

      <form
        className="text-left mt-10 max-w-[450px] mx-auto relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-4 mx-auto w-fit">
          {digits.map((el) => (
            <input
              type="number"
              className="w-12 px-4 flex justify-center items-center p-4 h-14 border rounded-lg text-xl"
            />
          ))}
        </div>

        <Button title="Verify" loading={loading} />
        <p className="text-grey_text text-center mt-10">
          Didn't get the code?{" "}
          <span className="text-primary cursor-pointer font-bold">Resend</span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Verification;
