import { useState } from "react";
import styled from '@emotion/styled';

const Campus = ({ name }) => {
    return (
        <div 
            style={{ 
                color: "#3C3C3C",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "-0.28px",
                marginTop: "3px"
            }}
        >
            <span style={{ margin: "0 7px" }}>{name}</span>
        </div>
    );
};

export const useToggle = () => {
    const [isOn, setIsOn] = useState(true);

    const toggleSwitch = () => setIsOn(!isOn);

    const Toggle = () => (
        <Switch onClick={toggleSwitch}>
            {isOn && <Campus name="명륜" />}
            <div
                style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "white",
                    borderRadius: "40px",
                }}
            />
            {!isOn && <Campus name="율전" />}
        </Switch>
    );

    return { Toggle, isOn };
};

const Switch = styled.div`
    width: 71px;
    height: 32px;
    background-color: #FFDF56;
    display: flex;
    justify-content: space-between;
    border-radius: 16px;
    padding: 4px;
    cursor: pointer;
`