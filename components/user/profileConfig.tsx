import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {Dropdown} from  "react-bootstrap";
import {DropdownToggle} from "../../styles/style-header"
import {CopyToClipboard} from "react-copy-to-clipboard"
import Link from "next/link";
import {connect} from "react-redux";
import {deleteUser} from "../../redux/reducers/UserDuck"
const profileEdit = ({asPath,deleteUser}:any) => {
    //? si el usuario se puede eliminar correctamente redirreciona al home
    const DeleteUser = ()=>{
        deleteUser().then((res:boolean) => {
            if(res) document.location.href = "/"
        });
    }
    return (
        <Dropdown>

            <DropdownToggle variant="none" id="profile-edit">
                <FontAwesomeIcon icon={faCog}/>
            </DropdownToggle>

            <Dropdown.Menu>

                <Dropdown.Item>
                    <Link href="/cuenta/EditProfile" passHref><p className="text-dark m-0 p-0"> Editar perfil</p></Link>
                </Dropdown.Item>

                <Dropdown.Item onClick={DeleteUser}>Eliminar perfil</Dropdown.Item>

                {/* <Dropdown.Item>
                    <CopyToClipboard text={`http://localhost:3000${asPath}`}>
                    <button className="btn p-0" onClick={(e:any) => e.preventDefault()}>Copiar URL del usuario</button>
                    </CopyToClipboard>
                </Dropdown.Item> */}

            </Dropdown.Menu>

        </Dropdown>
    )
}
function mapStateToProps() {
    return {}
}
export default connect(mapStateToProps,{deleteUser})(profileEdit)
