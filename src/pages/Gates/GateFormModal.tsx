import Button from "components/Button";
import Input, { PhoneInput, Select } from "components/Input";
import Modal from "components/Modal";
import { dispatchStore } from "helpers/utils";
import { useForm } from "react-hook-form";
import { edit_gate, add_gate } from "store/actions/gates";

const GateFormModal = ({ showGate, closeModal, edit, gates, editID }: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  let active = gates.filter((el: any) => el.id === editID);

  let newGates = [];

  if (edit) {
    newGates = gates.filter((el: any) => el.id !== editID);
  } else {
    newGates = gates;
  }

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
            name="community_contact_phone_number"
            label="Community Contact Phone Number"
            type="tel"
            register={register}
            error={
              errors.community_contact_phone_number &&
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
            name="nest_gate_id"
            label="Nest Gate"
            value={active[0]?.gate?.id || ""}
            placeholder={gates.length === 0 ? "No Gate created" : "Select gate"}
            register={register}
            list={newGates}
          />

          <div className="w-fit float-right mb-8">
            <Button type="submit" title={edit ? "Edit Gate" : "Add Gate"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GateFormModal;
