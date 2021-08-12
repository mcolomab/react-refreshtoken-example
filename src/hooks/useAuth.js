import React from "react";
import { AuthContext } from "../providers/authProvider";

export default function useAuth() {
    return React.useContext(AuthContext);
}