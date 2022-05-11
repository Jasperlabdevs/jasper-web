import Button from "components/Button"
import SVGs from "helpers/SVGs"
import { useState } from "react"
import CommunityDetails from "./CommunityDetails"
import UserOnboarding from "./UserOnboarding"

const Onboarding = () => {

    const [ activeStep, setActiveStep ] = useState(1)

    const steps = [
        {
            id: 1,
            title: 'Comm. Details'
        },
        {
            id: 2,
            title: 'User Onboarding'
        },
        {
            id: 3,
            title: 'Access Rules'
        }
    ]

    const goForward = () => {
        if (activeStep < 3) setActiveStep(activeStep + 1)
    }
    const goBack = () => {
        if (activeStep > 1) setActiveStep(activeStep - 1)
    }


    return(
        <div className="p-4 " >
            <div className="flex justify-between relative  mt-5">
                {
                    steps.map((data:any) => (
                        <div key={data.id} className={`${data.id === 1 && ''} text-center`}  >
                            <p className={`${data.id === activeStep && 'bg-faded border-primary text-primary'} ${data.id < activeStep && '!bg-primary border-primary text-primary'} border-2 rounded-full h-12 w-12 flex justify-center items-center mx-auto text-grey_text`} >{ data.id < activeStep ? SVGs.white_check :data.id}</p>
                            <p className={`${data.id === activeStep && 'text-black font-medium'} text-center mt-4 text-grey_text`} >{data.title}</p>
                        </div>

                    )) 
                }
            </div>
            <div>
               {activeStep ===1 && <CommunityDetails />}
               {activeStep ===2 && <UserOnboarding />}
               {activeStep ===3 && <CommunityDetails />}
            </div>
            <div className="flex gap-4">
                <Button onClick={goForward} title="Continue" type="button" />
                {
                    activeStep > 1 && <Button onClick={goBack} title="Back to previous page" type="button" secondary />
                }
                
            </div>
        </div>
    )
}

export default Onboarding