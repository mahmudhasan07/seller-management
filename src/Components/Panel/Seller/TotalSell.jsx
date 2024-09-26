import React, { useContext, useEffect, useState } from 'react';
import useAxios, { AxiosSource } from '../../Axios/useAxios';
import { Context } from '../../ContextAPI/ContextAPI';

const TotalSell = () => {
    const {user} = useContext(Context)
    const axiosLink = useAxios(AxiosSource)
    const [data, setData] = useState([])
    
    useEffect(() => {
        const getData = async () => {
            await axiosLink.get(`/sellreport/${user?.email}`)
                .then(res => {
                    console.log(res);
                    setData(res.data)

                })
                .catch(err => {
                    console.log(err);

                })

        }
        getData()
    }, []);

    return (
        <section>
            <h1 className='text-3xl font-semibold text-center'>Sell Report</h1>
            <div className='space-y-4 my-5'>
                {
                    data?.map((e, idx) =>
                        <div className='border-2 p-2 rounded-lg flex justify-between'>
                            <div className='my-auto text-lg font-semibold text-start'>
                                <h1>{idx + 1}</h1>
                            </div>
                            <div className='font-semibold text-start'>
                                <h1>Seller Name : {e.sellerName}</h1>
                                <h1>Shop Location : {e.shopAddress}</h1>
                            </div>
                            <div className='font-semibold'>
                                <h1>Order Date : {e.orderDate}</h1>
                                <h1>Delivery Date : {e.deliveryDate}</h1>
                            </div>
                            <div>
                                {/* <button onClick={() =>navigate(`/selldetails/${e?._id}`)} className='btn bg-blue-700 text-white hover:bg-blue-700'>Order Details</button> */}
                            </div>
                        </div>)
                }
            </div>
        </section>
    );
};

export default TotalSell;