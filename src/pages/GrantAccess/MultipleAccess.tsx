import Button from "components/Button"
import Input, { Select, Date } from "components/Input"
import SVGs from "helpers/SVGs"
import { useState } from "react"
import { useForm } from "react-hook-form"

const MultipleAccess = () => {
    const { register, handleSubmit } = useForm()
    const [ visitors, updateVisitors ] = useState([{id:1,name:'', phone_number: ''}])
    const onSubmit = (data:any) => {}

    const addVisitor = () => {
        const new_visitor = {id: Math.floor(Math.random() * 100),name: '', phone_number:''}
        updateVisitors([...visitors,new_visitor])
    }
    const removeVisitor = (visitor_index:any) => {
        const temp = [...visitors]
        const index = temp.findIndex((el) => el.id === visitor_index)
        temp.splice(index, 1)
        updateVisitors(temp)
    }

    const gates:Array<any> =[]

    return(
        <div className="mt-10 max-w-4xl" >
             <h4>Multiple Access</h4>
            <form className="mt-10" onSubmit={handleSubmit(onSubmit)} >
                <Input 
                    name='event_name'
                    label="Event Name"
                    placeholder="Enter event name"
                    options={{}}
                    register={register}
                />
                <Input 
                    label='Requesting Department'
                    name="requesting_department"
                    placeholder="Enter requesting department"
                    options={{}}
                    register={register}
                />
                <Select 
                    name ='visitor_type'
                    register={register}
                    options={{required: true}}
                    placeholder="Select your visitor type"
                    label="Gate"
                    list={gates}
                />
                <Input 
                    name='visitor_company'
                    label="Visitor Company"
                    placeholder="Enter visitor company name"
                    options={{}}
                    register={register}
                />
                <Select 
                    name ='gate'
                    register={register}
                    options={{required: true}}
                    placeholder="Select the Gate(s) you want to give access to"
                    label="Gate"
                    list={gates}
                />
                <Input 
                    name='reason'
                    label="Reason for visit"
                    placeholder="Write a description"
                    options={{}}
                    register={register}
                />
                <Date 
                    name="valid_from"
                    label="Valid From"
                    placeholder="dd/mm/yy"
                    register={register}
                    options={{}}
                />
                <Date 
                    name="valid_to"
                    label="Valid To"
                    placeholder="dd/mm/yy"
                    register={register}
                    options={{}}
                />
                <p>Visitor(s) List</p>
                <div className="flex gap-6 w-full" >
                    <p className="text-label_text w-full" >Name(s)</p>
                    <p className="text-label_text w-full" >Phone Number</p>
                </div>
                {
                    visitors.map((el,idx) => (
                        <div key={el.id} className="flex gap-6 w-full" >
                            <div className="w-full">
                                <Input 
                                    name='visitor_name'
                                    label=""
                                    placeholder="Enter visitor name"
                                    options={{}}
                                    register={register}
                                />
                            </div>
                            <div className="w-full">
                                <Input 
                                    name='reason'
                                    label=""
                                    placeholder="Enter Visitor phone number"
                                    options={{}}
                                    register={register}
                                />
                            </div>
                            <div className="mt-6 cursor-pointer" onClick={()=>removeVisitor(el.id)} >
                                {SVGs.close_red}

                            </div>
                        </div>
                    ))
                }
                
                 <p onClick={addVisitor} className="mb-8 text-peach flex items-center gap-4 cursor-pointer" ><span> {SVGs.add_red}</span>  Add additional row</p>
                
            </form>
            <hr className="relative -left-10 w-screen mt-16 " />
            <div className="flex gap-4 lg:max-w-3xl mb-20 ">
                    <div className="lg:max-w-lg w-full" >
                        <Button title="Test Code" type="button" />
                    </div>
                    
                        <Button title="Generate Code" type="button" other />
                        <Button title="Cancel" type="button" secondary />
                    
                </div> 
        </div>
    )
}


export default MultipleAccess