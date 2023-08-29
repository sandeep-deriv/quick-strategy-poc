import { useState } from "react";
import RenderInputField from "./RenderInputField";
import { is_valid_condition } from "../condition-validation";

const FormController = ({ form, formData, dispatch, selected }) => {
    const [errors, setErrors] = useState({});

    const is_field_valid = (name, value) => {
        const fieldConfig = form?.flat()?.find((field) => field.name === name);
        if (fieldConfig) {
            const { limit, required } = fieldConfig;
            if (!value && required) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [`${selected}.${name}`]: "Value cannot be empty",
                }));
                return false;
            } else if (limit && value) {
                if (value < limit.min || value > limit.max) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [`${selected}.${name}`]: `Value must be between ${limit.min} and ${limit.max}`,
                    }));
                    return false;
                }
            }
            setErrors((prevErrors) => {
                prevErrors[`${selected}.${name}`] &&
                    delete prevErrors[`${selected}.${name}`];
                return { ...prevErrors };
            });
        }
        return true;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "UPDATE_FIELD",
            selected,
            fieldName: name,
            fieldValue: value,
        });
        is_field_valid(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const final_form = form?.flat()?.filter((field) => {
            const { conditions, type } = field;
            if (
                type === "group" ||
                (conditions && !is_valid_condition({ conditions, currentFormData: formData[selected] }))
            ) {
                return false;
            }
            return true;
        });

        let is_all_field_valid = true
        const final_data = {}
        final_form?.forEach((field) => {
            if (!is_field_valid(field.name, formData[selected]?.[field.name])) is_all_field_valid = false;
            final_data[field.name] = formData[selected]?.[field.name]
        });

        if (is_all_field_valid) {
            console.log("=> form value", final_data);
        }
    };

    return (
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
                                        selected={selected}
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
                        selected={selected}
                    />
                );
            })}
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default FormController;
