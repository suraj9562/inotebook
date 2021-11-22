import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

const Navbar = () =>  {
  const location = useLocation();
  const history = useHistory();
  
  const logOut = async(e) =>{
    e.preventDefault();
    await localStorage.removeItem('token');
    history.push('/login');
  }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* fixed-top */}
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              I-NoteBook
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">
                    About
                  </Link>
                </li>
              </ul>
              
              {!localStorage.getItem('token') ? <div><Link className="btn btn-outline-primary m-2" to="/login">Login</Link> <Link className="btn btn-outline-primary m-2" to="/signup">SignUp</Link> </div> : <button onClick={logOut} className="btn btn-outline-primary m-2">Log Out</button>}
            
              {/* <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary" type="submit">
                  Search
                </button>
              </form> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }

export default Navbar;
