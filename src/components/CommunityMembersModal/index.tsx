import Button from "components/Button";
import ModalLarge from "components/ModalLarge";
import { TableHeader, TableColumn } from "components/Table";
import SVGs from "helpers/SVGs";
import { Select } from "components/Input";
import img from "assets/images/AccountPhoto.png";
import { getCommunityMembers } from "services/CommunityMembers";
import useFetch from "hooks/useFetch";

const CommunityMembersModal = ({show, toggleClose}:any) => {

    const headers = [
        <input type="checkbox" />,
        "Member",
        "User Type",
        "Phone Number",
        "Status",
      ];

      const [communityMembers, communityMenbersloading, CommunitymembersError] =
      useFetch(getCommunityMembers);
  
    console.log(communityMembers);


    return(
        <ModalLarge
        show={show}
        toggleClose={toggleClose}
      >
        <div className="p-8">
          <h4>Add Members</h4>
          <hr className="my-6 absolute w-full left-0" />

          <div className=" mt-12 mb-8 flex justify-between ">
            <div className="w-80">
              <Select
                name={undefined}
                list={[]}
                label={""}
                placeholder="Select Member Type"
                register={() => {}}
              />
            </div>
            <form className="bg-[#F9F9FB] flex w-3xl h-fit py-2 px-4 rounded-lg">
              <button type="button" onClick={() => {}}>
                {SVGs.search}
              </button>
              <input
                type="text"
                className="outline-none px-2 w-3xl bg-[#F9F9FB] py-3"
                placeholder="Search"
              />
            </form>
          </div>

          <div className="overflow-auto h-[350px] border-b border-faded">
            <table className="w-full ">
              <thead className="">
                <TableHeader headers={headers} />
              </thead>
              <tbody>
                {!!communityMembers &&
                  communityMembers.map((data: any) => (
                    <tr
                      key={data?.id}
                      className="border-b w-full border-[#C3C9DA] align-vertical"
                    >
                      <TableColumn td="" type="check" />
                      <TableColumn
                        td={
                          <span>
                            {data?.myuser?.first_name +
                              " " +
                              data?.myuser?.last_name}{" "}
                            <br />
                            <span className="text-grey_text text-xs">
                              {data?.myuser?.email}
                            </span>
                          </span>
                        }
                        type="user"
                        image={img}
                      />

                      <TableColumn
                        td={data?.occupancy_type?.name}
                        type="userType"
                      />
                      <TableColumn td={data?.myuser?.phone_number} />
                      <TableColumn
                        td={data?.is_active ? "enabled" : "disabled"}
                        type="status"
                      />
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="w-80 flex mt-5 float-right mb-8">
            <Button type="submit" title="Save" />
            <Button type="submit" title="Cancel" secondary />
          </div>
        </div>
      </ModalLarge>
    )
}

export default CommunityMembersModal