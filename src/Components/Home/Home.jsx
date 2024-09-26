import React, { useContext } from 'react';
import Seller from '../Panel/Seller/Seller';
import Admin from '../Panel/Admin/Admin';
import { Context } from '../ContextAPI/ContextAPI';

const Home = () => {

    const { loading, user, role } = useContext(Context)

    return (
        <div>
            {
                loading ?
                    <h1>Loading...</h1>
                    :
                    role == "seller" ? <Seller></Seller>
                        :
                        role == "admin" ? <Admin></Admin>
                            :
                            <h1>Access Denied</h1>
            }

        </div>
    );
};

export default Home;