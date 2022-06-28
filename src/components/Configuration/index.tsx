import "./style.css";
import { useSelector } from "react-redux";

type ConfigurationProp = {
  title: string;
  description: string;
  hasCheckList?: boolean;
  register?: any;
  name?: string;
};

const Configuration = ({
  title,
  description,
  hasCheckList,
  register,
  name,
}: ConfigurationProp) => {
  const stateOccupancyType = useSelector((state: any) => state.occupancyTypes);

  return (
    <div className="config my-10 max-w-5xl ">
      <div className="texts ">
        <p className="!text-black mb-2 text-base">{title}</p>
        <p className="text-sm">{description}</p>
        {hasCheckList && (
          <div className="checklist mt-4">
            {stateOccupancyType?.map((data: any) => (
              <label key={data.id} className="checkbox">
                {data.name}
                <input
                  type="checkbox"
                  {...register(name + "_" + data.name.replace(/\s/g, ""))}
                  value={data.id}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        )}
      </div>
      <label className="switch mt-2">
        <input type="checkbox" defaultChecked {...register(name)} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Configuration;
