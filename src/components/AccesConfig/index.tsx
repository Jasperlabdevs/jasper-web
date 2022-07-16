import Configuration from "../Configuration";
import React, { useEffect, useState } from "react";
import { configurationData, TableContent } from "helpers/data";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import { setAccessRules } from "services/access";
import { Select } from "components/Input";
import { dispatchStore } from "helpers/utils";
import { get_selected_occupancy_type } from "store/actions/occupancyTypes";

const AccessConfig = ({
  forwardButton,
  forward,
  backward,
  activeStep,
}: any) => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const list = [
    { id: "required", name: "Required" },
    { id: "not required", name: "Not Required" },
  ];

  useEffect(()=> {
    dispatchStore(get_selected_occupancy_type());
  },[])


  const onSubmit = (data: any) => {
    setLoading(true);

    data.additional_information = [
      {
        additional_information: "Visitor Company",
        make_required: data.VisitorCompany_make_required,
        selected: data.VisitorCompany_selected,
      },
      {
        additional_information: "Visitor Type",
        make_required: data.VisitorType_make_required,
        selected: data.VisitorType_selected,
      },
      {
        additional_information: "Reason for Visit",
        make_required: data.Reasonforvisiting_make_required,
        selected: data.Reasonforvisiting_selected,
      },
      {
        additional_information: "Requesting Department",
        make_required: data.RequestingDepartment_make_required,
        selected: data.RequestingDepartment_selected,
      },
    ];
    const one = [];
    const two = [];
    const three = [];
    const four = [];
    const five = [];

    /// Please do not touch
    for (const key in data) {
      if (
        key.includes("allow_users_generate_event_access_codes") &&
        !(data[key] === true || data[key] === false)
      ) {
        one.push(data[key]);
      } else if (
        key.includes("allow_users_generate_onetime_access_code") &&
        !(data[key] === true || data[key] === false)
      ) {
        two.push(data[key]);
      } else if (
        key.includes("allow_users_generate_recurring_access_codes") &&
        !(data[key] === true || data[key] === false)
      ) {
        three.push(data[key]);
      } else if (
        key.includes("allow_users_generate_multiple_access_codes") &&
        !(data[key] === true || data[key] === false)
      ) {
        four.push(data[key]);
      } else if (
        key.includes("allow_users_request_multiple_access_codes") &&
        !(data[key] === true || data[key] === false)
      ) {
        five.push(data[key]);
      }
    }

    data.occupancy_type_allowed_to_generate_onetime_access_codes = two;
    data.occupancy_type_allowed_to_generate_event_access_codes = one;
    data.occupancy_type_allowed_to_generate_recurring_access_codes = three;
    data.occupancy_type_allowed_to_request_multiple_access_codes = four;
    data.occupancy_type_allowed_to_generate_multiple_access_codes = five;

    delete data.Reasonforvisiting_make_required;
    delete data.Reasonforvisiting_selected;
    delete data.RequestingDepartment_make_required;
    delete data.RequestingDepartment_selected;
    delete data.VisitorCompany_make_required;
    delete data.VisitorCompany_selected;
    delete data.VisitorType_make_required;
    delete data.VisitorType_selected;
    delete data.allow_users_generate_event_access_codes_Developer;
    delete data.allow_users_generate_event_access_codes_FacilityManagement;
    delete data.allow_users_generate_event_access_codes_Guest;
    delete data.allow_users_generate_event_access_codes_Landlord;
    delete data.allow_users_generate_event_access_codes_PropertyOwner;
    delete data.allow_users_generate_event_access_codes_Tenant;
    delete data.allow_users_generate_onetime_access_codes_Developer;
    delete data.allow_users_generate_onetime_access_codes_FacilityManagement;
    delete data.allow_users_generate_onetime_access_codes_Guest;
    delete data.allow_users_generate_onetime_access_codes_Landlord;
    delete data.allow_users_generate_onetime_access_codes_PropertyOwner;
    delete data.allow_users_generate_onetime_access_codes_Tenant;
    delete data.allow_users_generate_recurring_access_codes_Developer;
    delete data.allow_users_generate_recurring_access_codes_FacilityManagement;
    delete data.allow_users_generate_recurring_access_codes_Guest;
    delete data.allow_users_generate_recurring_access_codes_Landlord;
    delete data.allow_users_generate_recurring_access_codes_PropertyOwner;
    delete data.allow_users_generate_recurring_access_codes_Tenant;
    delete data.allow_users_request_multiple_access_codes_Developer;
    delete data.allow_users_request_multiple_access_codes_FacilityManagement;
    delete data.allow_users_request_multiple_access_codes_Guest;
    delete data.allow_users_request_multiple_access_codes_Landlord;
    delete data.allow_users_request_multiple_access_codes_PropertyOwner;
    delete data.allow_users_request_multiple_access_codes_Tenant;
    delete data.allow_users_generate_multiple_access_codes_Developer;
    delete data.allow_users_generate_multiple_access_codes_FacilityManagement;
    delete data.allow_users_generate_multiple_access_codes_Guest;
    delete data.allow_users_generate_multiple_access_codes_Landlord;
    delete data.allow_users_generate_multiple_access_codes_PropertyOwner;
    delete data.allow_users_generate_multiple_access_codes_Tenant;

    console.log(data);

    setAccessRules(data)
      .then((res) => {
        console.log(res.data.results);
        setLoading(false);
        forward();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.data);
      });
  };

  return (
    <div className="mt-10 ">
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Access Rules</h3>
          {configurationData.map((data, index) => (
            <div key={data.id}>
              <Configuration
                title={data.title}
                description={data.description}
                hasCheckList={data.hasCheckList}
                name={data.name}
                value={data.value}
                register={register}
              />
              {data.id === 6 && <h4 className="mt-8">MULTIPLE ACCESS</h4>}
            </div>
          ))}

          <h5 className="py-4 -mb-10 md:mb-0">
            Select additional Information you'd like to capture before granting
            access.
          </h5>
          <table className="w-full max-w-5xl">
            <thead className="invisible md:visible">
              <tr className="text-grey_text border-b ">
                <th className="text-left text-grey_text py-4">
                  Addition Information
                </th>
                <th className=" text-grey_text">Make Required</th>

                <th className="text-left text-grey_text">Select</th>
              </tr>
            </thead>
            <tbody>
              {TableContent.map((data, index) => (
                <tr key={index + 100} className="border-b">
                  <td className="text-left">{data.additionalInfomation}</td>
                  <td className="py-5">
                    <div className="flex text-center mx-auto w-fit items-center gap-4 -mb-8 border-none">
                      <Select
                        name={
                          data.additionalInfomation.replace(/\s/g, "") +
                          "_make_required"
                        }
                        value={"required"}
                        list={list}
                        noborder
                        label={""}
                        register={register}
                      />
                    </div>
                  </td>
                  <td className="pl-4">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        {...register(
                          data.additionalInfomation.replace(/\s/g, "") +
                            "_selected"
                        )}
                        defaultChecked={data.select}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 lg:max-w-lg mt-16 lg:mt-20 mb-20">
            <div className="lg:max-w-[200px] w-full">
              <Button
                // onClick={forward}
                title={forwardButton}
                type="submit"
                loading={loading}
              />
            </div>

            <Button
              onClick={backward}
              title="Back to previous page"
              type="button"
              secondary
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AccessConfig;
