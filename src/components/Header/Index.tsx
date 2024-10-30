import { HeaderBackground, HeaderContainer, ImgContainer, UserContainer } from "./styles";
import logo from './../../assets/logo.svg'; // Importando o logo
import {  } from "../../pages/Home/styles";
import { User } from "@phosphor-icons/react";


export function Header() {
    return (
        <HeaderBackground>
            <HeaderContainer>
            <ImgContainer src = {logo}/>            
            <UserContainer>
                <User size={32} />
                <span>Fernando</span>
            </UserContainer>
            </HeaderContainer>
        </HeaderBackground>
    )
}