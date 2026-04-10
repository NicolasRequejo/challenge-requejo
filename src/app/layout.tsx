import "./globals.css";
import { Header } from "@/components/Header/Header";
import { AppProviders } from "@/context/AppProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AppProviders>
            <Header />
            {children}
        </AppProviders>
      </body>
    </html>
  );
}