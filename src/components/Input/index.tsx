import { useState } from "react";
import SVG from "helpers/SVGs";

type InputType = {
  name: String;
  type?: String;
  register?: any;
  options: any;
  label: string | any;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: String;
  min?: string;
};

type SelectType = {
  name: any;
  list: Array<Object>;
  label: string;
  placeholder?: string;
  options?: any;
  register: any;
  value?: any;
  noborder?: Boolean;
  error?: string;
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
  value = "",
  min,
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
        defaultValue={value || ""}
        type={!visibility ? type : "text"}
        min={min}
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
export const PhoneInput = ({
  label = "",
  register,
  name,
  type = "text",
  placeholder,
  options,
  value = "",
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
      <div className="flex items-center  mt-2 mb-8 border rounded-md overflow-hidden">
        <span className="bg-border p-4 tracking-wide">+234</span>
        <input
          className=" w-full py-4 pl-4 outline-none "
          placeholder={placeholder}
          defaultValue={value || ""}
          type="tel"
          maxLength="11"
          {...register(name, { ...options })}
        />
      </div>

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
    value = "",
    noborder,
    error,
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
      <span className=" absolute top-12 right-4 ">{SVG.arrow_down}</span>
    ) : (
      <span className=" absolute top-7 right-4 ">{SVG.arrow_down}</span>
    )}

    <select
      {...register(name, { ...options })}
      className={`bg-[transparent] relative p-4 text-text-icon_background mt-2 rounded-md w-full ${
        noborder ? "border-none my-0" : "border"
      } `}
      name={name}
    >
      { !value &&
        <option hidden value="">
          {placeholder}
        </option>
      }
      {list.map((data: any) => (
        <option key={data.id || data} selected={(data.id === value || data === value) ? true : false} value={data.id || data}>
          {data.name || data}
        </option>
      ))}
    </select>
    <p className="text-red text-xs mt-1 mb-8">{error}</p>
  </div>
);

export const Checkbox = ({ label, name, register }: InputType) => (
  <label className="checkbox_container lg:text-label_text">
    {" "}
    <div>{label}</div>
    <input type="checkbox" {...register(name)} />
    <span className="checkmark"></span>
  </label>
);

export const DateInput = ({
  label,
  name,
  register,
  placeholder,
  options,
  error = "",
  min,
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
      min={min}
      {...register(name, { ...options })}
    />
    <p className="text-red text-xs -mt-7">{error}</p>
    <br />
  </div>
);

export default Input;
