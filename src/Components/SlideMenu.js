import React from 'react'
import { NavLink } from 'react-router-dom'
import './component.css'
import logo from '../images/logo.png'
function SlideMenu() {

    return (
        <>

            <div className="slide-menu">
                <div className="logo-div d-none">
                    <img src={logo} className="logo" alt="logo" />
                </div>
                <div className="logo-div"><h3>eKisan Darshan</h3></div>
                <div className="navigation">
                    <ul>
                        <li><NavLink activeClassName="navigation-active" exact to="/users"><i className="fa fa-users"></i>Users</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/manage-item"><i className="fa fa-plus"></i>Manage Item</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/"><i className="fa fa-cog"></i>General Settings</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/manage-orders"><i className="fa fa-edit"></i>Manage Orders</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/edit-categories"><i className="fa fa-edit"></i>Edit Categories </NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/"><i className="fa fa-globe"></i>Languages</NavLink></li>
                        <li><NavLink activeClassName="navigation-active" exact to="/items-to-verify"><i className="fa fa-shapes"></i>Items to verify</NavLink></li>
                    </ul>
                </div>
            </div>


        </>
    )
}

export default SlideMenu
