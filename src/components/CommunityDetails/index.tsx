import Input, { Select, PhoneInput } from "components/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import country_data from "helpers/country_data.json";
import { useLocation } from "react-router-dom";
import Button from "components/Button";
import { dispatchStore } from "helpers/utils";
import { add_community } from "store/actions/community";
import { addCommunity } from "services/community";

const CommunityDetails = ({ forwardButton, forward }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [country, setCountry] = useState("Nigeria");
  const [stateProvince, setStateProvince] = useState<any>([]);
  const [err, setErr] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.community_contact_phone_number =
      "234" +
      (data.community_contact_phone_number[0] === "0"
        ? data.community_contact_phone_number.substring(1)
        : data.community_contact_phone_number);
    await addCommunity(data).then(
      (res) => {
        setLoading(false);
        dispatchStore(add_community(res.data?.results));
        forward();
      },
      (error) => {
        setLoading(false);
        console.log(error);
        setErr("Creating Community failed, kindly check your details");
      }
    );
  };
  const countryList: Array<any> = country_data.map((data) => data.countryName);

  useEffect(() => {
    const regions =
      country_data[
        country_data.findIndex((data) => data.countryName === country)
      ].regions;
    setStateProvince(regions.map((data) => data?.name));
  }, [country]);

  return (
    <div className="mt-14 max-w-4xl">
      <h4>Community Account</h4>
      {location.pathname === "/settings/community_account" ? (
        <p className="text-grey_text mt-2">
          Make Changes to your community account settings here
        </p>
      ) : (
        <p className="text-grey_text mt-2">Fill your community details</p>
      )}
      <p className="invisible -mb-12 h-10">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque,
        quam! Magnam vitae molestiae sequi beatae vero dolorum omnis ratione
        eveniet repudiandae, fugit commodi illum minima maiores amet, laborum
        culpa optio.
      </p>

      {!!err && (
        <div className="bg-faded_red w-full text-center p-4 mt-4 rounded-md">
          <p className="text-red text-xs ">{err}</p>
        </div>
      )}

      <form className="mt-14 " onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Enter your community name"
          name="name"
          label="Community Name"
          register={register}
          options={{ required: true }}
          error={errors.name && "Please enter your community's name"}
        />

        <label className="text-label_text">Community Address</label>
        <div className="grid grid-cols-2 gap-x-6 ">
          <Select
            placeholder="Country"
            name="country"
            label=""
            list={countryList}
            value={country}
            register={register}
          />
          <Select
            placeholder="State/Province"
            name="state"
            label=""
            list={stateProvince}
            register={register}
            options={{ require: true }}
          />
          <Input
            placeholder="City"
            name="city"
            label=""
            register={register}
            options={{ required: true }}
            error={errors.city && "Please enter the name of your city"}
          />
          <Input
            placeholder="Street Name and number"
            name="street_name"
            label=""
            register={register}
            options={{ required: true }}
            error={errors.street_name && "Please enter the street name"}
          />
        </div>

        <Input
          placeholder="Enter your security company's name"
          name="security_company_name"
          label="Security Company"
          register={register}
          options={{ required: true }}
          error={
            errors.security_company_name &&
            "Please enter your security company's name"
          }
        />

        <PhoneInput
          placeholder="Enter community phone number"
          name="community_contact_phone_number"
          label="Community Contact Phone Number"
          type="tel"
          register={register}
          error={
            errors.community_contact_phone_number &&
            "Please enter a correct phone number"
          }
          options={{
            required: true,
            minLength: 6,
            maxLenght: 11,
            pattern: "/^(0?)([7|8|9]{1})[0-9]{9}$/",
          }}
        />

        {location.pathname === "/settings/community_account" ? (
          <>
            <Input
              placeholder="Enter your community's email address"
              name="community_email"
              label="Community Email address"
              register={register}
              options={{}}
            />
            <Input
              placeholder="Enter your Bank name"
              name="bank_name"
              label="Bank Name"
              register={register}
              options={{}}
            />
            <Input
              placeholder="Enter your account number"
              name="bank_account_number"
              label="Bank Account Number"
              register={register}
              options={{}}
            />

            <hr className="relative -left-10 w-screen mt-16 " />

            <div className="flex gap-4 lg:max-w-lg mb-20 ">
              <div className="lg:max-w-lg w-full">
                <Button title="Save Changes" type="button" />
              </div>

              <Button title="Discard" type="button" other />
            </div>
          </>
        ) : (
          <div className="flex gap-4 lg:max-w-lg lg:mt-20 mb-20">
            <div className="lg:max-w-[200px] w-full">
              <Button title={forwardButton} type="submit" loading={loading} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommunityDetails;
