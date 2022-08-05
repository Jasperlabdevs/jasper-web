import SVGs from "helpers/SVGs"
import { useEffect, useState } from "react"


const Toaster = ({ type, title, message, autoDeleteTime=5000 }:NotificationType) => {

    const [ active, setActive ] = useState(true)

    useEffect(()=> {
        let autoDelete = setTimeout(()=>{
            setActive(false)
        }, autoDeleteTime)

        return () => clearTimeout(autoDelete)
    }, [active, autoDeleteTime])

    
    return(
        <div>
            {((active === true) && (type !== undefined)) &&
            <div className={`absolute top-8 right-12 toaster-animation flex gap-3 border-l-4 text-dark_grey_text rounded-md p-6 max-w-[400px]
                ${type === 'error' && 'border-red bg-faded_red'} 
                ${type === 'info' && 'border-primary bg-faded_primary'} 
                ${type === 'success' && 'border-green bg-faded_green'}`} >

                    <div className="mt-2" >
                        {type === 'error' && SVGs.error } 
                        {type === 'info' && SVGs.info} 
                        {type === 'success' && SVGs.success}
                    </div>
                    <div>
                        <h5 className='text-inherit font-extrabold'>{title}</h5>
                        <p className="text-inherit" >{message}</p>
                    </div>
            </div>}
        </div>
    )}

export default Toaster