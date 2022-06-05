import Button from "components/Button";
import Header from "components/Header";
import { TableContent } from "helpers/data";
import SVGs from "helpers/SVGs";
import img from "assets/images/gate.png";
import { TableColumn, TableHeader } from "components/Table";

const Gates = () => {

  const headers = [
    "Gates",
    'Gate PIN',
    'Phone Number',
    'Date added',
    'Status',
    '',
    '',
    ''
 ]


  return (
    <div>
      <Header />

      <div className="px-10 mt-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h4>
            Gates{" "}
            <span className="text-white bg-primary rounded-full px-3 text-xs">
              3
            </span>{" "}
          </h4>
          <div className="flex gap-4 ">
            <div className="max-w-3xl -mt-10">
              <Button title="Show gate URL" other />
            </div>

            <div className="max-w-3xl -mt-10">
              <Button
                title={
                  <span className="flex items-center justify-center gap-2 text-[#fff]">
                    {SVGs.add_white} Add Gate
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-10">
        <table className="w-full ">
          <thead className="">
            <TableHeader headers= {headers} />
          </thead>
          <tbody>
            {TableContent.map((data) => (
              <tr className="border-b border-[#C3C9DA]">
                  <TableColumn td={<span>
                    Entry
                  </span>} type='user' image={img} />

                  <TableColumn td='AS12' />
                  <TableColumn td='One-Time Access' />
                  <TableColumn td='3123' />
                  <TableColumn td='Generated' type="status" />
                  <TableColumn td='Edit' type='button' buttonType='smallSecondary' />
                  <TableColumn td='Disable' type='button' buttonType='smallPrimary' />
                  <TableColumn td='View Nested Gate' />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gates;
