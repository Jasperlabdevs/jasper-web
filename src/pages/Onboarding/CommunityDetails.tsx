import Input, { Select } from "components/Input"
import { useForm } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from "react"

const CommunityDetails = () => {
    const { register, handleSubmit } = useForm()
    const [ phoneInput, setPhoneInput ] = useState('')
    
    const onSubmit = (data:any) =>{
        console.log(data)
    }
    const countryList:Array<any> = []
    const stateProvince:Array<any> = []

    return(
        <div className="mt-10" >
            <h4>Community Account</h4>
            <p className="text-grey_text" >Fill your community details</p>

            <form className="mt-14 "   onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    placeholder="Enter your community name" 
                    name="community_name" 
                    label="Community Name" 
                    register={register} 
                    required />

                <label className="text-label_text" >Your Phone Number</label>
                <div className="grid grid-cols-2 gap-x-6 " >
                    <Select 
                        placeholder="Enter your community name" 
                        name="community_name" 
                        label="" 
                        list={countryList}
                         />
                    <Select 
                        placeholder="Enter your community name" 
                        name="community_name" 
                        label="" 
                        list={stateProvince}
                         />
                    <Input 
                        placeholder="City" 
                        name="city" 
                        label="" 
                        register={register} 
                        required />
                    <Input 
                        placeholder="Address" 
                        name="address" 
                        label="" 
                        register={register} 
                        required />
                </div>

                <label className="text-label_text" >Community Contact Phone Number</label>
                <PhoneInput
                        placeholder="Enter phone number"
                        value={ phoneInput }
                        onChange={()=>setPhoneInput('')} />

                <Input 
                    placeholder="Enter your security company's name" 
                    name="security_company" 
                    label="Security Company" 
                    register={register} 
                    required />
            </form>
        </div>
    )
}

export default CommunityDetails