import AccessCodeModal from "components/AccessCodeModal";
import Button from "components/Button";
import Input, {
  Select,
  DateInput,
  PhoneInput,
  Checkbox,
} from "components/Input";
import TextCodeModal from "components/TextCodeModal";
import SVGs from "helpers/SVGs";
import { formatDate } from "helpers/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createEventAccess } from "services/access";
import { getCommunityWithID } from "services/community";

const RecurringAccess = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCodeGenerated, setShowCodeGenerated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [which, setWhich] = useState("");
  const [showTextCode, setShowTextCode] = useState(false);
  const stateGates = useSelector((state: any) => state.gates);
  const today: any = new Date();
  const todayDate = formatDate(today.toISOString(), "-");
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(todayDate);
  const stateCommunity = useSelector((state: any) => state.community);
  const [accessRules, setAccessRules] = useState<any>({});
  const [visitorData, setVisitorData] = useState();
  const [showTime, toggleShowTime] = useState(true);

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

  const location = stateCommunity.name;

  const onSubmit = (data: any) => {
    setLoading(true);
    setWhich("");
    data.access_type = "recurring";
    data.gates = [data.gates];
    data.all_day = allDay;

    createEventAccess(data)
      .then((res) => {
        setLoading(false);
        setVisitorData(data);
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

  useEffect(() => {
    console.log(getValues("valid_from"));
  }, [getValues]);

  const resetFields = () => {
    reset({
      visitor_name: "",
      visitor_phone_number: "",
      gates: "",
      valid_from: "",
      valid_to: "",
      security_password: "",
      license_plate: "",
      visitor_id_card_name: "",
    });
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

      <h4>Recurring Access</h4>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="visitor_name"
          label="Full Name"
          placeholder="Enter full name of the person you are granting access to"
          options={{ required: true }}
          register={register}
          error={errors.visitor_name && "Please enter a visitor's name"}
        />
        <PhoneInput
          placeholder="Enter phone number"
          name="visitor_phone_number"
          label="Phone Number"
          type="tel"
          register={register}
          error={
            errors.visitor_phone_number && "Please enter a correct phone number"
          }
          options={{
            required: false,
            minLength: 7,
            maxLenght: 8,
            pattern: /[0-9]/,
          }}
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
        <Select
          name="gates"
          register={register}
          options={{ required: true }}
          placeholder="Select the Gate(s) you want to give access to"
          label="Gate"
          error={errors.gates && "Please a gate"}
          list={stateGates.filter((el: any) => el.is_active === true)}
        />

        <div className="flex items-center gap-5">
          <div className="w-full flex gap-10">
            <div className="w-full">
              <DateInput
                type="date"
                name="valid_from"
                label="Valid From"
                placeholder="dd/mm/yy"
                register={register}
                min={todayDate}
                options={{
                  required: true,
                }}
                error={errors.valid_from && "Please select a date"}
              />
            </div>

            {showTime && (
              <div className="w-full">
                <DateInput
                  type="time"
                  name="time_from"
                  label="  "
                  placeholder="dd/mm/yy"
                  register={register}
                  min={todayDate}
                  options={{ required: false }}
                  error={errors.time_from && "Please select a time"}
                  disabled={allDay === true ? true : false}
                />
              </div>
            )}
          </div>
          <div className="w-1/5">
            <Checkbox
              name="all_day"
              register={() => {}}
              onChange={(e: any) => {
                allDay === false ? setAllDay(true) : setAllDay(false);
                toggleShowTime(!showTime);
              }}
              value={allDay}
              label="All day"
              options={{ required: false }}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-full flex gap-10">
            <div className="w-full">
              <DateInput
                name="valid_to"
                label="Valid To"
                placeholder="dd/mm/yy"
                register={register}
                options={{ required: true }}
                error={errors.valid_to && "Please select a valid date"}
                min={startDate}
              />
            </div>
            {showTime && (
              <div className="w-full">
                <DateInput
                  type="time"
                  name="time_to"
                  label="  "
                  disabled={allDay === true ? true : false}
                  placeholder="dd/mm/yy"
                  register={register}
                  options={{ required: false }}
                  error={errors.time_to && "Please select a valid time"}
                  min={startDate}
                />
              </div>
            )}
          </div>
          <div className="w-1/5"></div>
        </div>

        <p
          onClick={triggerShowMore}
          className="mb-8 text-peach flex items-center gap-4 cursor-pointer"
        >
          <span> {SVGs.add_red} </span> {showMore ? "Remove" : "Add"} additional
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
            onClick={() => console.log(getValues("valid_from"))}
            secondary
          />
        </div>
      </form>
    </div>
  );
};

export default RecurringAccess;
