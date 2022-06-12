import Button from "components/Button";
import Input from "components/Input";
import SuccessPage from "components/SuccessPage";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Helmet } from "react-helmet"
import { useNavigate, useSearchParams } from "react-router-dom";
import authentication from "services/authentication";

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [ err, setErr ] = useState('')
  const [ notif, setNotif ] = useState('')

  let [searchParams ] = useSearchParams()

  let token = searchParams.get('token')
  console.log(token)

  const navigate = useNavigate()


  const successCB = (data:any) => {
    setLoading(false)
    console.log(data.message)
    setNotif(data.message)
  }
  const failedCB = (data:any) => {
    setLoading(false)
    setErr(data)
  }



  const onSubmit = (data: any) => {
    if( data.password !== data.confirm_password ){
      setErr('Your Passwords do not match!!')
      return null
    }

    authentication.ResetPassword(data, token, successCB, failedCB)

    setLoading(true);
    console.log(data);
  };

  return (
    <div className="login text-center mt-24 lg:mt-20">

        <Helmet>
            <title>Reset your password | Jasper</title>
            <meta name="description" content="Set new passwords to your account in Jasper" />
        </Helmet>


      <h3>Change Password</h3>
      <p className="text-grey_text my-4">
        You can create a new password, <br /> please don't forget it too{" "}
      </p>
      <hr className="w-2/3 mx-auto my-12" />

      { (!!err || !!notif) && <div className={` ${ !!notif && 'bg-faded_yellow text-yellow' } ${ !!err && 'bg-faded_red text-red ' }   w-full text-center p-4 mb-4 rounded-md`} >
          <p className={` ${ !!notif && 'text-yellow' } ${ !!err && 'text-red ' }   text-xs`}>{err || notif}</p>
        </div>}

      { !!!notif ? 
      <form
        className="text-left mt-14 max-w-[450px] mx-auto relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="password"
          placeholder="Enter your password"
          type="password"
          label="New Password"
          register={register}
          options={{ required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}}
          error={
            errors.password && "Password must be at least 8 characters; must contain 1 uppercase, 1 lowercase and 1 number"
          }
        />

        <Input
          name="confirm_password"
          placeholder="Confirm new your password"
          type="password"
          label="Confirm New Password"
          register={register}
          options={{ required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/}}
          error={
            errors.password && "Password must be at least 8 characters; must contain 1 uppercase, 1 lowercase and 1 number"
          }
        />

        <Button title="Create Password" loading={loading} />
      </form> : <Button title='Go to Login' onClick={()=>navigate('/login')} />  }
    </div>
  );
};

export default ResetPassword;
