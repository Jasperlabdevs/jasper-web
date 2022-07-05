import Button from "components/Button";
import Input, { Select, DateInput } from "components/Input";
import SVGs from "helpers/SVGs";
import { formatDate } from "helpers/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createEventAccess } from "services/access";

const MultipleAccess = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [visitors, updateVisitors] = useState([
    { id: 1, name: "", phone_number: "" },
  ]);

  const stateGates = useSelector((state:any)=> state.gates)
  const [ showCodeGenerated, setShowCodeGenerated ] = useState(false)
  const [ accessCode, setAccessCode ] = useState('')
  const [loading, setLoading] = useState(false)

  const today:any = new Date()
  const todayDate = formatDate(today.toISOString(), '-')

  const onSubmit = (data: any) => {
    setLoading(true)
    data.access_type = "multiple"
    data.gates = [data.gates]
    data.visitors = visitors

    // createEventAccess(data).then(
    //   res => {
    //     setLoading(false)
    //     setShowCodeGenerated(true)
    //     console.log(res.data.results)
    //     setAccessCode(res.data?.results?.code)
    //   }).catch(err => {
    //     setLoading(false)
    //     console.log(err)
    //   })
    console.log(data)
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
      <h4>Multiple Access</h4>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
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
          error={ errors.requesting_department && "Please enter a requesting department" }
          register={register}
        />
        <Select
          name="visitor_type"
          register={register}
          options={{ required: false }}
          placeholder="Select your visitor type"
          label="Visitor Type"
          error={ errors.visitor_type && "Please select a visitor type" }
          list={[]}
        />
        <Input
          name="visitor_company"
          label="Visitor Company"
          placeholder="Enter visitor company name"
          options={{require: true}}
          error={ errors.visitor_company && "Please enter visitor's company"}
          register={register}
        />
        <Select
          name="gates"
          register={register}
          options={{ required: true }}
          placeholder="Select the Gate(s) you want to give access to"
          label="Gate"
          error={ errors.gates && "Please select a gate"}
          list={stateGates}
        />
        <Input
          name="reason"
          label="Reason for visit"
          placeholder="Write a description"
          options={{}}
          error={ errors.reason && "Please enter reason for visit"}
          register={register}
        />
        <DateInput
          name="valid_from"
          label="Valid From"
          placeholder="dd/mm/yy"
          register={register}
          min={todayDate}
          options={{ required:true }}
          error={errors.valid_from && "Please select a date" }
          />
        <DateInput
          name="valid_to"
          label="Valid To"
          placeholder="dd/mm/yy"
          min={todayDate}
          register={register}
          error={errors.valid_to && "Please select a date" }
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
              <Input
                name="visitor_name"
                label=""
                placeholder="Enter visitor name"
                options={{}}
                register={register}
              />
            </div>
            <div className="w-full">
              <Input
                name="reason"
                label=""
                placeholder="Enter Visitor phone number"
                options={{}}
                register={register}
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
            <Button title="Test Code" type="button" />
          </div>

          <Button title="Generate Code" type="button" other />
          <Button title="Cancel" type="button" secondary />
        </div>
      </form>
    </div>
  );
};

export default MultipleAccess;
