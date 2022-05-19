import Input, { Select } from "components/Input"
import { useForm } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useEffect, useState } from "react"
import country_data from "helpers/country_data.json"

const CommunityDetails = () => {
    const { register, handleSubmit } = useForm()
    const [ phoneInput, setPhoneInput ] = useState('')
    const [ country, setCountry ] = useState('Nigeria')
    const [ stateProvince, setStateProvince ] = useState<any>([])

    
    const onSubmit = (data:any) =>{
        console.log(data)
    }
    const countryList:Array<any> = country_data.map(data => data.countryName)

    useEffect(() => {
        const regions = country_data[(country_data.findIndex(data => data.countryName === country))].regions
        setStateProvince(regions.map(data => data?.name))
    },[country])

    return(
        <div className="mt-14 max-w-4xl" >
            <h4>Community Account</h4>
            <p className="text-grey_text mt-2" >Fill your community details</p>
            <p className="invisible -mb-12 h-10" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, quam! Magnam vitae molestiae sequi beatae vero dolorum omnis ratione eveniet repudiandae, fugit commodi illum minima maiores amet, laborum culpa optio.</p>

            <form className="mt-14 "   onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    placeholder="Enter your community name" 
                    name="community_name" 
                    label="Community Name" 
                    register={register} 
                    required />

                <label className="text-label_text" >Community Address</label>
                <div className="grid grid-cols-2 gap-x-6 " >
                    <Select 
                        placeholder="Country" 
                        name="country" 
                        label="" 
                        onChange={(event:any)=>setCountry(event.target.value)}
                        list={countryList}
                         />
                    <Select 
                        placeholder="State/Province" 
                        name="State/Province" 
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