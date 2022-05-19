import SVGs from "helpers/SVGs"

const Modal = ({children, show=true, toggleClose}:any) =>{


    return(
        <div className={`fixed w-screen left-0 top-0 h-screen bg-transparent flex items-center justify-center z-[1000] ${show ? 'block' : 'hidden'} `} >
            <div className="min-w-[400px] w-[500px] m-10 min-h-[500px] bg-[#ffffff] rounded-xl relative overflow-hidden"  >
                <div className=" absolute right-8 top-8 cursor-pointer" onClick={toggleClose} >
                    {SVGs.close}
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal