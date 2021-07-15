import axios from "axios";
import { LOG_OUT, GET_USER,EDIT_USER,URL_USER } from "../types";

let initialState = {
  user: {},
  token: "",
};
interface InitialState {
  user: any;
  token: string;
}
interface Action {
  type: string | null;
  payload?: any;
}
interface EditUserType {
  username?:string,
  email?:string, 
  password?:string
}


export default function reducer(
  state: InitialState = initialState,
  action: Action
) {
  const { payload, type } = action;
  switch (type) {
    case GET_USER:
      return { ...state, user: payload.user, token: payload.token };
    case LOG_OUT:
      return initialState;
    case EDIT_USER:
      return { ...state, user: payload}
    default:
      return state;
  }
}

//? obtiene los datos del localstorage y los guarda en el estado
const getUser = () => async (dispatch: any, getState: any) => {
  return dispatch({
    type: "GET_USER",
    payload: {
      token: window.localStorage.getItem("token") as string,
      user: JSON.parse(window.localStorage.getItem("user")!),
    },
  });
};
//? obtiene el username,email,password , los pasa a la api de creacion de usuario y si todo sale bien  retorna true 
const createuser =
  (username: string, password: string, email: string) =>
  async (dispatch: any, getState: any) => {
    try {
      await axios.post(`${URL_USER}register`, {
        username,
        password,
        email,
      });
      return true;
    } catch (err) {
      return false;
    }
};
//? al llamar a la api de login este devuelve el token y el user, estos dos los guardamos en el localstorage y se retorna true
const loginUser =
  (username: string, password: string) =>
  async (dispatch: any, getState: any) => {
    try {
      const res = await axios.post(`${URL_USER}login`, {
        username,
        password,
      });
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("user", JSON.stringify(res.data.loginUser));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
};
//? obtiene el usuario si este tiene el token y lo guarda en el localstorage
const getUserById = () =>async (dispatch: any, getState: any) => {
  const { User } = getState();
  const config = {
    headers: {
      token: User.token,
    },
  };
  try {
    const res = await axios.get(`${URL_USER}info`,config);
    window.localStorage.setItem("user", JSON.stringify(res.data));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
//? limpia el estado y el localstorage
const logOut = () => async (dispatch: any, getState: any) => {
  window.localStorage.clear();
  return dispatch({
    type: "LOG_OUT",
  });
};
//? si el usuario tiene token , este puede acceder a la api que permite editar el usario,  tambien si el usuario es editado lo que devuelve la api se guarda en el localstorage y en el estado
const editUser = (data:EditUserType,avatar:any) => async (dispatch: any, getState: any) => {
  const { User } = getState();
  const config = {
    headers: {
      token: User.token,
    },
  };
  try {
    //?  crea la imagen y la guarda en una mini nube
    const res = await axios.post("http://localhost:3002/post/uploadCloud",avatar);
    const EditUser = await axios.patch(`${URL_USER}update`, {...data,avatar:res.data}, config);
    window.localStorage.setItem("user", JSON.stringify(EditUser.data));
    dispatch({
       type:"EDIT_USER",
       payload:EditUser.data
    })
    return true
  } catch (err) {
    console.log("usted no esta logeado");
    return false 
  }
};
//? si tiene el token, llama a la api que elimina al usuario, limpia el localstorage y limpia el estado
const deleteUser = () => async (dispatch: any, getState: any) => {
  const { User } = getState();
  const config = {
    headers: {
      token: User.token,
    },
  };
  try {
    await axios.delete(`${URL_USER}delete`, config);
    window.localStorage.clear();
    dispatch({
      type: "LOG_OUT",
    });
    return true;
  } catch (err) {
    return false;
  }
};

export { getUser, createuser, loginUser, editUser, logOut, deleteUser,getUserById };
