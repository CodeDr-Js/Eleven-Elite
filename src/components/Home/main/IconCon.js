import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';


const IconCon = ({image, text, link, onClick}) => {
  return (
    <>
      <Link
        onClick={onClick}
        to={link}
        className="icon-div rounded-3 d-flex flex-column align-items-center bg-transparent"
      >
        <img className="main-icon" src={image} />
        <p className="main-text text-center main-color bg-transparent">{text}</p>
      </Link>
    </>
  );
}

export default IconCon