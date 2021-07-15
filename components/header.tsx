import React from 'react'
import Image from "next/image"
import LOGO from "../public/Coscu_Like.svg"
import Link from "next/link"
import {connect} from "react-redux"
import ProfileDropdown from "./profileDropdown";
import ModalImage from "./modalImage"
const Header = (props:any) => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link href="/" passHref>
                        <button className="btn p-0">
                            <Image src={LOGO} alt="coscu Logo" />
                        </button>
                    </Link>
                    <div className="px-4 d-flex align-items-center">
                        {!props.token && (
                            <>
                                <Link href="/register" passHref><p className="btn btn-success mx-3">Sign up</p></Link>
                                <Link href="/login" passHref><p className="btn mx-3">Sign In</p></Link>
                                
                            </>
                        )}
                        {props.token && (
                            <>
                                <ModalImage/>
                                <ProfileDropdown user={props.user} />
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
function mapStateToProps(state:any){
    return {
        token: state.User.token,
        user:state.User.user
    }
}
export default connect(mapStateToProps)(Header)
