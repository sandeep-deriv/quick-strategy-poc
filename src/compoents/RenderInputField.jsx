import { is_valid_condition } from "../condition-validation";
import { INPUT_TYPES } from "../constants";
import CustomInput from "./CustomInput";

const RenderInputField = ({
    item,
    handleInputChange,
    formData,
    errors,
    selected,
}) => {
    const { type, name, label, limit, options, conditions } = item;
    if (type === INPUT_TYPES.GROUP) return <p>{label}</p>;
    else if (
        conditions &&
        !is_valid_condition({ conditions, currentFormData: formData[selected] })
    ) return null;
    return (
        <CustomInput
            type={type}
            name={name}
            label={label}
            limit={limit}
            options={options}
            handleInputChange={handleInputChange}
            value={formData[selected]?.[name]}
            error={errors[`${selected}.${name}`]}
        >
            {label}
        </CustomInput>
    );
};

export default RenderInputField;
