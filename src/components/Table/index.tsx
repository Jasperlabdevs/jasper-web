import Button from "components/Button"

type tableColumnType = {
    type?: 'normal' | 'status' | 'userType' | 'button' | 'user',
    buttonType?: 'smallPrimary' | 'smallSecondary' | 'tertiary' | 'other',
    td:string | any,
    image?:any

}

export const TableHeader = ({headers}:any) => (
  <tr className="text-grey_text border-b border-[#C3C9DA] bg-[#F9F9FB]">
      {
          headers.map((data:any, idx:number) => (
              <th key={idx} className={`px-4  text-left text-grey_text py-4 `}>{data}</th>  
          ))
      }    
  </tr>
)

export const TableColumn = ({type='normal', buttonType, td, image}:tableColumnType) => (
  <>
      { type === 'normal' && <td className="px-4 text-left">{td}</td> }
      {type === 'status' && <td
          className={`p-2 px-4 my-4 w-fit rounded-full flex justify-center 
            ${false &&"bg-faded_yellow text-yellow"}
            ${false && "bg-faded_red text-red"}
            ${true && "bg-faded_green text-green"} `}>
      {td}
      </td> }
      { type === 'userType' && <td className="text-left px-4  "> <span className="text-primary bg-faded px-4 py-2 rounded-full" >{td}</span> </td> }
      { type === 'button' && buttonType === 'smallPrimary' && <td className="px-4 "><Button smallPrimary title={td} /></td> }                              
      { type === 'button' && buttonType === 'smallSecondary' && <td className="px-4 "><Button smallSecondary title={td} /></td> }                              
      { type === 'button' && buttonType === 'other' && <td className="px-4 "><Button other title={td} /></td> }                              
      { type === 'button' && buttonType === 'tertiary' && <td className="px-4 "><Button tertiary title={td} /></td> }                              
      { type === 'user' && <td className="text-left h-full pl-4 flex my-3 -mb-3 gap-2 items-center">
          <span className="bg-faded rounded-full h-12 w-12 flex justify-center items-center">
            <img
              src={image}
              className="h-6 w-6 object-cover"
              alt="gate"
            />
          </span>
          <span>
            {td} 
          </span>
        </td>}
  </>
)
