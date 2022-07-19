import Button from "components/Button";
import Modal from "components/Modal";
import { checkID } from "services/gates";

const IdentityCheckModal = ({
  showIdentity,
  setShowIdentity,
  code,
  gate,
}: any) => {
  const handleAccess = () => {
    const data = {
      gate_id: gate,
      code: code,
      security_password: "",
      id_card_name: "",
    };

    checkID(data).then((res: any) => {
      console.log(res.data);
      setShowIdentity(false);
    });
  };

  return (
    <Modal show={showIdentity} toggleClose={() => setShowIdentity(false)}>
      <p className=" mt-8 ml-8 text-left">Check the following</p>
      <hr className="my-6 absolute w-full left-0" />

      <div className="p-10">
        <div className="flex w-full mt-8 justify-between items-center ">
          <p>
            Is the security password correct? <b>{}</b>
          </p>
          <div>
            <input
              className="ml-4 mr-2"
              type="radio"
              value="true"
              name="security_password"
            />
            <label htmlFor="">Yes</label>
            <input
              className="ml-4 mr-2"
              type="radio"
              value="false"
              name="security_password"
            />
            <label htmlFor="">No</label>
          </div>
        </div>

        <div className="flex w-full mt-8 justify-between items-center">
          <p>
            IIs this the name on the Visitor’s ID card? <b>{}</b>
          </p>
          <div>
            <input
              className="ml-4 mr-2"
              type="radio"
              value="true"
              name="security_password"
            />
            <label htmlFor="">Yes</label>
            <input
              className="ml-4 mr-2"
              type="radio"
              value="false"
              name="security_password"
            />
            <label htmlFor="">No</label>
          </div>
        </div>

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
