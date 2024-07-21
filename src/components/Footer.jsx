import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p><a className='a-link' href='https://tropicalboy21.github.io/portafolio/portafolio.html'>Lenin Ugalde</a> | Copyright ⓒ {currentYear}</p>
        </footer>
    );
}

export default Footer;

