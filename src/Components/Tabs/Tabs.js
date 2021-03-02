import React from 'react';
import "./Tabs.scss";

const Tabs = ({ tabValue, tabClick, activeTab, tabDataValue }) => {

    let activeClass;

    if (tabDataValue === activeTab) {
        activeClass = 'active';
    }

    return (
        <li className={activeClass} data-value={tabDataValue} onClick={tabClick}>
            <span>{tabValue}</span>
        </li>
    )
}
export default Tabs;