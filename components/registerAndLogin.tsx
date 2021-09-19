import React from 'react'
import Head from "../components/head"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {BoxForm, ContaintForm} from "../styles/style-header"
const RegisterAndLogin = (props: any) => {
    return (
        // <Head title={props.title}>
            <ContaintForm className="vh-100">
                <BoxForm className="shadow p-5 bg-body rounded">
                    <h1 className="text-center mb-4">{props.header}</h1>
                    <div className="box-shadow">
                        {props.children}
                    </div>
                </BoxForm>
            </ContaintForm>
        /* </Head> */
    )
}

export default RegisterAndLogin