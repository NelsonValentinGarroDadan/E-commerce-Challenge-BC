"use client";

import { useSearchParams } from "next/navigation";
import ProductsView from "./products/productsView";
import ProductView from "./product/productView";

export default function ProductsLayout () {
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    return productId ? <ProductView productId={productId} /> : <ProductsView />
            
}