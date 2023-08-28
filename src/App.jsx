import { useReducer, useState } from "react";
import config from "./config";
import CustomInput from "./compoents/CustomInput";

// Reducer function to handle form state changes
function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.fieldName]: action.fieldValue };
    default:
      return state;
  }
}

function App() {
  const [selected, setSelected] = useState("martingale");
  const initialState = config[selected]?.flat()?.reduce((acc, curr) => {
    acc[curr.name] = curr.initial_value;
    return acc;
  }, {});
  const [formData, dispatch] = useReducer(formReducer, initialState);

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
      <ChildApp
        form={config[selected]}
        formData={formData}
        dispatch={dispatch}
      />
    </div>
  );
}

const RenderInputField = ({ item, handleInputChange, formData, errors }) => {
  const { type, name, label, limit, options } = item;
  return (
    <CustomInput
      type={type}
      name={name}
      label={label}
      limit={limit}
      options={options}
      handleInputChange={handleInputChange}
      value={formData[name]}
      error={errors[name]}
    >
      {label}
    </CustomInput>
  );
};

const ChildApp = ({ form, formData, dispatch }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const fieldConfig = form?.flat()?.find((field) => field.name === name);
    if (fieldConfig) {
      const { limit } = fieldConfig;
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Value cannot be empty",
        }));
        return;
      } else if (limit && value) {
        if (value < limit.min) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: `Value cannot be greater than ${limit.max}`,
          }));
          return;
        } else if (value > limit.max) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: `Value cannot be greater than ${limit.max}`,
          }));
          return;
        }
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", fieldName: name, fieldValue: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("test formData", formData);
    console.log("test errors", errors);
  };

  return (
    <div>
      <div>
        {form?.map((item, index) => {
          if (Array.isArray(item)) {
            return (
              <div className="input__group" key={index + "outer"}>
                {item.map((i) => {
                  const { name } = i;
                  return (
                    <RenderInputField
                      key={name + index}
                      item={i}
                      handleInputChange={handleInputChange}
                      formData={formData}
                      errors={errors}
                    />
                  );
                })}
              </div>
            );
          }
          const { name } = item;
          return (
            <RenderInputField
              key={name + index}
              item={item}
              handleInputChange={handleInputChange}
              formData={formData}
              errors={errors}
            />
          );
        })}
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
