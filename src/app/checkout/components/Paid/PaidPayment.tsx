import { Card, Empty } from "antd";
import { PaidItems } from "./PaidPaymentItem";

type paidPaymentItem = {
    items: { name: string; quantity: number; price: number; _id: string }[];
    orderCode: string;
    _id: string;
}[]


export const PaidPayment = ({ paidPayment }: { paidPayment: paidPaymentItem }) => {
    return (
        <>
            {paidPayment.length === 0 ? (
                <Empty description="Danh sách trống" className="py-8" />
            ) : (
                paidPayment.slice().reverse().map((payment, idx) => (
                    <div key={idx} className="flex flex-col justify-center items-center w-full p-3">
                        <div className="text-[#000] text-[20px] font-[600] text-left w-full">Đơn hàng: {payment._id}</div>
                        <Card className="mb-6 w-full">
                            <PaidItems item={payment.items} />
                        </Card>
                    </div>
                ))
            )
            }
        </>
    )
}