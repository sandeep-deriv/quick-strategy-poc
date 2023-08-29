import { OPERATORS } from "./constants";

const execute_operations = ({ operator, op1, op2 }) => {
    switch (operator) {
        case OPERATORS.EQUAL:
            return op1 === op2;
        case OPERATORS.NOT_EQUAL:
            return op1 !== op2;
        case OPERATORS.GREATER_THAN:
            return op1 > op2;
        case OPERATORS.GREATER_THAN_OR_EQUAL:
            return op1 >= op2;
        case OPERATORS.LESS_THAN:
            return op1 < op2;
        case OPERATORS.LESS_THAN_OR_EQUAL:
            return op1 <= op2;
        default:
            return false;
    }
};

export const is_valid_condition = ({ conditions, currentFormData }) => {
    if (conditions?.length) {
        const condition = conditions?.every((element) => {
            const { name, value, operator } = element;
            const op1 = `${currentFormData?.[name]}`;
            const op2 = value;
            const result = execute_operations({ operator, op1, op2 });
            return result;
        });
        if (condition) return true;
    }
    return false;
};