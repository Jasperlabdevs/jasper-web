import { Select } from "components/Input";
import { useForm } from "react-hook-form";

const Filter = () => {
  const { register } = useForm();

  return (
    <div>
      <form action="">
        <div className="flex gap-6">
          <div className="w-lg">
            <Select
              name="gate"
              register={register}
              options={{ required: true }}
              placeholder="Access Type"
              label=""
              list={[]}
            />
          </div>
          <div className="w-lg">
            <Select
              name="gate"
              register={register}
              options={{ required: true }}
              placeholder="Status"
              label=""
              list={[]}
            />
          </div>
          <div className="w-lg">
            <Select
              name="gate"
              register={register}
              options={{ required: true }}
              placeholder="Gate"
              label=""
              list={[]}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
