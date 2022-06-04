import Button from "components/Button";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import img from "assets/images/gate.png";
import SearchFilter from "components/SearchFilter";

const Members = () => {
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
      <div className=" py-10">
        <table className="w-full ">
          <thead className="">
            <tr className="text-grey_text border-b border-[#C3C9DA] bg-[#F9F9FB]">
              <th className="px-4  text-left text-grey_text py-4">User nam</th>
              <th className="text-left text-grey_text">User Type</th>
              <th className="text-left text-grey_text">Validity End Date</th>
              <th className="text-left text-grey_text">Phone Number</th>
              <th className="text-left text-grey_text">Reg. Date</th>
              <th className="text-left text-grey_text">Status</th>
              <th className="text-left text-grey_text">More</th>
            </tr>
          </thead>
          <tbody>
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA]">
                <td className="text-left h-full pl-4 flex my-3 -mb-3 gap-2 items-center">
                  <span className="bg-faded rounded-full h-12 w-12 flex justify-center items-center">
                    <img
                      src={img}
                      className="h-6 w-6 object-cover"
                      alt="gate"
                    />
                  </span>
                  <span>
                    Entry <br />
                    <span className="text-grey_text text-xs">Block 10</span>
                  </span>
                </td>
                <td className="text-left">LandLord</td>
                <td className="text-left">2nd March, 2022</td>
                <td className="text-left">082321233</td>
                <td className="text-left">2nd March, 2022</td>
                <td
                  className={`p-2 px-4 my-4 w-fit rounded-full flex justify-center 
                                            ${
                                              true &&
                                              "bg-faded_yellow text-yellow"
                                            }
                                            ${false && "bg-faded_red text-red"}
                                            ${
                                              false &&
                                              "bg-faded_green text-green"
                                            } `}
                >
                  Generated
                </td>
                <td className="">
                  <Button tertiary title="Manage Access" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
