import { SideBarContext } from "helpers/context";
import { headerData } from "helpers/data";
import SVGs from "helpers/SVGs";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sideBar, setSidebar } = useContext(SideBarContext);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveTab(id);

  };

  const goTo = (link: string) => {
    navigate(link);
    setSidebar(false);
  };

  return (
    <div
      className={`bg-[#ffffff] z-10  absolute  h-screen  py-8 ${
        !!sideBar ? "w-screen left-0" : "w-0 -left-80"
      } `}
    >
      <ul>
        {headerData.map((data: any, index: number) => (
          <li
            key={data.id + 100}
            className="cursor-pointer px-10  my-2 border-b py-4"
            onClick={() => {
              handleClick(data.id)
              if(!data.children){
                goTo(data.link)
              }
            }}
          >
            <div className="flex justify-between">
              <span
                className={`text-xl flex items-center gap-2 ${
                  location.pathname.includes(data.link)
                    ? "text-black border-primary"
                    : "text-light_grey_text"
                }`}
              >
                {location.pathname.includes(data.link) && (
                  <div className="bg-primary w-3 h-3 rounded-full"></div>
                )}
                {data.title}
              </span>
              {!!data.children && (
                <span className="mt-3 ">
                  {data.id === activeTab ? SVGs.arrow_up : SVGs.arrow_down}
                </span>
              )}
            </div>
            {!!data.children && activeTab === data.id && (
              <ul className="ml-6">
                {data.children.map((el: any) => (
                  <li
                    className={`my-4 w-fit text-light_grey_text py-0.5 text-lg  ${
                      data.link + "/" + el.link === location.pathname &&
                      "border-b-2 border-primary"
                    } `}
                    key={el.id}
                    onClick={() => goTo(data.link + "/" + el.link)}
                  >
                    {el.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
