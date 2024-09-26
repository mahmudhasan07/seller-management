import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../ContextAPI/ContextAPI';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios, { AxiosSource } from '../../Axios/useAxios';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
// import { Context } from '../../ContextAPI/ContextAPI';

const OrderPdf = () => {
    const id = useParams()
    const axiosLink = useAxios(AxiosSource)
    const { role } = useContext(Context)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const getOrderInfo = async () => {
            await axiosLink.get(`/order/${id.id}`)
                .then(res => {
                    // console.log(res);
                    setData(res.data)

                })
                .catch(err => {
                    console.log(err);

                })
        }

        getOrderInfo()

    }, []);

    console.log(data);


    const { orderDetails, setOrderDetails } = useContext(Context)
    const handlePrint = async () => {

        await html2canvas(document.querySelector("#orderID")).then(canvas => {
            // document.body.appendChild(canvas)
            const imageData = canvas.toDataURL('image/png')
            const doc = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();
            const imageWidth = canvas.width
            const imageHeight = canvas.height
            const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
            const imgX = 5;
            const imgY = 10
            doc.addImage(imageData, 'PNG', imgX, imgY, imageWidth * ratio - 10, imageHeight * ratio)
            doc.save('test.pdf')
        });
        navigate('/')
    }

    const totalBill = data?.orders?.reduce((a, b) => a + parseInt(b.total), 0)

    return (
        <section>
            <div className='flex justify-end mx-5 my-5'>
                {
                    role == "seller" ?
                        <button onClick={handlePrint} className='btn'>Print</button>
                        :
                        <button onClick={() => navigate('/admin/sellreport')} className='btn'>Back</button>
                }
            </div>
            <div id='orderID' className=' w-3/4 text-2xl text-black mx-auto p-5 space-y-4'>
                <div id='orderInfo' className='flex justify-between'>
                    <div className=''>
                        <h1 className=''>Order ID : {data?._id}</h1>
                        <h1>Seller Name : {data?.sellerName}</h1>
                        <h1>Shop Name : {data?.shopName}</h1>
                        <h1>Contact Number :  {data?.contactNum}</h1>
                    </div>
                    <div className=''>
                        <h1 className=''>Location : {data?.location}</h1>
                        <h1 className=''>Shop Owner : {data?.shopOwner}</h1>
                        <h1 className=''>Shop location : {data?.shopAddress}</h1>
                        <h1>Order Date  : {data?.orderDate}</h1>
                        <h1>Delivery Date  : {data?.deliveryDate}</h1>

                    </div>
                </div>
                <div id='orderList'>
                    <table className=' w-full'>
                        <thead>
                            <tr className='bg-gray-300 border-2 border-gray-500'>
                                <th className=''>Order Number</th>
                                <th className=''>Product Name</th>
                                <th className=''>Unit Price</th>
                                <th className=''>Quantity</th>
                                <th className=''>Total Price</th>
                                {/* <th><buttonclassName='btn btn-sm font-bold bg-blue-700 text-white hover:bg-blue-700'>+</button></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.orders?.map((item, index) =>
                                    <tr key={index} className='text-center border-gray-500 border-2'>
                                        <td className='py-1'>{item?.serial}</td>
                                        <td className='py-1'>{item?.name}</td>
                                        <td className='py-1'>{item?.price}</td>
                                        <td className='py-1'>{item?.quantity}</td>
                                        <td className='py-1'>{item?.quantity * item?.price}</td>
                                    </tr>)
                            }
                            <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                                <td colSpan={4} className='py-2'>Total</td>
                                <td className=''>{totalBill}</td>
                            </tr>
                            <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                                <td colSpan={4} className='py-2'>Advance Pay</td>
                                <td>{data?.pay}</td>
                            </tr>
                            <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                                <td colSpan={4} className='py-2'>Due Ammount</td>
                                <td>{totalBill - data?.pay}</td>
                            </tr>
                            <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                                <td colSpan={4} className='py-2'>Last Due</td>
                                <td>{data?.due}</td>
                            </tr>
                            <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                                <td colSpan={4} className='py-2'>Total Due</td>
                                <td>{totalBill - data?.pay + data?.due}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <img src={data?.sign} className='border-b-2 border-black ' alt="" />
                    <p className='text-lg ml-4'>Seller Signature</p>
                </div>
            </div>
        </section>
    );
};

export default OrderPdf;