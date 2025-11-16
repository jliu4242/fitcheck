import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { AuthProvider } from '@/context/authContext';

export const metadata = {
  title: "Outfy",
  description: "Rate the fit with your friends"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <AuthProvider>
            <ServiceWorkerRegister />
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
