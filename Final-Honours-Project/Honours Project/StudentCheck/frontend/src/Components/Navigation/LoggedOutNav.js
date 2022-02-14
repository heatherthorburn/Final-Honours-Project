/**
 * Empty header for logged out, only displays logo
 */

import React from "react";
import { Link } from "react-router-dom";

export default function LoggedOutNav() {
  return (
    <div className="nav-wrapper header-style flex-vertical-align logged-out-nav">
      <Link className="logged-out-logo header-padding" to="/">
        StudentCheck
      </Link>
    </div>
  );
}
