import { Link, Outlet, useLocation } from "react-router-dom";
import BG from 'assets/images/bg-image.png'
const Auth = () => {

    const location = useLocation()
    

    return(
        <div className="grid lg:grid-cols-2 h-full">
            <div className="bg-faded hidden lg:block min-h-screen float-left" >
                <img src={BG} alt="bg" className="h-full w-full object-cover" />
            </div>
            <div className="p-6 w-screen lg:w-auto md:p-10 md:px-16 h-full overflow-y-auto " >
                <header className="flex justify-center md:justify-between items-center" >
                    <h4 className="logo text-xl" >Jasper</h4>
                    { location.pathname !== '/login' ?
                    <p className="text-grey_text md:block hidden" >Already have an account? <span className=" font-bold" ><Link to='/login' >Sign In</Link></span> </p>
                    : <p className="text-grey_text md:block hidden" >New here? <span className=" font-bold" ><Link to='/register' >Create an account</Link></span> </p>
                    
                    }
                </header>
                <div >
                    <Outlet />
                    { location.pathname !== '/login' ?
                    <p className="text-grey_text md:hidden text-center mt-10" >Already have an account? <span className=" font-bold" ><Link to='/login' >Sign In</Link></span> </p>
                    : <p className="text-grey_text md:hidden text-center mt-10" >New here? <span className=" font-bold" ><Link to='/register' >Create an account</Link></span> </p>
                    }
                </div>

            </div>
        </div>
    )
}

export default Auth