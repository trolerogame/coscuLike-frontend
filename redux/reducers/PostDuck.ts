import axios from "axios";
import { GET_POSTS,URL_POSTS } from "../types";

let initialState = {
  Posts: [],
};

export default function reducer(state = initialState, action: any) {
  const { payload, type } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, Posts: payload };
    default:
      return state;
  }
}

const GetPost = () => async (dispatch: any, getState: any) => {
  //? obtenemos todas las imagenes que esten en la base de datos y las guardamos en un array para leugo mostrarlas
  return await axios.get(URL_POSTS).then((res) => {
    dispatch({
      type: "GET_POSTS",
      payload: res.data,
    });
  });
};
//? si el usuario tiene el token , se llama  a la api de creacion de imagen, se le pasa los datos y si todo sale bien lo  que obtenemos de la llamada a la api se guarda en el localstorage y retorna true
const createPost =
  (dates: any, description: string) => async (dispatch: any, getState: any) => {
    const { User } = getState();
    const config = {
      headers: {
        token: User.token,
      },
    };
    try {
      // const resPy = await  axios.post("http://127.0.0.1:5000/",dates)
      // if(resPy.data === "cocu 😍"){
        const { data } = await axios.post(
          `${URL_POSTS}uploadCloud`,
          dates
        );
        const userUpdate = await axios.post(
          `${URL_POSTS}create`,
          { description, url: data },
          config
        );
        window.localStorage.setItem("user", JSON.stringify(userUpdate.data));
        return true;
      // }
    //  return false 
    } catch (err) {
      console.log("no iniciaste seccion");
      return false;
    }
  };
//? Edita la descripcion del usuario , como parametros se necesita la id de la imagen
const editImage =
  (_id: string, description: string) =>
  async (dispatch: any, getState: any) => {
    const { User } = getState();
    const config = {
      headers: {
        token: User.token,
      },
    };
    try {
      await axios.patch(
        `${URL_POSTS}update/${_id}`,
        { description },
        config
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
//? elimina la imagen con el _id como parametro para buscar la imagen a eliminar
const deleteImage = (_id: string) => async (dispatch: any, getState: any) => {
  const { User } = getState();
  const config = {
    headers: {
      token: User.token,
    },
  };
  try {
    await axios.delete(`${URL_POSTS}delete/${_id}`, config);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
//? al darle click en el corazon llama a esta funcion que llama a la api que se encarga de dar like, y el cambia lo guarda en el estado
const likePost =
  (_id: string) =>
  async (dispatch: any, getState: any): Promise<boolean> => {
    const token = getState();
    const config = {
      headers: {
        token: token.User.token,
      },
    };
    try {
      const res = await axios.post(
        `${URL_POSTS}image/${_id}`,
        {},
        config
      );
      dispatch({
        type: "GET_POSTS",
        payload: res.data,
      });
      return true;
    } catch (err) {
      console.log("no esta logeado");
      return false;
    }
  };
export { GetPost, likePost, createPost, deleteImage, editImage };
