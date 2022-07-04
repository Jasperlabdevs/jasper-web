import Button from "components/Button";
import Header from "components/Header";
import SVGs from "helpers/SVGs";
import img from "assets/images/gate.png";
import { TableColumn, TableHeader } from "components/Table";
import { useEffect, useState } from "react";
import { dispatchStore } from "helpers/utils";
import { get_gate } from "store/actions/gates";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import GateFormModal from "./GateFormModal";
import ShowURLModal from "./ShowURLModal";

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

  const stateGates = useSelector((state: any) => state.gates);
  const stateCommunity = useSelector((state: any) => state.community);

  const [loading, setLoading] = useState(true);

  const [gates, setGates] = useState(stateGates);
  const [showGate, setShowGate] = useState(false);
  const [edit, setEdit] = useState(true);
  const [editID, setEditID] = useState("");

  const reformatDate = (date: string) => {
    const d = new Date(date);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();

    return mm + "/" + dd + "/" + yyyy;
  };


  const editGate = (id: any) => {
    setShowGate(true);
    setEditID(id);
    setEdit(true);
  };

  const closeModal = () => {
    setEdit(false);
    setEditID('')
    setShowGate(false);
  };

  useEffect(() => {
    if (stateGates.length === 0) {
      dispatchStore(get_gate(stateCommunity.id, setLoading));
    }
  }, []);

  useEffect(() => {
    setGates(stateGates);
  }, [stateGates]);


  const [showURL, setShowURl] = useState(false);

  return (
    <div>
      <Header />
      <Helmet>
        <title>Gates | Jasper</title>
        <meta name="description" content="" />
      </Helmet>
      {showGate && (
       <GateFormModal gates={gates} editID={editID} showGate={showGate} closeModal={closeModal} edit={edit} />
      )}

      {showURL && (
        <ShowURLModal showURL={showURL} setShowURl={setShowURl} stateCommunityID={stateCommunity.id} />
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
            {gates?.map((data: any, index: number) => (
              <tr key={index} className="border-b border-[#C3C9DA]">
                <TableColumn
                  td={<span>{data?.name}</span>}
                  type="user"
                  image={img}
                />

                <TableColumn td={data?.pin} />
                <TableColumn td={data?.phone_number} />
                <TableColumn td={reformatDate(data?.created)} />
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
                  td="Disable"
                  type="button"
                  buttonType="smallPrimary"
                />
                {!!data.gate && (
                  <TableColumn
                    td="View Nested Gate"
                    list={[]}
                    type="dropdown"
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {loading && "Loading Gates..."}
        {!loading && gates.length === 0 && "No Gates available"}
      </div>
    </div>
  );
};

export default Gates;
