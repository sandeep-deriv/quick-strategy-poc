import { useEffect, useReducer, useState } from "react";
import config from "./config";
import FormController from "./compoents/FormController";
import { INPUT_TYPES } from "./constants";

// Reducer function to handle form state changes
function formReducer(state, action) {
  const { selected, initialState, fieldName, fieldValue, type } = action;
  switch (type) {
    case "UPDATE_SELECTED":
      return { ...state, [selected]: { ...initialState, ...state[selected] } };
    case "UPDATE_FIELD":
      return {
        ...state,
        [selected]: { ...state[selected], [fieldName]: fieldValue },
      };
    default:
      return state;
  }
}

function App() {
  const [selected, setSelected] = useState("martingale");

  const [formData, dispatch] = useReducer(formReducer, {});
  useEffect(() => {
    const initialState = config[selected]?.flat()?.reduce((acc, curr) => {
      if (curr.type === INPUT_TYPES.GROUP) return acc;
      acc[curr.name] = curr.initial_value;
      return acc;
    }, {});

    dispatch({
      type: "UPDATE_SELECTED",
      selected: selected,
      initialState: initialState,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <select
        onChange={handleSelect}
        value={selected}
        className="input__select"
      >
        <option value="martingale">Martingale</option>
        <option value="dalembert">Dalembert</option>
        <option value="oscars">Oscars</option>
        <option value="shafin">Shafin</option>
      </select>
      <FormController
        form={config[selected]}
        formData={formData}
        dispatch={dispatch}
        selected={selected}
      />
    </div>
  );
}

export default App;
