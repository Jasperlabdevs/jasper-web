import Button from "components/Button";
import Header from "components/Header";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import img from "assets/images/gate.png";
import { TableColumn, TableHeader } from "components/Table";
import { useState } from "react";
import Modal from "components/Modal";
import Input, { PhoneInput, Select } from "components/Input";
import { useForm } from "react-hook-form";
import { copyText } from "helpers/utils";

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
  
  const [ showGate, setShowGate ] = useState(false)
  const [ edit, setEdit ] = useState(true)
  const [gateData, setGateDate ] = useState<any>({gateName: '', phoneNumber: '', nestGate: ''})
  const { register, formState: {errors} } = useForm()


  const [ showURL, setShowURl ] = useState(true)

  
  return (
    <div>
      <Header />

      {
        showGate && 
        <Modal show={showGate} toggleClose={()=>setShowGate(!showGate)} >
          <div className="p-8 relative" >
            <h4>{ edit ? 'Edit Gate' :'Add Gate'}</h4>
            <hr className="my-6 absolute w-full left-0"  />

            <form className="mt-16" >
              <Input 
                name='gate_name'
                value={ gateData.gateName || '' }
                label='Gate Name'
                register={register}
                error={errors.gate_name && 'Please enter a gate name'}
                options ={{ require: true }}
              />
              <PhoneInput 
                name='phone_number'
                label='Phone Number'
                value={ gateData.phoneNumber || '' }
                register={register}
                error={errors.phone_number && 'Please enter a phone number'}
                options ={{ require: true, minLenght: 6, maxLenght: 11, pattern: "^[0-9]*$" }}
              />
              <Select 
                  name='nest_gate'
                  label='Nest Gate'
                  value={ gateData.nestGate || '' }
                  placeholder="Select gate"
                  register={register} 
                  list={[]}
              />
              
              <div className="w-fit float-right mb-8">
                <Button title={ edit ? 'Edit Gate' :'Add Gate'} />
              </div>
            </form>

          </div>
        </Modal>
      }

      {
        showURL && 
        <Modal show={showURL} toggleClose={()=>setShowURl(!showURL)} >
          <div className="p-8 relative" >
            <h4  >Gate Login URL</h4>
            <hr className="my-6 absolute w-full left-0"  />

            <div className="mt-20 border rounded-md p-10" >
              <a className="text-primary p-5" href="/" target="_blank" >Google.com</a>
            </div>

            <div className="w-full flex justify-center mt-20" >
              <Button title='Copy Link' tertiary onClick={()=>copyText('test')}  />
            </div>

          </div>
        </Modal>
      }


      <div className="px-10 mt-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4>
            Gates{" "}
            <span className="text-white bg-primary rounded-full px-3 text-xs">
              3
            </span>{" "}
          </h4>
          <div className="flex gap-4 ">
            <div className="max-w-3xl -mt-10">
              <Button title="Show gate URL" other />
            </div>

            <div className="max-w-3xl -mt-10">
              <Button
                title={
                  <span className="flex items-center justify-center gap-2 text-[#fff]">
                    {SVGs.add_white} Add Gate
                  </span>
                }
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
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA]">
                <TableColumn td={<span>Entry</span>} type="user" image={img} />

                <TableColumn td="AS12" />
                <TableColumn td="One-Time Access" />
                <TableColumn td="3123" />
                <TableColumn td="Generated" type="status" />
                <TableColumn
                  td="Edit"
                  type="button"
                  buttonType="smallSecondary"
                />
                <TableColumn
                  td="Disable"
                  type="button"
                  buttonType="smallPrimary"
                />
                <TableColumn td="View Nested Gate" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gates;
