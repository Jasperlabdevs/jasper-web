import Button from "components/Button";
import Input, { Select } from "components/Input";
import SVGs from "helpers/SVGs";
import { useState } from "react";
import { useForm } from "react-hook-form";

const OneTimeAccess = () => {
  const [showMore, setShowMore] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {};

  const gates: Array<any> = [];

  return (
    <div className="mt-10 max-w-4xl">
      <h3>One-Time Access</h3>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="visitor_name"
          label="Visitor's name"
          placeholder="Enter full name of the person you are granting access to"
          options={{}}
          register={register}
        />
        <Input
          label="Phone Number"
          name="phone_number"
          placeholder="Enter the person's phone number"
          options={{}}
          register={register}
        />
        <Select
          name="gate"
          register={register}
          options={{ required: true }}
          placeholder="Select the Gate(s) you want to give access to"
          label="Gate"
          list={gates}
        />
        <Input
          name="location"
          label="Location"
          placeholder="Enter location you are granting access to"
          options={{}}
          register={register}
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
              name="license"
              placeholder="Enter license plate to be confirmed"
              label="License Plate"
              options={{}}
              register={register}
            />
            <Input
              name="security_password"
              label="Security Password"
              placeholder="Enter a password to be confirmed at the gate"
              options={{}}
              register={register}
            />
            <Input
              name="location"
              label="Visitor's ID Card"
              placeholder="Enter the name on Visitor's ID card"
              options={{}}
              register={register}
            />
          </>
        )}
      </form>
      <hr className="relative -left-10 w-screen mt-16 " />
      <div className="flex gap-4 lg:max-w-3xl mb-20 ">
        <div className="lg:max-w-lg w-full">
          <Button title="Test Code" type="button" />
        </div>

        <Button title="Generate Code" type="button" other />
        <Button title="Cancel" type="button" secondary />
      </div>
    </div>
  );
};

export default OneTimeAccess;
