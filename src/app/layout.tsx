import Header from '@/app/components/header/header';
import './globals.css'
import { Providers } from './providers';
import Footer from './components/footer';
import ShoppingCart from '@/components/shoppingCart/shoppingCart';

export const metadata = {
  title: 'Tu título',
  description: 'Tu descripción',
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
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

