import Button from "components/Button";
import Input, { PhoneInput } from "components/Input";
import Modal from "components/Modal";
import SVGs from "helpers/SVGs";
import { copyText } from "helpers/utils";
import { useForm } from "react-hook-form";

const TextCodeModal = ({ showTextCode, accessCode, setShowTextCode }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal
      show={showTextCode}
      toggleClose={() => setShowTextCode(!showTextCode)}
    >
      <div className="w-full my-10 p-8 pt-0">
        <h4>Access Details</h4>
        <hr className="my-6 absolute w-full left-0" />

        <form onSubmit={handleSubmit(onSubmit)} className="m-10 mt-14">
          <Input
            name="code"
            disabled
            value={accessCode}
            register={register}
            options={{ undefined }}
            label="Access Code"
          />
          <Input
            name="name"
            register={register}
            options={{ required: true }}
            error={errors.name && "Please enter a name"}
            label="Name"
          />
          <PhoneInput
            name="phone_number"
            register={register}
            options={{
              required: true,
              minLenght: 6,
              maxLenght: 11,
              pattern: "/^(0?)([7|8|9]{1})[0-9]{9}$/",
            }}
            error={errors.phone_number && "Please Enter a correct phone number"}
            label="Phone Number"
          />

          <div className="float-right w-fit mb-8 flex gap-4">
            {/* <div  >
                        <Button
                        type="submit"
                        title="Send SMS"
                        />
                    </div> */}
            <div>
              <Button
                type="button"
                title="Copy Code"
                onClick={() => copyText(accessCode)}
                other
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
};

export default TextCodeModal;
