import React from 'react'
import "./Auth.css"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {login, reset} from "../../slices/authSlice"
import Message from '../../components/Message';

import { useDispatch, useSelector } from 'react-redux';
function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading, error} = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    dispatch(login(user));
    
  }

  useEffect(() => {
    dispatch(reset());


  }, [dispatch])
  return (
    <div id = "login">
      <h2>Reactgram</h2>
      <p className='subtitle'>Faça o login para ver o que há de novo.</p>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
        {!loading && <input type = "submit" value={"Entrar"}></input>}
        {loading && <input type="submit" value = "Aguarde..." disabled></input>}
        {error && <Message message={error} type={"error"}></Message>}
      </form>

      <p>Não tem uma conta? <Link to = "/register">Clique aqui</Link></p>

      

    </div>
  )
}

export default Login