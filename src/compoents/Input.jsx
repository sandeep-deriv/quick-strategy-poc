import { useRef, useState } from 'react';

const Input = ({ type, name, value = '', placeholder, label, forwardedref }) => {
    const [input, setInput] = useState(value);
    const onChange = (e) => {
        // if there is any data validation, it should be here
        const { value } = e.target;
        setInput(value);
    }

    const getValue = () => {
        return input
    }

    return (
        <input
            ref={forwardedref}
            type={type}
            name={name}
            value={input}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default Input;

export const getInput = ({ type, name, value, placeholder, ref }) => {
    return <Input
        forwardedref={ref}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
    />
}