import Button from "components/Button"
import Input, { Checkbox, Select } from "components/Input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { communityTypeList } from "helpers/data"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


const Register = () => {

    const tabs = ["first", "second"]
    const { register, handleSubmit } = useForm()
    const [ loading, setLoading ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(tabs[0])
    const [ communityType, setCommunityType] = useState('')
    const [ phoneInput, setPhoneInput ] = useState('')


    const phoneOnChange = (event:any) => {
        setPhoneInput(event?.target?.value)
    }
    const onSubmit = (data:any) => {
        setLoading(true)
        data.community_type = communityType
        data.phone = phoneInput
        console.log(data)
    }
    
    return(
        <div className="register text-center mt-20">
        <h3>Welcome to Jasper</h3>
        <p className="text-grey_text my-4" >Kindly fill in the following information <br /> to get started</p>
        <hr className="w-2/3 mx-auto my-12" />

        <form className="text-left mt-10 max-w-[450px] mx-auto relative" onSubmit={handleSubmit(onSubmit)}>
            {
                currentPage === "first" ? 
                <>
                    <Input 
                        placeholder="Enter your first name" 
                        name="first_name" 
                        label="First Name" 
                        register={register} 
                        required />
                    <Input 
                        placeholder="Enter your last name" 
                        name="last_name" 
                        label="Last Name" 
                        register={register} 
                        required />

                    <label className="text-label_text" >Your Phone Number</label>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={ phoneInput }
                        onChange={(event)=>phoneOnChange(event)} />

                    <Input 
                        placeholder="Enter your community email" 
                        name="community_email" 
                        label="Community Email" 
                        register={register} 
                        required />
                    <Select 
                        {...register("community_type")}
                        placeholder="Select your Community"
                        label="Community Type"
                        list={communityTypeList}
                    />
                    <Checkbox 
                        name="agreement"
                        register={register}
                        label="I agree to the <a href='/' className='text-primary' >terms of service</a> and <a className='text-primary' href='/' >privacy policy</a> "
                        required
                    />
        
                    <Button onClick={()=>setCurrentPage(tabs[1])} title="Continue" type="button" />
                
                </> : 
                <>
                     <Input 
                        name="password" 
                        placeholder="Enter your password" 
                        type="password" 
                        label="Create Password" 
                        register={register} 
                        required />

                     <Input 
                        name="confirm_password" 
                        placeholder="Confirm your password" 
                        type="password" 
                        label="Confirm Password" 
                        register={register} 
                        required />

                    <Button  title="Create Account"  loading={loading} />
                </>
            }


        </form>
    </div>
    )
}

export default Register