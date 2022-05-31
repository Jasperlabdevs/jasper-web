import Button from "components/Button"
import Input from "components/Input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {

    const { register, handleSubmit } = useForm()
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (data:any) => {
        setLoading(true)
        console.log(data)
        
        navigate('../reset_password')
    }

    return(
        <div className="login text-center mt-24 lg:mt-20">
            <h3>Forgot password</h3>
            <p className="text-grey_text my-4" >Enter the email address associated with you account.</p>
            <hr className="w-2/3 mx-auto my-12" />

            <form className="text-left mt-14 max-w-[450px] mx-auto relative" onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    placeholder="Enter your email" 
                    name="email" 
                    label="Email" 
                    register={register} 
                    options={{}} />

                <Button title="Continue" loading={loading} />
            </form>
        </div>
    )
}

export default ForgotPassword