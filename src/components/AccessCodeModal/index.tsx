import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import SVGs from "helpers/SVGs";
import Mail from "assets/images/mail.svg";
import { copyText } from "helpers/utils";

const AccessCodeModal = ({
  showCodeGenerated,
  setShowCodeGenerated,
  register,
  accessCode,
  reshare = false
}: any) => (
  <Modal
    show={showCodeGenerated}
    toggleClose={() => setShowCodeGenerated(!showCodeGenerated)}
  >
    <div className="w-full my-10">
      <div className="mx-auto w-fit text-center">
        <img src={Mail} alt="mail-icon" />
        <p>{!reshare ? 'Access Code Successfully Generated!' : 'Share Access Code'}</p>
      </div>

      <form className="m-10">
        <Input
          name="code"
          disabled
          value={accessCode}
          register={register}
          options={{ undefined }}
          label="Access Code"
        />
        <div className="w-fit float-right mb-8 flex gap-4">
          <div>
            <Button
              type="button"
              title="Copy Code"
              onClick={() => copyText(accessCode)}
            />
          </div>
          <div>
            <a
              href={`whatsapp://send?text=Access Code is: ${accessCode} `}
              data-action="share/whatsapp/share"
              target="_blank"
              rel="noreferrer"
            >
              <Button type="button" other title={SVGs.whatsapp} />
            </a>
          </div>
          <div>
            <a
              href={`mailto:?subject=Access Code from Jasper&amp;body=Gate Access Code is ${accessCode}.`}
            >
              <Button type="button" other title={SVGs.mail} />
            </a>
          </div>
        </div>
      </form>
    </div>
  </Modal>
);

export default AccessCodeModal;
