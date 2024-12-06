import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ProductApi from "@/api/Product";
type itemType = {
    name: string,
    quantity: number,
    price: number,
    _id: string
}

export const PaidItems = ({ item }: { item: itemType[] }) => {
    const { getToken } = useAuth();
    const [itemImages, setItemImages] = useState<string[]>([]);

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const token = await getToken();
                const response = await ProductApi.getAll(token);
                if (response && response.data && response.data.metadata) {
                    const images = item.map((it) => {
                        const product = response.data.metadata.find(
                            (product: { name: string }) => product.name === it.name
                        );
                        return product ? product.images[0] : null; // Default to `null` if no image found
                    });
                    setItemImages(images);
                }
            } catch (error) {
                console.log("Error get order item detail", error);
            }
        };
        getAllProduct();
    }, [getToken, item]);

    return (
        <>
            {item.map((item, idx) => (
                <div key={idx} className="flex items-start py-4 max-w-[1336px] mx-auto border-gray-200">
                    <div className="flex-shrink-0 w-24 h-24 relative">
                        <Image
                            src={
                                itemImages[idx] ||
                                "https://images.grove.co/upload/f_auto,fl_progressive,ar_1:1,c_pad,b_white,w_650/v1588037272/global/Line%20Illustrations/no-image-available.png"
                            }
                            width={500}
                            height={500}
                            alt={''}
                            className="absolute top-0 left-0 w-full h-full object-fill rounded-md border-2 border-gray-300 border-solid"
                        />
                    </div>

                    <div className="flex-grow ml-4">
                        <h3 className="text-sm font-medium text-gray-800">
                            {item.name}
                        </h3>
                        <p className="text-sm text-green-500 font-medium">
                            {formatCurrency(item.price * item.quantity)}
                        </p>
                    </div>
                </div>
            ))}
        </>
    )
}