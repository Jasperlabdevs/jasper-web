import Button from "components/Button";
import Configuration from "components/Configuration";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { updateCommunity } from "services/community";
import { chooseOccupancyType } from "services/Occupancy";

const UserOnboarding = ({ forwardButton, forward, backward,activeStep }:any) => {

  const stateOccupancyType  = useSelector((state:any) => state.occupancyTypes )
  const stateCommunity  = useSelector((state:any) => state.cummunity )

  const [ occupancyTypes, setOccupancyType ] = useState(stateOccupancyType)
  
  console.log(stateOccupancyType)
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data:any) => {

    const values = Object.values(data)
    const valueID = values.filter(el => ( el !== false && el !== true) )

    for(let i = 0; i < valueID.length; i++){
      const data = { "occupancy_type": valueID[i] }
      await chooseOccupancyType(data)
    }

    await updateCommunity(data, stateCommunity.id).then(
      res => {
        forward()
      }
    )

  }

  useEffect(()=>{
    setOccupancyType(stateOccupancyType)
  },[stateOccupancyType])
  return (
    <div className="mt-14 ">
      <h4>User Onboarding</h4>
      <p>
        Select Inofrmation you'd like to capture on onboarding of your users.
      </p>

      <h5 className="mt-10"> Select User Type To Collect</h5>
      <p>This allows you to segment your member database</p>

      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-2 lg:grid-cols-3 max-w-xl gap-4 flex-wrap mt-8 mb-6">
          {occupancyTypes?.map((data: any) => (
            <article key={data.id} className={data.name}>
              <input type="checkbox" id={data.id} value={data.id} {...register(data.name)} />
              <div>
                <span>{data.name}</span>
              </div>
            </article>
          ))}
        </div>
        <Configuration
          title="Collect Member Addresses"
          description="Home addresses will be collected from community members during member onboarding"
          name="collect_member_addresses"
          register={register}
        />

          <div className="flex gap-4 lg:max-w-lg lg:mt-20 mb-20">
              <div className="lg:max-w-[200px] w-full">
                <Button
                  // onClick={forward}
                  title={forwardButton}
                  type="submit"
                />
              </div>
            
                <Button
                  onClick={backward}
                  title="Back to previous page"
                  type="button"
                  secondary
                />
              
            </div>
      </form>
    </div>
  );
};

export default UserOnboarding;
