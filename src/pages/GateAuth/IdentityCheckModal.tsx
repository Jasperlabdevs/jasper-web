import Button from "components/Button";
import Modal from "components/Modal";
import { useState } from "react";
import { checkID } from "services/gates";

const IdentityCheckModal = ({
  showIdentity,
  setShowIdentity,
  code,
  gate,
  visitor,
}: any) => {
  const [data, setData] = useState<any>({ code: code, gate_id: gate });
  const [err, setErr] = useState("");
  const handleRadioChange = (event: any) => {
    const { name, value } = event.target;

    const temp: any = { ...data };
    temp[name] = value;

    setData(temp);
  };

  const handleAccess = () => {
    setErr("");
    const conditionOne =
      !!visitor?.visitor_id_card_name && data.hasOwnProperty("id_card_name");
    const conditionTwo =
      !!visitor?.security_password && data.hasOwnProperty("security_password");
    const conditionThree =
      !!visitor?.license_plate && data.hasOwnProperty("license_plate");

    if (conditionOne && conditionTwo && conditionThree) {
      checkID(data)
        .then((res: any) => {
          setShowIdentity(true);
        })
        .catch((error) => {
          setShowIdentity(false);
        });
    } else {
      setErr("Please select all available options");
    }
  };

  return (
    <Modal show={showIdentity} toggleClose={() => setShowIdentity(false)}>
      <p className=" mt-8 ml-8 text-left">Check the following</p>
      <hr className="my-6 absolute w-full left-0" />

      {!!err && (
        <div className="mt-12 -mb-16 bg-faded_red w-full text-center p-4 mb-4 rounded-md">
          <p className="text-red text-xs ">{err}</p>
        </div>
      )}

      <div className="p-10">
        {(visitor?.security_password).length > 0 && (
          <div className="flex w-full mt-8 justify-between items-center ">
            <p>
              Is the security password correct?{" "}
              <b>{visitor?.security_password}</b>
            </p>
            <div>
              <input
                className="ml-4 mr-2"
                type="radio"
                value="true"
                name="security_password"
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="">Yes</label>
              <input
                required
                className="ml-4 mr-2"
                type="radio"
                value="false"
                name="security_password"
                onChange={handleRadioChange}
              />
              <label htmlFor="">No</label>
            </div>
          </div>
        )}

        {(visitor?.visitor_id_card_name).length > 0 && (
          <div className="flex w-full mt-8 justify-between items-center">
            <p>
              IIs this the name on the Visitor’s ID card?{" "}
              <b>{visitor?.visitor_id_card_name}</b>
            </p>
            <div>
              <input
                className="ml-4 mr-2"
                type="radio"
                value="true"
                name="id_card_name"
                onChange={handleRadioChange}
              />
              <label htmlFor="">Yes</label>
              <input
                className="ml-4 mr-2"
                type="radio"
                value="false"
                name="id_card_name"
                onChange={handleRadioChange}
              />
              <label htmlFor="">No</label>
            </div>
          </div>
        )}

        {(visitor?.license_plate).length > 0 && (
          <div className="flex w-full mt-8 justify-between items-center">
            <p>
              IIs this the number on the License Plate?{" "}
              <b>{visitor?.license_plate}</b>
            </p>
            <div>
              <input
                className="ml-4 mr-2"
                type="radio"
                value="true"
                name="license_plate"
                onChange={handleRadioChange}
              />
              <label htmlFor="">Yes</label>
              <input
                className="ml-4 mr-2"
                type="radio"
                value="false"
                name="license_plate"
                onChange={handleRadioChange}
              />
              <label htmlFor="">No</label>
            </div>
          </div>
        )}

        <div className="w-fit float-right mb-8">
          <Button
            type="button"
            title="Grant Access"
            onClick={() => handleAccess()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default IdentityCheckModal;
