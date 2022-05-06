import { forwardRef, useState } from "react"

type InputType ={
    name:String;
    type?:String;
    register:any;
    required:boolean;
    label:string;
    placeholder: string;
}

const Input = ({label, register, name, type="text", required, placeholder}:InputType) =>{

    const[visibility, setVisibility] = useState(false)

    return(
        <div className="relative">
            <label className="mb-4" >{label}</label><br />
            <input className="p-4 mt-2 mb-8 border-2 rounded-md w-full" placeholder={placeholder} type={!visibility ? type : 'text'} {...register(name, { required })} />
            {
                type === "password" && <span className="cursor-pointer absolute top-12 right-4" onClick={() =>setVisibility(!visibility)} >{visibility ? "HIDE" : "SHOW"}</span>
            }
            <br />
        </div>
    )
}

export const Select = forwardRef(({ onChange, name, label, type}:any, ref:any) => (
    <>
      <label>{label}</label><br />
      <select name={name} ref={ref} onChange={onChange}>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  ));

export default Input