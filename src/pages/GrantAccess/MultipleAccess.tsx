import AccessCodeModal from "components/AccessCodeModal";
import Button from "components/Button";
import Input, { Select, DateInput, TextArea, Checkbox } from "components/Input";
import TextCodeModal from "components/TextCodeModal";
import SVGs from "helpers/SVGs";
import { formatDate } from "helpers/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createEventAccess } from "services/access";

const MultipleAccess = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [visitors, updateVisitors] = useState([
    { id: 1, name: "", phone_number: "" },
  ]);

  const [allVisitors, setAllVisitors] = useState([]);

  const stateGates = useSelector((state: any) => state.gates);
  const [showCodeGenerated, setShowCodeGenerated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [ which, setWhich ] = useState('')
  const [ showTextCode, setShowTextCode ] = useState(false)

  const handleChange = (index: any, event: any) => {
    console.log(index);
    const data: any = [...visitors];
    data[index][event.target.name] = event.target.value;
    setAllVisitors(data);
  };

  const today: any = new Date();
  const todayDate = formatDate(today.toISOString(), "-");

  const resetFields = () => {
    reset(
      {
        visitor_name: "",
        visitor_phone_number: "",
        gates: "",
        visitors: "",
        valid_from: "",
        valid_to: "",
        time_form: "",
        time_to: "",
        allow_multiple_entries: "",
        alert_security: "",
        pending_access: "",
        event_name: "",
        requesting_department: "",
        visitor_type: "",
        visitor_company: "",
        reason: "",
      }
    );

  }

  const onSubmit = (data: any) => {
    setLoading(true);
    setWhich('')
    data.access_type = "multiple";
    data.gates = [data.gates];
    data.visitors = allVisitors;

    data.time_form = "12:00";
    data.time_to = "12:00";
    data.alert_security = true;
    data.pending_access = false;

    console.log(data);

    createEventAccess(data)
      .then((res) => {
        setLoading(false);
        if(which === 'text') {
          setShowTextCode(true)
        }else {
          setShowCodeGenerated(true)
        }
        console.log(res.data.results);
        setAccessCode(res.data?.results?.code);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };


  const addVisitor = () => {
    const new_visitor = {
      id: Math.floor(Math.random() * 100),
      name: "",
      phone_number: "",
    };
    updateVisitors([...visitors, new_visitor]);
  };
  const removeVisitor = (visitor_index: any) => {
    const temp = [...visitors];
    const index = temp.findIndex((el) => el.id === visitor_index);
    temp.splice(index, 1);
    updateVisitors(temp);
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
      <h4>Multiple Access</h4>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10" >
          <Checkbox
                  name="allow_multiple_entries"
                  register={register}
                  label="Allow multiple entries wihtin validity period"
                  options={{ required: true }}
                />

        </div>
        <Input
          name="event_name"
          label="Event Name"
          placeholder="Enter event name"
          options={{ required: true }}
          register={register}
          error={errors.event_name && "Please enter an event name"}
        />
        <Input
          label="Requesting Department"
          name="requesting_department"
          placeholder="Enter requesting department"
          options={{ required: true }}
          error={
            errors.requesting_department &&
            "Please enter a requesting department"
          }
          register={register}
        />
        <Input
          name="visitor_type"
          register={register}
          options={{ required: true }}
          placeholder="Enter visitor type"
          label="Visitor Type"
          error={errors.visitor_type && "Please enter visitor type"}
        />
        <Input
          name="visitor_company"
          label="Visitor Company"
          placeholder="Enter visitor company name"
          options={{ required: true }}
          error={errors.visitor_company && "Please enter visitor's company"}
          register={register}
        />
        <Select
          name="gates"
          register={register}
          options={{ required: true }}
          placeholder="Select the Gate(s) you want to give access to"
          label="Gate"
          error={errors.gates && "Please select a gate"}
          list={stateGates.filter((el:any) => el.is_active === true )}
        />
        <TextArea
          name="reason_for_visit"
          label="Reason for visit"
          placeholder="Write a description"
          options={{ required: true }}
          error={errors.reason && "Please enter reason for visit"}
          register={register}
        />
        <div className="flex items-center" >
          <div className="w-full" >
            <DateInput
              name="valid_from"
              label="Valid From"
              placeholder="dd/mm/yy"
              register={register}
              min={todayDate}
              options={{ required: true }}
              error={errors.valid_from && "Please select a date"}
            />
          </div>
          <div className="w-1/2" >
            <Checkbox
                    name="all_day"
                    register={register}
                    label="All day"
                    options={{ required: false }}
                  />

          </div>

        </div>
        <DateInput
          name="valid_to"
          label="Valid To"
          placeholder="dd/mm/yy"
          min={todayDate}
          register={register}
          error={errors.valid_to && "Please select a date"}
          options={{ required: true }}
        />
        <p>Visitor(s) List</p>
        <div className="flex gap-6 w-full">
          <p className="text-label_text w-full">Name(s)</p>
          <p className="text-label_text w-full">Phone Number</p>
        </div>
        {visitors.map((el, idx) => (
          <div key={el.id} className="flex gap-6 w-full">
            <div className="w-full">
              <input
                className="p-4 mt-2 mb-8 border rounded-md w-full"
                name="name"
                placeholder="Enter visitor name"
                onChange={(event) => handleChange(idx, event)}
                value={el.name}
              />
            </div>
            <div className="w-full">
              <input
                className="p-4 mt-2 mb-8 border rounded-md w-full"
                name="phone_number"
                placeholder="Enter Visitor phone number"
                onChange={(event) => handleChange(idx, event)}
                value={el.phone_number}
              />
            </div>
            <div
              className="mt-6 cursor-pointer"
              onClick={() => removeVisitor(el.id)}
            >
              {SVGs.close_red}
            </div>
          </div>
        ))}

        <p
          onClick={addVisitor}
          className="mb-8 text-peach flex items-center gap-4 cursor-pointer"
        >
          <span> {SVGs.add_red}</span> Add additional row
        </p>
        <hr className="relative -left-10 w-screen mt-16 " />
        <div className="flex gap-4 lg:max-w-3xl mb-20 ">
        <div className="lg:max-w-lg w-full">
            <Button title="Text Code" type="submit" loading={loading} onClick={()=>setWhich('generated')}  />
          </div>

          <Button title="Generate Code" loading={loading} type="submit" onClick={()=>setWhich('text')  } other />
          <Button title="Cancel" type="button" onClick={resetFields} secondary />
        </div>
      </form>
    </div>
  );
};

export default MultipleAccess;
