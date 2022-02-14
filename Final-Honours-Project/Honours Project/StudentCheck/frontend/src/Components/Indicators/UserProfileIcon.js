/**
 * This was used originally in the header, as there was going to be a dropdown user
 * menu. This was not implemented in the end but could be useful for future developments
 */

import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";

export default function UserProfileFunction() {
  return (
    <div className="flex">
      <FaRegUserCircle color="white" />
      <AiFillCaretDown fontSize="smaller" color="white" />
    </div>
  );
}
