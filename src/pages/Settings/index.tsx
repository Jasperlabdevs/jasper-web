import Header from "components/Header";
import SettingsHeader from "components/SubHeader";
import { settingsHeaderData } from "helpers/data";
import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <div>
      <Header />
      <SettingsHeader headerData={settingsHeaderData} head={`Settings`} />
      <div className="px-10 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
