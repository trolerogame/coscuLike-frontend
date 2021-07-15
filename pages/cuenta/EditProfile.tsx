import React, { useState } from "react";
import Header from "../../components/header";
import Form from "../../components/registerAndLogin";
import Image from "next/image";
import Inputs from "../../components/forms/inputs";
import { editUser } from "../../redux/reducers/UserDuck";
import { connect } from "react-redux";
const EditProfile = ({ token, editUser }: any) => {
  // if (!token) document.location.href = "/login";
  const [imagePreview, setImagePreview] = useState({
    height: 0,
    width: 0,
    src: "",
  });
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
  const [avatar, setAvatar] = useState<any>("");
  const [imageError, setImageError] = useState<boolean>(true);

//? esta funcion hace la prevista del imagen y gudarda los datos de la imagen y prevista en hooks
  const File = (e: any) => {
    try {
      if(e.target.files[0] && !e.target.files[0].type.match(/image-*/)){
        setImageError(false)
        return
      }
      const fileLoad = new FileReader();
      fileLoad.readAsDataURL(e.target.files[0]);
      fileLoad.onload = () => {
        setImagePreview({
          height: 300,
          width: 300,
          src: fileLoad.result as string,
        });
      };
      const data = new FormData();
      data.append("file", e.target.files[0]);
      setAvatar(data);
      setImageError(true)
    } catch (err) {
      console.log(err)
    }
};
//? si el campo es valido o si campo esta vacion guarda los datos en un objeto y llama a la funcion editUser pasandoe como parametro ese objeto con los datos, y el avatar, si todo sale bien redirreciona al home, sino muestra un mensaje de que allgo salio mal
  const EditProfileSubmit = (e: any) => {
    e.preventDefault();
    if (
      (username.validate || username.camp.length === 0) &&
      (password.validate || password.camp.length === 0) &&
      (email.validate || email.camp.length === 0) &&
      imageError
    ) {
      const data = {
        username: username.camp,
        password: password.camp,
        email: email.camp,
      };
      console.log("caca");
      editUser(data,avatar).then((res:boolean) => {
          if(res) document.location.href = "/"
          if(!res) setUserExit(false)
      });
    }else console.log(imageError)
  }
  return (
    <div>
      <Header />
      <Form header="Editar Perfil" title="Editar Perfil">
        <form encType="multipart/form-data" onSubmit={EditProfileSubmit}>
          <div className="text-center d-flex flex-column align-items-center">
            <h4>Perfil</h4>
            <div>
              <label htmlFor="file" className="btn btn-primary my-3">
                Choose
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={File}
                accept="image/*"
              />
            </div>
            {imagePreview.src && (
              <>
                <Image src={imagePreview} alt="avatar" width={70} height={70} />
                <button
                  className="btn btn-danger my-2 "
                  // reinica el hook
                  onClick={() => {
                    setImagePreview({
                      src: "",
                      width: 0,
                      height: 0,
                    });
                    setAvatar("");
                  }}
                >
                  cancelar
                </button>
              </>
            )}
          </div>
          <Inputs
            username={username}
            setUsername={setUsername}
            setEmail={setEmail}
            email={email}
            password={password}
            setPassword={setPassword}
            userExis={userExis}
          />
          {!imageError && <p className="text-danger m-2">formato de imagen incorrecto</p>}
          <button className="btn btn-primary w-100 mt-5">Editar usuario</button>
        </form>
      </Form>
    </div>
  );
};
function mapStateToProps(state: any) {
  return {
    token: state.User.token,
  };
}
export default connect(mapStateToProps, { editUser })(EditProfile);
