import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OrderDetail } from "../page";
import { useAuth } from "@clerk/clerk-react";
import PaymentApi from "@/api/Payment";
import OrderApi from "@/api/Order";

export type orderItem = {
    _id: string,
    quantity: number,
    priceAtTime: number,
    productID: string,
    orderID: string,
    __v: number,
    createdAt: string
    updatedAt: string
    productName: string
}
const Modal = ({ setShowCheckoutModal, orderDetail }: { setShowCheckoutModal: Dispatch<SetStateAction<boolean>>, orderDetail: OrderDetail | null }) => {
    const { getToken } = useAuth();
    const closeModal = () => {
        setShowCheckoutModal(false)
    }

    const [orderItem, setOrderItem] = useState([]);


    useEffect(() => {
        const getOrderItemDetail = async () => {
            try {
                const token = await getToken();
                const response = await OrderApi.getOrderDetail(token, orderDetail?.newOrderItems[0].orderID ? orderDetail?.newOrderItems[0].orderID : '');
                if (response && response.data && response.data.metadata) {
                    setOrderItem(response.data.metadata.orderItems.map((item: orderItem) => ({ name: item.productName, quantity: item.quantity, price: item.priceAtTime })))
                }
            } catch (error) {
                console.log("Error get order item detail", error);
            }
        };
        getOrderItemDetail();
    }, [getToken]);

    const data = {
        paymentMethod: "PayOS",
        // amount: orderDetail?.newOrder.totalPrice ? orderDetail?.newOrder.totalPrice : 0,
        amount: 10000,
        orderCode: orderDetail?.newOrder.orderCode ? orderDetail?.newOrder.orderCode : 0,
        description: 'Payment',
        items: orderItem,
        cancelUrl: 'https://green-garden-five.vercel.app/checkout',
        returnUrl: 'https://green-garden-five.vercel.app/'
    }

    const handlePayment = async () => {
        const token = await getToken();
        try {
            const response = await PaymentApi.create(token, data);
            if (response && response.data && response.data.metadata) {
                console.log("Payment success", response.data)
                const url = response.data.metadata.checkoutUrl;
                window.location.href = url
                closeModal();
            }
        } catch (error) {
            console.error('Error processing payment', error);
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 flex h-full w-full items-center justify-center bg-[#000000B2] px-[24px]'>
                <div
                    className={`relative flex w-full h-fit max-w-[600px] flex-col rounded-[24px] border-0 bg-white px-5 py-5 shadow-lg outline-none focus:outline-none`}
                >
                    <div className='flex flex-col items-center justify-center gap-5'>
                        {/* <div className='flex w-full items-center justify-end'>
                            <button
                                className='flex text-[#000] h-8 w-8 items-center justify-center rounded-full bg-gray-200 active:outline-none'
                                onClick={() => closeModal()}
                            >
                                X
                            </button>
                        </div> */}
                        <div className="text-[20px] text-[#000] text-center font-[500]">
                            Vui lòng thanh toán cho đơn hàng này!
                        </div>
                        <div className="flex items-center justify-between w-full">
                            {/* <button onClick={closeModal} className="flex items-center justify-center px-4 py-2 bg-gray-400 rounded-xl">
                                <div className="text-[16px] text-[#000] text-center font-[500]">Hủy</div>
                            </button> */}
                            <button onClick={() => handlePayment()} className="flex items-center justify-center px-4 py-2 bg-green-500 rounded-xl w-full">
                                <div className="text-[16px] text-[#FFF] text-center font-[500]">Thanh toán</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal
