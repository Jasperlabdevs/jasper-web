import AccessCodeModal from "components/AccessCodeModal";
import Button from "components/Button";
import Input, { Select, DateInput, PhoneInput } from "components/Input";
import TextCodeModal from "components/TextCodeModal";
import SVGs from "helpers/SVGs";
import { formatDate } from "helpers/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createEventAccess } from "services/access";

const RecurringAccess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showMore, setShowMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showCodeGenerated, setShowCodeGenerated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [ showTextCode, setShowTextCode ] = useState(false)
  const stateGates = useSelector((state: any) => state.gates);
  const today: any = new Date();
  const todayDate = formatDate(today.toISOString(), "-");

  const onSubmit = (data: any) => {
    setLoading(true);
    data.access_type = "recurring";
    data.gates = [data.gates];

    createEventAccess(data)
      .then((res) => {
        setLoading(false);
        setShowCodeGenerated(true);
        console.log(res.data.results);
        setAccessCode(res.data?.results?.visitors[0]?.code);
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

<TextCodeModal
        showTextCode= {showTextCode}
        accessCode = {accessCode}
        setShowTextCode={setShowTextCode}
      />

      <h4>Recurring Access</h4>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="visitor_name"
          label="Full Name"
          placeholder="Enter full name of the person you are granting access to"
          options={{}}
          register={register}
        />
        <PhoneInput
          placeholder="Enter the visitor's phone number"
          name="visitor_phone_number"
          label="Phone number"
          type="tel"
          register={register}
          error={errors.last_name && "Please enter a correct phone number"}
          options={{
            required: true,
            minLength: 6,
            maxLenght: 11,
            pattern: "/^(0?)([7|8|9]{1})[0-9]{9}$/",
          }}
        />
        <Input
          name="location"
          label="Location"
          placeholder="Enter location you are granting access to"
          options={{}}
          register={register}
        />
        <Select
          name="gates"
          register={register}
          options={{ required: true }}
          placeholder="Select the Gate(s) you want to give access to"
          label="Gate"
          error={errors.gates && "Please a gate"}
          list={stateGates}
        />

        <DateInput
          name="valid_from"
          label="Valid From"
          placeholder="dd/mm/yy"
          register={register}
          options={{}}
          min={todayDate}
        />
        <DateInput
          name="valid_to"
          label="Valid To"
          placeholder="dd/mm/yy"
          register={register}
          options={{}}
          min={todayDate}
        />
        <p
          onClick={() => setShowMore(!showMore)}
          className="mb-8 text-peach flex items-center gap-4 cursor-pointer"
        >
          <span> {SVGs.add_red}</span> Add additional details
        </p>
        {showMore && (
          <>
            <Input
              name="license_plate"
              placeholder="Enter license plate to be confirmed"
              label="License Plate"
              options={showMore && { required: true }}
              register={register}
              error={
                errors.license_plate && "Please enter a license plate number"
              }
            />
            <Input
              name="security_password"
              label="Security Password"
              placeholder="Enter a password to be confirmed at the gate"
              options={showMore && { required: true }}
              register={register}
              type="password"
              error={
                errors.security_password && "Please enter a security password"
              }
            />
            <Input
              name="visitor_id_card_name"
              label="Visitor's ID Card"
              placeholder="Enter the name on Visitor's ID card"
              options={showMore && { required: true }}
              register={register}
            />
          </>
        )}
        <hr className="relative -left-10 w-screen mt-16 " />
        <div className="flex gap-4 lg:max-w-3xl mb-20 ">
          <div className="lg:max-w-lg w-full">
            <Button title="Test Code" type="button" onClick={()=>setShowTextCode(!showTextCode)} />
          </div>

          <Button title="Generate Code" loading={loading} type="submit" other />
          <Button title="Cancel" type="button" secondary />
        </div>
      </form>
    </div>
  );
};

export default RecurringAccess;
