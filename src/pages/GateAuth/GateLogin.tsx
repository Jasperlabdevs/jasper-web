/* eslint-disable no-useless-escape */
import Button from "components/Button"
import Input, { Select } from "components/Input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const GateLogin = () => {


    const { register, handleSubmit, formState: {errors} } = useForm()
    const [ loading, setLoading ] = useState(false)

    const onSubmit = (data:any) => {
        setLoading(true)
        console.log(data)
    }

    const gates:Array<String> =[]
    
    return(
        <div className="login text-center mt-24 lg:mt-20">
            <h3>Lakewo Gatehouse Login</h3>
            <p className="text-grey_text my-4" >Kindly fill in the follwoing to get started =</p>
            <hr className="w-2/3 mx-auto my-12" />

            <form className="text-left mt-10 max-w-[450px] mx-auto relative" onSubmit={handleSubmit(onSubmit)}>
                <Select 
                        name ='gate'
                        register={register}
                        options={{required: true}}
                        placeholder="Select your Gate name"
                        label="Gate"
                        list={gates}
                    />

                <Input 
                    name="gate_pin" 
                    placeholder="Enter the gate pin" 
                    type="text" 
                    label="Gatehouse PIN" 
                    register={register} 
                    options={{required : true}}
                    error={errors.gate_pin && "Please enter the correct PIN"}
                />
                    
                <p className="-mt-6 absolute right-0 cursor-pointer text-grey_text hover:text-primary" > <Link to='/forgot_password'>Forget password?</Link> </p>


                <Button title="Sign In" loading={loading} />
            </form>
        </div>
    )
}

export default GateLogin