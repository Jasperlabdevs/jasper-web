import { Link, useLocation } from "react-router-dom";

type headerDataType = {
  id: number;
  link: string;
  title: string;
};

const SubHeader = ({ headerData, head }: any) => {
  const location = useLocation();

  const link = head.replace(" ", "_").toLowerCase();

  return (
    <div className="hidden lg:block">
      <div className="flex px-10 items-center border-b border-[#F3F4F4] ">
        <h4 className="mr-36">{head}</h4>
        <nav>
          <ul className="flex gap-6 ">
            {headerData.map((data: headerDataType) => (
              <Link
                to={`/${link}/` + data.link}
                key={data.id}
                className={`py-4 cursor-pointer hover:text-black text-grey_text ${
                  location.pathname.includes(`/${link}/` + data.link) &&
                  "border-b text-black border-primary"
                }`}
              >
                {data.title}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SubHeader;
