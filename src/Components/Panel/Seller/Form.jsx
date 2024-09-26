import React, { useContext, useRef, useState } from 'react';
import OrderList from './OrderList';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../ContextAPI/ContextAPI';
import location from '../../../../public/location.json'
import useAxios, { AxiosSource } from '../../Axios/useAxios';

const Form = () => {
    const [numProduct, setNumProduct] = useState([1])
    const navigate = useNavigate()
    const axiosLink = useAxios(AxiosSource)
    const { user } = useContext(Context)
    const productSerial = useRef([])
    const productName = useRef([])
    const productPrice = useRef([])
    const productQuantity = useRef([])
    const productTotal = useRef([])
    const sigCanvas = useRef()
    const advancePay = useRef()
    const lastDue = useRef()
    const sellerName = user?.displayName
    const sellerEmail = user?.email
    const handlePurchase = (e) => {
        e.preventDefault()
        const data = e.target
        const location = data.location.value
        const shopName = data.shopName.value
        const shopOwner = data.shopOwner.value
        const contactNum = data.contactNum.value
        const shopAddress = data.shopAddress.value
        const orderDate = data.orderDate.value
        const deliveryDate = data.deliveryDate.value
        const pay = parseInt(advancePay.current.value)
        const due = parseInt(lastDue.current.value)
        const sign = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        const orders = numProduct?.map((e) => {
            const serial = e
            const name = productName.current[e].value
            const price = parseFloat(productPrice.current[e].value)
            const quantity = parseInt(productQuantity.current[e].value)
            const total = parseFloat((price * quantity).toFixed(2))
            const value = { name, quantity, price, serial, total }
            return value
        })

        if (orders.length == numProduct.length) {
            const orderInfo = { sign, location, shopName, shopOwner, shopAddress, contactNum, orderDate, deliveryDate, orders, pay, due, sellerName,sellerEmail }

            axiosLink.post('/orders', orderInfo)
                .then(res => {
                    console.log(res.data)
                    if (res.data) {
                        navigate(`/orderpdf/${res.data.insertedId}`)
                    }
                })
                .catch(err => {
                    console.log(err);

                })
        }
    }
    return (
        <form action="" onSubmit={handlePurchase} className=''>
            <div className=' flex flex-wrap justify-start gap-5 p-3 '>
                <div className='text-lg'>
                    <p>Select Location</p>
                    <select name="location" id="" className='border-2 w-96 p-1 rounded-lg border-gray-600'>
                        {
                            location[0].Dhaka.map((e, idx) =>
                                <option key={idx} value={e}>{e}</option>)
                        }
                    </select>
                </div>
                <div className='text-lg'>
                    <p>Shop Name</p>
                    <input name='shopName' type="text" className='border-2 rounded-lg w-96 p-1 border-gray-600' />
                </div>
                <div className='text-lg'>
                    <p htmlFor="">Shop Owner Name</p>
                    <input name='shopOwner' type="text" className='border-2 rounded-lg w-96 p-1 border-gray-600' />
                </div>
                <div className='text-lg'>
                    <p >Contact Number</p>
                    <input name='contactNum' type="text" className='border-2 rounded-lg w-96 p-1 border-gray-600' />
                </div>
                <div className='text-lg'>
                    <p >Shop Address</p>
                    <input name='shopAddress' type="text" className='border-2 rounded-lg w-96 p-1 border-gray-600' />
                </div>
                <div className='text-lg'>
                    <p >Order Date</p>
                    <input name='orderDate' type="date" className='border-2 rounded-lg w-96 p-1 border-gray-600' />
                </div>
                <div className='text-lg'>
                    <p>Delivery Date</p>
                    <input name='deliveryDate' type="date" className='border-2 rounded-lg w-96 p-1 border-gray-600' />
                </div>
            </div>
            <div className=''>
                <OrderList sigCanvas={sigCanvas} advancePay={advancePay} lastDue={lastDue} setNumProduct={setNumProduct} productName={productName} productPrice={productPrice} productQuantity={productQuantity}></OrderList>
            </div>
        </form>
    );
};

export default Form;