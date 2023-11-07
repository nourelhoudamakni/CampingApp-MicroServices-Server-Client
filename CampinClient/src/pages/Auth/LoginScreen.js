import style from './LoginScreen.module.css';
import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import {validation} from '../../components/Validation/Validation';
import { useForm } from "react-hook-form";


const LoginScreen = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const signin=()=>{
        console.log(email)
        console.log('hello')
        axios.post('http://localhost:5000/signin', {
            email: email,
            password: password,}).then((response)=>{
                console.log(response.data)
                Cookies.set("jwt", response.data.token);
navigate('/')
            }).catch((Error) => {
                if (Error.response && Error.response.data) {
                    setError(Error.response.data); // Set the error message from the server
                } else {
                    setError("Please verify your email and password"); // Set a generic error message
                }
            });
    }

    return (
        <div className={style.fullScreen}>
            <div className={style.loginContainer}>
                <div className={style.loginContent}>
                    <h1 className={style.welcomeText}>Welcome Back !</h1>
                    <form className={style.loginForm}  onSubmit={handleSubmit(signin)}>
                        <input   {...register("email", validation.email)} id="email" type="email" autoComplete="email" name='email' placeholder="Email" className={style.inputField} onChange={(e) => setEmail(e.target.value)}/>
                        {errors?.email?.type === "required" && (
               <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert">
               <p className="mb-0">Email is required!</p>
             </div>
             
              
              )}
                        <input {...register("password", validation.password)} id="password" type="password" name='password' placeholder="Password" className={style.inputField} onChange={(e) => setPassword(e.target.value)}/>
                        {errors?.password?.type === "required" && (
                        <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert">
               <p className="mb-0">Password is required!</p>
             </div>
              )}
              {error && (
                        <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert">
                        <p className="mb-0">{error}</p>
                      </div>
                    )}
             
                        <button type='submit' className={style.loginButton}>Login</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
