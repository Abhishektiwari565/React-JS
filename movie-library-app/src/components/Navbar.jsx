import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">🎬 Movie App</Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-outline-light" to="/add">Add Movie</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;