import Button from "components/Button";
import { TableContent } from "helpers/data";
import img from "assets/images/gate.png";
import SearchFilter from "components/SearchFilter";
import Filter from "components/Filters";
import { TableColumn, TableHeader } from "components/Table";

const Members = () => {
  const headers = [
    "User name",
    "User Type",
    "Validity end date",
    "Phone Number",
    "Reg. Date",
    "Status",
    "More",
  ];

  return (
    <div>
      <div className="mt-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4>
            Members{" "}
            <span className="text-white bg-primary rounded-full px-3 text-xs">
              30
            </span>{" "}
          </h4>
          <div className="flex gap-4 ">
            <div>
              <SearchFilter />
            </div>
            <div className="max-w-3xl -mt-10">
              <Button title="Show user PIN" other />
            </div>
          </div>
        </div>
      </div>
      <Filter />
      <div className=" py-5">
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA] align-vertical">
                <TableColumn
                  td={
                    <span>
                      Entry <br />
                      <span className="text-grey_text text-xs">Block 10</span>
                    </span>
                  }
                  type="user"
                  image={img}
                />

                <TableColumn td="Landlord" type="userType" />
                <TableColumn td="2nd March, 2022" />
                <TableColumn td="02454342534" />
                <TableColumn td="2nd March, 2022" />
                <TableColumn td="enable" type="status" />
                <TableColumn
                  td="Manage Access"
                  type="button"
                  buttonType="tertiary"
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
