import Button from "components/Button";
import Configuration from "components/Configuration";
import { dispatchStore } from "helpers/utils";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getCommunity, updateCommunity } from "services/community";
import { getOccupancyTypes } from "services/helperServices";
import {
  chooseOccupancyType,
  getSelectedOccupancyTypes,
} from "services/Occupancy";
import { RootState } from "store";
import { add_community } from "store/actions/community";

const UserOnboarding = ({
  forwardButton,
  forward,
  backward,
  editMode = false,
}: any) => {
  const community = useSelector((state: any) => state.community);
  const [err, setErr] = useState("");
  const [occupancyTypes, setOccupancyType] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentCommunityId = useSelector(
    (state: RootState) => state.user?.community?.id
  );

  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    if (!editMode) {
      getOccupancyTypes().then(
        (res) => {
          setOccupancyType(res.data?.results);
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { register, handleSubmit, setValue } = useForm();

  const loadData = () => {
    getCommunity().then((res) => dispatchStore(add_community(res.data)));
    getSelectedOccupancyTypes().then(({ data: { results: selected } }) => {
      setSelectedTypes(selected);
      getOccupancyTypes().then(({ data: { results: allTypes } }) => {
        setOccupancyType(
          allTypes.map((type: any) => {
            if (
              selected.find((selectedType: any) => type.id === selectedType.id)
            )
              type.selected = true;
            return type;
          })
        );
      });
    });
  };

  useEffect(() => {
    setValue(
      "collect_user_home_address",
      community?.collect_user_home_address,
      { shouldDirty: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community]);

  const onSubmit = async (data: any) => {
    setErr("");
    setLoading(true);
    const values = [
      ...Object.values(data),
      ...selectedTypes.map((type: any) => type.id),
    ];
    const valueID = values.filter(
      (el) => el !== false && el !== true && el !== undefined
    );

    const hasValues = valueID.every((el) => el === false);

    let occupancy = {
      occupancy_type: valueID,
    };

    if (hasValues) {
      setErr("Please Select at least One user Type");
      setLoading(false);
    } else {
      await chooseOccupancyType(occupancy)
        .then(() => {
          updateCommunity(data, community.id)
            .then((res) => {
              dispatchStore(add_community(res.data));
              forward();
            })
            .catch((error: any) => {
              !!error.response?.data?.message
                ? setErr(error.response?.data?.message)
                : setErr("Something went wrong. Please check and Try again");
              setLoading(false);
            });
        })
        .catch((error: any) => {
          !!error.response?.data?.message
            ? setErr(error.response?.data?.message)
            : setErr("Something went wrong. Please check and Try again");
          setLoading(false);
        });
    }
  };

  const handleEdit = (data: FieldValues) => {
    setErr("");
    setLoading(true);

    /**
     * * add already selected occupancy types and the new ones (filtering by uuid value)
     */
    const newOccupancyTypes = [
      ...selectedTypes.map(({ id }) => id),
      ...Object.values(data).filter((value) => typeof value === "string"),
    ];

    /**
     * * check if at least 1 occupancy type was selected
     */
    if (!newOccupancyTypes.length) {
      setErr("Please Select at least One user Type");
      setLoading(false);
      return;
    }

    const { collect_user_home_address } = data;

    Promise.all([
      chooseOccupancyType({ occupancy_type: newOccupancyTypes }),
      updateCommunity({ collect_user_home_address }, currentCommunityId),
    ]).then(
      ([, communityRes]: [any, any]) => {
        setLoading(false);
        dispatchStore(add_community(communityRes.data));
      },
      (error) => {
        setErr(
          error.response?.data?.message ||
            error.response?.data?.detail ||
            "Something went wrong. Please check and Try again"
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="mt-14 ">
      <h4>User Onboarding</h4>
      <p>
        Select Inofrmation you'd like to capture on onboarding of your users.
      </p>

      <h5 className="mt-10"> Select User Type To Collect</h5>
      <p>This allows you to segment your member database</p>

      {!!err && (
        <div className="bg-faded_red w-full text-center p-4 mt-4 rounded-md">
          <p className="text-red text-xs ">{err}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(editMode ? handleEdit : onSubmit)}>
        <div className="grid grid-cols-2 lg:grid-cols-3 max-w-2xl gap-4 flex-wrap mt-8 mb-6">
          {occupancyTypes?.map((data: any) => (
            <article key={data.id} className={data.name}>
              <input
                type="checkbox"
                id={data.id}
                value={data.id}
                defaultChecked={!!data.selected}
                disabled={!!data.selected}
                {...register(data.name)}
              />
              <div>
                <span>{data.name}</span>
              </div>
            </article>
          ))}
        </div>
        <Configuration
          title="Collect Member Addresses"
          description="Home addresses will be collected from community members during member onboarding"
          name="collect_user_home_address"
          register={register}
        />

        <div className="flex gap-4 lg:max-w-lg lg:mt-20 mb-20">
          <div className="lg:max-w-[200px] w-full">
            <Button
              // onClick={forward}
              title={forwardButton || "Save Changes"}
              type="submit"
              loading={loading}
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
