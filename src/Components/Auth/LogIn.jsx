import React, { useContext, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../ContextAPI/ContextAPI';
import useAxios, { AxiosSource } from '../Axios/useAxios';

const LogIn = () => {
    const [pass, setpass] = useState('password');
    const [passCondition, setpassCondition] = useState(false)
    const axiosLink = useAxios(AxiosSource)
    const { userLogIn, role, userLogOut } = useContext(Context)
    const navigate = useNavigate()

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
        const password = data.password.value
        userLogIn(email, password)
            .then(res => {
                console.log(res);
                if (res) {
                    axiosLink.get(`/user/${email}`)
                        .then(res => {
                            console.log(res);
                            
                            if (res.data.role == "admin") {
                                navigate('/admin')
                            }
                            if (res.data.role == "seller") {
                                navigate('/seller')
                            }
                            if(res.data.role == "none" || res.data.role == "reject"){
                                alert('Please wait for  admin approval')
                                userLogOut()

                            }

                        })
                }

            })
            .catch(err => {
                console.log(err);

            })

    }
    return (
        <section className=''>
            <NavBar></NavBar>
            <div className='border-2 w-1/3 mx-auto py-5 px-10 relative top-20 rounded-lg space-y-3 bg-gray-100 border-black'>
                <h1 className='text-2xl text-center font-bold'>LogIn Here</h1>
                <form action="" onSubmit={handleRegistration} className='space-y-3'>
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
                        <NavLink to={'/registration'} className={`text-end font-semibold text-blue-800 `}><p className='my-2'>New  User? Register Here</p></NavLink>


                    </div>
                    <div className='mt-4  mx-auto'>
                        <button className='btn bg-blue-800 w-full text-white hover:bg-blue-800'>Log In</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LogIn;