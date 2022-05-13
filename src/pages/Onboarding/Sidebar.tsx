import SVGs from "helpers/SVGs"
import { useState } from "react"
import { steps } from "./Steps"

const Sidebar = () => {

    const [ activeStep,  ] = useState(1)

    return(
        <aside className="border-r min-h-screen py-10 px-14" >
            <h4 className="text-primary font-sans-display" >Jasper</h4>
            <div className="flex flex-col mt-20 gap-10 items-start relative">
                {
                    steps.map((data:any) => (
                        <div key={data.id} className={`${data.id === 1 && ''} text-left flex gap-5 items-center`}  >
                            <p className={`${data.id === activeStep && 'bg-faded border-primary text-primary'} ${data.id < activeStep && '!bg-primary border-primary text-primary'} border-2 rounded-full h-12 w-12 flex justify-center items-center text-grey_text`} >{ data.id < activeStep ? SVGs.white_check :data.id}</p>
                            <p className={`${data.id === activeStep && 'text-black font-medium'} text-center text-grey_text`} >{data.title}</p>
                        </div>

                    )) 
                }
            </div>
        </aside>
    )
}

export default Sidebar