import React from 'react'
import {Dropdown} from "react-bootstrap"
import { Elipse } from '../../styles/style-header'
import {connect} from "react-redux"
import {DropdownToggle} from "../../styles/style-header"
import CopyLink from "./copyLink"
import {deleteImage,GetPost} from "../../redux/reducers/PostDuck"
import { getUserById,getUser } from '../../redux/reducers/UserDuck'
const CardPostDropdown = ({post,config,deleteImage,setEditValidate,GetPost,getUserById,getUser}:any) => {
    //? si el usuario se pudo eliminar correctamente se redirreciona al home
    const DeleteUser = () => {
        deleteImage(post._id).then((res:boolean) => {
            if(res) {
                GetPost()
                getUserById().then(()=> getUser())
                document.location.href="/"
            }
        })
    }
    return (
        <Dropdown>
            <DropdownToggle variant="none" id={post._id} title="Mas" className="d-flex align-items-center flex-column justify-content-center btn">
                <Elipse/>
                <Elipse/>
                <Elipse/>
            </DropdownToggle>
            <Dropdown.Menu>
                {!config && (
                    <Dropdown.Item >
                        <CopyLink text={`https://coscu-node.herokuapp.com/public/avatar/${post.url}`}/>
                    </Dropdown.Item>
                )}
                {config && (
                    <>
                        <Dropdown.Item><CopyLink text={`https://coscu-node.herokuapp.com/public/avatar/${post.url}`}/></Dropdown.Item>
                        <Dropdown.Item  onClick={() => setEditValidate(true)}>editar descripcion</Dropdown.Item>
                        <Dropdown.Item onClick={DeleteUser}>eliminar imagen</Dropdown.Item>
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}
function mapStateToProps(state:any){
    return {
        User: state.User.user
    }
}
export default connect(mapStateToProps,{deleteImage,GetPost,getUserById,getUser})(CardPostDropdown)
