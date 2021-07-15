/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Form from "../components/registerAndLogin";
import { connect } from "react-redux";
import { loginUser } from "../redux/reducers/UserDuck";
import Link from "next/link";
const Login = ({ token, loginUser }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginExit, setLoginExit] = useState(true);
  //? si el usuario y la contrasenia existen llama a la funcion loginUser y este si todo es correcto redirecciona al home
  const LogIn = (e: any) => {
    e.preventDefault();
    if (username && password) {
      loginUser(username, password).then((validate: boolean) =>
        validate ? (document.location.href = "/") : setLoginExit(validate)
      );
    }
  };

  return (
    <Form header="Inicia Session" title="Log In">
      <form action="" onSubmit={LogIn}>
        {/* en caso de que no existe el usuario no meustre un mensaje */}
        {!loginExit && (
          <p className="text-danger text-center">Ese usuario no existe</p>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="password" className="form-label">
            Contrasenia
          </label>
          <input
            type="password"
            id="password"
            placeholder="ingrese una contrasenia"
            value={password}
            name="password"
            autoComplete="on"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 mt-5" type="submit">
          Crear usuario
        </button>
      </form>
      <p className="text-center mt-4">
        Si no tiene una cuenta registrate <Link href="/register">Aqui</Link>
      </p>
    </Form>
  );
};
function mapStateToProps(state: any) {
  return {
    token: state.User.token,
  };
}

export default connect(mapStateToProps, { loginUser })(Login);
