import Button from "components/Button";
import Modal from "components/Modal";
import { copyText } from "helpers/utils";

const ShowURLModal = ({ showURL, setShowURl, stateCommunityID }: any) => {
  return (
    <Modal show={showURL} toggleClose={() => setShowURl(!showURL)}>
      <div className="p-8 relative">
        <h4>Gate Login URL</h4>
        <hr className="my-6 absolute w-full left-0" />

        <div className="mt-20 border rounded-md p-10">
          <a className="text-primary p-5" href="/" target="_blank">
            https://jasper-web.herokuapp.com/gate_auth/{stateCommunityID}
          </a>
        </div>

        <div className="w-full flex justify-center mt-20">
          <Button
            title="Copy Link"
            tertiary
            onClick={() =>
              copyText(
                `https://jasper-web.herokuapp.com/gate_auth/${stateCommunityID}`
              )
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShowURLModal;
