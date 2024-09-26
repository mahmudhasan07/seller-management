import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios, { AxiosSource } from '../../Axios/useAxios';
import { useQuery } from '@tanstack/react-query';

const SellerApprove = () => {
    const axiosLink = useAxios(AxiosSource)

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await axiosLink.get('/users/seller')
            return res?.data

        },
    })

    if (isPending) {
        return 'loading'
    }

    if (isError) {
        return `Error: ${error.message}`
    }


    const handleSeller = (value, email) => {
        console.log(value, email);

        if (value == 'approve') {
            axiosLink.patch(`/user/${email}`, { role: "seller" })
                .then(res => {
                    console.log(res);
                    refetch()

                })
                .catch(err => {
                    console.log(err);

                })
        }
        if (value == "reject") {
            axiosLink.patch(`/user/${email}`, { role: "reject" })
                .then(res => {
                    console.log(res);
                    refetch()
                })
                .catch(err => {
                    console.log(err);

                })
        }

    }

    return (
        <div className='w-2/3 p-3 mx-auto border-2 rounded-lg border-black top-5 relative'>
            <h1 className='text-2xl font-semibold text-center my-5'>Seller Approver</h1>
            <div className='space-y-3'>
                {
                    data == 'l' ?
                        "loading"
                        :
                        data.map((user, index) =>
                            <div key={index} className='border-2 border-gray-500 flex justify-around p-2 rounded-xl'>
                                <h1 className='my-auto'>Name :  {user.name}</h1>
                                <h1 className='my-auto'>Email :  {user.email}</h1>
                                <div className='flex gap-2'>
                                    <button onClick={() => handleSeller('approve', user?.email)} className='btn bg-blue-700 text-white hover:bg-blue-700'>Approve</button>
                                    <button onClick={() => handleSeller('reject', user?.email)} className='btn bg-blue-700 text-white hover:bg-blue-700'>Reject</button>
                                </div>
                            </div>)
                }
            </div>
        </div>
    );
};

export default SellerApprove;