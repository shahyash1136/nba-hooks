import React from 'react';
import './Footer.scss';

const footer = (props) => {
    const year = new Date().getUTCFullYear();
    return (
        <footer>
            <div className="footer__top">
            </div>
            <div className="footer__bottom">
                <p>&copy; {year} all rights reserved</p>
            </div>
        </footer>
    );
}

export default footer;