/* eslint-disable no-useless-escape */
import Button from "components/Button";
import Input, { Select } from "components/Input";
import { dispatchStore } from "helpers/utils";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_gate } from "store/actions/gates";

const GateLogin = () => {
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

  let { community_id } = useParams();

  const stateGates = useSelector((state: any) => state.gates);

  useEffect(() => {
    if(stateGates.length === 0){
      dispatchStore(get_gate(community_id, setLoading));
    }
  }, []);

  return (
    <div className="login text-center mt-24 lg:mt-20">
      <Helmet>
        <title>Gate Login | Jasper</title>
        <meta name="description" content="" />
      </Helmet>
      <h3>{stateGates[0]?.community.name} Gatehouse Login</h3>
      <p className="text-grey_text my-4">
        Kindly fill in the follwoing to get started
      </p>
      <hr className="w-2/3 mx-auto my-12" />

      <form
        className="text-left mt-10 max-w-[450px] mx-auto relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Select
          name="gate"
          register={register}
          options={{ required: true }}
          placeholder="Select your Gate name"
          label="Gate"
          list={stateGates}
        />

        <Input
          name="gate_pin"
          placeholder="Enter the gate pin"
          type="text"
          label="Gatehouse PIN"
          register={register}
          options={{ required: true }}
          error={errors.gate_pin && "Please enter the correct PIN"}
        />


        <Button title="Sign In" loading={loading} />
      </form>
    </div>
  );
};

export default GateLogin;
