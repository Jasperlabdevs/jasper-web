import Button from "components/Button"
import Input, { Select } from "components/Input"
import { useForm } from "react-hook-form"

const EventAccess = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data:any) => {}

    const gates:Array<any> =[]

    return(
        <div className="mt-10 max-w-4xl" >
             <h4>Event Access</h4>
            <form className="mt-10" onSubmit={handleSubmit(onSubmit)} >
                <Input 
                    name='event_name'
                    label="Event Name"
                    placeholder="Enter event name"
                    options={{}}
                    register={register}
                />
                <Input 
                    name='location'
                    label="Location"
                    placeholder="Enter location you are granting access to"
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
                    name='number_or_visitors'
                    label="Number of Visitors"
                    placeholder="Enter of visitors you are granting access"
                    type='number'
                    options={{}}
                    register={register}
                />
                
                <Input 
                    name='event_date'
                    label="Event date"
                    placeholder=""
                    type='date'
                    options={{}}
                    register={register}
                />

                
                 
            </form>
            <hr className="relative -left-10 w-screen mt-16 " />
            <div className="flex gap-4 lg:max-w-lg mb-20 ">
                    <div className="lg:max-w-lg w-full" >
                        <Button title="Generate Code" type="button" />
                    </div>
                    
                        <Button title="Cancel" type="button" secondary />
                    
                </div> 
        </div>
    )
}


export default EventAccess