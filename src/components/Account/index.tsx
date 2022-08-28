/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "components/Button";
import Input, { PhoneInput } from "components/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "components/Modal";
import DefaaultAvatar from "assets/images/AccountPhoto.png";

import ChangePassword from "./ChangePassword";
import UpdatePhoto from "./UpdatePhoto";
import authentication from "services/authentication";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { register: registerPersonalInfo, setValue } = useForm();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updatePhotoModal, setUpdatePhotoModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const stateUser = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log(stateUser);
    setAvatar(stateUser.profile_picture);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="mt-14 max-w-4xl">
      <Modal
        show={showPasswordModal}
        toggleClose={() => setShowPasswordModal(false)}
      >
        <ChangePassword onHide={() => setShowPasswordModal(false)} />
      </Modal>

      <Modal
        show={updatePhotoModal}
        toggleClose={() => setUpdatePhotoModal(false)}
      >
        <UpdatePhoto
          setUpdatePhotoModal={setUpdatePhotoModal}
          setAvatar={setAvatar}
        />
      </Modal>

      <h4>Community Account</h4>
      <p>Make changes to your account settings here</p>

      <div>
        <p className="text-black mt-8 py-4">Photo</p>
        <div className="flex justify-between items-center">
          <div className="rounded-full bg-icon_background h-20 w-20">
            {avatar ? (
              <img
                src={avatar}
                className="overflow-hidden relative h-20 w-20 rounded-full"
                alt="Avatar"
              />
            ) : (
              <img
                src={DefaaultAvatar}
                className=" overflow-hidden relative h-20 w-20 vrounded-full"
                alt="Avatar"
              />
            )}
          </div>

          <div className="grow max-w-[200px] md:max-w-xs w-md -mt-10">
            <Button
              title="Upload Image"
              onClick={() => setUpdatePhotoModal(true)}
              other
            />
          </div>
        </div>

        <div className="my-10">
          <p className="text-black mb-8">Personal Information</p>

          <form>
            <Input
              placeholder="Enter your full name"
              name="full_name"
              label="Admin Name"
              value={stateUser.first_name}
              register={registerPersonalInfo}
              options={{}}
            />

            <PhoneInput
              placeholder="Enter phone number"
              name="phone_number"
              label="Your Phone Number"
              type="tel"
              register={registerPersonalInfo}
              // error={
              //   errors.community_contact_phone_number &&
              //   "Please enter a correct phone number"
              // }
              value={stateUser.phone_number.slice(3)}
              options={{
                required: true,
                minLength: 7,
                maxLenght: 8,
                pattern: /[0-9]/,
              }}
            />
          </form>
        </div>

        <div className="flex justify-between items-center">
          <div className="grow">
            <p className="text-black">Password</p>
            <p className="text-xs">Update your password here</p>
          </div>

          <div className="grow max-w-xs -mt-10">
            <Button
              title="Update Password"
              type="button"
              onClick={() => setShowPasswordModal(true)}
              other
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <div className="grow">
            <p className="text-black">Log Out</p>
            <p className="text-xs">You will be logged out of your account</p>
          </div>

          <div className="grow max-w-xs -mt-10">
            <Button
              title="Log Out"
              type="button"
              onClick={() => {
                authentication.Logout(navigate("/login"));
              }}
              other
            />
          </div>
        </div>

        <hr className="relative -left-10 w-screen mt-16 " />
        <div className="flex gap-4 lg:max-w-lg mb-20 ">
          <div className="lg:max-w-lg w-full">
            <Button title="Save Changes" type="button" />
          </div>

          <Button
            title="Discard"
            type="button"
            onClick={() => {
              setValue("full_name", stateUser.first_name, {
                shouldDirty: true,
              });
              setValue("phone_number", stateUser.phone_number.slice(3), {
                shouldDirty: true,
              });
            }}
            other
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
