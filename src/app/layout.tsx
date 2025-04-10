import Header from '@/components/header/header';
import './globals.css'
import { Providers } from './providers';

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
        </Providers>
      </body>
    </html>
  );
}

