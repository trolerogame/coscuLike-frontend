/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Form from "../components/registerAndLogin";
import { connect } from "react-redux";
import { createuser } from "../redux/reducers/UserDuck";
import Link from "next/link";
import Inputs from "../components/forms/inputs";
const Register = ({ createuser }: any): any => {
  const [userExis, setUserExit] = useState(true);
  const [username, setUsername] = useState({
    camp: "",
    validate: null,
    expression: /^[a-zA-Z0-9_-]{4,16}$/,
  });
  const [email, setEmail] = useState({
    camp: "",
    validate: null,
    expression: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  });
  const [password, setPassword] = useState({
    camp: "",
    validate: null,
    expression: /^.{4,12}$/,
  });

  const SubmitCreateUser = (e: any) => {
    //? si todo es correcto se llama a la funcion que crea el usuario y este  devuelve un boolean, si es true redirreciona a la pagina de login
    e.preventDefault();
    if (username.validate && password.validate && email.validate) {
      createuser(username.camp, password.camp, email.camp).then(
        (va: boolean) => {
          if (va) return (window.location.href = "/login");
          setUserExit(false);
        }
      );
    }
  };
  return (
    <Form header="Registrate" title="register">
      <form action="" onSubmit={SubmitCreateUser}>
        <Inputs
          username={username}
          setUsername={setUsername}
          setEmail={setEmail}
          email={email}
          password={password}
          setPassword={setPassword}
          userExis={userExis}
        />
        <button className="btn btn-primary w-100 mt-5">Crear usuario</button>
      </form>
      <p className="text-center mt-3">
        si ya tienes una cuenta inicia session <Link href="/login">Aqui</Link>
      </p>
    </Form>
  );
};
function mapStateToProps(state: any) {
  return {
    token: state.User.user,
  };
}
export default connect(mapStateToProps, { createuser })(Register);
