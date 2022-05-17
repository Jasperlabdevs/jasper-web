import SVGs from "helpers/SVGs"

const Modal = ({children, show=true, toggleClose}:any) =>{


    return(
        <div className={`absolute w-screen h-screen bg-transparent flex items-center justify-center z-10 ${show ? 'block' : 'hidden'} `} >
            <div className="min-w-[500px] min-h-[500px] bg-white rounded-xl relative overflow-hidden"  >
                <div className=" absolute right-4 top-4 cursor-pointer" onClick={toggleClose} >
                    {SVGs.close}
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal