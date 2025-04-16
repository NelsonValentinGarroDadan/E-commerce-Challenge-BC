
import '../globals.css'
import { Providers } from './providers';
import Footer from './components/footer';
import ShoppingCart from '@/components/shoppingCart/shoppingCart';
import { Toaster } from 'sonner';
import Header from './components/header/header';
export const metadata = {
  title: 'Tu título',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className='relative'>
        <Providers>
          <Header />
          <main className="container mx-auto min-h-screen flex-col">{children}</main>
          <ShoppingCart />
          <Toaster  />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

