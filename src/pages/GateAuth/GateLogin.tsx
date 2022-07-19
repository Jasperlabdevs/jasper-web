/* eslint-disable no-useless-escape */
import Button from "components/Button";
import Input, { Select } from "components/Input";
import { dispatchStore, setToken } from "helpers/utils";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { gateAuth } from "services/gates";
import { get_all_gates } from "store/actions/gates";

const GateLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const onSubmit = (data: any) => {
    setErr("");
    setLoading(true);
    console.log(data);

    gateAuth(data)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        navigate(`verification/${data.gate_id}/`);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.response.data.message);
      });
  };

  let { community_id } = useParams();
  const { token } = useParams();

  useEffect(()=>{
    setToken(token || '')
  }, [token])


  const stateGates = useSelector((state: any) => state.gates);

  useEffect(() => {
    if (stateGates.length === 0) {
      dispatchStore(get_all_gates(community_id, setLoading));
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

      {!!err && (
        <div className="bg-faded_red w-full text-center p-4 mb-4 rounded-md">
          <p className="text-red text-xs ">{err}</p>
        </div>
      )}
      <form
        className="text-left mt-10 max-w-[450px] mx-auto relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Select
          name="gate_id"
          register={register}
          options={{ required: true }}
          placeholder="Select your Gate name"
          label="Gate"
          list={stateGates.filter((el:any) => el.is_active === true )}
          error={errors.gate_id && "Please select a gate."}
        />

        <Input
          name="gate_pin"
          placeholder="Enter the gate pin"
          type="number"
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
