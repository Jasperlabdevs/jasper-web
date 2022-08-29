import AccessCodeModal from "components/AccessCodeModal";
import Button from "components/Button";
import Input, { PhoneInput, Select } from "components/Input";
import TextCodeModal from "components/TextCodeModal";
import SVGs from "helpers/SVGs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createEventAccess } from "services/access";
import { getCommunityWithID } from "services/community";

const OneTimeAccess = () => {
  const stateGates = useSelector((state: any) => state.gates);

  const [showMore, setShowMore] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showCodeGenerated, setShowCodeGenerated] = useState(false);
  const [which, setWhich] = useState("");
  const [showTextCode, setShowTextCode] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const stateCommunity = useSelector((state: any) => state.community);
  const [accessRules, setAccessRules] = useState<any>({});

  const [visitorData, setVisitorData] = useState();

  useEffect(() => {
    getCommunityWithID(stateCommunity.id || "")
      .then((res) => {
        setAccessRules(res.data.access_rules);
      })
      .catch((err) => {
        // console.log(err.data);
      });

    // console.log('accessRules',accessRules);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const location = stateCommunity.name;

  const onSubmit = (data: any) => {
    setLoading(true);
    setWhich("");
    data.access_type = "onetime";
    data.gates = [data.gates];

    createEventAccess(data)
      .then((res) => {
        setVisitorData(data);
        setLoading(false);
        if (which === "text") {
          setShowTextCode(true);
        } else {
          setShowCodeGenerated(true);
        }
        console.log(res.data.results);
        setAccessCode(res.data?.results?.visitors[0]?.code);
        resetFields();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    console.log(data);
  };

  const resetFields = () => {
    reset({
      visitor_name: "",
      visitor_phone_number: "",
      gates: "",
      security_password: "",
      license_plate: "",
      visitor_id_card_name: "",
    });
  };

  useEffect(() => {
    reset({
      security_password: "",
      license_plate: "",
      visitor_id_card_name: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMore]);

  const triggerShowMore = () => {
    setShowMore(!showMore);
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
        showTextCode={showTextCode}
        accessCode={accessCode}
        visitorData={visitorData}
        setShowTextCode={setShowTextCode}
      />

      <h3>One-Time Access</h3>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="visitor_name"
          label="Visitor's name"
          placeholder="Enter full name of the person you are granting access to"
          options={{ required: true }}
          register={register}
          error={errors.visitor_name && "Please enter a visitor's name"}
        />
        <PhoneInput
          placeholder="Phone number"
          name="visitor_phone_number"
          label="Phone Number"
          type="tel"
          register={register}
          error={
            errors.visitor_phone_number &&
            "Please enter a correct phone number"
          }
          options={{
            required: true,
            minLength: 7,
            maxLenght: 8,
            pattern: /[0-9]/,
          }}
        />

        <Select
          name="gates"
          register={register}
          options={{ required: true }}
          placeholder="Select the Gate you want to give access to"
          label="Gate"
          error={errors.gates && "Please select a gate."}
          list={stateGates.filter((el: any) => el.is_active === true)}
        />
        <Input
          name="location"
          label="Location"
          placeholder="Enter location you are granting access to"
          options={{ required: true }}
          error={errors.location && "Please enter a location"}
          register={register}
          value={location}
        />

        <p
          onClick={triggerShowMore}
          className="mb-8 text-peach flex items-center gap-4 cursor-pointer"
        >
          <span> {SVGs.add_red}</span> {showMore ? "Remove" : "Add"} additional
          details
        </p>
        {showMore && (
          <>
            {accessRules?.license_plate !== "" && (
              <Input
                name="license_plate"
                placeholder="Enter license plate to be confirmed"
                label="License Plate"
                options={{}}
                register={register}
                error={
                  errors.license_plate && "Please enter a license plate number"
                }
              />
            )}
            {accessRules?.security_password !== "" && (
              <Input
                name="security_password"
                label="Security Password"
                placeholder="Enter a password to be confirmed at the gate"
                options={{}}
                register={register}
                type="password"
                error={
                  errors.security_password && "Please enter a security password"
                }
              />
            )}
            {accessRules?.visitor_id_card_name !== "" && (
              <Input
                name="visitor_id_card_name"
                label="Visitor's ID Card"
                placeholder="Enter the name on Visitor's ID card"
                options={{}}
                register={register}
              />
            )}
          </>
        )}
        <hr className="relative -left-10 w-screen mt-16 " />
        <div className="flex gap-4 lg:max-w-3xl mb-20 ">
          <div className="lg:max-w-lg w-full">
            <Button
              title="Text Code"
              type="submit"
              loading={loading}
              onClick={() => setWhich("generated")}
            />
          </div>

          <Button
            title="Generate Code"
            loading={loading}
            type="submit"
            onClick={() => setWhich("text")}
            other
          />
          <Button
            title="Cancel"
            type="button"
            onClick={resetFields}
            secondary
          />
        </div>
      </form>
    </div>
  );
};

export default OneTimeAccess;
