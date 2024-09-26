import React, { useRef, useState } from 'react';
import SignaturePad from "react-signature-canvas";

const OrderList = ({ productName, productPrice, productQuantity, setNumProduct, sigCanvas, lastDue, advancePay }) => {
    const [orderNum, setOrderNum] = useState([1]);
    const [confirm, setconfirm] = useState([])
    const [dueAmount, setDueAmount] = useState(0)
    const [totalDue, setTotalDue] = useState(0)
    let timeOut
    const handleAddProduct = (e) => {
        e.preventDefault()
        setOrderNum(e => e.concat([e.length + 1]))
        setNumProduct(e => e.concat([e.length + 1]))
    }
    const handleCountTotal = (id) => {
        clearTimeout(timeOut)
        const price = parseFloat(productPrice.current[id].value)
        const quantity = parseInt(productQuantity.current[id].value)
        timeOut = setTimeout(() => {
            const sum = price * quantity
            if (confirm.length < id) {
                setconfirm(e => [...e, sum])

            }
            if (confirm.length >= id) {
                setconfirm(e => {
                    {
                        const newArray = [...e]
                        newArray.splice(id - 1, 1, sum)
                        return newArray;
                    }
                })
            }
        }, 1000);
    }


    const handleAdvancePay = () => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            const pay = parseInt(advancePay.current.value)
            const sum = confirm.reduce((a, b) => a + b, 0)
            setDueAmount(sum - pay)
            // console.log(advancedue);
        }, 1000);
    }

    const handleLastDue = () => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            const due = parseInt(lastDue.current.value)
            setTotalDue(dueAmount + due)
        }, 1000);
    }

    return (
        <section className='pb-5'>
            <table className=' w-full'>
                <thead>
                    <tr className='bg-gray-300 border-2 border-gray-500'>
                        <th className=''>Order Number</th>
                        <th className=''>Product Name</th>
                        <th className=''>Unit Price</th>
                        <th className=''>Quantity</th>
                        <th className=''>Total Price</th>
                        <th><button onClick={handleAddProduct} className='btn btn-sm font-bold bg-blue-700 text-white hover:bg-blue-700'>+</button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderNum?.map((item, index) =>
                            <tr key={index} className='text-center border-gray-500 border-2'>
                                <td className='text-lg font-bold'>{item}</td>
                                <td><input type="text" className='border-2 p-1 m-1 w-72 border-gray-500 rounded-lg ' ref={(e) => productName.current[item] = e} id="" /></td>
                                <td><input type="text" className='border-2 p-1 m-1 w-40 border-gray-500 rounded-lg ' ref={(e) => productPrice.current[item] = e} id="" /></td>
                                <td><input onChange={() => handleCountTotal(item)} type="text" className='border-2 p-1 m-1 w-40 border-gray-500 rounded-lg ' ref={(e) => productQuantity.current[item] = e} id="" /></td>
                                <td>{typeof (confirm[index]) == 'number' ? confirm[index] : 0}</td>
                            </tr>)
                    }
                    <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                        <td colSpan={4} >Total</td>
                        <td className='p-1'>{
                            confirm.length > 0 ?
                                confirm?.reduce((a, b) => a + b)
                                : 0
                        }</td>
                    </tr>
                    <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                        <td colSpan={4}>Advance Pay</td>
                        <td><input ref={advancePay} onChange={handleAdvancePay} type="text" className='border-2 rounded-md p-1 border-gray-500 m-1 w-28' /></td>
                    </tr>
                    <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                        <td colSpan={4}>Due Ammount</td>
                        <td>{dueAmount}</td>
                    </tr>
                    <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                        <td colSpan={4}>Last Due</td>
                        <td><input onChange={handleLastDue} ref={lastDue} type="text" className='border-2 rounded-md p-1 border-gray-500 m-1 w-28' /></td>
                    </tr>
                    <tr className='text-center border-2 border-gray-500 text-lg font-bold'>
                        <td colSpan={4}>Total Due</td>
                        <td>{totalDue}</td>
                    </tr>
                </tbody>
            </table>
            <div className=' my-2 flex justify-between '>
                <div>
                    <SignaturePad
                        ref={sigCanvas}
                        canvasProps={{
                            className: "signatureCanvas border-2 m-1 border-black w-72 rounded-lg"
                        }}
                    />
                    <button className='btn bg-blue-700 text-white hover:bg-blue-700' onClick={() => sigCanvas.current.clear()}>Clear</button>
                </div>
                <div className='mt-auto'>
                    <button className='btn bg-blue-700 text-white hover:bg-blue-700'>Print</button>
                </div>
            </div>
        </section>
    );
};

export default OrderList;