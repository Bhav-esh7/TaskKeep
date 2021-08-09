import React from "react";
import logo from "./Images/favicon.png";
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsIcon from '@material-ui/icons/Apps';
import {  Button } from 'react-bootstrap'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from './context/AuthContext';
import { useHistory } from "react-router-dom"


const Header = () => {

    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout(){

        await logout()
        history.push('/')
        
    }
    
    return (
        <>
        <div className = "header">
            <img src = {logo} alt="logo" width="40" height="40" />
            <h1 style={{fontSize : 25}}>My Keep</h1>
            <SearchIcon style={{position: 'absolute', left: 390, top: 25, width: 20, height: 20}}/>
            <input className ="input2" type = "text" placeholder = "Search" autoComplete="off" />
            <div className="col-md-2 d-none-sm">
                <ul className="headerIcons headerIcons list-style-none d-inline-block m-0 p-0">
                    <li className="list-style-none d-inline-block ml-5">
                        <span><RefreshIcon /></span>
                    </li>

                    <li className="list-style-none d-inline-block ml-5">
                    <span><AppsIcon /></span>
                    </li>
                </ul>
            </div>
            <div className="col-md-2 text-right d-none-sm">
                <ul className="headIcons headIcons list-style-none d-inline-block m-0 p-0">
                    <li className="list-style-none d-inline-block ml-3">
                    <Button style={{marginTop : "4px" , marginRight:"4px"}} type="button" onClick={handleLogout}>Log Out</Button>
                    </li>
                    <li className="list-style-none d-inline-block ml-3">
                    <span><AccountCircleIcon /></span>
                    </li>

                </ul>
            </div>
        </div>
        </>
    )
}

export default Header;
