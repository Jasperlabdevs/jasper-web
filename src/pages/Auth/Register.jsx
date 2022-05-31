/* eslint-disable no-useless-escape */
import Button from "components/Button"
import Input, { Checkbox, Select } from "components/Input"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useSelector } from "react-redux"


const Register = () => {


    const communityTypes = useSelector(state => state.communityTypes)

    const tabs = ["first", "second"]
    const { register, watch, handleSubmit, formState: {errors} } = useForm()
    const [ loading, setLoading ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(tabs[0])
    const [ communityType, setCommunityType ] = useState(communityTypes)
    const [ phoneInput, setPhoneInput ] = useState('')

    const [ err, setErr] = useState('')

    const watchFields = watch(['first_name', 'last_name', 'community_email', 'agreement', 'community_type'])

    const onSubmit = (data) => {
        setLoading(true)

        data.phone = phoneInput
        console.log(data)
    }

    useEffect(()=>{
        console.log(watchFields)
    },[watchFields])

    useEffect(()=> {
        setCommunityType(communityTypes)
    },[communityTypes])

    const next = ()=>{
        setErr('')
        let res = true
        watchFields.map((el) => {
            if(el === undefined || el.length < 1 || el === false){
               res = false
            }

        })

        return (!!res && setCurrentPage(tabs[1]))
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
                    <p className="text-red text-xs mb-4" >{err}</p>
                    <Input 
                        placeholder="Enter your first name" 
                        name="first_name" 
                        label="First Name" 
                        register={register} 
                        error={errors.first_name && 'Please Enter your first name'}
                        options={{required : true}} />
                    <Input 
                        placeholder="Enter your last name" 
                        name="last_name" 
                        label="Last Name" 
                        register={register} 
                        error={errors.last_name && 'Please enter your last name'}
                        options={{required : true}} />

                    <label className="text-label_text" >Your Phone Number</label>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={ phoneInput }
                        defaultCountry="NG"
                        onChange={setPhoneInput} />

                    <Input 
                        placeholder="Enter your community email" 
                        name="community_email" 
                        label="Community Email" 
                        register={register} 
                        error={errors.community_email && "Please enter a correct email address"}
                        options={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g } } />
                    <Select 
                        name ='community_type'
                        register={register}
                        options={{required: true}}
                        placeholder="Select your Community"
                        label="Community Type"
                        list={communityType}
                    />
                    <Checkbox 
                        name="agreement"
                        register={register}
                        label="I agree to the <a href='/' className='text-primary' >terms of service</a> and <a className='text-primary' href='/' >privacy policy</a> "
                        options={{required: true}}
                    />
        
                    <Button onClick={next} title="Continue" type="button" />
                
                </> : 
                <>
                     <Input 
                        name="password" 
                        placeholder="Enter your password" 
                        type="password" 
                        label="Create Password" 
                        register={register} 
                        options={{required : true, minLength: 6 }}
                        error={errors.password && "Password must be at least 6 characters"}
                         />

                     <Input 
                        name="confirm_password" 
                        placeholder="Confirm your password" 
                        type="password" 
                        label="Confirm Password" 
                        register={register}
                        options={{required : true, minLength: 6 }}
                        error={errors.confirm_password && "Password must be at least 6 characters"}/>

                    <Button  title="Create Account"  loading={loading} />
                </>
            }


        </form>
    </div>
    )
}

export default Register