
import './globals.css'
export const metadata = {
  title: 'Pagina no encotrada',
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
          <main >{children}</main>
      </body>
    </html>
  );
}

