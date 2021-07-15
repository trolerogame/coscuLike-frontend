import Styled from "styled-components";
import { Dropdown } from "react-bootstrap";

const ContaintForm = Styled.div`
    display:grid;
    place-items:center center;
`;
const BoxForm = Styled.div`
    width:400px;
`;
const CardPost = Styled.div`
    width:380px;
    background:#F4F4F4;
    border-radius:22px;
    overflow:hidden;
    .imgProfile{
        object-fit:cover;
        border-radius:100%;
    }
`;
const Elipse = Styled.span`
    width: 8px;
    height: 8px;
    background:#1b1b1b;
    margin:2px 0;
    border-radius:100%;
`;
const ButtonMore = Styled.button`
    &:focus{
        box-shadow:none;
    }
`;
const DropdownToggle = Styled(Dropdown.Toggle)`
    &:focus{
        box-shadow:none;
    }
    &::after{
        content:"";
        display:none
    }
`;
export { ContaintForm, BoxForm, CardPost, Elipse, ButtonMore, DropdownToggle };
