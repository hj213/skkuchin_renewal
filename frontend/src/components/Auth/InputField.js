import React from "react";

const InputField = (props) => {
    const { label, name, type, value, onChange, error } = props;
    return (
        <div>
            <label>{label}</label>
            <input 
                name={name} 
                type={type} 
                value={value} 
                onChange={onChange}
            />
            {error && <p>{error}</p>}
        </div>
    );
};

export default InputField;
