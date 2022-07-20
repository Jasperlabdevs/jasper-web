import Button from "components/Button";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyGate } from "services/gates";
import failure from "assets/images/error.svg";
import success from "assets/images/success.png";
import EntryExitModal from "./EntryExitModal";
import IdentityCheckModal from "./IdentityCheckModal";
import { getCommunityWithID } from "services/community";

const GateVerification = () => {
  const [loading, setLoading] = useState(false);

  const { gate_id } = useParams();
  const [err, setErr] = useState("");

  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [showIdentityModal, setshowIdentityModal] = useState(false);
  const [ visitor, setVisitor ] = useState<any>({})
  const [ accessRules, setAccessRules ] = useState<any>({})
  const { community_id } = useParams();

  useEffect(()=>{
    getCommunityWithID(community_id || '').then(
      res => {
        setAccessRules(res.data.access_rules)
      }
    ).catch(err => {
      console.log(err.data)
    })

    console.log(accessRules)
  },[])

  const navigate = useNavigate();
  const onSubmit = () => {
    setLoading(true);

    let data = {
      gate_id: gate_id,
      code: otp.join(""),
    };

    verifyGate(data)
      .then((res:any) => {
        console.log(res.data);
        setVisitor(res.data?.result?.visitor)
        if( accessRules?.identity_verification && (visitor.visitor_id_card_name !== "" || visitor.security_password !== "" || visitor.license_plate !== "")){
          setshowIdentityModal(true)
        }else if(accessRules?.capture_visitor_entry_exit){
          setShowExtra(true);
        }else {
          setShow(true);
          setStatus(true);
        }
        
        // 735327

        
      })
      .catch((err) => {
        setErr(err.response.data.message);
        setShow(true);
        setStatus(false);
      });
  };

  const closeShowIdentityModal = () => {
    setshowIdentityModal(false)
    if( status && accessRules?.capture_visitor_entry_exit){
      setShowExtra(true);
    }else {
      setShow(true);
    }
  }

  const closeShowExtra = () => {
    setShow(true);
    setStatus(true);
    setShowExtra(false);
  };

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [activeOtpIndex]);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];

    newOTP[index] = value.substring(value.length - 1);

    if (!value) setActiveOtpIndex(index - 1);
    else setActiveOtpIndex(index + 1);

    setOtp(newOTP);
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(key);
    if (key === "Backspace") {
      setActiveOtpIndex(index - 1);
    }
  };

  const successComponent = (successful: any) => (
    <div>
      <div>
        <div className="w-80 h-fit mx-auto">
          {!!successful ? (
            <img src={success} alt="sucess" />
          ) : (
            <img src={failure} alt="failure" />
          )}
        </div>
        <h3 className="text-center mt-16">
          {!!successful ? "Access Granted" : "Access Denied"}
        </h3>
        <p className="my-3">{err}</p>
        <Button
          title="Ok"
          onClick={() => {
            setShow(false);
            setLoading(false);
            setOtp(new Array(6).fill(""));
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="login text-center mt-24 lg:mt-20">
      {showExtra && (
        <EntryExitModal
          gate={gate_id}
          code={otp.join("")}
          showExtra={showExtra}
          setShowExtra={closeShowExtra}
        />
      )}
      {showIdentityModal && (
        <IdentityCheckModal
          gate={gate_id}
          setStatus={setStatus}
          code={otp.join("")}
          showIdentity={showIdentityModal}
          setShowIdentity={closeShowIdentityModal}
          visitor={visitor}
        />
      )}
      <div>
        {!show ? (
          <>
            <h3 className="mb-20">Entry Gate</h3>

            <form className="text-left pt-20 max-w-[450px] mx-auto relative">
              <label className="mb-10 lg:text-label_text ">
                Visitor Access Code
              </label>
              <div className="flex mt-3 gap-4 justify-between mx-auto w-full">
                {otp.map((el, index) => (
                  <input
                    key={index}
                    ref={index === activeOtpIndex ? inputRef : null}
                    type="number"
                    className="w-12 px-4 flex justify-center items-center p-4 h-14 border rounded-lg text-xl"
                    onChange={(e) => handleChange(e, index)}
                    value={otp[index]}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              <Button
                title="Verify Code"
                type="button"
                loading={loading}
                onClick={onSubmit}
                disable={otp[otp.length - 1] === ""}
              />
            </form>
          </>
        ) : (
          <>{successComponent(status)} </>
        )}
      </div>
    </div>
  );
};

export default GateVerification;
