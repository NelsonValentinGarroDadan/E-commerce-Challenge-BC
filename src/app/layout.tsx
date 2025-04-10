import Header from '@/app/components/header/header';
import './globals.css'
import { Providers } from './providers';
import Footer from './components/footer';

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
    <html lang="es">
      <body>
        <Providers>
          <Header />
          <main className="container mx-auto">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

