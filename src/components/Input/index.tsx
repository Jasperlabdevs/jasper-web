import { useState } from "react";
import SVG from "helpers/SVGs";

type InputType = {
  name: String;
  type?: String;
  register: any;
  options: any;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

type SelectType = {
  name: any;
  list: Array<Object>;
  label: string;
  placeholder?: string;
  options?: any;
  register: any;
  defaultValue?: any;
};

const Input = ({
  label = "",
  register,
  name,
  type = "text",
  disabled = false,
  placeholder,
  options,
  error = "",
}: InputType) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="relative">
      {label.length > 1 && (
        <>
          <label className="mb-4 lg:text-label_text ">{label}</label>
          <br />
        </>
      )}
      <input
        disabled={disabled}
        className="p-4 mt-2 mb-8 border rounded-md w-full"
        placeholder={placeholder}
        type={!visibility ? type : "text"}
        {...register(name, { ...options })}
      />
      {type === "password" && (
        <span
          className="cursor-pointer text-light_grey_text absolute top-12 right-4"
          onClick={() => setVisibility(!visibility)}
        >
          {visibility ? "Hide" : "Show"}
        </span>
      )}
      <p className="text-red text-xs -mt-7">{error}</p>
      <br />
    </div>
  );
};

export const Select = (
  {
    register,
    options,
    name,
    label = "",
    placeholder,
    list,
    defaultValue = "",
  }: SelectType,
  ref: any
) => (
  <div className="relative min-w-[120px]">
    {label.length > 1 && (
      <>
        <label className="mb-4 lg:text-label_text">{label}</label>
        <br />
      </>
    )}
    {label.length > 1 ? (
      <span className="z-10 absolute top-12 right-4 ">{SVG.arrow_down}</span>
    ) : (
      <span className="z-10 absolute top-7 right-4 ">{SVG.arrow_down}</span>
    )}

    <select
      {...register(name, { ...options })}
      className=" relative p-4 text-text-icon_background mt-2 mb-8 border rounded-md w-full"
      defaultValue={defaultValue}
      name={name}
    >
      <option hidden value="">
        {placeholder}
      </option>
      {list.map((data: any) => (
        <option key={data.id || data} value={data.id || data}>
          {data.name || data}
        </option>
      ))}
    </select>
  </div>
);

export const Checkbox = ({ label, name, register }: InputType) => (
  <label className="checkbox_container lg:text-label_text">
    {" "}
    <div dangerouslySetInnerHTML={{ __html: label }}></div>
    <input type="checkbox" {...register(name)} />
    <span className="checkmark"></span>
  </label>
);

export const Date = ({
  label,
  name,
  register,
  placeholder,
  options,
  error = "",
}: InputType) => (
  <div className="relative">
    {label.length > 1 && (
      <>
        <label className="mb-4 lg:text-label_text ">{label}</label>
        <br />
      </>
    )}
    <input
      type="date"
      className="p-4 mt-2 mb-8 border rounded-md w-full max-w-lg"
      placeholder={placeholder}
      {...register(name, { ...options })}
    />
    <p className="text-red text-xs -mt-7">{error}</p>
    <br />
  </div>
);

export default Input;
