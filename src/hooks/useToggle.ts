import { useState } from "react";

function useToggle(defaultValue: any) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(arg: any) {
    setValue((currentState: any) => (arg ? arg : !currentState));
  }

  return [value, toggleValue];
}

export default useToggle;
