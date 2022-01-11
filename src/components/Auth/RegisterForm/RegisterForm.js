import React, { useState } from 'react';
import { Button, Icon, Form} from "semantic-ui-react";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
    const { setselectedForm } = props;
    const [formData, setFormData] = useState(defaultValueForm());
    const [showPassword, sethowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handlerShowPassword = () =>{
        sethowPassword(!showPassword);
    }

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () =>{
       setFormError({});
       let errors = {};
       let formOk = true;

       if(!validateEmail(formData.email)) {
           errors.email = true;
           formOk = false;
       }

       if(formData.password.length < 6) {
           errors.password = true;
           formOk = false;
       }

       if(!formData.username) {
           errors.username = true;
           formOk = false;
       }
       setFormError(errors);

       if(formOk) {
        setIsLoading(true);
           firebase
           .auth()
           .createUserWithEmailAndPassword(formData.email, formData.password)
           .then(() =>{
            console.log("ok");
           }).catch(() => {
               console.log("error al crear la cuenta")
           }).finally(() => {
               setIsLoading(false);
               setselectedForm(null);
           })
       }
        
    };
    return (
        <div className='register-form'>
             <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
                <Form  size='large' onSubmit={onSubmit} onChange={onChange}>
                    <Form.Field>
                        <Form.Input
                        type='text'
                        name='email'
                        placeholder='Correo Electronico'
                        icon="mail"
                        error={formError.email}
                        />
                        {formError.email && (
                            <span className='error-text'>
                                Por favor, introduce un correo electronico valido.
                            </span>
                            
                        )}
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                        type={showPassword ? "texte" : "password"}
                        name='password'
                        placeholder='Contraseña'
                        error={formError.password}
                        icon={
                            showPassword ? (
                                <Icon name='eye slahs outline' link onClick={handlerShowPassword}/>
                            ) : (
                                <Icon name='eye' link onClick={handlerShowPassword}/>
                            )
                        }
                        />
                        {formError.password && (
                            <span className='error-text'>
                                Por favor, elige una contraseña superior a 6 caracteres.
                            </span>
                            
                        )}

                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                        type='text'
                        name='username'
                        placeholder='¿Como deberiamos llamarte?'
                        icon='user circle outline'
                        error={formError.username}
                        />
                        {formError.username && (
                            <span className='error-text'>
                                Por favor, introduce un nombre.
                            </span>
                            
                        )}
                    </Form.Field>
                    <Button type="submit" loading={isLoading}>Continuar</Button>
                    
                </Form>
                <div className='register-form_options'>
                    <p onClick={() => setselectedForm(null)}>Volver</p>
                    <p>¿Ya tienes Musicfy?{" "}
                    <span  onClick={() => setselectedForm("login")}>Iniciar sesion</span></p>
                </div>
        </div>
    )
}

function defaultValueForm() {
    return{
        email: "",
        password: "",
        username: ""
        
    };
}