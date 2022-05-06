import Button from "components/Button"
import Input from "components/Input"
import { useState } from "react"
import { useForm } from "react-hook-form"

const Register = () => {

    const tabs = ["first", "second"]
    const { register, handleSubmit } = useForm()
    const [ loading, setLoading ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(tabs[0])


    const onSubmit = (data:any) => {
        setLoading(true)
        console.log(data)
    }
    
    return(
        <div className="register text-center mt-24">
        <h3>Welcome to Jasper</h3>
        <p className="text-grey_text my-4" >Kindly fill in the following information to get started</p>
        <hr className="w-1/2 mx-auto my-6" />

        <form className="text-left" onSubmit={handleSubmit(onSubmit)}>
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
                    <Input 
                        placeholder="Enter your community email" 
                        name="community_email" 
                        label="Community Email" 
                        register={register} 
                        required />
        
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