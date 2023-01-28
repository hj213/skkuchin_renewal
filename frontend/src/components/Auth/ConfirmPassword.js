import React from "react";

const ConfirmPassword = (props) => {
    const { value, onChange, error } = props;
    return (
        <div>
            <label>Confirm Password</label>
            <input 
                name="confirmPassword" 
                type="password" 
                value={value} 
                onChange={onChange}
            />
            {error && <p>{error}</p>}
        </div>
    );
};

export default ConfirmPassword;
