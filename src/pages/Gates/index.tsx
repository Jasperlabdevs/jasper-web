import Button from "components/Button";
import Header from "components/Header";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import img from "assets/images/gate.png";
import { TableColumn, TableHeader } from "components/Table";
import { useEffect, useState } from "react";
import Modal from "components/Modal";
import Input, { PhoneInput, Select } from "components/Input";
import { useForm } from "react-hook-form";
import { copyText, dispatchStore } from "helpers/utils";
import { add_gate, edit_gate, get_gate } from "store/actions/gates";
import { useSelector } from "react-redux";

const Gates = () => {
  const headers = [
    "Gates",
    "Gate PIN",
    "Phone Number",
    "Date added",
    "Status",
    "",
    "",
    "",
  ];

  const stateGates = useSelector((state:any)=> state.gates )
  const stateCommunity = useSelector((state:any)=> state.community )

  const [ loading, setLoading ] = useState(true)

  const [ gates, setGates ] = useState(stateGates)
  const [showGate, setShowGate] = useState(false);
  const [edit, setEdit] = useState(true);
  const [ editID, setEditID ] = useState('')
  const [gateData, setGateData] = useState<any>({
    gateID: "",
    gateName: "",
    phoneNumber: "",
    nestGateID: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const reformatDate = (date:string) => {
    const d = new Date(date)
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = d.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  const editGate =(data:any)=>{
    setGateData({
      dataID:data.id,
      gateName: data.name,
      phoneNumber: data.phone_number,
      nestGateID: data.nest_gate_id,
    })
    setShowGate(true)
    setEditID(data.id)
    setEdit(true)
  }

  const closeModal = () => {
    setGateData({
      gateID: "",
      gateName: "",
      phoneNumber: "",
      nestGateID: "",
    })
    setEdit(false)
    setShowGate(false)
  }

  useEffect(()=>{

    console.log(gateData)

  },[gateData])

  useEffect(()=>{
    dispatchStore(get_gate(stateCommunity.id, setLoading ))
  },[])
  
  useEffect(()=>{
    setGates(stateGates)
    
  },[stateGates])

  const onSubmit = (data:any) =>{
    data.community_id = gateData?.id

    if(edit){
      data.gate_id = editID
      dispatchStore(edit_gate(data))
      setEdit(false)
    }else{
      dispatchStore(add_gate(data))
    }
    console.log(data)
    setShowGate(false)
  }
  const [showURL, setShowURl] = useState(false);

  return (
    <div>
      <Header />

      {showGate && (
        <Modal show={showGate} toggleClose={closeModal}>
          <div className="p-8 relative">
            <h4>{edit ? "Edit Gate" : "Add Gate"}</h4>
            <hr className="my-6 absolute w-full left-0" />

            <form className="mt-16" onSubmit={handleSubmit(onSubmit)} >
              <Input
                name="name"
                value={gateData.gateName}
                label="Gate Name"
                register={register}
                error={errors.name && "Please enter a gate name"}
                options={{ require: true, minLenght: 1 }}
              />
              <PhoneInput
                name="phone_number"
                label="Phone Number"
                value={gateData.phoneNumber}
                register={register}
                error={errors.phone_number && "Please enter a phone number"}
                options={{
                  require: true,
                  minLenght: 6,
                  maxLenght: 11,
                  pattern: "^[0-9]*$",
                }}
              />
              <Select
                name="nest_gate_id"
                label="Nest Gate"
                value={gateData.nestGateID}
                placeholder="Select gate"
                register={register}
                list={gates}
              />

              <div className="w-fit float-right mb-8">
                <Button type="submit" title={edit ? "Edit Gate" : "Add Gate"} />
              </div>
            </form>
          </div>
        </Modal>
      )}

      {showURL && (
        <Modal show={showURL} toggleClose={() => setShowURl(!showURL)}>
          <div className="p-8 relative">
            <h4>Gate Login URL</h4>
            <hr className="my-6 absolute w-full left-0" />

            <div className="mt-20 border rounded-md p-10">
              <a className="text-primary p-5" href="/" target="_blank">
                Google.com
              </a>
            </div>

            <div className="w-full flex justify-center mt-20">
              <Button
                title="Copy Link"
                tertiary
                onClick={() => copyText("test")}
              />
            </div>
          </div>
        </Modal>
      )}

      <div className="px-10 mt-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4>
            Gates{" "}
            <span className="text-white bg-primary rounded-full px-3 text-xs">
              {gates.length}
            </span>{" "}
          </h4>
          <div className="flex gap-4 ">
            <div className="max-w-5xl -mt-10">
              <Button title="Show gate URL" other onClick={()=>setShowURl(true)} />
            </div>

            <div className="max-w-4xl -mt-10">
              <Button
                title={
                  <span className="flex items-center justify-center gap-2 text-[#fff]">
                    {SVGs.add_white} Add Gate
                  </span>
                }
                onClick={()=>setShowGate(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-10">
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {gates?.map((data:any, index:number) => (
              <tr key={index} className="border-b border-[#C3C9DA]">
                <TableColumn td={<span>{data?.name}</span>} type="user" image={img} />

                <TableColumn td="AS12" />
                <TableColumn td={data?.phone_number} />
                <TableColumn td={reformatDate(data?.created)} />
                <TableColumn td="Generated" type="status" />
                <TableColumn
                  td="Edit"
                  type="button"
                  onClick={()=>editGate(data)}
                  buttonType="smallSecondary"
                />
                <TableColumn
                  td="Disable"
                  type="button"
                  buttonType="smallPrimary"
                />
                <TableColumn td="View Nested Gate" list={['1','2']} type="dropdown"/>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && 'Loading Gates...'}
        {!loading && (gates.length === 0) && 'No Gates available'}
      </div>
    </div>
  );
};

export default Gates;
