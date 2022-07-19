import Button from "components/Button";
import Modal from "components/Modal";
import { entryExit } from "services/gates";

const EntryExitModal = ({ showExtra, setShowExtra, code, gate }: any) => {
  const handleEntryExit = (which: any) => {
    const data = {
      gate_id: gate,
      code: code,
      entry_or_exit: which,
    };

    entryExit(data).then((res: any) => {
      console.log(res.data);
      setShowExtra(false);
    });
  };

  return (
    <Modal show={showExtra} toggleClose={() => setShowExtra(false)}>
      <h4 className="mt-8 ml-8 text-left">Entry/Exit Capture</h4>
      <hr className="my-6 absolute w-full left-0" />

      <div className="p-10">
        <p className="my-10 text-left">
          Is the person entering or exiting the estate?
        </p>

        <div className="w-fit float-right mb-8">
          <div className="flex w-full gap-10">
            <div className="w-[100px]">
              <Button
                type="button"
                title="Entry"
                onClick={() => handleEntryExit("ENTRY")}
              />
            </div>
            <div className="w-[100px]">
              <Button
                type="button"
                title="Exit"
                onClick={() => handleEntryExit("EXIT")}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EntryExitModal;
