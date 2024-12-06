import { Card, Empty, notification } from "antd"
import { PendingItems } from "./PendingPaymentItem"
import PaymentApi from "@/api/Payment";
import { useAuth } from "@clerk/clerk-react";

type pendingPaymentItem = {
    items: { name: string; quantity: number; price: number; _id: string; }[];
    orderCode: string;
    _id: string;
    checkoutUrl: string
}

export const PendingPayment = ({ pendingPayment, onCancelPayment }: { pendingPayment: pendingPaymentItem[], onCancelPayment: (orderCode: string) => void }) => {
    const { getToken } = useAuth();



    const handleCancelPayment = async (orderCode: string) => {
        const token = await getToken();
        try {
            const response = await PaymentApi.cancel(token, orderCode);
            if (response && response.data && response.data.metadata) {
                notification.success({
                    message: 'Hủy thanh toán đơn hàng thành công!',
                });
                onCancelPayment(orderCode);
            }
        } catch (error) {
            console.error('Error canceling payment', error);
        }
    }

    const handlePayment = (payment: pendingPaymentItem) => {
        window.location.href = payment.checkoutUrl
    }

    return (
        <>
            {pendingPayment.length === 0 ? (
                <Empty description="Danh sách trống" className="py-8" />
            ) : (
                pendingPayment.slice().reverse().map((payment, idx) => (
                    <div key={idx} className="flex flex-col justify-center items-center w-full p-3">
                        <div className="text-[#000] text-[20px] font-[600] text-left w-full">Đơn hàng: {payment._id}</div>
                        <Card className="mb-6 w-full">
                            <PendingItems item={payment.items} />
                        </Card>
                        <div className="flex items-center justify-between gap-4 w-full">
                            <button onClick={() => handleCancelPayment(payment.orderCode)} className="flex items-center justify-center px-4 py-2 bg-gray-400 rounded-xl">
                                <div className="text-[16px] text-[#000] text-center font-[500]">Hủy đơn</div>
                            </button>
                            <button onClick={() => handlePayment(payment)} className="flex items-center justify-center px-4 py-2 bg-green-500 rounded-xl">
                                <div className="text-[16px] text-[#FFF] text-center font-[500]">Thanh toán</div>
                            </button>
                        </div>
                    </div>
                ))
            )
            }
        </>
    )
}