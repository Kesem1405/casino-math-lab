import React from 'react';
import '../../../../Styles/Chip.css';
const Chip = ({ position, icon }) => {
    return (
        <div
            className={`chip ${position}`}
            style={{ backgroundImage: icon !== undefined ? `url("${icon}")` : '' }}
        />
    );
};
Chip.defaultProps = {
    icon: undefined,
};
export default Chip;