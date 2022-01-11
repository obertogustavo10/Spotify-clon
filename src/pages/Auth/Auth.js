import React, { useState } from 'react';
import AuthOptions from "../../components/Auth/AuthOptions";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import LogoNameWhite from "../../assets/png/logo-name-white.png";
import BackgroundAuth from "../../assets/jpg/background-auth.jpg";
import "./Auth.scss";



export default function Auth() {

    const [selectedForm, setselectedForm] = useState(null);

    const handlerForm = () => {
        switch (selectedForm) {
            case "login":
                return  <LoginForm/>
            case "register":
                return  <RegisterForm setselectedForm={setselectedForm}/>
            default:
                return  <AuthOptions setselectedForm={setselectedForm}/>
        }
    }



    return (
      <div className='auth' style={{ backgroundImage: `url(${BackgroundAuth})`}}>
        <div className='auth__dark'>
            <div className='auth__box middle aligned'>
                <div className='auth__box-logo'>
                    <img src={ LogoNameWhite } alt="Musicfy"/>
                </div>
                {handlerForm()}
            </div> 
        </div>

        </div>
    );
}
