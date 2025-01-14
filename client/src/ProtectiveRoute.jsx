import React from 'react';
import Cookies from "js-cookie"
import {Navigate} from "react-router-dom"
const ProtectiveRoute = ({children}) => {
    const token = Cookies.get("token") //check token in the cookies
    token ? children : <Navigate to="/signin"/> 
}

export default ProtectiveRoute;
