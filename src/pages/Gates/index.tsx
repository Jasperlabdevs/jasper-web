import Button from "components/Button";
import Header from "components/Header";
import SVGs from "helpers/SVGs";
import img from "assets/images/gate.png";
import { TableColumn, TableHeader } from "components/Table";
import { useEffect, useState } from "react";
import { dispatchStore } from "helpers/utils";
import { get_all_gates, toggle_gate } from "store/actions/gates";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import GateFormModal from "./GateFormModal";
import ShowURLModal from "./ShowURLModal";
import { formatDate } from "helpers/utils";
import { denestGate, getGate } from "services/gates";
import Toaster from "components/Toaster";
import { useNavigate } from "react-router-dom";

const Gates = () => {
  const headers = [
    "Gates",
    "Gate PIN",
    "Phone Number",
    "Date added",
    "Status",
    "",
    "",
    "",
  ];

  const navigate = useNavigate()

  const stateCommunity = useSelector((state: any) => state.community);

  const [loading, setLoading] = useState(true);
  const [ notification, setNotification ] = useState<NotificationType>({type: undefined, title: '', message: ''})
  const [nested, setNested] = useState(false)
  const [gates, setGates] = useState([]);
  const [showGate, setShowGate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  // const [ notNested, setNotNested ] = useState([])
  const [activeExpand, setActiveExpand] = useState(null);

  const [update, setUpdate] = useState(false);

  const toggle = (id: any) => {
    const data = { gate_id: id };
    dispatchStore(toggle_gate(data));
    setUpdate(!update);
  };

  const stateGates = useSelector((state: any) => state.gates);

  useEffect(() => {
    if (stateGates.length === 0) {
      dispatchStore(get_all_gates(stateCommunity.id, setLoading));
    }
  }, []);

  // console.log(notNested)

  useEffect(() => {
    if (gates.length > 1) {
      setLoading(false);
    }
  }, [gates]);

  const expand = (id: any) => {
    if (id === activeExpand) {
      setActiveExpand(null);
    } else {
      setActiveExpand(id);
    }
  };

  const editGate = (id: any) => {

    if(!gates.some((el:any) => el.id === id) ){
      setNested(true)
    }else{
      setNested(false)
    }
    setShowGate(true);
    setEditID(id);
    setEdit(true);
    // setUpdate(!update);
  };

  const closeModal = () => {
    setEdit(false);
    setEditID("");
    setShowGate(false);
    setUpdate(!update);
  };

  const denest = (id: any) => {
    const data = { gate_id: id };
    // dispatchStore(denest_gate(data));
    denestGate(data).then((res: any) => {
      setUpdate(!update);
      setNotification({
        type: 'success',
        title: 'Denesting Successful',
        message: res.data.message 
      })
    });
  };

  useEffect(() => {
    setLoading(true);
    setGates([]);
    getGate().then((res) => {
      setGates(res.data.results);
      setLoading(false);
    }).catch(
      error => {
        setNotification({
          type: 'error',
          title: 'Kindly Sign In',
          message: error.response.data.detail 
        })

        navigate('/login')
      }
    );
  }, [update, navigate]);

  const [showURL, setShowURl] = useState(false);

  return (
    <div>
      <Header />
      <Helmet>
        <title>Gates | Jasper</title>
        <meta name="description" content="" />
      </Helmet>
      {showGate && (
        <GateFormModal
          gates={stateGates}
          editID={editID}
          showGate={showGate}
          closeModal={closeModal}
          edit={edit}
          nested={nested}
        />
      )}

      {showURL && (
        <ShowURLModal
          showURL={showURL}
          setShowURl={setShowURl}
          stateCommunityID={stateCommunity.id}
        />
      )}

      <div className="px-10 mt-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4>
            Gates{" "}
            <span className="text-white bg-primary rounded-full px-3 text-xs">
              {gates.length}
            </span>{" "}
          </h4>
          <div className="flex gap-4 ">
            <div className="max-w-5xl -mt-10">
              <Button
                title="Show gate URL"
                other
                onClick={() => setShowURl(true)}
              />
            </div>

            <div className="max-w-4xl -mt-10">
              <Button
                title={
                  <span className="flex items-center justify-center gap-2 text-[#fff]">
                    {SVGs.add_white} Add Gate
                  </span>
                }
                onClick={() => setShowGate(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-10">
        <table className="w-full ">
          <thead className="">
            <TableHeader headers={headers} />
          </thead>
          <tbody>
            {gates?.map((data: any) => (
              <>
                <tr key={data?.id} className="border-b border-[#C3C9DA]">
                  <TableColumn
                    td={<span>{data?.name}</span>}
                    type="user"
                    image={img}
                  />

                  <TableColumn td={data?.pin} />
                  <TableColumn td={data?.phone_number} />
                  <TableColumn td={formatDate(data?.created)} />
                  <TableColumn
                    td={data?.is_active ? "Enabled" : "Disabled"}
                    status_type={data?.is_active}
                    type="status"
                  />
                  <TableColumn
                    td="Edit"
                    type="button"
                    onClick={() => editGate(data.id)}
                    buttonType="smallSecondary"
                  />
                  <TableColumn
                    td={data?.is_active ? "Disable" : "Enable"}
                    type="button"
                    buttonType={data?.is_active ? "red" : "smallPrimary"}
                    onClick={() => toggle(data.id)}
                  />
                  {!!data.gate && (
                    <TableColumn
                      onClick={() => expand(data.id)}
                      td="View Nested Gate"
                      list={[]}
                      type="dropdown"
                    />
                  )}
                </tr>
                {activeExpand === data.id && data.gate && (
                  <tr className="bg-faded border-b border-[#C3C9DA]">
                    <TableColumn td={data.gate?.name} />
                    <TableColumn td={data.gate?.pin} />
                    <TableColumn td={data.gate?.phone_number} />
                    <TableColumn td={formatDate(data.gate?.created)} />
                    <TableColumn
                      td={data?.gate?.is_active ? "Enabled" : "Disabled"}
                      status_type={data?.gate?.is_active}
                      type="status"
                    />
                    <TableColumn
                      td="Edit"
                      type="button"
                      onClick={() => editGate(data.gate.id)}
                      buttonType="smallSecondary"
                    />
                    <TableColumn
                      td={data?.gate?.is_active ? "Disable" : "Enable"}
                      type="button"
                      buttonType={
                        data?.gate?.is_active ? "red" : "smallPrimary"
                      }
                      onClick={() => toggle(data?.gate?.id)}
                    />

                    <TableColumn
                      td="Denest"
                      type="button"
                      buttonType="smallSecondary-red"
                      onClick={() => denest(data.id)}
                    />
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {loading && "Loading Gates..."}
        {!loading && gates.length === 0 && "No Gates available"}
      </div>

      <Toaster
        type={notification?.type}
        title={notification?.title}
        message={notification?.message}
      />
      
    </div>
  );
};

export default Gates;
