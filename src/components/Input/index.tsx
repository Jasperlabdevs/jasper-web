import { useEffect, useState } from "react";
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
  value?: string | boolean;
  min?: string;
  onChange?: any;
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
  onChange?: any;
  defaultValue?: any;
  disabled?: boolean;
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
        className={`p-4 mt-2 mb-8 border rounded-md w-full ${
          error && `border-red outline-red`
        } `}
        placeholder={placeholder}
        defaultValue={value || ""}
        type={!visibility ? type : "text"}
        min={min}
        step="1"
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
export const TextArea = ({
  label = "",
  register,
  name,
  type = "",
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
      <textarea
        disabled={disabled}
        className="p-4 mt-2 mb-8 border rounded-md w-full"
        placeholder={placeholder}
        defaultValue={value || ""}
        type={type}
        min={min}
        step="1"
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
  disabled,
  type = "text",
  placeholder,
  options,
  value = "",
  error = "",
}: InputType) => {
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
          disabled={disabled}
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

export const Select = ({
  onChange,
  register,
  options,
  name,
  label = "",
  placeholder,
  list,
  value = "",
  defaultValue = "",
  noborder,
  error,
  disabled,
}: SelectType) => (
  <div className="relative min-w-[160px]">
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
      disabled={disabled}
      name={name}
      defaultValue={defaultValue || value || ""}
      onChange={onChange}
    >
      {value === "" && (
        <option hidden value="">
          {placeholder}
        </option>
      )}
      {list.map((data: any) => (
        <option key={data.id || data} value={data.id || data}>
          {data.name || data}
        </option>
      ))}
    </select>
    <p className="text-red text-xs mt-1 mb-8">{error}</p>
  </div>
);

export const Checkbox = ({
  label,
  name,
  register,
  value,
  onChange,
}: InputType) => (
  <label className="checkbox_container lg:text-label_text">
    {" "}
    <div>{label}</div>
    <input
      type="checkbox"
      value={value || ""}
      onChange={onChange}
      {...register(name)}
    />
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
  disabled,
  type,
  value,
  onChange,
}: InputType) => (
  <div className="relative">
    {label.length > 1 && (
      <>
        <label className="mb-4 lg:text-label_text ">{label}</label>
        <br />
      </>
    )}
    <input
      type={type || "date"}
      className="p-4 mt-2 mb-8 border rounded-md w-full max-w-lg"
      placeholder={placeholder}
      min={min}
      defaultValue={value}
      disabled={disabled}
      onChange={onChange}
      {...register(name, { ...options })}
    />
    <p className="text-red text-xs -mt-7">{error}</p>
    <br />
  </div>
);

export const InputDropdown = ({
  label,
  name,
  placeholder,
  error = "",
  disabled,
  onChange,
  list=[],
  showDropdown,
  select,
  value,
  onBlur, onFocus
}: any) => {

  const [dvalue, setValue] = useState(value || '')
  const set= (va:string)=>{
    select(va)
    setValue(va)
  }
  return(
  <div  className="relative w-full">
    {label.length > 1 && (
      <>
        <label className="mb-4 lg:text-label_text ">{label}</label>
        <br />
      </>
    )}
    <input
      // onBlur={onBlur}
      onFocus={onFocus}
      type={"text"}
      name={name}
      value={dvalue}
      className="p-4 mt-2 mb-8 border rounded-md w-full"
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e:any)=>{
        setValue(e.target.value)
        onChange(e.target.value)
      }}
    />
    <p className="text-red text-xs -mt-7">{error}</p>
    <br />
    { showDropdown && 
    <div className="absolute top-24 z-10 bg-[#fff] shadow-2xl h-60 overflow-y-auto w-full rounded-lg">
      <ul>
        {
           list.map((data: any) => (
            <li key={data.name} className="py-2 px-4 cursor-pointer hover:bg-faded" onClick={()=>set(data.name)} >{data.name}</li>
           )
        )}
      </ul>
    </div>}
  </div>
)};

export default Input;
