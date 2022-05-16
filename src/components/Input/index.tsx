import { forwardRef, useState } from "react"
import SVG from 'helpers/SVGs'

type InputType ={
    name:String;
    type?:String;
    register:any;
    required:boolean;
    label:string;
    placeholder?: string;
}

type SelectType ={
  name:any;
  list:Array<Object>;
  label:string;
  placeholder?: string;
  onChange?:any;
}

const Input = ({label="", register, name, type="text", required, placeholder}:InputType) =>{

    const[visibility, setVisibility] = useState(false)

    return(
        <div className="relative">
            {label.length > 1 && <><label className="mb-4 lg:text-label_text " >{label}</label><br /></>}
            <input className="p-4 mt-2 mb-8 border rounded-md w-full" placeholder={placeholder} type={!visibility ? type : 'text'} {...register(name, { required })} />
            {
                type === "password" && <span className="cursor-pointer text-light_grey_text absolute top-12 right-4" onClick={() =>setVisibility(!visibility)} >{visibility ? "Hide" : "Show"}</span>
            }
            <br />
        </div>
    )
}

export const Select = forwardRef(({ onChange, name,  label="", placeholder, list}:SelectType, ref:any) => (
    <div className="relative min-w-[120px]">
      {label.length > 1 && <><label className="mb-4 lg:text-label_text" >{label}</label><br /></>}
      { (label.length > 1) ? <span className="z-10 absolute top-12 right-4 ">
        {SVG.arrow_down}
      </span> : <span className="z-10 absolute top11 right-4 " >
        {SVG.arrow_down}
      </span> } 
      
      <select className=" relative p-4 text-text-icon_background mt-2 mb-8 border rounded-md w-full" name={name} ref={ref} onChange={onChange}>
        <option hidden >{placeholder}</option>
        {
          list.map((data:any) => (
            <option key={data.id} value={data.value}>{data.option}</option>
          ))
        }
      </select>
    </div>
  ));


  export const Checkbox = ({label, name, register, required}:InputType) => (
    <label className="checkbox_container lg:text-label_text"  > <div dangerouslySetInnerHTML={{ __html: label }}></div>
      <input type="checkbox"  {...register(name, { required })} />
      <span className="checkmark"></span>
    </label>
  )

export default Input


