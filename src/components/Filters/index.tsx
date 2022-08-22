import { Select } from "components/Input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Filter = ({ handleChange }: any) => {
  const { register } = useForm();

  const access_types = ["All", "recurring", "event", "onetime", "multiple"];
  const status = ["All", "generated", "verified", "expired", "disabled"];

  const stateGates = useSelector((state: any) => state.gates);

  return (
    <div>
      <form action="">
        <div className="flex gap-6">
          <div className="w-lg">
            <Select
              name="access_type"
              register={register}
              options={{ required: true }}
              placeholder="Access Type"
              label=""
              onChange={handleChange}
              list={access_types}
            />
          </div>
          <div className="w-lg">
            <Select
              onChange={handleChange}
              name="status"
              register={register}
              options={{ required: true }}
              placeholder="Status"
              label=""
              list={status}
            />
          </div>
          <div className="w-lg">
            <Select
              onChange={handleChange}
              name="gate"
              register={register}
              options={{ required: true }}
              placeholder="Gate"
              label=""
              list={["All", ...stateGates]}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
