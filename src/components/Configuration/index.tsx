import "./style.css";
import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";

type ConfigurationProp = {
  title: string;
  description: string;
  hasCheckList?: Array<any>;
  register?: any;
  name?: string;
  value?: Boolean;
};

const Configuration = ({
  title,
  description,
  hasCheckList,
  register,
  name,
  value,
}: ConfigurationProp) => {
  const stateOccupancyType = useSelector((state: any) => state.occupancyTypes);
  const [isEnabled, setIsEnabled] = useState(value);

  useEffect(() => {
    setIsEnabled(value);
  }, [value]);

  return (
    <div className="config my-10 max-w-5xl ">
      <div className="texts ">
        <p className="!text-black mb-2 text-base">{title}</p>
        <p className="text-sm">{description}</p>
        {isEnabled && hasCheckList && (
          <div className="checklist mt-4">
            {stateOccupancyType?.map((data: any) => (
              <label key={data.id} className="checkbox">
                {data.name}
                <input
                  type="checkbox"
                  {...register(name + "_" + data.name.replace(/\s/g, ""))}
                  defaultChecked={hasCheckList.some(
                    (e) => e.name === data.name
                  )}
                  value={data.id}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </div>
        )}
      </div>
      <label className="switch mt-2">
        <input
          type="checkbox"
          defaultChecked={value}
          {...register(name, {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setIsEnabled(e.target.checked),
          })}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Configuration;
