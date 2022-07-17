import Button from "components/Button";
import Modal from "components/Modal";
import { copyText, getToken } from "helpers/utils";

const ShowURLModal = ({ showURL, setShowURl, stateCommunityID }: any) => {

  const token = getToken()

  return (
    <Modal show={showURL} toggleClose={() => setShowURl(!showURL)}>
      <div className="p-8 relative">
        <h4>Gate Login URL</h4>
        <hr className="my-6 absolute w-full left-0" />

        <div className="mt-20 border rounded-md p-10">
          <a className="text-primary p-5" href={`https://jasper-web.herokuapp.com/gate_auth/${stateCommunityID}/${token}`} target="_blank" rel="noreferrer">
            https://jasper-web.herokuapp.com/gate_auth/{stateCommunityID}/{token}
          </a>
        </div>

        <div className="w-full flex justify-center mt-20">
          <Button
            title="Copy Link"
            tertiary
            onClick={() =>
              copyText(
                `https://jasper-web.herokuapp.com/gate_auth/${stateCommunityID}/${token}`
              )
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShowURLModal;
