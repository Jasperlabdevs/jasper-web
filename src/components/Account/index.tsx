import Button from "components/Button"
import Input from "components/Input"
import { useForm } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from "react"
import Modal from "components/Modal"
import { useNavigate } from "react-router-dom"

const Account =() =>{

    const { register, handleSubmit } = useForm()
    const [ phoneInput, setPhoneInput ] = useState('+234')
    const [ modal, toggleModal ] = useState(false)

    const navigate = useNavigate()

    return(
        <div className="mt-14 max-w-4xl">
            
            <Modal show={modal} toggleClose={()=>toggleModal(false)} >
                <div className="p-8" >
                    <p className="text-black mb-10" >Update Password</p>
                    <form>
                    <Input 
                        placeholder="Enter your old password" 
                        name="old_passowrd" 
                        label="Old Password" 
                        register={register} 
                        options={{}} />
                    <Input 
                        placeholder="Enter your New Password" 
                        name="new_password" 
                        label="New password" 
                        register={register} 
                        options={{}} />
                    <Input 
                        placeholder="Repeat your new password" 
                        name="repeat_new_password" 
                        label="Repeat new Password" 
                        register={register} 
                        options={{}} />
                    <div className="w-fit float-right mb-8" >
                        <Button  title="Save Password" />
                    </div>
                </form>
                </div>
            </Modal>
            
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
                            options={{}} />

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
                        <Button title="Update Password" type="button" onClick={()=>toggleModal(true)} other  />

                    </div>
                </div>
                <div className="flex justify-between items-center mt-10" >
                    <div className="grow" >
                        <p className="text-black" >Log Out</p>
                        <p className="text-xs" >You will be logged out of your account</p>
                    </div>

                    <div className="grow max-w-xs -mt-10">
                        <Button title="Log Out" type="button" onClick={()=> navigate('/login')} other  />

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