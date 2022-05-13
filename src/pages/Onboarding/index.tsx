import Button from "components/Button"
import SVGs from "helpers/SVGs"
import { useEffect, useState } from "react"
import CommunityDetails from "./CommunityDetails"
import UserOnboarding from "./UserOnboarding"
import { steps, goForward, goBack } from "./Steps"
import AccessConfig from "components/AccesConfig"
const Onboarding = () => {

    const [ activeStep, setActiveStep ] = useState(1)
    const [ progressWidth, setProgressWidth ] = useState("w-1/3")
    const [ progress, setProgress ] = useState("33")

    useEffect(()=>{
        if(activeStep === 2){
            setProgress("66")
            setProgressWidth("w-2/3")
        }else if( activeStep ===3){
            setProgress("80")
            setProgressWidth("w-4/5")
        }else{
            setProgress("33")
            setProgressWidth("w-1/3")

        }
    },[activeStep])

    return(
        <div className="p-4 lg:p-0 relative" >
            <div className="flex justify-between relative  mt-5 lg:hidden">
                {
                    steps.map((data:any) => (
                        <div key={data.id} className={`${data.id === 1 && ''} text-center`}  >
                            <p className={`${data.id === activeStep && 'bg-faded border-primary text-primary'} ${data.id < activeStep && '!bg-primary border-primary text-primary'} border-2 rounded-full h-12 w-12 flex justify-center items-center mx-auto text-grey_text`} >{ data.id < activeStep ? SVGs.white_check :data.id}</p>
                            <p className={`${data.id === activeStep && '!text-black font-medium'} text-center mt-4 text-grey_text`} >{data.title}</p>
                        </div>

                    )) 
                }
            </div>
            <div className="flex w-auto"  >
                <div className="min-w-[350px] hidden lg:block fixed">
                    <aside className="border-r min-h-screen py-10 px-14" >
                        <h4 className="text-primary font-sans-display" >Jasper</h4>
                        <div className="flex flex-col mt-20 gap-10 items-start relative">
                            {
                                steps.map((data:any) => (
                                    <div key={data.id} className={`${data.id === 1 && ''} text-left flex gap-5 items-center`}  >
                                        <p className={`${data.id === activeStep && 'bg-faded border-primary text-primary'} ${data.id < activeStep && '!bg-primary border-primary text-primary'} border-2 rounded-full h-12 w-12 flex justify-center items-center text-grey_text`} >{ data.id < activeStep ? SVGs.white_check :data.id}</p>
                                        <p className={`${data.id === activeStep && '!text-black font-medium'} text-center text-grey_text`} >{data.title}</p>
                                    </div>

                                )) 
                            }
                        </div>
                        <div className="mt-80" >
                            <p className="text-sm mb-3 text-black font-medium" >{progress}% progress</p>
                            <div className="w-full bg-[#E3E6ED] h-2 rounded-xl overflow-hidden" >
                                <div className={`bg-primary ${progressWidth}   transition-width duration-300 delay-50 ease-in-out rounded-xl h-2 `} >e</div>
                            </div>
                        </div>
                    </aside>
                </div>
                <div  className="lg:mx-20 min-w-5xl lg:pl-[350px]">
                    {activeStep ===1 && <CommunityDetails />}
                    {activeStep ===2 && <UserOnboarding />}
                    {activeStep ===3 && <AccessConfig />}
            
                    <div className="flex gap-4 max-w-lg lg:mt-20 mb-20">
                        <div className="max-w-[200px] w-full" >
                        <Button onClick={()=>goForward(activeStep, setActiveStep)} title="Continue" type="button" />

                        </div>
                        {
                            activeStep > 1 && <Button onClick={()=>goBack(activeStep, setActiveStep)} title="Back to previous page" type="button" secondary />
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Onboarding