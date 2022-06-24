import Button from "components/Button";
import SVGs from "helpers/SVGs";
import { useEffect, useState } from "react";
import CommunityDetails from "components/CommunityDetails";
import UserOnboarding from "components/UserOnboading";
import { steps, goForward, goBack } from "./Steps";
import AccessConfig from "components/AccesConfig";
import { useNavigate } from "react-router-dom";
import SuccessPage from "components/SuccessPage";
import { Helmet } from "react-helmet";
import { dispatchStore } from "helpers/utils";
import { get_occupancy_types } from "store/actions/occupancyTypes";
import { useSelector } from "react-redux";

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [progressWidth, setProgressWidth] = useState("w-1/3");
  const [progress, setProgress] = useState("33");

  const [ forward, setForward ] = useState('Continue')

  const stateOccupancyType = useSelector((state:any) => state.occupancyTypes)

  if(stateOccupancyType.length === 0){
    dispatchStore(get_occupancy_types())
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (activeStep === 2) {
      setProgress("66");
      setProgressWidth("w-2/3");
      setForward('Continue')
    } else if (activeStep === 3) {
      setProgress("80");
      setProgressWidth("w-4/5");
      setForward('Complete')
    } else {
      setProgress("33");
      setProgressWidth("w-1/3");
      setForward('Continue')
    }
  }, [activeStep]);

  return (
    <div className="py-4 px-10 lg:p-0 relative">
      <Helmet>
        <title>Complete Onboarding | Jasper</title>
        <meta name="description" content="Onboard your community with Jasper" />
      </Helmet>

      {activeStep > 3 && (
        <SuccessPage message={"Account created Successfully"} />
      )}
      <div className="relative flex justify-between max-w-[500px] mx-auto mt-5 lg:hidden">
        {steps.map((data: any) => (
          <div key={data.id} className={`${data.id === 1 && ""} text-center`}>
            <p
              className={`${
                data.id === activeStep &&
                "bg-faded border-primary !text-primary"
              } ${
                data.id < activeStep &&
                "!bg-primary border-primary text-primary"
              } border-2 rounded-full h-11 w-11 text-lg flex justify-center items-center mx-auto text-grey_text`}
            >
              {data.id < activeStep ? SVGs.white_check : data.id}
            </p>
            <p
              className={`${
                data.id === activeStep && "!text-black font-medium"
              } text-center text-xs md:text-sm mt-4 text-grey_text`}
            >
              {data.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-auto">
        <div className="min-w-[350px] hidden lg:block fixed">
          <aside className="border-r min-h-screen py-10 px-14">
            <h4 className="text-primary font-sans-display">Jasper</h4>
            <div className="flex flex-col mt-20 gap-10 items-start relative">
              {steps.map((data: any) => (
                <div
                  key={data.id}
                  className={`${
                    data.id === 1 && ""
                  } text-left flex gap-5 items-center`}
                >
                  <p
                    className={`${
                      data.id === activeStep &&
                      "bg-faded border-primary text-primary"
                    } ${
                      data.id < activeStep &&
                      "!bg-primary border-primary text-primary"
                    } border-2 rounded-full h-12 w-12 flex justify-center items-center text-grey_text`}
                  >
                    {data.id < activeStep ? SVGs.white_check : data.id}
                  </p>
                  <p
                    className={`${
                      data.id === activeStep && "!text-black font-medium"
                    } text-center text-grey_text`}
                  >
                    {data.title}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-80">
              <p className="text-sm mb-3 text-black font-medium">
                {progress}% progress
              </p>
              <div className="w-full bg-[#E3E6ED] h-2 rounded-xl overflow-hidden">
                <div
                  className={`bg-primary ${progressWidth}   transition-width duration-300 delay-50 ease-in-out rounded-xl h-2 `}
                >
                  e
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="lg:mx-20 min-w-5xl lg:pl-[350px]">
          {activeStep === 3 && <CommunityDetails forwardButton={forward} forward={()=>goForward(activeStep, setActiveStep, navigate)} />}
          {activeStep === 2 && <UserOnboarding forwardButton={forward} forward={()=>goForward(activeStep, setActiveStep, navigate)} backward={()=>goBack(activeStep, setActiveStep)} />}

          {activeStep === 1 && <AccessConfig forwardButton={forward} forward={()=>goForward(activeStep, setActiveStep, navigate)} backward={()=>goBack(activeStep, setActiveStep)} />}

          
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
