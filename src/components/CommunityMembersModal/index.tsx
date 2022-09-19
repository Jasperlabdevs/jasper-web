import Button from "components/Button";
import ModalLarge from "components/ModalLarge";
import { TableHeader, TableColumn } from "components/Table";
import SVGs from "helpers/SVGs";
import { Select } from "components/Input";
import img from "assets/images/AccountPhoto.png";
import { getCommunityMembers, searchFilterCommunityMembers } from "services/CommunityMembers";
import useFetch from "hooks/useFetch";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import Option from "components/MultipleSelect/Options";
import { useEffect, useState } from "react";
import { getOccupancyTypes } from "services/helperServices";
import { get_community_members } from "store/actions/communityMembers";
import { dispatchStore } from "helpers/utils";

const CommunityMembersModal = ({show, toggleClose}:any) => {

  const [ communityMembers, setCommunityMembers ] = useState([])
  const [ occupancyTypes, setOccupancyTypes ]= useState<any>()
  const [ searchText, setSearchText ] = useState('')

  const [ loading, setLoading  ] = useState(false)
    const headers = [
        <input type="checkbox" />,
        "Member",
        "User Type",
        "Phone Number",
        "Status",
      ];

      // const [communityMembers, communityMenbersloading, CommunitymembersError] =
      // useFetch(getCommunityMembers);

      const stateCommunityMembers = useSelector((state:any) => state.members)
      
    // console.log(communityMembers);

    useEffect(()=> {
      setCommunityMembers(stateCommunityMembers)
    },[stateCommunityMembers])

    const [ options, selectOption ] = useState<any>()

    const handleChange =(selected:any)=> {
      selectOption(selected)
      console.log(selected)

      let data = {
        occupancy_type_id : selected.map((el:any) => el.value)
      }
      setLoading(true)
      searchFilterCommunityMembers(data).then(
        res => {
          setLoading(false)
          setCommunityMembers(res.data.results)
        }
      )
    }

    const search = () => {
      let data = { search_text : searchText }
      setLoading(true)
      searchFilterCommunityMembers(data).then(
        res => {
          setLoading(false)
          setCommunityMembers(res.data.results)
        }
      )
    }

    useEffect(()=> {
      getOccupancyTypes().then(
        res => {
          setOccupancyTypes(res.data.results)
          let data = res.data.results
          for( let i =0; i< data.length; i++){
            let test = { value: data[i].id, label: data[i].name }
            setOccupancyTypes((prev:any) => {
              return [...prev, test]
            })
            
          }
        }
      )
    },[])



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
              
              {/* <Select
                name={undefined}
                list={[
                  'Tenant', 'Landloard', 'Facility Mananger', 'Developer', 'Property Owner', 'Staff'
                ]}
                label={""}
                placeholder="Select Member Type"
                register={() => {}}
              /> */}

                <ReactSelect
                          options={occupancyTypes}
                          isMulti
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          components={{
                            Option
                          }}
                          onChange={handleChange}
                          value={options}
                          // allowSelectAll={true}
                        />
            </div>
            <form className="bg-[#F9F9FB] flex w-3xl h-fit py-2 px-4 rounded-lg">
              <button type="button" onClick={search}>
                {SVGs.search}
              </button>
              <input
                type="text"
                value={searchText}
                onChange={(e:any)=>setSearchText(e.target.value)}
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
                {loading && 'Loading results...'}
                {!loading && communityMembers.length > 0 ?
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
                  )) : !loading && 'No Results found'}
              </tbody>
            </table>
          </div>
          <div className="w-80 flex mt-5 float-right mb-8">
            <Button type="submit" title="Save" />
            <Button type="submit" onClick={toggleClose} title="Cancel" secondary />
          </div>
        </div>
      </ModalLarge>
    )
}

export default CommunityMembersModal