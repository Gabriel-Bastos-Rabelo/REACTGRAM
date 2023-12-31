import React from 'react'
import "./Auth.css"

import {Link} from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../../components/Message";

//redux
import {register, reset} from "../../slices/authSlice"



function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user);

    dispatch(register(user));
  }

  //clean all auth states
  useEffect(() => {
    console.log(error)
    dispatch(reset())



  }, [dispatch])
  return (
    <div id = "register">
      <h2>Reactgram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos de seus amigos</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name='Name' placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name}/>
        <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} value={password}/>
        <input type="password" placeholder='Confirme a senha' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
        {!loading && <input type = "submit" value={"Cadastrar"}></input>}
        {loading && <input type="submit" value = "Aguarde..." disabled></input>}
        {error && <Message message={error} type={"error"}></Message>}
      </form>

      <p>
        Já tem conta? <Link to = "/login">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Register