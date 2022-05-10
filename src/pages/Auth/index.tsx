import { Link, Outlet, useLocation } from "react-router-dom";

const Auth = () => {

    const location = useLocation()

    return(
        <div className="grid lg:grid-cols-2 min-h-screen">
            <div className="bg-faded hidden lg:block" >
            </div>
            <div className="p-6 w-screen lg:w-auto md:p-10 md:px-16" >
                <header className="flex justify-center md:justify-between items-center" >
                    <h4 className="logo text-xl" >Jasper</h4>
                    { location.pathname !== '/login' ?
                    <p className="text-grey_text md:block hidden" >Already have an account? <span><Link to='/login' >Sign In</Link></span> </p>
                    : <p className="text-grey_text  md:block hidden" >New here? <span><Link to='/register' >Register</Link></span> </p>
                    
                    }
                </header>
                <div>
                    <Outlet />
                    { location.pathname !== '/login' ?
                    <p className="text-grey_text md:hidden mt-10 text-center" >Already have an account? <span><Link to='/login' >Sign In</Link></span> </p>
                    : <p className="text-grey_text  md:hidden mt-10 text-center" >New here? <span><Link to='/register' >Register</Link></span> </p>
                    }
                </div>

            </div>
        </div>
    )
}

export default Auth