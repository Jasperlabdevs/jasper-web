import Button from "components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

const GateVerification = () => {
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
      <h3 className="mb-20">Entry Gate</h3>

      <form
        className="text-left pt-20 max-w-[450px] mx-auto relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mb-10 lg:text-label_text ">Visitor Access Code</label>
        <div className="flex mt-3 gap-4 justify-between mx-auto w-full">
          {digits.map((el) => (
            <input
              type="number"
              className="w-12 px-4 flex justify-center items-center p-4 h-14 border rounded-lg text-xl"
            />
          ))}
        </div>

        <Button title="Verify Code" loading={loading} />
      </form>
    </div>
  );
};

export default GateVerification;
