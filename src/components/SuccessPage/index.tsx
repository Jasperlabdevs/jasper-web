import Button from "components/Button"
import { useNavigate } from "react-router-dom"
import success from 'assets/images/success.png'

type SuccessPageProps = {
    message:String
}


const SuccessPage = ({message}:SuccessPageProps) => {

    const navigate = useNavigate()

    return(
        <div className="fixed bg-[#fff] z-10 w-screen h-screen flex justify-center items-center" >
            <div>
                <div className="w-80 h-fit mx-auto" >
                    <img src={success} alt="sucess" />

                </div>
                <p className="text-center mt-16" >{message}</p>
                <Button title="Go to Dashboard" onClick={()=> navigate('/dashboard')} />
            </div>
        </div> 
    )
}

export default SuccessPage