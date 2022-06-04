import { Link, Outlet, useLocation } from "react-router-dom";
import BG from "assets/images/gate_bg.svg";

const GateAuth = () => {
  const location = useLocation();

  return (
    <div className="grid relative w-screen h-full">
      <div className="bg-faded fixed w-1/2 hidden lg:block min-h-screen float-left">
        <img src={BG} alt="bg" className="h-screen w-full object-cover" />
      </div>
      <div className="p-6 move-left md:p-10 md:px-16 h-full overflow-y-auto ">
        <header className="flex w-full justify-center items-center">
          <h4 className="logo text-xl">Jasper</h4>
        </header>
        <div className="max-w-[370px] md:w-[400px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GateAuth;
