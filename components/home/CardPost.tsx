import React, { useState } from "react";
import { CardPost as Card, ButtonMore } from "../../styles/style-header";
import Image from "next/image";
import CardPostDropdown from "./CardPostDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import { likePost } from "../../redux/reducers/PostDuck";
import { getUserById, getUser } from "../../redux/reducers/UserDuck";
import UserUndefined from "../../public/usernameUndefine.png";
import EditImage from "../forms/EditImage";
import {urlUpload} from '../../redux/types'
const CardPost = ({
  user,
  postInfo,
  likePost,
  author,
  getUserById,
  getUser,
  avatar,
}: any) => {
  const [editValidate, setEditValidate] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(postInfo.description);
  let validate: boolean = false;
  //? busca en array de likes en el post, si el usuario esta dentro, marca corazon, sino lo desmarca
  if (user)
    validate =
      postInfo.likes && postInfo.likes.find((info: any) => info === user._id);
  //? se llama a la funcion likePost al tocar el boton de dar like, si todo sale bien llama a la funcion getUser para que pinte todo dehuelta, sino tiene el token redirreciona a login
  const Like = () => {
    if (user) {
      likePost(postInfo._id).then(async (res: boolean) => {
        if (res) getUserById().then(() => getUser());
        if (!res) document.location.href = "/login";
      });
    }
    if (!user) document.location.href = "/login";
  };

  return (
    <Card className="shadow-lg my-5" >
      <div className="my-3 d-flex justify-content-between px-3">
        <div className="d-flex align-items-center">
          {avatar && (
            <Image
              loader={({ src }: any) =>
                urlUpload + src
              }
              src={"/" + avatar}
              alt="title"
              className="imgProfile"
              width={60}
              height={60}
            />
          )}
          {!avatar && (
            <Image
              src={UserUndefined}
              alt="title"
              className="imgProfile"
              width={60}
              height={60}
            />
          )}

          <p className="my-0 mx-4">{author}</p>
        </div>
        {user && (
          <>
            <CardPostDropdown
              post={postInfo}
              config={author === user.username}
              setEditValidate={setEditValidate}
            />
          </>
        )}
      </div>
      <Image
        loader={({ src }: any) =>  urlUpload + src }
        src={"/" + postInfo.url}
        width={380}
        height={200}
        sizes={"100vw"}
        loading={"lazy"}
        alt=""
      />
      <div className="d-flex mx-4 align-items-center my-2">
        <ButtonMore className="btn" onClick={Like} title="Me gustas">
          {validate 
            ?
            <FontAwesomeIcon icon={faHeart} style={{ color: "#e74c3c" }} />
            :
            <FontAwesomeIcon icon={farHeart} style={{ color: "#e74c3c" }} />
          }
        </ButtonMore>
        <p className="mx-2 mb-0">
          {postInfo.likes && postInfo.likes.length} Me gustas
        </p>
      </div>
      <div>
        {/*comprueba si estamos en el modo edicion de la descripcion de la  foto , si lo estamos muestra el componente EditImage sino simplemente muestra la description*/}
        {!editValidate ? (
          <p className="mx-4 mt-1 mb-4">
            <b className="text-dark">{postInfo.description && author + ":"}</b>
            {postInfo.description}
          </p>
        ) : (
          <EditImage
            _id={postInfo._id}
            setEditValidate={setEditValidate}
            description={description}
            setDescription={setDescription}
          />
        )}
      </div>
    </Card>
  );
};
function mapStateToProps(state: any) {
  return {
    user: state.User.user,
  };
}
export default connect(mapStateToProps, { likePost, getUserById, getUser })(
  CardPost
);
