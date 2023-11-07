import style from './SignUpScreen.module.css';
import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { validationSignUp } from '../../components/Validation/Validation';
import { useForm } from "react-hook-form";

const SignUpPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [emailErrorMessage, setEmailErrorMessage] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
    const [passwordErrorMessage1, setPasswordErrorMessage1] = useState(false);
    const [AllFieldsErrorMessage, setAllFieldsErrorMessage] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState(false);
    const [User, setUser] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
    });

    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);



    const signup = () => {
        if (confirmPassword !== password && password && confirmPassword) {
            setIsPasswordConfirm(true);
          }
          else{
            setIsPasswordConfirm(false);
            axios.post('http://localhost:5000/signup', {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                address: address,
                email: email,
                phoneNumber:phoneNumber,
                password: password,
                dateOfBirth: dateOfBirth,
                confirmPassword: confirmPassword,
            }).then(() => {
                navigate('/Signin');
            })
          }


    };



    return (
        <div className={style.fullScreen}>
            <div className={style.loginContainer}>
                <div className={style.loginContent}>
                    <h1 className={style.welcomeText}>Welcome !</h1>
                    <form className={style.loginForm} onSubmit={handleSubmit(signup)}>
                        <div className='d-flex'>
                            <div >
                                <input {...register("userName", validationSignUp.userName)} type="text" name="userName" placeholder="Username" className={style.inputField} onChange={(e) => setUserName(e.target.value)} />

                                {errors?.userName?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Username is required!</p>
                                    </div>
                                )}
                                <input {...register("firstName", validationSignUp.firstname)} type="text" name="firstName" placeholder="First name" className={style.inputField} onChange={(e) => setFirstName(e.target.value)} />

                                {errors?.firstname?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Firstname is required!</p>
                                    </div>
                                )}
                                <input  {...register("lastName", validationSignUp.lastname)} type="text" name="lastName" placeholder="Last name" className={style.inputField} onChange={(e) => setLastName(e.target.value)} />

                                {errors?.lastname?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Lastname is required!</p>
                                    </div>
                                )}
                                <input {...register("email", validationSignUp.email)} type="text" name="email" placeholder="Email" className={style.inputField} onChange={(e) => setEmail(e.target.value)} />

                                {errors?.email?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Email is required!</p>
                                    </div>
                                )}
                                {errors?.email?.type === "pattern" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Email must be valid!</p>
                                    </div>
                                )}


                                <input {...register("phoneNumber", validationSignUp.phoneNumber)} type="text" name="phoneNumber" placeholder="Phone number" className={style.inputField} onChange={(e) => setPhoneNumber(e.target.value)} />

                                {errors?.phoneNumber?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Phone number is required!</p>
                                    </div>
                                )}
                                {errors?.phoneNumber?.type === "minLength" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Phone number must be at least 8 numbers!</p>
                                    </div>
                                )}
                            </div>
                            <div className='ms-3'>
                                <input {...register("password", validationSignUp.password)} type="password" name="password" placeholder="Password" className={style.inputField} onChange={(e) => setPassword(e.target.value)} />

                                {errors?.password?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Password is required!</p>
                                    </div>
                                )}
                                {errors?.password?.type === "minLength" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Password must be at least 8 characters!</p>
                                    </div>
                                )}
                                {errors?.password?.type === "pattern" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Password must be valid!</p>
                                    </div>
                                )}
                                <input {...register("confirmPassword", validationSignUp.confirmPassword)} type="password" name="confirmPassword" placeholder="Confirm password" className={style.inputField} onChange={(e) => setConfirmPassword(e.target.value)} />

                                {errors?.confirmPassword?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center px-1" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Confirm password is required!</p>
                                    </div>
                                )}
                                 {isPasswordConfirm && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Password confirmation wrong!</p>
                                    </div>
                                )}


                                <input {...register("address", validationSignUp.address)} type="text" name="address" placeholder="Address" className={style.inputField} onChange={(e) => setAddress(e.target.value)} />

                                {errors?.address?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert">
                                        <p className="mb-0">Address is required!</p>
                                    </div>
                                )}
                                <input {...register("dateOfBirth", validationSignUp.dateOfBirth)} type="text" name="dateOfBirth" placeholder="Date of birth" className={style.inputField} onChange={(e) => setDateOfBirth(e.target.value)} />

                                {errors?.dateOfBirth?.type === "required" && (
                                    <div className="alert alert-danger alert-dismissible fade show my-1 py-1 d-flex align-items-center" role="alert"  style={{ width: "215px" }}>
                                        <p className="mb-0">Date of birth is required!</p>
                                    </div>
                                )}
                            </div>
                        </div>



                        <button type='submit' className={style.loginButton}>Sign up</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default SignUpPage;
