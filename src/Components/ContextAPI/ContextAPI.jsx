import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import useAxios, { AxiosSource } from '../Axios/useAxios';
export const Context = createContext()

const ContextAPI = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const axiosLink = useAxios(AxiosSource)
    const [role, setRole] = useState(null);
    const  [roleLoading, setRoleLoading] = useState(true);
    const [loading, setloading] = useState(true)


    const userReg = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogIn = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name) => {
        setloading(true)
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const userLogOut = () => {
        setloading(true)
        return signOut(auth)
    }


    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            setUser(res)
            setloading(false)
            if (res) {
                axiosLink.get(`/user/${res?.email}`)
                    .then(res => {
                        console.log(res);
                        setRole(res.data.role)
                        setRoleLoading(false)
                       
                    })
            }
        })
    }, []);

    const contextValue = { userReg, updateUser, userLogIn, userLogOut, loading, user, role,setRole, roleLoading }

    return <Context.Provider value={contextValue}>
        {children}
    </Context.Provider>
};

export default ContextAPI;