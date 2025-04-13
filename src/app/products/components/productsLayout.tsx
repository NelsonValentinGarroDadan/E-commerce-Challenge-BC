'use client';
import { useSearchParams } from "next/navigation";
import ProductsView from "./products/productsView";
import ProductView from "./product/productView";
import { Suspense } from "react";
import LoaderSpin from "@/components/loaderSpin";

export default function ProductsLayout () {
    
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    return (
        <Suspense fallback={<div className='h-screen flex items-center justify-center'><LoaderSpin/></div>}>
            {productId ? <ProductView productId={productId} /> : <ProductsView />}
        </Suspense>
    );
            
}