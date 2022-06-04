import Button from "components/Button";
import Header from "components/Header";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import img from "assets/images/gate.png";

const Gates = () => {
  return (
    <div>
      <Header />

      <div className="px-10 mt-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4>
            Gates{" "}
            <span className="text-white bg-primary rounded-full px-3 text-xs">
              3
            </span>{" "}
          </h4>
          <div className="flex gap-4 ">
            <div className="max-w-3xl -mt-10">
              <Button title="Show gate URL" other />
            </div>

            <div className="max-w-3xl -mt-10">
              <Button
                title={
                  <span className="flex items-center justify-center gap-2 text-[#fff]">
                    {SVGs.add_white} Add Gate
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-10">
        <table className="w-full ">
          <thead className="">
            <tr className="text-grey_text border-b border-[#C3C9DA] bg-[#F9F9FB]">
              <th className="px-4  text-left text-grey_text py-4">Gates</th>
              <th className="text-left text-grey_text">Gate PIN</th>
              <th className="text-left text-grey_text">Phone Number</th>
              <th className="text-left text-grey_text">Date Added</th>
              <th className="text-left text-grey_text">Status</th>
              <th className="text-left text-grey_text"></th>
              <th className="text-left text-grey_text"></th>
              <th className="text-left text-grey_text"></th>
            </tr>
          </thead>
          <tbody>
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA]">
                <td className="text-left h-full pl-4 flex my-3 -mb-3 items-center gap-2">
                  {" "}
                  <span className="bg-faded rounded-full h-12 w-12 flex justify-center items-center">
                    <img
                      src={img}
                      className="h-6 w-6 object-cover"
                      alt="gate"
                    />
                  </span>{" "}
                  <span>Entry</span>
                </td>
                <td className="text-left">AS12</td>
                <td className="text-left">One-Time Access</td>
                <td className="text-left">1232</td>
                <td
                  className={`p-2 px-4 my-4 w-fit rounded-full flex justify-center 
                                                ${
                                                  true &&
                                                  "bg-faded_yellow text-yellow"
                                                }
                                                ${
                                                  false &&
                                                  "bg-faded_red text-red"
                                                }
                                                ${
                                                  false &&
                                                  "bg-faded_green text-green"
                                                } `}
                >
                  Generated
                </td>
                <td className="">
                  <Button smallSecondary title="Edit" />
                </td>
                <td className="">
                  <Button smallPrimary title="Disable" />
                </td>
                <td className="text-left">View Nested Gate </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gates;
