import Button from "components/Button";
import Input from "components/Input";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const VisitorDetails = () => {
  const { register } = useForm();

  const navigate = useNavigate();

  return (
    <div className="mt-10 max-w-4xl">
      <p
        onClick={() => navigate(-1)}
        className="text-red gap-2 text-xs cursor-pointer flex items-center"
      >
        {" "}
        <span>{SVGs.left_red}</span> Back to History{" "}
      </p>
      <h5 className="my-6">Emmanuel Demo</h5>

      <form>
        <div className="flex md:flex-row flex-col mt-6 gap-6 w-full">
          <div className="w-full">
            <Input
              name="visitor_type"
              label="Visitor type"
              placeholder="Vendor"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <Input
              name="gate"
              label="Gate"
              placeholder="Entry Gate"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col mt-6 gap-6 w-full">
          <div className="w-full">
            <Input
              name="requesting_department"
              label="Requesting Department"
              placeholder="Security"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <Input
              name="approving_admin"
              label="Approving Admin"
              placeholder="Folake"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col mt-6 gap-6 w-full">
          <div className="w-full">
            <Input
              name="entry_tyoe"
              label="Entry Type"
              placeholder="Single Entry"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <Input
              name="visitor_company"
              label="Visiting Commpany"
              placeholder="Company Inc."
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col mt-6 gap-6 w-full">
          <div className="w-full">
            <Input
              name="date_requesting"
              label="Date/Time Requested"
              placeholder="15th Feb. 2022 - 1:00pm"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <Input
              name="date_approved"
              label="Date/Time Approved"
              placeholder="15th Feb. 2022 - 1:00pm"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col mt-6  mb-6 gap-6 w-full">
          <div className="w-full">
            <Input
              name="valid_from"
              label="Valid From"
              placeholder="15th Feb. 2022 - 1:00pm"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <Input
              name="valid_to"
              label="Valid To"
              placeholder="15th Feb. 2022 - 1:00pm"
              options={{}}
              register={register}
              disabled={true}
            />
          </div>
        </div>
        <Input
          label="Reason for visit"
          name="reason"
          placeholder="To sell"
          options={{}}
          register={register}
          disabled={true}
        />
      </form>

      <table className="w-full my-10 ">
        <thead className="">
          <tr className="text-grey_text border-b border-[#C3C9DA] bg-[#F9F9FB]">
            <th className="px-4  text-left text-grey_text py-4">
              Visitor's Name
            </th>
            <th className="text-left text-grey_text">Phone Number</th>
            <th className="text-left text-grey_text">Code</th>
            <th className="text-left text-grey_text">Status</th>
            <th className=" text-grey_text" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {TableContent.map((data) => (
            <tr className="border-b border-[#C3C9DA]">
              <td className="text-left pl-4">Kofi Emma</td>
              <td className="text-left">N/A</td>
              <td className="text-left">FDW12</td>
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
                <Button smallPrimary title="Reshare Code" />
              </td>
              <td className="">
                <Button smallSecondary title="Enable" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorDetails;
