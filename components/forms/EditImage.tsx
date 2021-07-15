import React from "react"
import {connect} from "react-redux"
import {editImage,GetPost} from "../../redux/reducers/PostDuck"
import {getUser,getUserById} from "../../redux/reducers/UserDuck"
const EditImage = ({
  _id,
  setEditValidate,
  description,
  setDescription,
  editImage,
  GetPost,
  getUser,
  getUserById 
}: any) => {
  //? llama a l a funcion editImage , si se puede eliminar la imagen llama dehuelta a getPost, getUserById y limpia los hooks, al llamar getUserById cuando se termine de llamar llama a la funcion getUser, esto se hace para que ser reescriba todo
  const EditImageSubmit = (e:any) => {
    e.preventDefault();
    editImage(_id,description).then((res:boolean)=> {
        if(res) {
            GetPost()
            getUserById().then(()=> getUser())
            setEditValidate(false)
            setDescription(description)
        }
    })
  }
  return (
    <form className="mx-4 mt-1 mb-4" onSubmit={EditImageSubmit}>
      <div className="d-block">
        <textarea
          className="w-100 form-control my-2"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button
          className="btn btn-danger"
          //? reinicia los hooks
          onClick={() => {
            setEditValidate(false)
            setDescription(description)
          }}
        >
          close
        </button>
        <button className="btn btn-primary">Editar</button>
      </div>
    </form>
  )
}
function mapStateToProps(){
    return {}
}
export default connect(mapStateToProps,{editImage,GetPost,getUser,getUserById})(EditImage)