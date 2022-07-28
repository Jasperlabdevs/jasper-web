import error from "assets/images/error.svg";
import React from "react";
import Button from "components/Button";

type ErrorModalProps = {
  onHide: () => void;
  title?: string;
  body?: React.ReactNode | string;
  submitBtnText?: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  onHide,
  title = "Error",
  body,
  submitBtnText = "Ok, got it!",
}) => {
  return (
    <div className="bg-[#fff] flex justify-center items-center flex-col p-10">
      <div className="w-60 h-fit mx-auto mt-3">
        <img src={error} alt="error" />
      </div>
      <h4 className="mt-14">{title}</h4>
      <div className="text-center">
        <p>{body}</p>
      </div>
      <Button title={submitBtnText} onClick={onHide} type="button" />
    </div>
  );
};

export default ErrorModal;
