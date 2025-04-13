export const metadata = {
    title: "Nuestros Productos"
}
import LoaderSpin from '@/components/loaderSpin';
import ProductsLayout from './components/productsLayout';
import { Suspense } from "react";
export default function Products(){ 
    return (
        <Suspense fallback={<div className='h-screen flex items-center justify-center'><LoaderSpin/></div>}>
          <ProductsLayout />
        </Suspense>
      );
};