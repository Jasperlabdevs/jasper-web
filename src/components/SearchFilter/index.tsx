import Button from "components/Button";
import SVGs from "helpers/SVGs";

const SearchFilter = ({ toggleFilter }: any) => {
  return (
    <div className="flex items-center gap-4">
      <form className="bg-[#F9F9FB] flex w-3xl py-2 px-4 rounded-lg">
        <button>{SVGs.search}</button>
        <input
          type="text"
          className="ml-2 outline-none px-2 w-3xl bg-[#F9F9FB] py-3"
          placeholder="Search"
        />
      </form>
      <div className="-mt-10 w-4xl">
        <Button
          onClick={toggleFilter}
          title={
            <span className="flex items-center justify-center gap-2 text-[#fff]">
              {SVGs.filter_white} Filter{" "}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default SearchFilter;
