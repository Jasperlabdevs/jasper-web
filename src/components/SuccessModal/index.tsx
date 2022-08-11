import success from "assets/images/success.png";
import React from "react";
import Button from "components/Button";

type SuccessModalProps = {
  onHide: () => void;
  title?: string;
  body?: React.ReactNode | string;
  submitBtnText?: string;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  onHide,
  title = "Success",
  body,
  submitBtnText = "Ok, got it!",
}) => {
  return (
    <div className="bg-[#fff] flex justify-center items-center flex-col p-10">
      <div className="w-60 h-fit mx-auto mt-3">
        <img src={success} alt="success" />
      </div>
      <h4 className="mt-14">{title}</h4>
      <div className="text-center">
        <p>{body}</p>
      </div>
      <Button title={submitBtnText} onClick={onHide} type="button" />
    </div>
  );
};

export default SuccessModal;
