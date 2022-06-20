import Button from "components/Button";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authentication from "services/authentication";

const ValidateEmail = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState();
  const [notif, setNotif] = useState();

  const [searchParams] = useSearchParams("");

  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  useEffect(() => {
    authentication
      .ValidateEmail(token, uid)
      .then((res) => {
        setNotif(res.data.message);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  }, [navigate, token, uid]);

  return (
    <div className="mt-20">
      {!!err || !!notif ? (
        <div
          className={` ${!!notif && "bg-faded_yellow text-yellow"} ${
            !!err && "bg-faded_red text-red "
          }   w-full text-center p-4 mb-4 rounded-md`}
        >
          <p
            className={` ${!!notif && "text-yellow"} ${
              !!err && "text-red "
            }   text-xs`}
          >
            {err || notif}
          </p>
        </div>
      ) : (
        "Loading..."
      )}

      {!!notif && (
        <Button title="Go to Login" onClick={() => navigate("/login")} />
      )}
    </div>
  );
};

export default ValidateEmail;
