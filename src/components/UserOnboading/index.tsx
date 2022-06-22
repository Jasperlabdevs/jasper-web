import Button from "components/Button";
import Configuration from "components/Configuration";
import { checklistData } from "helpers/data";

const UserOnboarding = ({ forwardButton, forward, backward,activeStep }:any) => {
  return (
    <div className="mt-14 ">
      <h4>User Onboarding</h4>
      <p>
        Select Inofrmation you'd like to capture on onboarding of your users.
      </p>

      <h5 className="mt-10"> Select User Type To Collect</h5>
      <p>This allows you to segment your member database</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 max-w-xl gap-4 flex-wrap mt-8 mb-6">
        {checklistData.map((data: any) => (
          <article key={data.id} className={data.label}>
            <input type="checkbox" id={data.label} />
            <div>
              <span>{data.name}</span>
            </div>
          </article>
        ))}
      </div>
      <Configuration
        title="Collect Member Addresses"
        description="Home addresses will be collected from community members during member onboarding"
      />

        <div className="flex gap-4 lg:max-w-lg lg:mt-20 mb-20">
            <div className="lg:max-w-[200px] w-full">
              <Button
                onClick={forward}
                title={forwardButton}
                // type="submit"
              />
            </div>
           
              <Button
                onClick={backward}
                title="Back to previous page"
                type="button"
                secondary
              />
            
          </div>
    </div>
  );
};

export default UserOnboarding;
