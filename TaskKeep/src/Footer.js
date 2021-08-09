import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <>
          <footer>
            <h1 style={{fontSize : 15 , color : "white" }}> copyright © {year} </h1>
          </footer>
        </>
    );
};

export default Footer
