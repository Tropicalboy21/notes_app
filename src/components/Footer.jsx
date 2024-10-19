import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p><a className='a-link' href='https://lenin-ugalde-portafolio.web.app/'>Lenin Ugalde</a> | Copyright ⓒ {currentYear}</p>
        </footer>
    );
}

export default Footer;

