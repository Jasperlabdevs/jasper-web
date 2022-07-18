import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import BG from "assets/images/bg-image.png";
import { useDispatch } from "react-redux";
import { get_community_types } from "store/actions/communityTypes";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { getToken } from "helpers/utils";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const token  = getToken()

  useEffect(()=> {
    if(token.length > 0){
       navigate('/dashboard')
    }
  },[token,navigate])


  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(get_community_types());
  }, []);

  return (
    <div className="grid relative w-screen h-full">
      <Helmet>
        <title>Jasper</title>
        <meta name="description" content="Jasper" />
      </Helmet>

      <div className="bg-faded fixed w-1/2 hidden lg:block min-h-screen float-left">
        <img src={BG} alt="bg" className="h-screen w-full object-cover" />
      </div>
      <div className="p-6 move-left md:p-10 md:px-16 h-full overflow-y-auto ">
        <header className="flex justify-center md:justify-between items-center">
          <h4 className="logo text-xl">Jasper</h4>

          {location.pathname !== "/login" ? (
            <p className="text-grey_text md:block hidden">
              Already have an account?{" "}
              <span className=" font-bold">
                <Link to="/login">Sign In</Link>
              </span>{" "}
            </p>
          ) : (
            <p className="text-grey_text md:block hidden">
              New here?{" "}
              <span className=" font-bold">
                <Link to="/register">Create an account</Link>
              </span>{" "}
            </p>
          )}
        </header>
        <div className="max-w-[370px] md:w-[400px] mx-auto">
          <Outlet />
          {location.pathname !== "/login" ? (
            <p className="text-grey_text md:hidden text-center mt-10">
              Already have an account?{" "}
              <span className=" font-bold">
                <Link to="/login">Sign In</Link>
              </span>{" "}
            </p>
          ) : (
            <p className="text-grey_text md:hidden text-center mt-10">
              New here?{" "}
              <span className=" font-bold">
                <Link to="/register">Create an account</Link>
              </span>{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
