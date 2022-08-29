import Button from "components/Button";
import Input, { PhoneInput, Select } from "components/Input";
import Modal from "components/Modal";
import { dispatchStore } from "helpers/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { readyToNest } from "services/gates";
import { edit_gate, add_gate } from "store/actions/gates";

const GateFormModal = ({
  showGate,
  closeModal,
  edit,
  gates,
  editID,
  nested,
}: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [gatesList, setGates] = useState([]);

  let active = gates.filter((el: any) => el.id === editID);
      
      useEffect(() => {
        readyToNest().then((res) => {
          console.log(res);
          const tempGates = res.data.results
          let newGates = tempGates;
          if (edit) {
            newGates = tempGates.filter((el: any) => el.id !== editID);
          } 
          setGates(newGates);
    });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);

    if (edit) {
      data.gate_id = editID;
      dispatchStore(edit_gate(data));
    } else {
      dispatchStore(add_gate(data));
    }
    console.log(data);
    closeModal();
    reset();
  };

  return (
    <Modal show={showGate} toggleClose={closeModal}>
      <div className="p-8 relative">
        <h4>{edit ? "Edit Gate" : "Add Gate"}</h4>
        <hr className="my-6 absolute w-full left-0" />

        <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="name"
            value={active[0]?.name || ""}
            label="Gate Name"
            register={register}
            error={errors.name && "Please enter a gate name"}
            options={{ required: true, minLenght: 1 }}
          />
          <PhoneInput
            placeholder="Enter community phone number"
            name="phone_number"
            label="Phone Number"
            type="tel"
            register={register}
            value={active[0]?.phone_number || ""}
            error={errors.phone_number && "Please enter a correct phone number"}
            options={{
              required: true,
              minLength: 7,
              maxLenght: 8,
              pattern: /[0-9]/,
            }}
          />

          {!nested && (
            <Select
              name="nest_gate_id"
              disabled={nested}
              label="Nest Gate"
              value={active[0]?.gate?.id || ""}
              placeholder={
                gates.length === 0 ? "No Gate created" : "Select gate"
              }
              register={register}
              list={gatesList}
            />
          )}

          <div className="w-fit float-right mb-8">
            <Button type="submit" title={edit ? "Edit Gate" : "Add Gate"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GateFormModal;
