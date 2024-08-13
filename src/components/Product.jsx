import { useEffect, useState } from "react";
import { Typography } from "antd";
import Carousel from "./Carousel";
import productsApi from "apis/products";
import { append, isNotNil } from "ramda";
import { Spinner } from "neetoui";

const Product = () => {

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    const fetchProduct = async () => {
        try {
            const product = await productsApi.show();
            setProduct(product);
        } catch (error) {
            console.log("An error occurred:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    const {
        name,
        description,
        mrp,
        offerPrice,
        imageUrls,
        imageUrl,
    } = product;
    const totalDiscounts = mrp - offerPrice;
    const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);


    return (
        <div className="px-6 pb-6">
            <div>
                <Typography className="py-2 text-4xl font-semibold">{name}</Typography>
                <hr className="border-2 border-black" />
            </div>
            <div className="flex gap-4 mt-6">
                <div className="w-2/5">
                    {isNotNil(imageUrls) ? (
                        <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
                    ) : (
                        <img alt={name} className="w-48" src={imageUrl} />
                    )}
                </div>
                <div className="w-3/5 space-y-4">
                    <Typography>
                        {description}
                    </Typography>
                    <Typography>MRP: {mrp}</Typography>
                    <Typography className="font-semibold">Offer price: {offerPrice}</Typography>
                    <Typography className="font-semibold text-green-600">{discountPercentage}% off</Typography>
                </div>
            </div>
        </div>
    );
};

export default Product;