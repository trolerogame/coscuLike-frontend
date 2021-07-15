/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { ValidateInput } from "../../function/formValidate";
const inputs = ({username,password,email,userExis,setPassword,setEmail,setUsername}:any) => {
  return (
    <div>
      {!userExis && (
        <p className="text-danger text-center">Ese usuario ya existe</p>
      )}
      <div className="my-4">
        <label htmlFor="username" className="form-label">
          Usuario
        </label>
        <input
          type="text"
          id="username"
          placeholder="Ingrese un nombre de usuario"
          className="form-control"
          value={username.camp}
          onChange={(e) => setUsername({ ...username, camp: e.target.value })}
          onKeyUp={() =>
            ValidateInput(
              username.expression,
              username.camp,
              setUsername,
              username
            )
          }
        />
        {username.validate === false && (
          <p className="text-danger">
            el usuario solo debe contener Letras, numeros, guion y guion_bajo
          </p>
        )}
      </div>
      <div className="my-4">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="ingrese su email"
          value={email.camp}
          className="form-control"
          onChange={(e) => setEmail({ ...email, camp: e.target.value })}
          onKeyUp={() =>
            ValidateInput(email.expression, email.camp, setEmail, email)
          }
        />
        {email.validate === false && (
          <p className="text-danger">el email es incorrecto</p>
        )}
      </div>
      <div className="my-4">
        <label htmlFor="password" className="form-label">
          Contrasenia
        </label>
        <input
          type="password"
          id="password"
          placeholder="ingrese una contrasenia"
          value={password.camp}
          name="password"
          autoComplete="on"
          className="form-control"
          onChange={(e) => setPassword({ ...password, camp: e.target.value })}
          onKeyUp={() =>
            ValidateInput(
              password.expression,
              password.camp,
              setPassword,
              password
            )
          }
        />
        {password.validate === false && (
          <p className="text-danger">
            la contrasenia debe tener entre 7 y 14 digitos
          </p>
        )}
      </div>
    </div>
  );
};
export default inputs;
