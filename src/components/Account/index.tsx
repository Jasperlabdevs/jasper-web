import Button from "components/Button"
import Input from "components/Input"
import { useForm } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from "react"

const Account =() =>{

    const { register, handleSubmit } = useForm()
    const [ phoneInput, setPhoneInput ] = useState('+234')
    return(
        <div className="mt-14 max-w-4xl">
            <h4>Community Account</h4>
            <p >Make changes to your account settings here</p>

            <div>
                <p className="text-black mt-8 py-4" >Photo</p>
                <div className="flex justify-between items-center" >
                    <div className="rounded-full bg-icon_background h-20 w-20" >
                    </div>

                    <div className="grow max-w-[200px] md:max-w-xs w-md -mt-10">
                        <Button title="Upload Image" other  />

                    </div>
                </div>

                <div className="my-10" >
                    <p className="text-black mb-8">Personal Information</p>

                    <form>
                        <Input 
                            placeholder="Enter your full name" 
                            name="full_name" 
                            label="Admin Name" 
                            register={register} 
                            required />

                        <label className="text-label_text" >Your Phone Number</label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={ phoneInput }
                            onChange={(event)=>setPhoneInput('')} />
                    </form>
                </div>

                <div className="flex justify-between items-center" >
                    <div className="grow" >
                        <p className="text-black" >Password</p>
                        <p className="text-xs" >Update your password here</p>
                    </div>

                    <div className="grow max-w-xs -mt-10">
                        <Button title="Update Password" other  />

                    </div>
                </div>
                <div className="flex justify-between items-center mt-10" >
                    <div className="grow" >
                        <p className="text-black" >Log Out</p>
                        <p className="text-xs" >You will be logged out of your account</p>
                    </div>

                    <div className="grow max-w-xs -mt-10">
                        <Button title="Log Out" other  />

                    </div>
                </div>


                    <hr className="relative -left-10 w-screen mt-16 " />
                <div className="flex gap-4 lg:max-w-lg mb-20 ">
                        <div className="lg:max-w-lg w-full" >
                            <Button title="Save Changes" type="button" />
                        </div>
                        
                         <Button title="Discard" type="button" other />
                        
                    </div> 
            </div>

        </div>
    )
}

export default Account