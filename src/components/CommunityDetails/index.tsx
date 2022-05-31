import Input, { Select } from "components/Input"
import { useForm } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useEffect, useState } from "react"
import country_data from "helpers/country_data.json"
import { useLocation } from "react-router-dom"
import Button from "components/Button"

const CommunityDetails = () => {
    const { register, handleSubmit } = useForm()
    const [ phoneInput, setPhoneInput ] = useState('')
    const [ country, setCountry ] = useState('Nigeria')
    const [ stateProvince, setStateProvince ] = useState<any>([])

    const location = useLocation()

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
            {
                location.pathname === "/settings/community_account" ?
                <p className="text-grey_text mt-2" >Make Changes to your community account settings here</p>
                :
                <p className="text-grey_text mt-2" >Fill your community details</p>

            }
            <p className="invisible -mb-12 h-10" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, quam! Magnam vitae molestiae sequi beatae vero dolorum omnis ratione eveniet repudiandae, fugit commodi illum minima maiores amet, laborum culpa optio.</p>

            <form className="mt-14 "   onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    placeholder="Enter your community name" 
                    name="community_name" 
                    label="Community Name" 
                    register={register} 
                    options={{}}/>

                <label className="text-label_text" >Community Address</label>
                <div className="grid grid-cols-2 gap-x-6 " >
                    {/* <Select 
                        placeholder="Country" 
                        name="country" 
                        label="" 
                        
                        list={countryList}
                         />
                    <Select 
                        placeholder="State/Province" 
                        name="State/Province" 
                        label="" 
                        list={stateProvince}
                         /> */}
                    <Input 
                        placeholder="City" 
                        name="city" 
                        label="" 
                        register={register} 
                        options={{}}/>
                    <Input 
                        placeholder="Address" 
                        name="address" 
                        label="" 
                        register={register} 
                        options={{}}/>
                </div>

                <Input 
                    placeholder="Enter your security company's name" 
                    name="security_company" 
                    label="Security Company" 
                    register={register} 
                    options={{}}/>

                <label className="text-label_text" >Community Contact Phone Number</label>
                <PhoneInput
                        placeholder="Enter phone number"
                        value={ phoneInput }
                        onChange={()=>setPhoneInput('')} />

                {
                    location.pathname === '/settings/community_account' &&
                    <>
                        <Input 
                            placeholder="Enter your community's email address" 
                            name="community_email" 
                            label="Community Email address" 
                            register={register} 
                            options={{}} />
                        <Input 
                            placeholder="Enter your Bank name" 
                            name="bank_name" 
                            label="Bank Name" 
                            register={register} 
                            options={{}} />
                        <Input 
                            placeholder="Enter your account number" 
                            name="bank_account_number" 
                            label="Bank Account Number" 
                            register={register} 
                            options={{}} />

                    <hr className="relative -left-10 w-screen mt-16 " />

                    <div className="flex gap-4 lg:max-w-lg mb-20 ">
                        <div className="lg:max-w-lg w-full" >
                            <Button title="Save Changes" type="button" />
                        </div>
                        
                         <Button title="Discard" type="button" other />
                        
                    </div> 
                    </>
                }

                
            </form>
        </div>
    )
}

export default CommunityDetails