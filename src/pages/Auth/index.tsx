import { Link, Outlet, useLocation } from "react-router-dom";

const Auth = () => {

    const location = useLocation()

    return(
        <div className="grid lg:grid-cols-2 min-h-screen">
            <div className="bg-faded hidden lg:block" >
            </div>
            <div className="p-6 w-screen lg:w-auto md:p-10 md:px-16" >
                <header className="flex justify-between items-center" >
                    <h4 className="logo" >Jasper</h4>
                    { location.pathname !== '/login' ?
                    <p className="text-grey_text" >Already have an account? <span><Link to='/login' >Sign In</Link></span> </p>
                    : <p className="text-grey_text" >New here? <span><Link to='/register' >Register</Link></span> </p>
                    
                    }
                </header>
                <div>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Auth