import React, { useState } from 'react';
import whiteChip from '../../../../Media/images/chips/white-chip.png';
import blueChip from '../../../../Media/images/chips/blue-chip.png';
import blackChip from '../../../../Media/images/chips/black-chip.png';
import cyanChip from '../../../../Media/images/chips/cyan-chip.png';
import '../../../../Styles/Chip.css'

export const chipsMap = {
    whiteChip: {
        icon: whiteChip,
        value: 1,
    },
    blueChip: {
        icon: blueChip,
        value: 10,
    },
    blackChip: {
        icon: blackChip,
        value: 100,
    },
    cyanChip: {
        icon: cyanChip,
        value: 500,
    },
};

export const ChipContainer = ({ onChipChange }) => {
    const [activeChip, setActiveChip] = useState(Object.keys(chipsMap)[0]);

    const handleChipChange = (e) => {
        const chipName = e.currentTarget.dataset.name;
        setActiveChip(chipName);
        onChipChange(chipsMap[chipName].value);
    };

    return (
        <ul className="chips">
            {Object.entries(chipsMap).map(([name, { icon }]) => (
                <li
                    key={name}
                    data-name={name}
                    className={activeChip === name ? 'active' : ''}
                    onClick={handleChipChange}
                >
                    <img width={64} height={64} src={icon} alt="chip" />
                </li>
            ))}
        </ul>
    );
};

export default ChipContainer;