import React from 'react'
import "./Navbar.css"
//components
import {NavLink, Link, useNavigate} from "react-router-dom"
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs'

import { useAuth } from "../../hooks/useAuth"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {logout, reset} from "../slices/authSlice";

function Navbar() {
    const {auth} = useAuth();
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    const dispatch = useDispatch();

    const handlelogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    }

    const handleQuery = (e) => {
        e.preventDefault();
        
        if (query) {
            return navigate(`/search?q=${query}`);
        }
    }


  return (
    <nav id="nav">
        <Link to = "/">Reactgram</Link>
        <form id = "search-form" onSubmit={handleQuery}>
            <BsSearch></BsSearch>
            <input type="text" placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value)}/>
        </form>

        <ul id="nav-links">

            {auth ? (
            <>
            
            <li>
                <NavLink to = "/">
                    <BsHouseDoorFill/>
                </NavLink>
            </li>
            {user ? (
                <li>
                    <NavLink to = {`/users/${user._id}`}>
                        <BsFillCameraFill/>
                    </NavLink>
                </li>
            ) : (<></>)}

            <li>
                <NavLink to = "/profile">
                    <BsFillPersonFill/>
                </NavLink>
            </li>

            <li>
                <span onClick={handlelogout}>Sair</span>
            </li>
            
            </> ): (
                <>
                    <li>

                    <NavLink to = "/login">
                        Entrar
                    </NavLink>
                    </li>
                    <li>

                    <NavLink to = "/register">
                        Cadastrar
                    </NavLink>
                    </li>
                
                
                </>)
            }
            
            
            
        </ul>

    </nav>
  )
}

export default Navbar