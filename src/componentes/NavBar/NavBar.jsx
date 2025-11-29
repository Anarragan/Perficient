import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">AMARTE</Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link active" to="/home">HOME</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/maps">MAPS</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/garage">GARAGE</Link>
            </li>

            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                STORAGE
              </a>

              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/madera">MADERA</Link></li>
                <li><Link className="dropdown-item" to="/combustible">COMBUSTIBLE</Link></li>
                <li><Link className="dropdown-item" to="/acero">ACERO</Link></li>
              </ul>

            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
