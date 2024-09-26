import React, { useContext, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { Context } from '../ContextAPI/ContextAPI';
import axios from 'axios';
import useAxios, { AxiosSource } from '../Axios/useAxios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Registration = () => {

    const [pass, setpass] = useState('password');
    const [passCondition, setpassCondition] = useState(false)
    const axiosLink = useAxios(AxiosSource)
    const { userReg, updateUser, userLogOut } = useContext(Context)
    // console.log(data);

    const handlePassword = () => {
        if (passCondition == false) {
            setpassCondition(true)
            setpass('text')
        }
        else {
            setpassCondition(false)
            setpass('password')
        }
    }

    const handleRegistration = (e) => {
        e.preventDefault()
        const data = e.target
        const email = data.email.value
        const name = data.name.value
        const password = data.password.value
        const role = ""
        const userInfo = { email, name, role }
        console.log(userInfo);

        userReg(email, password)
            .then(res => {
                updateUser(name)
                    .then(res => {
                        userLogOut()
                        // console.log(res);
                        axiosLink.post('/users', userInfo)
                            .then(res => {
                                console.log(res);
                                toast('Registration Successful', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                toast(`${err.message}`, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });

                            })

                    })
                    .catch(err => {
                        console.log(err);

                    })
            })
            .catch(err => {
                console.log(err);

            })

    }
    return (
        <section className=''>

            <NavBar></NavBar>
            <ToastContainer />
            <div className='border-2 w-1/3 mx-auto py-5 px-10 relative top-20 rounded-lg space-y-3 bg-gray-100 border-black'>

                <h1 className='text-2xl text-center font-bold'>Registration Here</h1>
                <form action="" onSubmit={handleRegistration} className='space-y-3'>
                    <div className='text-lg font-semibold'>
                        <label htmlFor="">Enter Your Name</label> <br />
                        <input name='name' type="text" className='border-2 border-black p-1 rounded-lg w-full font-normal' />
                    </div>
                    <div className='text-lg font-semibold'>
                        <label htmlFor="">Enter Your Email</label> <br />
                        <input name='email' type="text" className='border-2 border-black p-1 rounded-lg w-full font-normal' />
                    </div>
                    <div className='text-lg font-semibold relative'>
                        <label htmlFor="">Enter Your Password</label> <br />
                        <input name='password' type={`${pass}`} className='border-2 border-black p-1 rounded-lg w-full font-normal' />
                        <div className='absolute right-3 text-xl top-1/2'>
                            {
                                passCondition == false ?
                                    <button onClick={handlePassword}><IoEyeSharp /></button>
                                    :
                                    <button onClick={handlePassword}><FaEyeSlash /></button>
                            }
                        </div>
                    </div>
                    <div>
                        <NavLink to={'/login'} className={`text-end font-semibold text-blue-800 `}><p className='my-2'>Already have an account?</p></NavLink>

                    </div>
                    <div className='mt-4  mx-auto'>
                        <button className='btn bg-blue-800 w-full text-white hover:bg-blue-800'>Registration</button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default Registration;