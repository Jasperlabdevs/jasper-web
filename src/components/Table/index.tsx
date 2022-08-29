import Button from "components/Button";
import SVGs from "helpers/SVGs";

type tableColumnType = {
  type?:
    | "normal"
    | "status"
    | "userType"
    | "button"
    | "user"
    | "dropdown"
    | "check";
  buttonType?:
    | "smallPrimary"
    | "smallSecondary"
    | "smallSecondary-red"
    | "tertiary"
    | "other"
    | "red"
    | any;
  td: string | any;
  image?: any;
  onClick?: any;
  list?: any;
  status_type?: Boolean;
};

export const TableHeader = ({ headers }: any) => (
  <tr className="text-grey_text w-full border-b border-[#C3C9DA] bg-[#F9F9FB]">
    {headers.map((data: any, idx: number) => (
      <th key={idx} className={`px-4  text-left text-grey_text py-4 `}>
        {data}
      </th>
    ))}
  </tr>
);

export const TableColumn = ({
  type = "normal",
  buttonType,
  td,
  image,
  onClick,
  list = [],
  status_type,
}: tableColumnType) => (
  <>
    {type === "normal" && <td className="px-4 py-8 text-left">{td}</td>}
    {type === "check" && (
      <td className="pl-4 py-8 text-left">
        {<input type="checkbox" name={td} />}
      </td>
    )}
    {type === "status" && (
      <td>
        <span
          className={`p-2 px-6 w-fit h-fit rounded-full text-center items-center justify-center 
           ${
             (td.includes("generated") || td === "in progress") &&
             "bg-faded_yellow text-yellow"
           }
           ${td.includes("draft") && "bg-faded text-primary"}
           ${
             (td === "disabled" ||
               td.includes("expired") ||
               td === "not paid") &&
             "bg-faded_red text-red"
           }
           ${
             (td === "enable" ||
               td === "enabled" ||
               td === "verified" ||
               td === "completed" ||
               td === "paid") &&
             "bg-faded_green text-green"
           } `}
        >
          {td}
        </span>
      </td>
    )}
    {type === "userType" && (
      <td className="text-left px-4 ">
        {" "}
        <span className="text-primary bg-faded px-4 py-2 rounded-full">
          {td}
        </span>{" "}
      </td>
    )}
    {type === "button" && buttonType === "smallPrimary" && (
      <td className="px-4 ">
        <Button smallPrimary title={td} onClick={onClick} />
      </td>
    )}
    {type === "button" && buttonType === "smallSecondary" && (
      <td className="px-4 ">
        <Button smallSecondary title={td} onClick={onClick} />
      </td>
    )}
    {type === "button" && buttonType === "smallSecondary-red" && (
      <td className="px-4 ">
        <Button smallSecondaryred title={td} onClick={onClick} />
      </td>
    )}
    {type === "button" && buttonType === "red" && (
      <td className="px-4 ">
        <Button red title={td} onClick={onClick} />
      </td>
    )}
    {type === "button" && buttonType === "other" && (
      <td className="px-4 ">
        <Button other title={td} onClick={onClick} />
      </td>
    )}
    {type === "button" && buttonType === "tertiary" && (
      <td className="px-4 ">
        <Button tertiary title={td} onClick={onClick} />
      </td>
    )}
    {type === "dropdown" && (
      <td className="px-4 " onClick={onClick}>
        <div className="dropdown absolute">
          <button className="dropbtn flex items-center gap-4">
            {td} {SVGs.arrow_down}
          </button>
          <div className="dropdown-content absolute z-[1000]">
            {list?.map((data: any, index: number) => (
              // <p
              //   className="cursor-pointer hover:bg-faded"
              //   onClick={data.action}
              // >
              //   {data.title}
              // </p>
              <p className="cursor-pointer text-black hover:bg-faded" onClick={data.action} >{data.title}</p>
            ))}
          </div>
        </div>
      </td>
    )}
    {type === "user" && (
      <td className="text-left h-full pl-4 flex mt-5 gap-2 items-center">
        <span className="bg-faded rounded-full h-12 w-12 flex justify-center overflow-hidden items-center">
          <img src={image} className="h-auto w-auto object-cover" alt="gate" />
        </span>
        <span>{td}</span>
      </td>
    )}
  </>
);
