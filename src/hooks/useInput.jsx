import { useState } from 'react';
import classNames from 'classnames';

const useInput = ({ type, name, label, initial_value, limit, options }) => {
    const [value, setValue] = useState(initial_value);
    const [error, setError] = useState(null);

    const getValue = () => {
        if (limit && value) {
            if (value < limit.min) {
                setError(`Value cannot be less than ${limit.min}`);
                return;
            }
            if (value > limit.max) {
                setError(`Value cannot be greater than ${limit.max}`);
                return;
            }
        }
        if (!value) {
            setError('Value cannot be empty');
            return;
        }
        return {
            [name]: value
        }
    }

    const handleChange = (e) => {
        setError(null);
        setValue(e.target.value);
    }

    const reset = () => {
        setError(null);
        setValue(initial_value);
    }

    const getInput = () => {
        switch (type) {
            case 'text':
                return <input
                    key={type + name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={label}
                    className='input__text'
                />
            case 'select':
                return <select
                    key={type + name}
                    value={value}
                    onChange={handleChange}
                    className='input__select'
                >
                    <option value={null}>{label}</option>
                    {options.map((option) => {
                        return <option key={option} value={option}>{option}</option>
                    }
                    )}
                </select>
            default:
                return null;
        }
    }

    return [
        <>
            <div className={classNames('input', { 'input__error': error })}>
                <span className='input__label'>{label}</span>
                {getInput()}
                <span className='input__error__msg'>{error}</span>
            </div>
        </>,
        getValue,
        reset,
    ]
}

export default useInput;