import Button from "components/Button";
import SVGs from "helpers/SVGs";
import { useState } from "react";

const SearchFilter = ({ handleSearch, toggleFilter }: any) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex items-center gap-4">
      <form className="bg-[#F9F9FB] flex w-3xl py-2 px-4 rounded-lg">
        <button type="button" onClick={() => handleSearch(searchText)}>
          {SVGs.search}
        </button>
        <input
          type="text"
          className="ml-2 outline-none px-2 w-3xl bg-[#F9F9FB] py-3"
          placeholder="Search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
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
