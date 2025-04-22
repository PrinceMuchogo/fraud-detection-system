import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "@/components/Provider/Provider";

export const metadata: Metadata = {
  title: "Fraud Detection Dashboard",
  description: "Real-time fraud detection monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <ToastContainer />
          {children}
        </Provider>
      </body>
    </html>
  );
}
