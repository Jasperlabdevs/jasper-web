import Sidebar from "components/Sidebar";
import { SideBarContext } from "helpers/context";
import { headerData } from "helpers/data";
import SVGs from "helpers/SVGs";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { sideBar, setSidebar } = useContext(SideBarContext);

  const toggleSideBar = () => {
    if (sideBar) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  return (
    <>
      <div className="py-3 px-10 flex items-center justify-between border-b border-[#F3F4F4]">
        <div className="flex items-center gap-4">
          <span
            onClick={toggleSideBar}
            className="lg:hidden inline-flex cursor-pointer "
          >
            {SVGs.hamburger}
          </span>
          <h5 className="font-sans-display text-primary">Jasper</h5>
          <nav className="ml-24">
            <ul className="lg:flex hidden gap-6">
              {headerData.map((data: any) => (
                <div key={data.id} className="relative">
                  <Link
                    to={data.link}
                    key={data.id}
                    className={`cursor-pointer hover:text-black text-grey_text 
                                          ${
                                            location.pathname.includes(
                                              data.link
                                            ) && "text-black border-primary"
                                          }`}
                  >
                    {data.title}
                  </Link>
                  {location.pathname.includes(data.link) && (
                    <span className="bg-primary -bottom-2 left-1/2 absolute w-1.5 h-1.5 rounded-full"></span>
                  )}
                </div>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs bg-faded text-primary rounded-lg px-4 py-3 ">
            88 Message Credits
          </p>
          {SVGs.bell}
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Header;
