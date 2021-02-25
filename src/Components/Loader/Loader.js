import React from 'react';
import './Loader.scss';

const Loader = (props) => {
    return (
        <div className="loader-wrapper">
            <div className="floor"></div>
            <div className="ball">
                <div className="ball-line"></div>
                <div className="ball-line"></div>
                <div className="ball-line"></div>
                <div className="ball-line"></div>
            </div>
        </div>
    )
}

export default Loader;