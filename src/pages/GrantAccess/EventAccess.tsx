import Button from "components/Button";
import Input, { Select } from "components/Input";
import { formatDate } from "helpers/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { createEventAccess } from "services/access";
import AccessCodeModal from "components/AccessCodeModal";

const EventAccess = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showCodeGenerated, setShowCodeGenerated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const stateGates = useSelector((state: any) => state.gates);
  const today = new Date();

  const todayDate = formatDate(today.toISOString(), "-");
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    reset(
      {
        event_name: "",
        number_of_visitors: "",
        gates: "",
        location: "",
        event_date: "",
      }
    );

  }

  const onSubmit = (data: any) => {
    setLoading(true);
    data.access_type = "event";
    data.gates = [data.gates];

    createEventAccess(data)
      .then((res) => {
        setLoading(false);
        setShowCodeGenerated(true);
        console.log(res.data.results);
        setAccessCode(res.data?.results?.code);
        resetFields()
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    console.log(data);
  };

  return (
    <div className="mt-10 max-w-4xl">
      <AccessCodeModal
        showCodeGenerated={showCodeGenerated}
        setShowCodeGenerated={setShowCodeGenerated}
        register={register}
        accessCode={accessCode}
      />

      <h4>Event Access</h4>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="event_name"
          label="Event Name"
          placeholder="Enter event name"
          options={{
            required: true,
          }}
          error={errors.event_name && "Please enter an event name"}
          register={register}
        />
        {/* auto-complete location */}
        <Input
          name="location"
          label="Location"
          placeholder="Enter location you are granting access to"
          options={{
            required: true,
          }}
          error={errors.location && "Please enter an Location"}
          register={register}
        />
        <Select
          name="gates"
          register={register}
          options={{ required: true }}
          placeholder="Select the Gate(s) you want to give access to"
          label="Gate"
          error={errors.gates && "Please select a gate."}
          list={stateGates.filter((el:any) => el.is_active === true )}
        />
        <Input
          name="number_of_visitors"
          label="Number of Visitors"
          placeholder="Enter of visitors you are granting access"
          type="number"
          options={{
            required: true,
            min: 1,
            max: 250
          }}
          error={errors.number_of_visitors && "Please enter the number of visitors"}
          register={register}
        />

        <Input
          name="event_date"
          label="Event date"
          placeholder=""
          type="date"
          min={todayDate}
          options={{
            required: true,
          }}
          error={errors.event_date && "Please select a valid date"}
          register={register}
        />

        <hr className="relative -left-10 w-screen mt-16 " />
        <div className="flex gap-4 lg:max-w-lg mb-20 ">
          <div className="lg:max-w-lg w-full">
            <Button title="Generate Code" loading={loading} type="submit" />
          </div>

          <Button title="Cancel" type="button" onClick={resetFields} secondary />
        </div>
      </form>
    </div>
  );
};

export default EventAccess;
